<template>
  <div class="dashboard-layout">
    <div class="sidebar-rail" :class="{ 'show': isSidebarMobileOpen }">
      <router-link
        to="/dashboard"
        class="rail-brand"
        :title="$t('dashboard')"
      >
        <i class="fas fa-power-off"></i>
      </router-link>

      <nav class="rail-nav" aria-label="Main">
        <router-link
          to="/dashboard"
          class="rail-item"
          :class="{ active: $route.name === 'dashboard' }"
          :title="$t('dashboard')"
        >
          <span class="rail-icon"><i class="fas fa-circle-dot"></i></span>
        </router-link>
        <router-link
          to="/dashboard/tenants"
          class="rail-item"
          :class="{ active: $route.name === 'tenants' }"
          :title="$t('restaurants')"
        >
          <span class="rail-icon"><i class="fas fa-store"></i></span>
        </router-link>
        <router-link
          to="/dashboard/users"
          class="rail-item"
          :class="{ active: $route.name === 'users' }"
          :title="$t('users')"
        >
          <span class="rail-icon"><i class="fas fa-users"></i></span>
        </router-link>
        <router-link
          to="/dashboard/plans"
          class="rail-item"
          :class="{ active: $route.name === 'plans' }"
          :title="$t('plans')"
        >
          <span class="rail-icon"><i class="fas fa-layer-group"></i></span>
        </router-link>
        <router-link
          to="/dashboard/subscriptions"
          class="rail-item"
          :class="{ active: $route.name === 'subscriptions' }"
          :title="$t('subscriptions')"
        >
          <span class="rail-icon"><i class="fas fa-calendar-check"></i></span>
        </router-link>
        <router-link
          to="/dashboard/roles"
          class="rail-item"
          :class="{ active: $route.name === 'roles' }"
          :title="$t('roles')"
        >
          <span class="rail-icon"><i class="fas fa-user-shield"></i></span>
        </router-link>
        <router-link
          to="/dashboard/mail-logs"
          class="rail-item"
          :class="{ active: $route.name === 'mail-logs' }"
          :title="$t('Mail logs')"
        >
          <span class="rail-icon"><i class="fas fa-envelope"></i></span>
        </router-link>
      </nav>

      <div class="rail-footer">
        <button
          type="button"
          class="rail-item rail-item--btn"
          :title="$t('logout')"
          @click.prevent="handleLogout"
        >
          <span class="rail-icon"><i class="fas fa-right-from-bracket"></i></span>
        </button>
      </div>
    </div>

    <div class="main-shell">
      <div class="shell-accent" aria-hidden="true" />

      <nav class="top-nav">
        <button
          type="button"
          class="sidebar-toggle d-md-none"
          @click="isSidebarMobileOpen = !isSidebarMobileOpen"
        >
          <i class="fas fa-bars"></i>
        </button>
        <div class="top-nav-title-wrap">
          <h4 v-if="route.name !== 'dashboard'" class="page-title mb-0">{{ pageTitle }}</h4>
        </div>
        <div class="top-nav-right">
          <LanguageSwitcher class="me-1" />
          <div class="dropdown">
            <button class="btn btn-icon" type="button" id="userMenu" data-bs-toggle="dropdown" :aria-label="user.email">
              <i class="fas fa-user-circle"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0">
              <li><h6 class="dropdown-header text-truncate">{{ user.email }}</h6></li>
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

      <div class="page-content">
        <router-view />
      </div>
    </div>

    <div v-if="isSidebarMobileOpen" class="sidebar-backdrop d-md-none" @click="isSidebarMobileOpen = false" />
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
        case 'mail-logs':
          return t('Mail logs')
        default:
          return t('dashboard')
      }
    })

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
      route,
      handleLogout,
      isSidebarMobileOpen,
    }
  }
}
</script>

<style scoped>
/* Pulse-style super admin shell: narrow icon rail + light canvas */
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #f3f4f6;
}

.sidebar-rail {
  width: 72px;
  flex-shrink: 0;
  background: #fff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  z-index: 1060;
}

.rail-brand {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #059669;
  background: #ecfdf5;
  text-decoration: none;
  margin-bottom: 1.25rem;
  font-size: 1.1rem;
}

.rail-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  flex: 1;
  width: 100%;
}

.rail-item {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;
}

.rail-item:hover {
  background: #f3f4f6;
  color: #059669;
}

.rail-item.active {
  background: #059669;
  color: #fff;
}

.rail-item--btn {
  border: none;
  background: transparent;
  cursor: pointer;
}

.rail-item--btn:hover {
  background: #fef2f2;
  color: #dc2626;
}

.rail-icon {
  font-size: 1.05rem;
  line-height: 1;
}

.rail-footer {
  padding-top: 0.5rem;
  border-top: 1px solid #f3f4f6;
  margin-top: 0.5rem;
}

.main-shell {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #f3f4f6;
}

.shell-accent {
  position: absolute;
  top: -80px;
  left: -80px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #059669 0%, #047857 28%, #111827 28%, #111827 42%, transparent 42%);
  opacity: 0.22;
  pointer-events: none;
  z-index: 0;
}

.top-nav {
  position: relative;
  z-index: 1;
  background: transparent;
  padding: 1rem 1.75rem 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: nowrap;
}

.top-nav-title-wrap {
  flex: 1;
  min-width: 0;
}

.page-title {
  color: #111827;
  font-weight: 600;
  font-size: 1.125rem;
}

.top-nav-right {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.btn-icon {
  border: none;
  background: #fff;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  color: #374151;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.btn-icon:hover {
  background: #f9fafb;
  color: #059669;
}

.page-content {
  position: relative;
  z-index: 1;
  padding: 0 1.75rem 2rem;
  flex: 1;
}

.sidebar-toggle {
  background: #fff;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  font-size: 1.25rem;
  color: #374151;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.sidebar-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.35);
  z-index: 1049;
}

@media (max-width: 768px) {
  .sidebar-rail {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    box-shadow: none;
  }
  .sidebar-rail.show {
    transform: translateX(0);
    box-shadow: 8px 0 24px rgba(0, 0, 0, 0.12);
  }
  .page-content {
    padding: 0 1rem 1.5rem;
  }
  .top-nav {
    padding: 0.75rem 1rem 0.5rem;
  }
  .page-title {
    font-size: 1rem;
  }
}
</style>
