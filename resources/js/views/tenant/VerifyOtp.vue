<template>
  <div class="mt-5 login-page d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="login-card d-flex flex-row shadow overflow-hidden bg-white">
      <!-- Left: Image -->
      <div class="login-image d-none d-md-block">
        <img src="/Mox_files/login.jpg" alt="Verify OTP" class="img-fluid h-100 w-100" style="object-fit: cover; min-width: 320px; min-height: 350px;" />
      </div>

      <!-- Right: Form -->
      <div class="login-form login-card-inner p-4 p-md-5 d-flex flex-column justify-content-center">
        <h2 class="text-center mb-2 login-title">{{ $t('auth.otp.title') }}</h2>
        <div class="text-center mb-3 login-subtext">{{ $t('auth.otp.subtitle') }}</div>

        <!-- Error Message -->
        <div v-if="error" class="alert alert-danger mb-3" role="alert">
          {{ error }}
        </div>

        <form @submit.prevent="handleVerifyOtp">
          <div class="mb-3">
            <div class="input-group">
              <span class="input-group-text bg-white"><i class="material-icons text-muted">key</i></span>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': error }"
                :placeholder="$t('auth.otp.placeholder')"
                v-model="otp"
                :disabled="loading"
                maxlength="6"
                pattern="[0-9]{6}"
                required
              />
            </div>
            <div v-if="error" class="invalid-feedback">
              {{ error }}
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-success w-100 fw-bold mb-3 login-btn"
            :disabled="loading || !otp || otp.length !== 6"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            {{ loading ? $t('common.verifying') : $t('auth.otp.submit') }}
          </button>
        </form>

        <div class="text-end mt-2">
          <button
            type="button"
            class="btn btn-link login-reset p-0"
            @click="handleResendOtp"
            :disabled="loading || resendCooldown > 0"
          >
            <i class="material-icons align-middle" style="font-size: 1.1em;">refresh</i>
            {{ resendCooldown > 0 ? `${$t('auth.otp.resend')} (${resendCooldown}s)` : $t('auth.otp.resend') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Swal from 'sweetalert2'

const { t } = useI18n()
const otp = ref('')
const router = useRouter()
const loading = ref(false)
const error = ref('')
const resendCooldown = ref(0)
const resendTimer = ref(null)

// Check if user has pending verification email
onMounted(async () => {
  const email = localStorage.getItem('pending_verification_email')
  if (!email) {
    router.push('/login')
    return
  }

  const existing = localStorage.getItem('token')
  if (existing) {
    console.info('%c[verify-otp] Stored auth token (copy):', 'color:#0366d6;font-weight:bold', existing)
  }

  try {
    const { data } = await window.axios.post('/tenant/debug/pending-otp', { email })
    if (data?.debug_table_otp) {
      console.info('%c[verify-otp] OTP from users table (copy):', 'color:#22863a;font-weight:bold', data.debug_table_otp)
    }
  } catch {
    // Route exists only when APP_ENV=local; ignore 404 / errors on production
  }
})

async function handleVerifyOtp() {
  error.value = ''

  // Validate OTP format
  if (!otp.value || otp.value.length !== 6 || !/^\d{6}$/.test(otp.value)) {
    error.value = t('auth.otp.invalidOtp')
    return
  }

  loading.value = true

  try {
    const email = localStorage.getItem('pending_verification_email')
    if (!email) {
      throw new Error('No pending verification email found')
    }

    const response = await window.axios.post('/tenant/verify-otp', {
      email,
      otp: otp.value,
    })

    if (response.data.success) {
      const token = response.data.token
      localStorage.setItem('token', token)
      localStorage.removeItem('pending_verification_email')
      window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      console.info('%c[verify-otp] New auth token (copy):', 'color:#0366d6;font-weight:bold', token)

      await Swal.fire({
        icon: 'success',
        title: t('auth.otp.verificationSuccess'),
        text: response.data.message || t('auth.otp.verificationSuccessMessage'),
        timer: 2000,
        showConfirmButton: false,
        position: 'top-end',
        toast: true
      })

      router.push('/dashboard/home')
    } else {
      throw new Error(response.data.message || t('auth.otp.verificationErrorMessage'))
    }
  } catch (err) {
    console.error('OTP verification error:', err)

    let errorMessage = t('auth.otp.verificationErrorMessage')

    if (err.response?.data?.message) {
      errorMessage = err.response.data.message
    } else if (err.response?.status === 422) {
      errorMessage = t('auth.otp.invalidOtp')
    } else if (err.response?.status === 410) {
      errorMessage = t('auth.otp.otpExpired')
    }

    error.value = errorMessage

    Swal.fire({
      icon: 'error',
      title: t('auth.otp.verificationFailed'),
      text: errorMessage,
      confirmButtonColor: '#dc3545'
    })
  } finally {
    loading.value = false
  }
}

async function handleResendOtp() {
  if (resendCooldown.value > 0) return

  loading.value = true
  error.value = ''

  try {
    const email = localStorage.getItem('pending_verification_email')
    if (!email) {
      throw new Error('No pending verification email found')
    }

    const response = await window.axios.post('/tenant/resend-otp', {
      email
    })

    if (response.data.success) {
      Swal.fire({
        icon: 'success',
        title: t('auth.otp.resendSuccess'),
        timer: 1500,
        showConfirmButton: false,
        position: 'top-end',
        toast: true
      })

      // Start cooldown timer
      startResendCooldown()
    } else {
      throw new Error(response.data.message || t('auth.otp.resendErrorMessage'))
    }
  } catch (err) {
    console.error('Resend OTP error:', err)
    error.value = err.response?.data?.message || t('auth.otp.resendErrorMessage')

    Swal.fire({
      icon: 'error',
      title: t('common.error'),
      text: error.value,
      confirmButtonColor: '#dc3545'
    })
  } finally {
    loading.value = false
  }
}

function startResendCooldown() {
  resendCooldown.value = 60 // 60 seconds cooldown
  resendTimer.value = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) {
      clearInterval(resendTimer.value)
      resendTimer.value = null
    }
  }, 1000)
}

// Cleanup timer on component unmount
onMounted(() => {
  return () => {
    if (resendTimer.value) {
      clearInterval(resendTimer.value)
    }
  }
})
</script>

<style scoped>
/* keeping your exact same styles */
.login-page {
  background: #f8f9fa;
}
.login-card {
  min-width: 1000px;
  max-width: 900px;
  min-height: 350px;
  background: #fff;
}
.login-image {
  width: 500px;
  min-height: 350px;
  background: #eee;
}
.login-form {
  flex: 1 1 0%;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  min-width: 500px;
  max-width: 500px;
  align-items: center;
}
.input-group-text {
  background: #fff;
  border-right: 0;
  border-radius: 6px 0 0 6px;
}
.form-control {
  border-left: 0;
  border-radius: 0 6px 6px 0;
  box-shadow: none;
}
.btn-success {
  background: #388e3c;
  border: none;
}
.btn-success:hover {
  background: #2e7031;
  border: none;
}
.btn-light {
  background: #fff;
  border: 1px solid #eee;
}
.btn-light:hover {
  background: #f5f5f5;
}
@media (max-width: 991.98px) {
  .login-card {
    flex-direction: column;
    min-width: 320px;
    max-width: 95vw;
  }
  .login-image {
    width: 100%;
    min-height: 180px;
    max-height: 220px;
  }
  .login-form {
    min-width: 100%;
    max-width: 100%;
  }
  .login-card-inner {
    min-width: 100%;
    max-width: 100%;
  }
}

@media (max-width: 767.98px) {
  .login-page {
    padding: 1rem;
  }
  .login-card {
    min-width: 100%;
    max-width: 100%;
    border-radius: 12px;
  }
  .login-title {
    font-size: 1.75rem;
  }
  .login-subtext {
    font-size: 0.95rem;
  }
  .login-form {
    padding: 1.5rem !important;
  }
}

/* Android-specific fixes */
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .login-page,
  .login-card {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-font-smoothing: antialiased;
  }

  input {
    -webkit-appearance: none;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    font-size: 16px; /* Prevents zoom on Android */
  }

  button, .btn {
    -webkit-tap-highlight-color: rgba(67, 160, 71, 0.2);
    touch-action: manipulation;
  }
}

@media (max-width: 575.98px) {
  .login-page {
    padding: 0.5rem;
  }
  .login-card {
    border-radius: 8px;
  }
  .login-title {
    font-size: 1.5rem;
  }
  .login-subtext {
    font-size: 0.9rem;
  }
  .login-form {
    padding: 1rem !important;
  }
  .login-btn {
    font-size: 1rem;
  }
}
/* Login Card Inner Styling */
.login-card-inner {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  min-width: 500px;
  max-width: 500px;
  margin: 0 auto;
}
.login-title {
  font-family: 'Playfair Display', serif;
  font-weight: bold;
  color: #222;
  font-size: 2rem;
}
.login-subtext {
  color: #388e3c;
  font-size: 1rem;
}
.login-link {
  color: #388e3c;
  text-decoration: none;
  font-weight: 500;
}
.login-link:hover {
  text-decoration: underline;
}
.login-btn {
  background: #43a047;
  border-color: #43a047;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1.05rem;
}
.login-btn:hover {
  background: #388e3c;
  border-color: #388e3c;
}
.login-or {
  color: #888;
  font-size: 0.97rem;
}
.login-social {
  background: #fff;
  border: 1px solid #eee;
  transition: box-shadow 0.2s;
}
.login-social:hover {
  box-shadow: 0 2px 8px rgba(67,160,71,0.12);
}
.login-reset {
  color: #444;
  font-size: 0.97rem;
  text-decoration: none;
  transition: color 0.2s;
}
.login-reset:hover {
  color: #43a047;
  text-decoration: underline;
}
</style>
