<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <div class="sidebar" :class="[{ 'collapsed': isSidebarCollapsed }, { 'show': isSidebarMobileOpen }]">
      <div class="sidebar-header">
        <img src="/assets/logo/airestro360-logo-white.png" alt="Ai Restro 360" class="logo">
        <button class="collapse-btn" @click="toggleSidebar">
          <i class="fas" :class="isSidebarCollapsed ? 'fa-angle-right' : 'fa-angle-left'"></i>
        </button>
      </div>

      <div class="sidebar-user">
        <div class="user-avatar">
          <i class="fas fa-user"></i>
        </div>
        <div class="user-info" v-if="!isSidebarCollapsed">
          <h6 class="mb-0">{{ user.name }}</h6>
          <small class="text-muted">Super User</small>
        </div>
      </div>

      <nav class="sidebar-nav">
        <router-link to="/dashboard" class="nav-item" :class="{ active: $route.name === 'dashboard' }">
          <i class="fas fa-tachometer-alt"></i>
          <span v-if="!isSidebarCollapsed">{{ $t('dashboard') }}</span>
        </router-link>

        <router-link to="/dashboard/tenants" class="nav-item" :class="{ active: $route.name === 'tenants' }">
          <i class="fas fa-store"></i>
          <span v-if="!isSidebarCollapsed">{{ $t('restaurants') }}</span>
        </router-link>

        <router-link to="/dashboard/users" class="nav-item" :class="{ active: $route.name === 'users' }">
          <i class="fas fa-users"></i>
          <span v-if="!isSidebarCollapsed">{{ $t('users') }}</span>
        </router-link>

        <router-link to="/dashboard/plans" class="nav-item" :class="{ active: $route.name === 'plans' }">
          <i class="fas fa-user-shield"></i>
          <span v-if="!isSidebarCollapsed">{{ $t('plans') }}</span>
        </router-link>

        <!-- <router-link to="/dashboard/payments" class="nav-item" :class="{ active: $route.name === 'payments' }">
          <i class="fas fa-credit-card"></i>
          <span v-if="!isSidebarCollapsed">{{ $t('payments') || 'Payments' }}</span>
        </router-link> -->

        <router-link to="/dashboard/subscriptions" class="nav-item" :class="{ active: $route.name === 'subscriptions' }">
          <i class="fas fa-calendar-check"></i>
          <span v-if="!isSidebarCollapsed">{{ $t('subscriptions') || 'Subscriptions' }}</span>
        </router-link>

        <router-link to="/dashboard/roles" class="nav-item" :class="{ active: $route.name === 'roles' }">
          <i class="fas fa-user-shield"></i>
          <span v-if="!isSidebarCollapsed">{{ $t('roles') }}</span>
        </router-link>
        <router-link to="/dashboard/mail-logs" class="nav-item" :class="{ active: $route.name === 'mail-logs' }">
          <i class="fas fa-envelope"></i>
          <span v-if="!isSidebarCollapsed">{{ $t('Mail logs') }}</span>
        </router-link>

        <a href="#" class="nav-item" @click.prevent="handleLogout">
          <i class="fas fa-sign-out-alt"></i>
          <span v-if="!isSidebarCollapsed">{{ $t('logout') }}</span>
        </a>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="main-content" :class="{ 'expanded': isSidebarCollapsed }">
      <!-- Top Navigation -->
      <nav class="top-nav">
        <button class="sidebar-toggle d-md-none me-3" @click="isSidebarMobileOpen = !isSidebarMobileOpen">
          <i class="fas fa-bars"></i>
        </button>
        <div class="d-flex align-items-center">
          <h4 class="page-title mb-0">{{ pageTitle }}</h4>
        </div>
        <div class="top-nav-right">
          <LanguageSwitcher class="me-2" />
          <div class="dropdown">
            <button class="btn btn-link dropdown-toggle" type="button" id="userMenu" data-bs-toggle="dropdown">
              <i class="fas fa-user-circle"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><h6 class="dropdown-header">{{ user.email }}</h6></li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <a class="dropdown-item" href="#" @click.prevent="handleLogout">
                  <i class="fas fa-sign-out-alt me-2"></i> {{ $t('logout') }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Page Content -->
      <div class="page-content">
        <router-view></router-view>
      </div>
    </div>

    <!-- Sidebar Backdrop for Mobile -->
    <div v-if="isSidebarMobileOpen" class="sidebar-backdrop d-md-none" @click="isSidebarMobileOpen = false"></div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import Swal from 'sweetalert2'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'

export default {
  name: 'DashboardLayout',
  components: {
    LanguageSwitcher
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const isSidebarCollapsed = ref(false)
    const isSidebarMobileOpen = ref(false)
    const user = computed(() => {
      return JSON.parse(localStorage.getItem('user') || '{}')
    })

    const pageTitle = computed(() => {
      switch (router.currentRoute.value.name) {
        case 'dashboard':
          return t('dashboard')
        case 'tenants':
          return t('tenants')
        case 'users':
          return t('users')
        case 'roles':
          return t('roles')
        case 'payments':
          return t('payments') || 'Payments'
        case 'subscriptions':
          return t('subscriptions') || 'Subscriptions'
        case 'plans':
          return t('plans') || 'Plans'
        default:
          return t('dashboard')
      }
    })

    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value
    }

    const handleLogout = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await axios.post('/api/logout', {}, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        }
        // Clear storage and headers
        localStorage.clear();
        delete axios.defaults.headers.common['Authorization'];
        // Show success message with better styling
        await Swal.fire({
          icon: 'success',
          title: 'Logged Out Successfully',
          text: 'You have been logged out of your account.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
        // Redirect to login after toast
        setTimeout(() => {
          router.push('/login');
        }, 200);
      } catch (error) {
        console.error('Logout error:', error);
        // Still clear storage and redirect even if API call fails
        localStorage.clear();
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
      }
    }

    // Watch for route changes and scroll to top
    watch(
      () => route.path,
      () => {
        // Scroll to top when route changes
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      },
      { immediate: true }
    )

    return {
      user,
      pageTitle,
      isSidebarCollapsed,
      toggleSidebar,
      handleLogout,
      isSidebarMobileOpen,
    }
  }
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background: #2c3e50;
  color: #ecf0f1;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.sidebar.collapsed {
  width: 70px;
}

.sidebar-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  height: 35px;
  width: auto;
}

.collapse-btn {
  background: transparent;
  border: none;
  color: #ecf0f1;
  cursor: pointer;
  padding: 0.5rem;
}

.sidebar-user {
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-info h6 {
  color: #ecf0f1;
  font-size: 0.9rem;
}

.sidebar-nav {
  padding: 1rem 0;
  flex-grow: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #ecf0f1;
  text-decoration: none;
  transition: all 0.3s ease;
  gap: 1rem;
}

.nav-item:hover, .nav-item.active {
  background: rgba(255, 255, 255, 0.1);
  color: #3498db;
}

.nav-item i {
  width: 20px;
  text-align: center;
}

.main-content {
  flex-grow: 1;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.main-content.expanded {
  margin-left: 0;
  width: 100%;
}

.top-nav {
  background: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
  flex-wrap: nowrap;
}

.top-nav .d-flex.align-items-center {
  flex: 1 1 auto;
  min-width: 0;
}

.top-nav-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.page-title {
  color: #2c3e50;
  font-weight: 600;
}

.top-nav-right .btn-link {
  color: #2c3e50;
  text-decoration: none;
  font-size: 1.25rem;
}

.page-content {
  padding: 2rem;
}

.sidebar-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #2c3e50;
  cursor: pointer;
  display: inline-block;
}

/* Responsive Design */
.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.3);
  z-index: 1049;
}
@media (max-width: 1200px) {
  .page-content {
    padding: 1.5rem;
  }
}
@media (max-width: 992px) {
  .sidebar {
    width: 200px;
  }
  .main-content {
    padding: 1rem 0.5rem;
  }
  .page-content {
    padding: 1rem;
  }
  .top-nav {
    padding: 1rem 0.5rem;
  }
}
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1050;
    width: 200px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  .sidebar.show {
    transform: translateX(0);
    box-shadow: 2px 0 8px rgba(0,0,0,0.15);
  }
  .main-content {
    margin-left: 0 !important;
    padding: 1rem 0.5rem;
  }
  .top-nav {
    flex-wrap: nowrap;
    padding: 1rem 0.5rem;
  }
  .top-nav .d-flex.align-items-center {
    flex: 1 1 auto;
    min-width: 0;
  }
  .top-nav-right {
    flex-shrink: 0;
    gap: 0.5rem;
  }
  .page-title {
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
@media (max-width: 576px) {
  .top-nav {
    flex-direction: row;
    align-items: center;
    padding: 0.75rem 0.25rem;
  }
  .top-nav .d-flex.align-items-center {
    flex: 1 1 auto;
    min-width: 0;
  }
  .top-nav-right {
    flex-shrink: 0;
    gap: 0.25rem;
  }
  .page-title {
    font-size: 0.95rem;
  }
  .sidebar {
    width: 160px;
  }
  .sidebar-header, .sidebar-user, .sidebar-nav {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
  .main-content {
    padding: 0.5rem 0.25rem;
  }
  .page-content {
    padding: 0.5rem;
  }
  .btn, .sidebar-toggle, .collapse-btn {
    font-size: 1.1rem;
    padding: 0.4rem 0.6rem;
  }
}
</style>
