<template>
  <div class="wss">
    <div class="wss__topbar">
      <div class="wss__url">
        <div class="wss__url-ico" aria-hidden="true">
          <i class="fas fa-globe"></i>
        </div>
        <div class="wss__url-body">
          <span class="wss__url-label">Website URL</span>
          <a :href="publicSiteUrl" target="_blank" rel="noopener noreferrer" class="wss__url-link">
            {{ publicSiteUrl }}
            <i class="fas fa-external-link-alt ms-1 small" aria-hidden="true"></i>
          </a>
        </div>
      </div>
      <div class="wss__vis">
        <span class="wss__vis-label">Website visibility</span>
        <button
          type="button"
          class="wss__pill"
          :class="{ 'wss__pill--on': websiteVisible }"
          role="switch"
          :aria-checked="websiteVisible"
          @click="websiteVisible = !websiteVisible"
        >
          <span class="wss__pill-knob" aria-hidden="true"></span>
          <span class="wss__pill-cap">{{ websiteVisible ? 'Visible' : 'Hidden' }}</span>
        </button>
      </div>
    </div>

    <div class="wss__grid">
      <aside class="wss__nav" aria-label="Website settings">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="wss__link"
          active-class="wss__link--active"
        >
          <i :class="item.icon" class="wss__ico" aria-hidden="true"></i>
          <span class="flex-grow-1 wss__link-text">{{ item.label }}</span>
          <span
            class="wss__dot"
            :class="item.done ? 'wss__dot--on' : 'wss__dot--off'"
            :title="item.done ? 'Saved' : 'Not saved yet'"
            aria-hidden="true"
          />
        </router-link>
      </aside>
      <section class="wss__content">
        <router-view />
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useSettingsSectionProgress } from '../../../composables/useSettingsSectionProgress'

const getTenantSetting = inject('getTenantSetting', () => ({}))
/** Merged with layout settings; loaded here so the URL updates when `/tenant/settings` returns domain fields */
const settingsSnapshot = ref(null)

const VIS_LS = 'tenant_website_visible'
const websiteVisible = ref(true)

onMounted(async () => {
  try {
    const v = localStorage.getItem(VIS_LS)
    if (v !== null) websiteVisible.value = v === '1'
  } catch { /* ignore */ }

  try {
    const { data } = await axios.get('/tenant/settings', { withCredentials: true })
    if (data.success && data.data) {
      settingsSnapshot.value = data.data
    }
  } catch { /* ignore */ }
})

watch(websiteVisible, (on) => {
  try {
    localStorage.setItem(VIS_LS, on ? '1' : '0')
  } catch { /* ignore */ }
})

function slugify(name) {
  const s = String(name || 'restaurant')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return s || 'restaurant'
}

/**
 * Primary: `public_website_url` / `public_website_host` from API (Stancl `domains` + tenant subdomain fallback).
 * Fallback: current browser origin (local dev), then slug.airestro360.com.
 */
const publicSiteUrl = computed(() => {
  const s = { ...getTenantSetting(), ...(settingsSnapshot.value || {}) }
  if (s.public_website_url) {
    return String(s.public_website_url).replace(/\/$/, '')
  }
  if (s.public_website_host) {
    const h = String(s.public_website_host)
      .replace(/^https?:\/\//i, '')
      .replace(/\/$/, '')
    const local = /localhost|127\.0\.0\.1/i.test(h)
    return `${local ? 'http' : 'https'}://${h}`
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return String(window.location.origin).replace(/\/$/, '')
  }
  const slug = slugify(s.business_name)
  return `https://${slug}.airestro360.com`
})

const { isDone } = useSettingsSectionProgress()

const rawNav = [
  { to: '/dashboard/website-settings/template', label: 'Layout', icon: 'fas fa-layer-group', slug: 'template' },
  { to: '/dashboard/website-settings/branding', label: 'Brand & story', icon: 'fas fa-palette', slug: 'branding' },
  { to: '/dashboard/website-settings/seo', label: 'Findability', icon: 'fas fa-search', slug: 'seo' },
  { to: '/dashboard/website-settings/domain', label: 'Custom domain', icon: 'fas fa-link', slug: 'domain' },
  { to: '/dashboard/website-settings/contact', label: 'Guest contact', icon: 'fas fa-address-book', slug: 'contact' },
  { to: '/dashboard/website-settings/hero', label: 'Home hero', icon: 'fas fa-image', slug: 'hero' },
  { to: '/dashboard/website-settings/theme', label: 'Colors', icon: 'fas fa-star', slug: 'theme' },
  { to: '/dashboard/website-settings/social', label: 'Social', icon: 'fas fa-share-alt', slug: 'social' },
  { to: '/dashboard/website-settings/hours', label: 'Hours', icon: 'fas fa-clock', slug: 'hours' },
  { to: '/dashboard/website-settings/sections', label: 'Sections', icon: 'fas fa-th-large', slug: 'sections' },
  { to: '/dashboard/website-settings/preferences', label: 'Preferences', icon: 'fas fa-sliders-h', slug: 'preferences' }
]

const navItems = computed(() =>
  rawNav.map((row) => ({
    ...row,
    done: isDone('website', row.slug)
  }))
)
</script>

<style scoped>
.wss {
  --a: #00844d;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #fff;
}

.wss__topbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  margin: -0.25rem 0 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
}

.wss__url {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  min-width: 0;
}

.wss__url-ico {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: color-mix(in srgb, #ea580c 12%, #fff);
  color: #c2410c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.wss__url-body {
  min-width: 0;
}

.wss__url-label {
  display: block;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #475569;
  margin-bottom: 0.12rem;
}

.wss__url-link {
  display: inline-flex;
  align-items: center;
  font-size: 0.86rem;
  font-weight: 600;
  color: #c2410c;
  text-decoration: none;
  word-break: break-all;
}

.wss__url-link:hover {
  color: #9a3412;
  text-decoration: underline;
}

.wss__vis {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.wss__vis-label {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #475569;
}

.wss__pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 999px;
  min-width: 5.75rem;
  height: 1.65rem;
  padding: 0 1.75rem;
  background: #cbd5e1;
  color: #1e293b;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.wss__pill--on {
  background: var(--a);
  color: #fff;
}

.wss__pill-knob {
  position: absolute;
  left: 3px;
  top: 50%;
  transform: translateY(-50%);
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.2);
  transition: left 0.15s ease;
}

.wss__pill--on .wss__pill-knob {
  left: calc(100% - 1.23rem);
}

.wss__pill-cap {
  position: relative;
  z-index: 1;
}

.wss__grid {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.wss__nav {
  width: min(200px, 36vw);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
  padding: 0.4rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}

.wss__link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.55rem;
  border-radius: 10px;
  text-decoration: none;
  color: #334155;
  font-size: 0.78rem;
  font-weight: 500;
  border: 1px solid transparent;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.wss__link-text {
  line-height: 1.25;
}

.wss__link:hover {
  background: #f1f5f9;
}

.wss__link--active {
  border-color: color-mix(in srgb, var(--a) 40%, #e2e8f0);
  background: color-mix(in srgb, var(--a) 10%, #fff);
  color: var(--a);
  font-weight: 700;
}

.wss__ico {
  width: 1.1rem;
  font-size: 0.85rem;
  text-align: center;
  color: var(--a);
  flex-shrink: 0;
}

.wss__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-left: 2px;
  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.06);
}
.wss__dot--on {
  background: #22c55e;
}
.wss__dot--off {
  background: #e2e8f0;
  border: 1px solid #cbd5e1;
}

.wss__content {
  flex: 1;
  min-width: 0;
}

@media (max-width: 767.98px) {
  .wss__grid {
    flex-direction: column;
  }
  .wss__nav {
    width: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    gap: 0.35rem;
    scrollbar-width: thin;
  }
  .wss__link {
    flex: 0 0 auto;
    white-space: nowrap;
  }
}
</style>
