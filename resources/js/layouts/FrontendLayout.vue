<template>
  <div class="frontend-layout">
    <!-- Top Bar -->
    <div class="top-bar bg-dark text-light pt-4 pb-2">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-8">
            <ul class="list-inline mb-0">
              <li class="list-inline-item me-3">
                <a :href="`mailto:${contactEmail}`" class="text-light text-decoration-none">
                  <i class="fas fa-envelope me-1"></i> {{ contactEmail }}
                </a>
              </li>
              <li class="list-inline-item">
                <a :href="`tel:${contactPhone}`" class="text-light text-decoration-none">
                  <i class="fas fa-phone me-1"></i> {{ contactPhone }}
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-4 text-end">
          </div>
        </div>
      </div>
    </div>

    <!-- Header -->
    <div style="position: relative; z-index: 1050; top: 40px;">
      <header class="header">
       <!-- close auto when visit any page from navbar  -->
       <div v-if="!isNavigating">
        <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
          <div class="container">
            <router-link class="navbar-brand" to="/">
              <!-- <img src="/assets/logo/airestro360-logo.png" alt="AiRestro360" class="logo" /> -->
                <img src="@/assets/logo/airestro360-logo-dark.png" alt="AiRestro360" class="logo" />
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                  <router-link class="nav-link" :to="{ name: 'food-ordering' }">{{ $t('nav.foodOrdering') }}</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" :to="{ name: 'restaurant-services' }">{{ $t('nav.restaurantServices') }}</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" :to="{ name: 'pricing' }">{{ $t('nav.pricing') }}</router-link>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" @click.prevent="showRestaurantLoginModal">{{ $t('nav.logintorestaurant') }}</a>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link btn btn-primary text-white" :to="{ name: 'tenant-register' }">
                    {{ $t('nav.getAccess') }}
                  </router-link>
                </li>
                <li>
                    <language-switcher />
                </li>
              </ul>
            </div>
          </div>
        </nav>
       </div>
      </header>
    </div>

    <!-- Main Content -->
    <main class="main-content">
      <router-view></router-view>
    </main>

    <!-- Restaurant Login Modal -->
    <div class="modal fade" id="restaurantLoginModal" tabindex="-1" aria-labelledby="restaurantLoginModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="restaurantLoginModalLabel">
              <i class="fas fa-utensils me-2"></i> {{$t('login_modal.restaurantLoginTitle')}}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleRestaurantLogin">
              <div class="mb-3">
                <label for="restaurantEmail" class="form-label">{{ $t('login_modal.emailLabel') }}</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="restaurantEmail"
                  v-model="restaurantEmail"
                  placeholder="your-restaurant@example.com"
                  required
                  :disabled="loginLoading"
                >
                <div class="form-text">
                  {{ $t('login_modal.email_form_text') }}
                </div>
              </div>
              
              <div v-if="loginError" class="alert alert-danger" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                {{ loginError }}
              </div>

              <div class="d-grid gap-2">
                <button 
                  type="submit" 
                  class="btn btn-danger"
                  :disabled="loginLoading"
                >
                  <span v-if="!loginLoading">{{ $t('login_modal.loginButton') }}</span>
                  <span v-else>
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    {{ $t('login_modal.processing') }}
                  </span>
                </button>
                <button 
                  type="button" 
                  class="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                  :disabled="loginLoading"
                >
                  {{ $t('login_modal.cancelButton') }}
                </button>
              </div>
            </form>
            
            <div class="mt-3 text-center">
              <small class="text-muted">
               {{ $t('login_modal.noAccount') }}
                <router-link to="/tenant-register" class="text-danger text-decoration-none" @click="closeLoginModal">{{ $t('login_modal.signUp') }}</router-link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer bg-dark text-light py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-4">
            <h5 class="mb-3">{{ $t('footer.aboutUs') }}</h5>
            <p>{{ $t('footer.aboutText') }}</p>
          </div>
          <div class="col-md-4 mb-4">
            <h5 class="mb-3">{{ $t('footer.quickLinks.title') }}</h5>
            <ul class="list-unstyled">
              <li class="mb-2">
                <router-link class="text-light text-decoration-none" :to="{ name: 'about' }">{{ $t('footer.aboutUs') }}</router-link>
              </li>
              <li class="mb-2">
                <router-link class="text-light text-decoration-none" :to="{ name: 'contact' }">{{ $t('footer.contactUs') }}</router-link>
              </li>
              <li class="mb-2">
                <router-link class="text-light text-decoration-none" :to="{ name: 'privacy' }">{{ $t('footer.privacy') }}</router-link>
              </li>
              <li class="mb-2">
                <router-link class="text-light text-decoration-none" :to="{ name: 'terms' }">{{ $t('footer.terms') }}</router-link>
              </li>
            </ul>
          </div>
          <div class="col-md-4 mb-4">
            <h5 class="mb-3">{{ $t('footer.contactInfo') }}</h5>
            <ul class="list-unstyled">
              <li class="mb-2">
                <i class="fas fa-map-marker-alt me-2"></i> {{ $t('footer.address') }}
              </li>
              <li class="mb-2">
                <i class="fas fa-phone me-2"></i> {{ $t('topbar.phone') }}
              </li>
              <li class="mb-2">
                <i class="fas fa-envelope me-2"></i> {{ contactEmail }}
              </li>
            </ul>
          </div>
        </div>
        <hr class="my-4 bg-light">
        <div class="text-center">
          <p class="mb-0">{{ $t('footer.copyright') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import LanguageSwitcher from "../components/frontend/LanguageSwitcher.vue";
import { contactEmail, contactPhone } from "../utils/contact.js";

// Restaurant Login Modal Data
const restaurantEmail = ref("");
const loginLoading = ref(false);
const loginError = ref("");
let restaurantLoginModal = null;

// Get the current route
const route = useRoute();

// Initialize modal when component mounts
onMounted(() => {
  restaurantLoginModal = new Modal(document.getElementById('restaurantLoginModal'));
});

// Show restaurant login modal
const showRestaurantLoginModal = () => {
  restaurantEmail.value = "";
  loginError.value = "";
  loginLoading.value = false;
  restaurantLoginModal.show();
};

// Close login modal
const closeLoginModal = () => {
  restaurantLoginModal.hide();
};

// Handle restaurant login form submission
const handleRestaurantLogin = async () => {
  if (!restaurantEmail.value) {
    loginError.value = "Please enter your restaurant email address";
    return;
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(restaurantEmail.value)) {
    loginError.value = "Please enter a valid email address";
    return;
  }

  loginLoading.value = true;
  loginError.value = "";

  try {
    // API call to find tenant by email
    const response = await axios.post('/tenant/find-by-email', {
      email: restaurantEmail.value
    });

    if (response.data.success && response.data.tenant) {
      const tenant = response.data.tenant;
      
      // Show success message
      await Swal.fire({
        icon: 'success',
        title: 'Restaurant Found!',
        text: `Redirecting to ${tenant.business_name} login page...`,
        timer: 2000,
        showConfirmButton: false
      });

      // Redirect to tenant login page
      redirectToTenantLogin(tenant);
      
    } else {
      loginError.value = response.data.message || 'No restaurant found with this email address';
    }

  } catch (error) {
    console.error('Error finding restaurant:', error);
    
    if (error.response?.status === 404) {
      loginError.value = 'No restaurant account found with this email address.';
    } else if (error.response?.data?.message) {
      loginError.value = error.response.data.message;
    } else {
      loginError.value = 'An error occurred while processing your request. Please try again.';
    }
  } finally {
    loginLoading.value = false;
  }
};

// Redirect to tenant login page
const redirectToTenantLogin = (tenant) => {
  // Close modal first
  closeLoginModal();
  
  // Method 1: Redirect to tenant-specific subdomain
  window.location.href = `http://${tenant.subdomain}.localhost:8000/login`;
  
  // Method 2: Redirect with tenant ID as parameter (recommended)
  // const redirectUrl = `/tenant-login?tenant_id=${tenant.id}&email=${encodeURIComponent(restaurantEmail.value)}`;
  // window.location.href = redirectUrl;
  
  // Method 3: For SPA navigation (if you have a tenant login route)
  // router.push({ 
  //   name: 'tenant-login', 
  //   query: { tenant_id: tenant.id, email: restaurantEmail.value } 
  // });
};

// Watch for route changes
watch(
  () => route.path,
  () => {
    // ✅ Scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    // ✅ Close navbar collapse if open
    const navbarCollapse = document.getElementById("navbarNav");
    if (navbarCollapse?.classList.contains("show")) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse);
      bsCollapse.hide();
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.frontend-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.top-bar {
  font-size: 0.9rem;
  background-color: #1a1a1a !important;
  padding: 0.5rem 0;
}

.top-bar a {
  color: rgba(255, 255, 255, 0.8) !important;
  transition: color 0.3s ease;
}

.top-bar a:hover {
  color: #c62828 !important;
  text-decoration: none;
}

.top-bar i {
  color: #c62828;
}

.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar {
  padding: 1rem 0;
}

.logo {
  height: 40px;
  width: auto;
}

.nav-link {
  font-weight: 500;
  color: #333;
  margin: 0 0.5rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #c62828;
}

.nav-link.btn {
  padding: 0.5rem 1.5rem;
  margin-left: 1rem;
  background-color: #c62828;
  border-color: #c62828;
}

.nav-link.btn:hover {
  background-color: white;
  border-color: #c62828;
  color: white;
}

.main-content {
  flex: 1;
}

.footer {
  margin-top: auto;
}

.footer h5 {
  color: white;
}

/* Restaurant Login Modal Styles */
.modal-content {
  border-radius: 12px;
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  background: #c62828;
  color: white;
  border-bottom: none;
  border-radius: 12px 12px 0 0;
  padding: 1.5rem;
}

.modal-header .btn-close {
  filter: invert(1);
  opacity: 0.8;
}

.modal-body {
  padding: 2rem;
}

.form-label {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.form-control {
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #c62828;
  box-shadow: 0 0 0 0.2rem rgba(198, 40, 40, 0.25);
}

.form-control:disabled {
  background-color: #f8f9fa;
  opacity: 0.7;
}

.form-text {
  color: #6c757d;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-danger {
  background: #c62828;
  border-color: #c62828;
}

.btn-danger:hover:not(:disabled) {
  background: #b71c1c;
  border-color: #b71c1c;
  transform: translateY(-2px);
}

.btn-outline-secondary:hover:not(:disabled) {
  transform: translateY(-2px);
}

.alert {
  border-radius: 8px;
  border: none;
  padding: 0.75rem 1rem;
}

/* Animation for modal */
.modal.fade.show {
  backdrop-filter: blur(5px);
}

.modal-content {
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Loading state styles */
.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

/* Disabled state */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

/* Responsive styles for modal */
@media (max-width: 576px) {
  .modal-dialog {
    margin: 1rem;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .top-bar {
    text-align: center;
  }

  .top-bar .col-md-4 {
    margin-top: 0.5rem;
  }

  .navbar-nav {
    text-align: center;
  }

  .nav-link {
    margin: 0.5rem 0;
  }

  .nav-link.btn {
    margin: 0.5rem auto;
    display: inline-block;
  }
}
</style>

<style scoped>
:root {
  --primary-color: #c62828;
  --primary-dark: #b71c1c;
  --primary-light: #e57373;
  --error-color: #ff3d00;
  --text-primary: rgba(0, 0, 0, 0.87);
  --text-secondary: rgba(0, 0, 0, 0.6);
  --text-disabled: rgba(0, 0, 0, 0.38);
  --background: #fafafa;
  --surface: rgb(244.8, 244.8, 244.8);
}

body {
  padding-top: 96px !important; /* 40px topbar + ~56px navbar */
  background-color: var(--background);
  color: var(--text-primary);
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-primary:hover {
  background-color: var(--primary-dark);
  border-color: var(--primary-dark);
}

.text-primary {
  color: var(--primary-color) !important;
}

.hero-section {
  min-height: 480px;
  width: 100vw;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0;
  padding: 0;
}
.hero-bg {
  background: url('/images/hero-bg.jpg') no-repeat center center;
  background-size: cover;
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.hero-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  z-index: 2;
}
.hero-content {
  position: relative;
  z-index: 3;
  min-height: 480px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.hero-content h1 {
  font-size: 3.5rem;
  font-family: 'Lora', serif;
  font-weight: bold;
}
.hero-content p {
  font-size: 1.25rem;
  letter-spacing: 1px;
}
.hero-content .btn {
  font-size: 1.1rem;
  border-radius: 6px;
  box-shadow: none;
  margin: 0 8px;
  text-transform: uppercase;
}
@media (max-width: 767.98px) {
  .hero-content h1 {
    font-size: 2.2rem;
  }
  .hero-section, .hero-content {
    min-height: 320px;
  }
}
.team-img {
  width: 100%;
  aspect-ratio: 1/1.1;
  height: 300px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: #f5f5f5;
  display: block;
}
.team-social {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 0.5rem;
}
.team-social .social-icon svg {
  fill: #757575;
  transition: fill 0.2s;
}
.team-social .social-icon:hover svg {
  fill: #c62828;
}
.top-bar {
  position: fixed; top: 0; left: 0; width: 100%; z-index: 1051;
  background: #b71c1c; color: #fff; font-size: 1rem; font-family: 'Lora', serif;
  border-bottom: 1px solid #a31515; height: 40px; display: flex; align-items: center; padding: 0;
}
.top-bar .container-fluid { display: flex; justify-content: space-between; align-items: center; height: 40px; padding-left: 24px; padding-right: 24px; }
.top-bar .contact-info span { margin-right: 24px; display: inline-flex; align-items: center; font-size: 0.98em; }
.top-bar .contact-info i, .top-bar .contact-info .material-icons { font-size: 1.1em; margin-right: 6px; vertical-align: middle; color: #fff !important; }
.top-bar .topbar-right { display: flex; align-items: center; gap: 16px; }
.top-bar .social-icons a { color: #fff !important; margin-right: 8px; font-size: 1.1em; transition: color 0.2s; }
.top-bar .social-icons a:last-child { margin-right: 0; }
.top-bar .social-icons a:hover { color: #ffd700 !important; }
.top-bar .lang-flag { width: 22px; height: 16px; margin-right: 6px; vertical-align: middle; object-fit: cover; border-radius: 2px; background: #fff; }
.top-bar .account { display: inline-flex; align-items: center; cursor: pointer; font-size: 1em; margin-left: 10px; color: #fff !important; position: relative; user-select: none; }
.top-bar .account .material-icons, .top-bar .account .arrow { color: #fff !important; }
.account-dropdown { display: none; position: absolute; right: 0; top: 120%; min-width: 260px; background: #fff; color: #222; border-radius: 10px; box-shadow: 0 8px 32px rgba(0,0,0,0.18); padding: 0; z-index: 2000; font-size: 1rem; overflow: hidden; }
.account-dropdown.show { display: block; }
.account-dropdown .dropdown-header { background: #fafafa; padding: 18px 20px 12px 20px; text-align: center; border-bottom: 1px solid #eee; }
.account-dropdown .dropdown-header img { width: 54px; height: 54px; border-radius: 50%; margin-bottom: 8px; object-fit: cover; background: #eee; }
.account-dropdown .dropdown-header .name { font-weight: bold; font-size: 1.1em; margin-bottom: 2px; color: #222; }
.account-dropdown .dropdown-header .username { font-size: 0.95em; color: #888; font-style: italic; }
.account-dropdown .dropdown-item { display: flex; align-items: center; padding: 12px 20px; color: #222; font-size: 1em; border-bottom: 1px solid #f0f0f0; background: none; cursor: pointer; transition: background 0.2s; }
.account-dropdown .dropdown-item:last-child { border-bottom: none; }
.account-dropdown .dropdown-item i, .account-dropdown .dropdown-item .material-icons {
  color: #fff !important; background: #b71c1c; border-radius: 50%; width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; margin-right: 14px; font-size: 1.2em; transition: background 0.2s, color 0.2s;
}
.account-dropdown .dropdown-item:hover { background: #f5f5f5; }
.account-dropdown .dropdown-item:hover i, .account-dropdown .dropdown-item:hover .material-icons { background: #c62828; }
.account-dropdown .dropdown-footer { padding: 12px 20px 10px 20px; background: #fafafa; text-align: center; border-top: 1px solid #eee; }
.account-dropdown .dropdown-footer .social-icons a { color: #fff !important; background: #b71c1c; border-radius: 50%; width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; margin: 0 4px; font-size: 1.1em; transition: background 0.2s; }
.account-dropdown .dropdown-footer .social-icons a:hover { background: #c62828; }
.navbar-fixed-top, .navbar.sticky-top, nav.navbar.fixed-top {
  top: 40px !important;
  z-index: 1050;
}
.top-bar {
position: fixed; top: 0; left: 0; width: 100%; z-index: 1051;
background: #b71c1c; color: #fff; font-size: 1rem; font-family: 'Lora', serif;
border-bottom: 1px solid #a31515; height: 40px; display: flex; align-items: center; padding: 0;
}
.top-bar .container-fluid { display: flex; justify-content: space-between; align-items: center; height: 40px; padding-left: 24px; padding-right: 24px; }
.top-bar .contact-info span { margin-right: 24px; display: inline-flex; align-items: center; font-size: 0.98em; }
.top-bar .contact-info i, .top-bar .contact-info .material-icons { font-size: 1.1em; margin-right: 6px; vertical-align: middle; color: #fff !important; }
.top-bar .topbar-right { display: flex; align-items: center; gap: 16px; }
.top-bar .social-icons a { color: #fff !important; margin-right: 8px; font-size: 1.1em; transition: color 0.2s; }
.top-bar .social-icons a:last-child { margin-right: 0; }
.top-bar .social-icons a:hover { color: #ffd700 !important; }
.top-bar .lang-flag { width: 22px; height: 16px; margin-right: 6px; vertical-align: middle; object-fit: cover; border-radius: 2px; background: #fff; }
.top-bar .account { display: inline-flex; align-items: center; cursor: pointer; font-size: 1em; margin-left: 10px; color: #fff !important; position: relative; user-select: none; }
.top-bar .account .material-icons, .top-bar .account .arrow { color: #fff !important; }
.account-dropdown { display: none; position: absolute; right: 0; top: 120%; min-width: 260px; background: #fff; color: #222; border-radius: 10px; box-shadow: 0 8px 32px rgba(0,0,0,0.18); padding: 0; z-index: 2000; font-size: 1rem; overflow: hidden; }
.account-dropdown.show { display: block; }
.account-dropdown .dropdown-header { background: #fafafa; padding: 18px 20px 12px 20px; text-align: center; border-bottom: 1px solid #eee; }
.account-dropdown .dropdown-header img { width: 54px; height: 54px; border-radius: 50%; margin-bottom: 8px; object-fit: cover; background: #eee; }
.account-dropdown .dropdown-header .name { font-weight: bold; font-size: 1.1em; margin-bottom: 2px; color: #222; }
.account-dropdown .dropdown-header .username { font-size: 0.95em; color: #888; font-style: italic; }
.account-dropdown .dropdown-item { display: flex; align-items: center; padding: 12px 20px; color: #222; font-size: 1em; border-bottom: 1px solid #f0f0f0; background: none; cursor: pointer; transition: background 0.2s; }
.account-dropdown .dropdown-item:last-child { border-bottom: none; }
.account-dropdown .dropdown-item i, .account-dropdown .dropdown-item .material-icons {
  color: #fff !important; background: #b71c1c; border-radius: 50%; width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; margin-right: 14px; font-size: 1.2em; transition: background 0.2s, color 0.2s;
}
.account-dropdown .dropdown-item:hover { background: #f5f5f5; }
.account-dropdown .dropdown-item:hover i, .account-dropdown .dropdown-item:hover .material-icons { background: #c62828; }
.account-dropdown .dropdown-footer { padding: 12px 20px 10px 20px; background: #fafafa; text-align: center; border-top: 1px solid #eee; }
.account-dropdown .dropdown-footer .social-icons a { color: #fff !important; background: #b71c1c; border-radius: 50%; width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; margin: 0 4px; font-size: 1.1em; transition: background 0.2s; }
.account-dropdown .dropdown-footer .social-icons a:hover { background: #c62828; }

.nav-link.active, .nav-link:focus {
  background: #f5f5f5;
  color: #c62828 !important;
  box-shadow: none;
}

.nav-link:hover {
  color: #c62828 !important;
  background: #f5f5f5;
}

.footer-home {
  background: #292929;
  color: #fff;
  font-size: 16px;
  position: relative;
}
.footer-home .footer-title {
  font-family: 'Georgia', serif;
  font-weight: bold;
  color: #fff;
}
.footer-home p, .footer-home li, .footer-home label, .footer-home input, .footer-home textarea {
  color: #ccc;
}
.footer-home .form-control {
  background: #222;
  border: 1px solid #444;
  color: #fff;
  border-radius: 4px;
}
.footer-home .form-control:focus {
  background: #222;
  color: #fff;
  border-color: #c62828;
  box-shadow: none;
}
.footer-home .btn-danger {
  background: #c62828;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  letter-spacing: 1px;
}
.footer-home .btn-danger:hover {
  background: #b71c1c;
}
.footer-home .footer-social a img {
  filter: grayscale(1) brightness(1.2);
  transition: filter 0.2s;
}
.footer-home .footer-social a:hover img {
  filter: none;
}
.footer-home hr {
  border-color: #444;
}
.footer-home .text-danger {
  color: #c62828 !important;
}
.footer-home .material-icons {
  vertical-align: middle;
  font-size: 20px;
}
@media (max-width: 767.98px) {
  .footer-home .row > div {
    margin-bottom: 2rem;
  }
  .footer-home .text-end, .footer-home .text-start {
    text-align: center !important;
  }
}
</style>