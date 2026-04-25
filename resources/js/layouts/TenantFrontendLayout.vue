<template>
    <div class="frontend-layout">
        <div v-if="settings.discount && Number(settings.discount) > 0 && showDiscountBanner" class="discount-banner">
            <span>
                🔥 {{ $t('Special-Offer') }} : <b>{{ settings.discount }}% OFF</b> {{
                    $t('on-all-orders!-Limited-time-only') }}
            </span>
            <button class="btn-close" @click="dismissDiscountBanner"></button>
        </div>
        <!-- Top Bar (not fixed, scrolls away on mobile) -->
        <div class="top-bar bg-white ">
            <div class="container">
                <div class="row align-items-center">

                    <!-- Icons -->
                    <div class="col-auto col-md-8">
                        <ul class="list-inline mb-0">
                            <li class="list-inline-item me-3">
                                <a :href="`mailto:${settings.public_email}`" class="text-dark text-decoration-none">
                                    <i class="fas fa-envelope"></i>
                                    <span class="d-none d-md-inline ms-1">
                                        {{ settings.public_email }}
                                    </span>
                                </a>
                            </li>

                            <li class="list-inline-item">
                                <a :href="`tel:${settings.public_phone}`" class="text-dark text-decoration-none">
                                    <i class="fas fa-phone"></i>
                                    <span class="d-none d-md-inline ms-1">
                                        {{ settings.public_phone }}
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- Language switcher -->
                    <div class="col-auto col-md-4 ms-auto text-end">
                        <language-switcher />
                    </div>

                </div>

            </div>
        </div>

        <!-- Header (fixed on mobile only) -->
        <div :class="['header-wrap mt-4-5', { 'mobile-header-fixed': mobileMenuOpen }]">
            <header class="header">
                <nav class="navbar navbar-expand-lg navbar-light flex-nowrap bg-white fixed-top mt-0 mt-md-4"

                    :class="{ 'fixed-top': isMobile }">
                    <div class="container d-flex align-items-center justify-content-between mt-0 mt-md-3">
                        <!-- Hamburger for mobile only -->
                        <button
                            class="text-danger btn btn-link d-lg-none d-flex align-items-center justify-content-center p-0 me-2 "
                            @click="mobileMenuOpen = true" aria-label="Open menu" style="font-size: 2rem">
                            <i class="fas fa-bars text-danger"></i>
                        </button>
                        <!-- Left: Logo -->
                        <div class="navbar-left d-flex justify-content-center">
                            <router-link class="navbar-brand" to="/">
                                <img :src="settings?.logo || defaultLogo" alt="AiRestro360" class="logo" />



                                <!-- <img src="@/assets/logo/airestro360-logo-white.png" alt="AiRestro360" class="logo" /> -->
                            </router-link>
                        </div>
                        <!-- Center: Navigation (unchanged for desktop) -->
                        <div class="navbar-center flex-grow-1 d-flex justify-content-center">
                            <ul class="navbar-nav flex-row">
                                <li class="nav-item">
                                    <router-link class="nav-link" :to="{ name: 'stock-check' }">{{ $t('stockCheck')
                                        }}</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link class="nav-link" :to="{ name: 'reservation' }">{{ $t('nav_reservation')
                                        }}</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link class="nav-link" :to="{ name: 'contact' }">{{ $t('contact')
                                        }}</router-link>
                                </li>
                                <!-- CMS Pages -->
                                <li v-for="page in topLevelCmsPages" :key="page.id" class="nav-item">
                                    <router-link class="nav-link"
                                        :to="{ name: 'cms-page', params: { slug: page.keyword } }">
                                        {{ page.page_title }}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                        <!-- Right: Cart Icon -->
                        <div class="navbar-right d-flex align-items-center">
                            <!-- Reservation Button with Tooltip -->
                            <!-- <button class="btn btn-link text-dark me-3 position-relative" type="button" data-bs-toggle="tooltip"
                data-bs-placement="bottom" title="Reservation">
                <i class="material-icons" style="color:#222;">event</i>
              </button>
              <button class="btn btn-link text-dark me-3 position-relative" type="button" data-bs-toggle="tooltip"
                data-bs-placement="bottom" title="Favourites">
                <i class="material-icons" style="color:#222;">favorite_border</i>
              </button> -->
                            <!-- Cart Button with Tooltip -->
                            <button class="btn btn-link text-dark position-relative" type="button"
                                data-bs-toggle="tooltip" data-bs-placement="bottom" title="Login"
                                @click="redirectToLogin">
                                <i class="fa fa-user" style="color:#222; text-decoration: none;">
                                    <!-- {{ $t('person') }} -->
                                </i>
                            </button>

                            <button class="btn btn-link text-dark position-relative ms-2" type="button"
                                data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cart"
                                @click="openCartDrawer">
                                <i class="fa fa-shopping-cart" style="color:#222; font-size: larger; margin-top: 5px;">
                                    <!-- {{ $t('shopping-car') }} -->
                                </i>

                                <span :v-if="cart.cartCount > 0" class="cart-badge">{{ cart.cartCount }}</span>
                            </button>
                        </div>
                    </div>
                </nav>
                <!-- Mobile Drawer -->
                <transition name="fade">
                    <div v-if="mobileMenuOpen" class="mobile-menu-overlay" @click.self="closeMobileMenu">
                        <div class="mobile-menu-drawer">
                            <div class="d-flex justify-content-between align-items-center px-3 py-3 border-bottom mt-5">
                                <!-- <img src="/assets/logo/airestro360-logo.png" alt="AiRestro360" style="height:32px;"> -->
                                <img :src="settings?.logo || defaultLogo" alt="AiRestro360" class="logo" />


                                <button class="btn btn-link text-danger fs-2" @click="closeMobileMenu"
                                    aria-label="Close menu"><i class="fas fa-times"></i></button>
                            </div>
                            <ul class="mobile-nav-list list-unstyled px-3 pt-3">
                                <!-- <li><router-link class="mobile-nav-link" :to="{ name: 'stock-check' }" @click.native="closeMobileMenu">Stock Check</router-link></li> -->
                                <li><router-link class="mobile-nav-link" :to="{ name: 'reservation' }"
                                        @click.native="closeMobileMenu">{{ $t('reservation') }}</router-link></li>
                                <li><router-link class="mobile-nav-link" :to="{ name: 'about' }"
                                        @click.native="closeMobileMenu">{{ $t('about') }}</router-link></li>
                                <li><router-link class="mobile-nav-link" :to="{ name: 'contact' }"
                                        @click.native="closeMobileMenu">{{ $t('contact') }}</router-link></li>
                                <li><router-link class="mobile-nav-link" :to="{ name: 'privacy' }"
                                        @click.native="closeMobileMenu">{{ $t('privacy') }}</router-link></li>
                                <!-- CMS Pages -->
                                <li v-for="page in topLevelCmsPages" :key="page.id">
                                    <router-link class="mobile-nav-link"
                                        :to="{ name: 'cms-page', params: { slug: page.keyword } }"
                                        @click.native="closeMobileMenu">
                                        {{ page.page_title }}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </transition>
            </header>
        </div>
        <!-- Main Content -->
        <main class="main-content container">
            <router-view :key="$route.fullPath"></router-view>
        </main>
        <!-- Looking for fresh produce Section -->
        <section class="get-in-touch-section py-0"
            style="background: #cf2e2e; color: #fff; position: relative; overflow: visible;">
            <div class="container-fluid px-0 w-">
                <div class="row align-items-center justify-content-center " style="min-height: 82px;">
                    <div class="col-lg-3 col-md-1 col-12 d-none d-md-block justify-content-center align-items-end position-relative"
                        style="z-index:2;">
                        <img src="/Mox_files/operator.png" alt="Chef" class="img-fluid"
                            style="max-height: 180px; position: absolute; left: 0; bottom: -40px; margin-left: 2vw;">
                    </div>
                    <div class="col-lg-5 col-md-5 col-12 text-center text-lg-start py-4 py-lg-0" style="z-index:1;">
                        <div
                            style="font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: bold; color: #fff; letter-spacing: 1px;">
                            {{ $t('lookingforfreshproduce') }}?
                        </div>
                        <div style="font-size: 1.08rem; color: #fff; margin-top: 0.2rem;"></div>
                    </div>
                    <div class="col-lg-4 col-md-5 col-12 d-flex align-items-left justify-content-lg-start justify-content-center gap-3 flex-wrap py-4 py-lg-0"
                        style="z-index:1;">
                        <div class="d-flex align-items-center justify-content-center me-3" style="min-width: 220px;">
                            <span class="material-icons me-2 mt-2"
                                style="font-size: 2.5rem; vertical-align: middle; color: #fff;">call</span>
                            <div>
                                <div style="font-size: 1rem; color: #fff;">{{ $t('callusnow') }} </div>
                                <div class="fw-bold" style="font-size: 1.45rem; color: #fff; white-space: nowrap;">{{
                                    settings.phone }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Footer -->
        <footer class="tenant-footer bg-dark text-light pt-5 pb-3"
            style="background: url('/Mox_files/footer.jpg') center center/cover no-repeat; position: relative;">
            <div class="container position-relative" style="z-index:2;">
                <!-- Newsletter -->
                <div class="row mb-5 align-items-center">
                    <div class="col-md-6 mb-3 mb-md-0">
                        <h2 class="footer-title mb-1"
                            style="font-family: 'Playfair Display', serif; font-weight: bold;">{{
                                $t('SubscribeourNewsletter') }}</h2>
                        <div class="text-white" style="font-size: 1rem;">{{
                            $t('Stayuptodatewithourlatestnewsandproperties') }} </div>
                    </div>
                    <div class="col-md-6">
                        <form class="d-flex flex-row w-100" @submit.prevent="handleNewsletterSubmit">
                            <!-- <input
  type="email"
  v-model="newsletterEmail"
  class="form-control me-2 newsletter-input"
  :placeholder="$t('yourEmailAddress')"
  :title="$t('enterYourEmailToSubscribe')"
  required
  style="max-width: 320px;"
  data-bs-toggle="tooltip"
/> -->

                            <input type="email" v-model="newsletterEmail" class="form-control me-2 newsletter-input"
                                :placeholder="$t('Youremailaddress')" required style="max-width: 320px;"
                                data-bs-toggle="tooltip" :title="$t('enterYourEmailToSubscribe')">
                            <button class="btn btn-danger px-4 newsletter-btn" type="submit"
                                :disabled="newsletterLoading">
                                <span v-if="newsletterLoading" class="spinner-border spinner-border-sm me-2"
                                    role="status"></span>
                                {{ $t('subscribe') }}
                            </button>
                        </form>
                    </div>
                </div>
                <div class="row mb-4 g-4">
                    <!-- Logo & Contact -->
                    <div class="col-md-4 mb-4 mb-md-0">
                        <div class="footer-card h-100 d-flex flex-column align-items-md-start align-items-center p-4">

                            <!-- <img src="/assets/logo/airestro360-logo-white.png" alt="AiRestro360" style=" margin-bottom: 1.5rem;"> -->
                            <img :src="settings?.logo || '/assets/logo/airestro360.png'" alt="AiRestro360"
                                class="logo" />

                            <p class="mb-3 text-center text-md-start" style="max-width: 320px;">
                                {{ settings.description }}
                            </p>
                            <ul class="list-unstyled mb-3">
                                <li class="mb-2"><i class="fas fa-phone me-2 text-danger"></i> {{ settings.public_phone
                                    || $t('topbar.phone') }}</li>
                                <li class="mb-2"><i class="fas fa-envelope me-2 text-danger"></i> {{
                                    settings.public_email || $t('topbar.email') }}</li>
                                <li class="mb-2"><i class="fas fa-map-marker-alt me-2 text-danger"></i> {{
                                    settings.address }}</li>
                                <!-- <li class="mb-2"><i class="fas fa-clock me-2 text-danger"></i> Mon - Sun / 9:00AM - 8:00PM</li> -->
                            </ul>
                            <div class="footer-social d-flex gap-2">
                                <a v-if="settings.facebook_link" :href="settings.facebook_link" aria-label="Facebook"><i
                                        class="fab fa-facebook-f"></i></a>
                                <a v-if="settings.twitter_link" :href="settings.twitter_link" aria-label="Twitter"><i
                                        class="fab fa-twitter"></i></a>
                                <a v-if="settings.linkedin_link" :href="settings.linkedin_link" aria-label="LinkedIn"><i
                                        class="fab fa-linkedin-in"></i></a>
                                <a v-if="settings.google_plus_link" :href="settings.google_plus_link"
                                    aria-label="Google Plus"><i class="fab fa-google-plus-g"></i></a>
                                <a v-if="settings.instagram_link" :href="settings.instagram_link"
                                    aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                    <!-- Feedback Form -->
                    <div v-if="topLevelCmsPages.length > 0" class="col-md-4 mb-4 mb-md-0">
                        <div class="footer-card h-100 p-4">

                            <h5 class="mb-3">{{ $t('footer.quickLinks.title') }}</h5>
                            <ul class="list-unstyled">

                                <!-- CMS Pages -->
                                <li v-for="page in topLevelCmsPages.slice(0, 5)" :key="page.id" class="mb-2">
                                    <router-link class="text-light text-decoration-none"
                                        :to="{ name: 'cms-page', params: { slug: page.keyword } }">
                                        {{ page.page_title }}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- Location/Map -->
                    <div class="col-md-4">
                        <div class="footer-card h-100 p-4">
                            <h3 class="footer-title mb-2"
                                style="font-family: 'Playfair Display', serif; font-weight: bold;">{{ $t('Ourlocation')
                                }} </h3>
                            <div class="rounded overflow-hidden" style="height: 220px; background: #222;">
                                <iframe width="100%" height="220" frameborder="0" style="border:0; min-height: 220px;"
                                    :src="`https://www.google.com/maps?q=${encodeURIComponent(settings.address)}&output=embed`"
                                    allowfullscreen aria-hidden="false" tabindex="0">
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="my-4 bg-light">
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div class="mb-2 mb-md-0">{{ $t('Copyright') }} © {{ new Date().getFullYear() }} {{
                        $t('AllRightsReserved') }} </div>
                    <div class="text-end small">{{ $t('DesignedDevelopedby') }} <span class="text-warning">ApimsTec</span>
                    </div>
                </div>
            </div>
            <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.85); z-index:1;"></div>
        </footer>
        <!-- Cart Drawer -->
        <transition name="fade">
            <div v-if="showCartDrawer" class="cart-drawer-overlay" @click.self="closeCartDrawer">
                <div class="cart-drawer">
                    <div class="cart-drawer-header d-flex justify-content-between align-items-center p-3 border-bottom">
                        <h5 class="mb-0">{{ $t('YourCart') }} </h5>
                        <button class="btn btn-link text-danger fs-4" @click="closeCartDrawer"><i
                                class="fas fa-times"></i></button>
                    </div>
                    <div class="cart-drawer-body p-3" v-if="cart.cart.items.length">
                        <div v-for="item in cart.cart.items" :key="item.id"
                            class="cart-item d-flex align-items-center mb-3">
                            <!-- <img v-if="item.image" :src="item.image" alt="" style="width:48px;height:48px;object-fit:cover;border-radius:6px;"> -->
                            <div class="flex-grow-1 ms-2">
                                <div class="fw-bold">{{ item.name }}</div>
                                <div class="text-muted">{{ settings.currency_symbol || '$' }}{{ item.price }} x {{
                                    item.quantity }}</div>
                            </div>
                            <div class="d-flex align-items-center gap-1">
                                <button class="btn btn-sm btn-outline-secondary"
                                    @click="item.quantity > 1 ? item.quantity-- : cart.removeFromCart(item.id)">-</button>
                                <span class="mx-1">{{ item.quantity }}</span>
                                <button class="btn btn-sm btn-outline-secondary" @click="item.quantity++">+</button>
                                <button class="btn btn-sm btn-outline-danger ms-2"
                                    @click="cart.removeFromCart(item.id)"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-4">
                            <div class="fw-bold">{{ $t('cart.Total') }}:</div>
                            <div class="fw-bold text-danger fs-5">{{ settings.currency_symbol || '$' }}{{
                                cart.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2) }}
                            </div>
                        </div>
                        <router-link to="/checkout" class="btn btn-danger w-100 mt-3">{{ $t('cart.Checkout') }}
                        </router-link>
                    </div>
                    <div class="cart-drawer-body p-3 text-center text-muted" v-else>
                        {{ $t('cart.empty') }}
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, provide, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LanguageSwitcher from '../components/frontend/LanguageSwitcher.vue'
const defaultLogo = '/assets/logo/airestro360.png'
import Swal from 'sweetalert2'
import { Tooltip } from 'bootstrap'
import { useCart } from '../composables/useCart'

// Get the current route and router
const route = useRoute()
const router = useRouter()

// Watch for route changes and scroll to top
watch(
    () => route.fullPath,
    () => {
        // Scroll to top when route changes (including CMS pages)
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    },
    { immediate: true }
)

const settings = ref({ email: '', phone: '', discount: 0 })
const newsletterEmail = ref('')
const newsletterLoading = ref(false)
const mobileMenuOpen = ref(false)
const cmsPages = ref([])

// Computed property for top-level CMS pages
const topLevelCmsPages = computed(() => {
    return cmsPages.value.filter(p => !p.menu_id && p.status === 'active')
})

const closeMobileMenu = () => { mobileMenuOpen.value = false }

const cart = useCart()
provide('cart', cart)
provide('settings', settings)

const showCartDrawer = ref(false)
const openCartDrawer = () => { showCartDrawer.value = true }
const closeCartDrawer = () => { showCartDrawer.value = false }

const redirectToLogin = () => {
    router.push({ name: 'tenant-login' })
}

const showDiscountBanner = ref(true)

const isMobile = ref(false)
const mobileMedia = typeof window !== 'undefined' ? window.matchMedia('(max-width: 991.98px)') : null
const syncIsMobile = () => {
    if (mobileMedia) {
        isMobile.value = mobileMedia.matches
    }
}

function dismissDiscountBanner() {
    showDiscountBanner.value = false
}

const fetchSettings = async () => {
    try {
        const response = await window.axios.get('/tenant/settings')
        if (response.data.success && response.data.data) {
            settings.value = response.data.data
            console.log('Global Settings:', settings.value)
        }
    } catch (error) {
        console.error('Error fetching settings:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch settings'
        })
    }
}


const fetchCmsPages = async () => {
    try {
        const response = await window.axios.get('/tenant/public/cms_menu', {
            params: {
                status: 'active',
                per_page: 1000
            }
        })
        if (response.data.success && response.data.data) {
            cmsPages.value = response.data.data.data || []
            console.log('CMS pages loaded:', cmsPages.value.length, 'pages')
        }
    } catch (error) {
        console.error('Error fetching CMS pages:', error)
    }
}

const handleNewsletterSubmit = async () => {
    if (!newsletterEmail.value) return
    newsletterLoading.value = true
    try {
        const response = await window.axios.post('/tenant/subscribe', { email: newsletterEmail.value })
        if (response.data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Subscribed!',
                text: response.data.message,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            })
            newsletterEmail.value = ''
        } else {
            throw new Error(response.data.message || 'Subscription failed.')
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message || 'Subscription failed or already subscribed.'
        })
    } finally {
        newsletterLoading.value = false
    }
}

onMounted(() => {
    syncIsMobile()
    if (mobileMedia) {
        mobileMedia.addEventListener('change', syncIsMobile)
    }

    fetchSettings()
    fetchCmsPages()

    // Add router guard for consistent scroll behavior
    router.afterEach((to, from) => {
        if (to.path !== from.path) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    })

    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
        new Tooltip(el)
    })
})

onUnmounted(() => {
    if (mobileMedia) {
        mobileMedia.removeEventListener('change', syncIsMobile)
    }
})
</script>

<style>
/* Global Android Compatibility Fixes */
@media screen and (-webkit-min-device-pixel-ratio: 0) {

    /* Android Chrome/WebView specific fixes */
    html {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        text-size-adjust: 100%;
    }

    body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;
        position: relative;
    }

    * {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0.05);
    }

    .container,
    .container-fluid {
        max-width: auto;
        padding-left: 15px;
        padding-right: 15px;
    }

    img {
        max-width: 100%;
        height: auto;
        -webkit-user-select: none;
        user-select: none;
        -webkit-user-drag: none;
    }

    input[type="text"],
    input[type="email"],
    input[type="tel"],
    input[type="number"],
    input[type="password"],
    input[type="date"],
    input[type="time"],
    textarea,
    select {
        -webkit-appearance: none;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        font-size: 16px !important;
        /* Prevents zoom on Android when focusing */
        -webkit-tap-highlight-color: transparent;
    }

    input:focus,
    textarea:focus,
    select:focus {
        -webkit-appearance: none;
        outline: none;
    }

    button,
    .btn,
    a.btn {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
        touch-action: manipulation;
        -webkit-user-select: none;
        user-select: none;
    }

    /* Fix for Android viewport height issues */
    .min-vh-100 {
        min-height: 100vh;
        min-height: -webkit-fill-available;
    }

    /* Fix for Android scrolling */
    .overflow-auto,
    .overflow-y-auto {
        -webkit-overflow-scrolling: touch;
    }

    /* Fix for Android transform rendering */
    .card,
    .modal-content,
    .dropdown-menu {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
    }

    /* Fix for Android text rendering */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    span,
    div,
    a,
    li {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    /* Fix for Android form elements */
    .form-control,
    .form-select {
        -webkit-appearance: none;
        appearance: none;
    }

    /* Fix for Android fixed positioning */
    .fixed-top,
    .fixed-bottom {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
    }
}

/* Additional Android screen size fixes */
@media screen and (max-width: 480px) and (-webkit-min-device-pixel-ratio: 0) {
    .container {
        padding-left: 10px;
        padding-right: 10px;
    }

    .row {
        margin-left: -10px;
        margin-right: -10px;
    }

    [class*="col-"] {
        padding-left: 10px;
        padding-right: 10px;
    }
}

/* Fix for Android keyboard issues */
@media screen and (-webkit-min-device-pixel-ratio: 0) {

    input:focus,
    textarea:focus {
        position: relative;
        z-index: 1;
    }
}
</style>

<style scoped>
.frontend-layout {
    min-height: 100vh;
     min-height: -webkit-fill-available;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
}

.top-bar {
    font-size: 0.9rem;
    /* background-color: #1a1a1a !important; */
    padding: 0.5rem 0;
}

.top-bar a {
    /* color: rgba(255, 255, 255, 0.8) !important; */
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
    min-height: 70px !important;
    height: 56px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    background: #fff;
    box-shadow: none;
    border-bottom: 1px solid #eee;
}

.navbar .container.nav-flex-custom {
    height: 56px;
    min-height: 56px;
    align-items: center;
}

.logo {
    height: 38px !important;
    width: auto;
    margin-bottom: 0 !important;
    margin-top: 0 !important;
}

.navbar-center .navbar-nav {
    align-items: center;
    height: 56px;
}

.navbar-nav.flex-row .nav-link {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    line-height: 56px;
    font-size: 1rem;
}

.navbar-right .btn-link {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    height: 56px;
    display: flex;
    align-items: center;
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

/* Android-specific fixes */
@supports (-webkit-touch-callout: none) {
    /* iOS specific styles */
}

/* Android Chrome/WebView fixes */
@media screen and (-webkit-min-device-pixel-ratio: 0) {
    .frontend-layout {
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
    }

    .container {
        max-width: auto;
        padding-left: 15px;
        padding-right: 15px;
    }

    img {
        max-width: 100%;
        height: auto;
        -webkit-user-select: none;
        user-select: none;
    }

    input,
    textarea,
    select {
        -webkit-appearance: none;
        -webkit-border-radius: 0;
        border-radius: 0;
    }

    button,
    .btn {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
        touch-action: manipulation;
    }
}

/* Android-specific fixes */
@supports (-webkit-touch-callout: none) {
  /* iOS specific styles */
}

/* Android Chrome/WebView fixes */
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .frontend-layout {
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
  }

  .container {
    max-width: 100%;
    padding-left: 15px;
    padding-right: 15px;
  }

  img {
    max-width: 100%;
    height: auto;
    -webkit-user-select: none;
    user-select: none;
  }

  input, textarea, select {
    -webkit-appearance: none;
    -webkit-border-radius: 0;
    border-radius: 0;
  }

  button, .btn {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
    touch-action: manipulation;
  }
}

@media (max-width: 991.98px) {
    .navbar {
        position: fixed !important;
        top: 3rem;
        left: 0;
        right: 0;
        z-index: 1050;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
    }

    .navbar-center {
        display: none !important;
    }

    .btn.btn-link.d-lg-none {
        display: flex !important;
        -webkit-tap-highlight-color: transparent;
    }

    .mobile-menu-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.65);
        z-index: 2000;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        -webkit-overflow-scrolling: touch;
    }

    .mobile-menu-drawer {
        width: 85vw;
        max-width: 340px;
        height: 100vh;
        height: -webkit-fill-available;
        background: #fff;
        box-shadow: 2px 0 24px rgba(0, 0, 0, 0.18);
        border-top-right-radius: 18px;
        border-bottom-right-radius: 18px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        position: relative;
        animation: slideInLeft 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
    }

    @keyframes slideInLeft {
        from {
            transform: translateX(-100%);
            -webkit-transform: translateX(-100%);
        }

        to {
            transform: translateX(0);
            -webkit-transform: translateX(0);
        }
    }

    .mobile-nav-list {
        margin: 0;
        padding: 0;
    }

    .mobile-nav-link {
        display: block;
        padding: 0.85rem 0;
        color: #c62828;
        font-weight: 500;
        font-size: 1.08rem;
        border-bottom: 1px solid #f5f5f5;
        text-decoration: none;
        transition: background 0.2s, color 0.2s;
        -webkit-tap-highlight-color: rgba(198, 40, 40, 0.1);
        touch-action: manipulation;
    }

    .mobile-nav-link:hover,
    .mobile-nav-link:active {
        background: #f5f5f5;
        color: #b71c1c;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
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
    padding-top: 96px !important;
    /* 40px topbar + ~56px navbar */
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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
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

    .hero-section,
    .hero-content {
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
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1051;
    background: #b71c1c;
    color: #fff;
    font-size: 1rem;
    font-family: 'Lora', serif;
    border-bottom: 1px solid #a31515;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0;
}

.top-bar .container-fluid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding-left: 24px;
    padding-right: 24px;
}

.top-bar .contact-info span {
    margin-right: 24px;
    display: inline-flex;
    align-items: center;
    font-size: 0.98em;
}

.top-bar .contact-info i,
.top-bar .contact-info .material-icons {
    font-size: 1.1em;
    margin-right: 6px;
    vertical-align: middle;
    color: #fff !important;
}

.top-bar .topbar-right {
    display: flex;
    align-items: center;
    gap: 16px;
}

.top-bar .social-icons a {
    color: #fff !important;
    margin-right: 8px;
    font-size: 1.1em;
    transition: color 0.2s;
}

.top-bar .social-icons a:last-child {
    margin-right: 0;
}

.top-bar .social-icons a:hover {
    color: #ffd700 !important;
}

.top-bar .lang-flag {
    width: 22px;
    height: 16px;
    margin-right: 6px;
    vertical-align: middle;
    object-fit: cover;
    border-radius: 2px;
    background: #fff;
}

.top-bar .account {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    font-size: 1em;
    margin-left: 10px;
    color: #fff !important;
    position: relative;
    user-select: none;
}

.top-bar .account .material-icons,
.top-bar .account .arrow {
    color: #fff !important;
}

.account-dropdown {
    display: none;
    position: absolute;
    right: 0;
    top: 120%;
    min-width: 260px;
    background: #fff;
    color: #222;
    border-radius: 10px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
    padding: 0;
    z-index: 2000;
    font-size: 1rem;
    overflow: hidden;
}

.account-dropdown.show {
    display: block;
}

.account-dropdown .dropdown-header {
    background: #fafafa;
    padding: 18px 20px 12px 20px;
    text-align: center;
    border-bottom: 1px solid #eee;
}

.account-dropdown .dropdown-header img {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    margin-bottom: 8px;
    object-fit: cover;
    background: #eee;
}

.account-dropdown .dropdown-header .name {
    font-weight: bold;
    font-size: 1.1em;
    margin-bottom: 2px;
    color: #222;
}

.account-dropdown .dropdown-header .username {
    font-size: 0.95em;
    color: #888;
    font-style: italic;
}

.account-dropdown .dropdown-item {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    color: #222;
    font-size: 1em;
    border-bottom: 1px solid #f0f0f0;
    background: none;
    cursor: pointer;
    transition: background 0.2s;
}

.account-dropdown .dropdown-item:last-child {
    border-bottom: none;
}

.account-dropdown .dropdown-item i,
.account-dropdown .dropdown-item .material-icons {
    color: #fff !important;
    background: #b71c1c;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 14px;
    font-size: 1.2em;
    transition: background 0.2s, color 0.2s;
}

.account-dropdown .dropdown-item:hover {
    background: #f5f5f5;
}

.account-dropdown .dropdown-item:hover i,
.account-dropdown .dropdown-item:hover .material-icons {
    background: #c62828;
}

.account-dropdown .dropdown-footer {
    padding: 12px 20px 10px 20px;
    background: #fafafa;
    text-align: center;
    border-top: 1px solid #eee;
}

.account-dropdown .dropdown-footer .social-icons a {
    color: #fff !important;
    background: #b71c1c;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 4px;
    font-size: 1.1em;
    transition: background 0.2s;
}

.account-dropdown .dropdown-footer .social-icons a:hover {
    background: #c62828;
}

.nav-link.active,
.nav-link:focus {
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

.footer-home p,
.footer-home li,
.footer-home label,
.footer-home input,
.footer-home textarea {
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
    .footer-home .row>div {
        margin-bottom: 2rem;
    }

    .footer-home .text-end,
    .footer-home .text-start {
        text-align: center !important;
        justify-content: center;
    }
}
</style>

<style scoped>
.footer-card {
    background: rgba(30, 30, 30, 0.85);
    border-radius: 18px;
    box-shadow: 0 6px 32px rgba(0, 0, 0, 0.25);
    color: #fff;
    margin-bottom: 0;
}

.newsletter-input,
.feedback-input {
    background: #fff !important;
    color: #222 !important;
    border-radius: 8px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.10);
    border: none;
}

.newsletter-btn,
.feedback-btn {
    border-radius: 8px;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.10);
}

.footer-social a {
    color: #fff;
    font-size: 1.3rem;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, color 0.2s;
}

.footer-social a:hover {
    background: #c62828;
    color: #fff;
}

@media (max-width: 991.98px) {
    .footer-card {
        margin-bottom: 2rem;
    }
}
</style>

<style scoped>
.cart-badge {
    position: absolute;
    top: 2px;
    right: 2px;
    background: #c62828;
    color: #fff;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: bold;
    z-index: 10;
}
</style>

<style scoped>
.cart-drawer-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 3000;
    display: flex;
    justify-content: flex-end;
}

.cart-drawer {
    width: 350px;
    max-width: 100vw;
    background: #fff;
    height: 100vh;
    box-shadow: -2px 0 24px rgba(0, 0, 0, 0.18);
    display: flex;
    flex-direction: column;
    animation: slideInRight 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0);
    }
}

.cart-drawer-header {
    border-bottom: 1px solid #eee;
}

.cart-item img {
    border: 1px solid #eee;
}
</style>

<style scoped>
.discount-banner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    background: linear-gradient(90deg, #c62828 60%, #e57373 100%);
    color: #fff;
    font-size: 1.15rem;
    font-weight: 500;
    text-align: center;
    padding: 0.7rem 2.5rem 0.7rem 1.5rem;
    z-index: 3000;
    box-shadow: 0 2px 12px rgba(198, 40, 40, 0.13);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: slideDown 0.5s;
}

.discount-banner .btn-close {
    margin-left: 1.5rem;
    background: none;
    border: none;
    color: #fff;
    font-size: 1.3rem;
    cursor: pointer;
    opacity: 0.8;
}

.discount-banner .btn-close:hover {
    opacity: 1;
}

@keyframes slideDown {
    from {
        transform: translateY(-100%);
    }

    to {
        transform: translateY(0);
    }
}
</style>
