<template>
  <div class="profile-page">
    <div v-if="loading" class="profile-loading card border-0 shadow-sm rounded-4 p-5 text-center">
      <div class="spinner-border text-accent" role="status">
        <span class="visually-hidden">{{ $t('dashboard_common.loading') }}</span>
      </div>
      <p class="text-muted small mt-3 mb-0">{{ $t('dashboard_common.loading') }}</p>
    </div>

    <div v-else class="row g-4 align-items-start">
      <!-- Summary card -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm rounded-4 profile-summary">
          <div class="card-body text-center p-4">
            <div class="profile-avatar-wrap mx-auto mb-3">
              <img
                v-if="userData.avatar_url"
                :src="userData.avatar_url"
                alt=""
                class="profile-avatar-img"
              />
              <div v-else class="profile-avatar-placeholder">
                <i class="fas fa-user"></i>
              </div>
            </div>
            <input
              ref="photoInput"
              type="file"
              class="d-none"
              accept="image/*"
              @change="onPhotoChosen"
            />
            <button type="button" class="btn btn-link btn-sm text-accent p-0 mb-3" @click="triggerPhoto">
              {{ $t('user_profile.change_photo') }}
            </button>
            <h5 class="fw-bold mb-2">{{ userData.name || '—' }}</h5>
            <span class="badge profile-role-badge mb-3">
              <i class="fas fa-shield-alt me-1"></i>
              {{ userData.role_display || 'Member' }}
            </span>
            <div class="profile-meta text-start small">
              <div class="d-flex align-items-center gap-2 mb-2 text-muted">
                <i class="fas fa-envelope text-accent"></i>
                <span class="text-break">{{ userData.email || '—' }}</span>
              </div>
              <div class="d-flex align-items-center gap-2 text-muted">
                <i class="fas fa-calendar-alt text-accent"></i>
                <span>{{ joinedLabel }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Forms -->
      <div class="col-lg-8 d-flex flex-column gap-4">
        <div v-if="success" class="alert alert-success border-0 rounded-3 py-2 px-3 mb-0" role="alert">
          <i class="fas fa-check-circle me-2"></i>{{ success }}
          <button type="button" class="btn-close float-end mt-1" @click="success = ''"></button>
        </div>

        <!-- Personal information -->
        <div class="card border-0 shadow-sm rounded-4 profile-card">
          <div class="card-body p-4">
            <div class="d-flex align-items-start gap-3 mb-4">
              <div class="profile-card-icon">
                <i class="fas fa-user"></i>
              </div>
              <div>
                <h5 class="fw-bold mb-1">{{ $t('user_profile.personal_info') }}</h5>
                <p class="text-muted small mb-0">{{ $t('user_profile.personal_info_hint') }}</p>
              </div>
            </div>

            <form @submit.prevent="updateProfile">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small fw-semibold text-muted">{{ $t('user_profile.name') }}</label>
                  <input
                    v-model="profileForm.name"
                    type="text"
                    class="form-control profile-input"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-semibold text-muted">{{ $t('user_profile.email') }}</label>
                  <input
                    v-model="profileForm.email"
                    type="email"
                    class="form-control profile-input"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-semibold text-muted">{{ $t('user_profile.phone') }}</label>
                  <input
                    v-model="profileForm.phone"
                    type="tel"
                    class="form-control profile-input"
                    :placeholder="$t('user_profile.phone_placeholder')"
                  />
                </div>
                <div class="col-12">
                  <label class="form-label small fw-semibold text-muted">{{ $t('user_profile.address') }}</label>
                  <textarea
                    v-model="profileForm.address"
                    class="form-control profile-input"
                    rows="2"
                    :placeholder="$t('user_profile.address_placeholder')"
                  ></textarea>
                </div>
              </div>
              <div class="d-flex justify-content-end mt-4">
                <button type="submit" class="btn btn-accent" :disabled="updateLoading">
                  <span
                    v-if="updateLoading"
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  <i v-else class="fas fa-save me-2"></i>
                  {{ $t('user_profile.update_button') }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Change password -->
        <div class="card border-0 shadow-sm rounded-4 profile-card">
          <div class="card-body p-4">
            <div class="d-flex align-items-start gap-3 mb-4">
              <div class="profile-card-icon">
                <i class="fas fa-lock"></i>
              </div>
              <div>
                <h5 class="fw-bold mb-1">{{ $t('user_profile.change_password') }}</h5>
                <p class="text-muted small mb-0">{{ $t('user_profile.password_description') }}</p>
              </div>
            </div>

            <form @submit.prevent="submitPassword">
              <div class="mb-3">
                <label class="form-label small fw-semibold text-muted">{{
                  $t('auth.reset_password.current_password')
                }}</label>
                <div class="input-group">
                  <input
                    v-model="passwordForm.current_password"
                    :type="showCurrent ? 'text' : 'password'"
                    class="form-control profile-input"
                    autocomplete="current-password"
                    :placeholder="$t('auth.reset_password.current_password_placeholder')"
                    required
                  />
                  <button
                    class="btn btn-outline-secondary border-start-0"
                    type="button"
                    @click="showCurrent = !showCurrent"
                  >
                    <i :class="showCurrent ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
              </div>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small fw-semibold text-muted">{{
                    $t('auth.reset_password.new_password')
                  }}</label>
                  <div class="input-group">
                    <input
                      v-model="passwordForm.new_password"
                      :type="showNew ? 'text' : 'password'"
                      class="form-control profile-input"
                      autocomplete="new-password"
                      minlength="8"
                      :placeholder="$t('auth.reset_password.new_password_placeholder')"
                      required
                    />
                    <button
                      class="btn btn-outline-secondary border-start-0"
                      type="button"
                      @click="showNew = !showNew"
                    >
                      <i :class="showNew ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </button>
                  </div>
                  <div class="form-text small">{{ $t('auth.reset_password.password_requirements') }}</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-semibold text-muted">{{
                    $t('auth.reset_password.confirm_new_password')
                  }}</label>
                  <div class="input-group">
                    <input
                      v-model="passwordForm.new_password_confirmation"
                      :type="showConfirm ? 'text' : 'password'"
                      class="form-control profile-input"
                      autocomplete="new-password"
                      minlength="8"
                      :placeholder="$t('auth.reset_password.confirm_new_password_placeholder')"
                      required
                    />
                    <button
                      class="btn btn-outline-secondary border-start-0"
                      type="button"
                      @click="showConfirm = !showConfirm"
                    >
                      <i :class="showConfirm ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-end mt-4">
                <button type="submit" class="btn btn-accent" :disabled="passwordLoading || !isPasswordValid">
                  <span
                    v-if="passwordLoading"
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  <i v-else class="fas fa-lock me-2"></i>
                  {{ $t('user_profile.change_password_button') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()

const loading = ref(true)
const updateLoading = ref(false)
const passwordLoading = ref(false)
const success = ref('')
const photoInput = ref(null)
const pendingPhoto = ref(null)

const showCurrent = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)

const userData = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  created_at: null,
  role_display: '',
  avatar_url: null,
})

const profileForm = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
})

const passwordForm = ref({
  current_password: '',
  new_password: '',
  new_password_confirmation: '',
})

const joinedLabel = computed(() => {
  if (!userData.value.created_at) return ''
  const d = new Date(userData.value.created_at)
  const month = d.toLocaleString(undefined, { month: 'long' })
  const day = d.getDate()
  const year = d.getFullYear()
  return `${$t('user_profile.joined_prefix')} ${month} ${day}, ${year}`
})

const isPasswordValid = computed(() => {
  const p = passwordForm.value
  return (
    p.current_password &&
    p.new_password &&
    p.new_password_confirmation &&
    p.new_password === p.new_password_confirmation &&
    p.new_password.length >= 8
  )
})

function triggerPhoto() {
  photoInput.value?.click()
}

function onPhotoChosen(e) {
  const file = e.target.files?.[0]
  pendingPhoto.value = file || null
  e.target.value = ''
  if (file) {
    updateProfile()
  }
}

async function fetchUserProfile() {
  loading.value = true
  try {
    const response = await axios.get('/tenant/profile', { withCredentials: true })
    if (response.data.success) {
      const d = response.data.data
      userData.value = { ...userData.value, ...d }
      profileForm.value = {
        name: d.name || '',
        email: d.email || '',
        phone: d.phone || '',
        address: d.address || '',
      }
    }
  } catch {
    Swal.fire({ icon: 'error', title: 'Error', text: $t('user_profile.fetch_error') })
  } finally {
    loading.value = false
  }
}

async function updateProfile() {
  updateLoading.value = true
  success.value = ''
  try {
    if (pendingPhoto.value) {
      const fd = new FormData()
      fd.append('name', profileForm.value.name)
      fd.append('email', profileForm.value.email)
      if (profileForm.value.phone) fd.append('phone', profileForm.value.phone)
      if (profileForm.value.address) fd.append('address', profileForm.value.address)
      fd.append('profile_photo', pendingPhoto.value)

      const response = await axios.post('/tenant/profile', fd, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      pendingPhoto.value = null
      if (response.data.success) {
        success.value = $t('user_profile.update_success')
        const payload = response.data.data || {}
        userData.value = {
          ...userData.value,
          ...profileForm.value,
          avatar_url: payload.avatar_url ?? userData.value.avatar_url,
          created_at: payload.created_at ?? userData.value.created_at,
        }
      } else {
        Swal.fire({ icon: 'error', title: 'Error', text: response.data.message || $t('user_profile.update_error') })
      }
    } else {
      const response = await axios.put('/tenant/profile', profileForm.value, { withCredentials: true })
      if (response.data.success) {
        success.value = $t('user_profile.update_success')
        const payload = response.data.data || {}
        userData.value = {
          ...userData.value,
          ...profileForm.value,
          avatar_url: payload.avatar_url ?? userData.value.avatar_url,
        }
      } else {
        Swal.fire({ icon: 'error', title: 'Error', text: response.data.message || $t('user_profile.update_error') })
      }
    }
  } catch (error) {
    const errs = error.response?.data?.errors
    const firstErr = errs ? Object.values(errs)[0]?.[0] : null
    const msg =
      error.response?.data?.message || firstErr || $t('user_profile.update_error')
    Swal.fire({ icon: 'error', title: 'Error', text: msg })
  } finally {
    updateLoading.value = false
  }
}

async function submitPassword() {
  if (!isPasswordValid.value) return
  passwordLoading.value = true
  try {
    const response = await axios.post('/tenant/change-password', passwordForm.value, { withCredentials: true })
    if (response.data.success) {
      passwordForm.value = {
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
      }
      showCurrent.value = false
      showNew.value = false
      showConfirm.value = false
      Swal.fire({
        icon: 'success',
        title: $t('auth.reset_password.change_success_title'),
        text: $t('auth.reset_password.change_success_message'),
        timer: 2800,
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: $t('auth.reset_password.change_error_title'),
        text: response.data.message || $t('auth.reset_password.change_error_message'),
      })
    }
  } catch (error) {
    let msg = $t('auth.reset_password.change_error_message')
    if (error.response?.status === 400 && error.response?.data?.message) {
      msg = error.response.data.message
    } else if (error.response?.status === 422 && error.response?.data?.errors) {
      const err = error.response.data.errors
      msg = err.new_password?.[0] || err.current_password?.[0] || msg
    }
    Swal.fire({ icon: 'error', title: $t('auth.reset_password.change_error_title'), text: msg })
  } finally {
    passwordLoading.value = false
  }
}

onMounted(fetchUserProfile)
</script>

<style scoped>
.profile-page {
  padding: 0.25rem 0 1.5rem;
  font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
}

.text-accent {
  color: #00844d !important;
}

.profile-loading {
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.profile-summary {
  background: #fff;
}

.profile-avatar-wrap {
  width: 112px;
  height: 112px;
  border-radius: 50%;
  overflow: hidden;
  background: #f1f5f9;
  border: 3px solid rgba(0, 132, 77, 0.2);
}

.profile-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 2.25rem;
}

.profile-role-badge {
  background: rgba(0, 132, 77, 0.12);
  color: #00844d;
  font-weight: 600;
  font-size: 0.75rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
}

.profile-card {
  background: #fff;
}

.profile-card-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(0, 132, 77, 0.12);
  color: #00844d;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.profile-input {
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 0.95rem;
}

.profile-input:focus {
  border-color: #00844d;
  box-shadow: 0 0 0 0.2rem rgba(0, 132, 77, 0.18);
}

.btn-accent {
  background: #00844d;
  border: none;
  color: #fff;
  font-weight: 600;
  padding: 0.55rem 1.35rem;
  border-radius: 10px;
}

.btn-accent:hover:not(:disabled) {
  background: #006b3f;
  color: #fff;
}

.btn-accent:disabled {
  opacity: 0.65;
}
</style>
