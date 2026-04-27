<template>
  <div class="wsc">
    <header class="wsc__head">
      <div class="wsc__icon"><i :class="head.icon"></i></div>
      <div>
        <h1 class="wsc__title">{{ head.title }}</h1>
        <p class="wsc__sub">{{ head.sub }}</p>
      </div>
    </header>

    <!-- Template -->
    <div v-if="tab === 'template'" class="wsc__body">
      <p class="text-muted small mb-3">Choose the design template for your restaurant website.</p>
      <div class="row g-3">
        <div v-for="c in templates" :key="c.id" class="col-md-4">
          <div class="tpl" :class="{ 'tpl--on': c.on }">
            <div class="tpl__mock" :class="'tpl__mock--' + c.id"></div>
            <div class="fw-bold small mt-2">{{ c.name }}</div>
            <i v-if="c.on" class="fas fa-check-circle tpl__check text-success"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Branding -->
    <div v-else-if="tab === 'branding'" class="wsc__body">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label small fw-bold text-muted text-uppercase">Restaurant name</label>
          <input class="form-control" value="Your restaurant" readonly />
        </div>
        <div class="col-md-6">
          <label class="form-label small fw-bold text-muted text-uppercase">Tagline</label>
          <input class="form-control" value="Quality food, every day" readonly />
        </div>
        <div class="col-12">
          <label class="form-label small fw-bold text-muted text-uppercase">Description</label>
          <textarea class="form-control" rows="3" readonly>Short public description.</textarea>
        </div>
      </div>
      <p class="small fw-bold text-muted text-uppercase mt-4 mb-2">Logo &amp; favicon</p>
      <div class="row g-3">
        <div class="col-md-6 border rounded-3 p-3">
          <div class="btn-group btn-group-sm mb-2">
            <button type="button" class="btn btn-success" disabled>URL</button>
            <button type="button" class="btn btn-outline-secondary" disabled>Upload</button>
          </div>
          <input class="form-control form-control-sm" readonly placeholder="https://…" />
        </div>
        <div class="col-md-6 border rounded-3 p-3">
          <div class="btn-group btn-group-sm mb-2">
            <button type="button" class="btn btn-success" disabled>URL</button>
            <button type="button" class="btn btn-outline-secondary" disabled>Upload</button>
          </div>
          <input class="form-control form-control-sm" readonly placeholder="https://…" />
        </div>
      </div>
    </div>

    <!-- SEO -->
    <div v-else-if="tab === 'seo'" class="wsc__body">
      <div class="input-group mb-3">
        <span class="input-group-text bg-white"><i class="fas fa-search text-success"></i></span>
        <input class="form-control" placeholder="Search results and social sharing previews" readonly />
      </div>
      <p class="small text-muted">These fields power search snippets and social cards.</p>
      <div class="mb-3">
        <label class="form-label fw-bold">Page title</label>
        <input class="form-control" readonly value="Your restaurant — Order online" />
      </div>
      <div class="mb-3">
        <label class="form-label fw-bold">Meta description</label>
        <textarea class="form-control" rows="3" readonly></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label fw-bold">Keywords</label>
        <input class="form-control" readonly placeholder="restaurant, multan, biryani" />
      </div>
      <div class="d-flex justify-content-between align-items-center border rounded-3 p-3">
        <div>
          <div class="fw-bold small">Hide from search engines</div>
          <div class="text-muted small">When on, adds noindex.</div>
        </div>
        <div class="form-check form-switch m-0">
          <input class="form-check-input" type="checkbox" disabled id="seoNo" />
          <label class="form-check-label small" for="seoNo">Visible</label>
        </div>
      </div>
    </div>

    <!-- Domain -->
    <div v-else-if="tab === 'domain'" class="wsc__body">
      <label class="form-label fw-bold">Custom domain</label>
      <div class="input-group mb-2">
        <input class="form-control" placeholder="orders.yourrestaurant.com" readonly />
        <button type="button" class="btn btn-outline-secondary" disabled>Check DNS</button>
      </div>
      <p class="small text-muted">Enter domain without https://. Static preview only.</p>
      <div class="alert alert-warning small">DNS records from your provider must match our targets — coming soon.</div>
    </div>

    <!-- Contact -->
    <div v-else-if="tab === 'contact'" class="wsc__body">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Phone</label>
          <input class="form-control" readonly />
        </div>
        <div class="col-md-6">
          <label class="form-label">Email</label>
          <input class="form-control" readonly />
        </div>
        <div class="col-12">
          <label class="form-label">Address</label>
          <textarea class="form-control" rows="2" readonly></textarea>
        </div>
      </div>
    </div>

    <!-- Hero -->
    <div v-else-if="tab === 'hero'" class="wsc__body">
      <label class="form-label">Hero headline</label>
      <input class="form-control mb-3" readonly value="Welcome to our kitchen" />
      <label class="form-label">Hero image URL</label>
      <input class="form-control" readonly placeholder="https://…" />
    </div>

    <!-- Theme -->
    <div v-else-if="tab === 'theme'" class="wsc__body">
      <div class="row g-4 align-items-start">
        <div class="col-md-7">
          <div class="mb-3">
            <label class="form-label">Primary color</label>
            <div class="d-flex gap-2 align-items-center">
              <span class="swatch" style="background: #00844d"></span>
              <input class="form-control" readonly value="#00844d" />
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Secondary color</label>
            <div class="d-flex gap-2 align-items-center">
              <span class="swatch" style="background: #0d9488"></span>
              <input class="form-control" readonly value="#0d9488" />
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <div class="nav-preview small fw-bold text-muted mb-2">Navbar preview</div>
          <div class="nav-preview__bar">
            <span class="text-white small fw-bold">Your brand</span>
            <span class="nav-preview__btn">Order now</span>
          </div>
          <div class="nav-preview__accent"></div>
        </div>
      </div>
    </div>

    <!-- Social -->
    <div v-else-if="tab === 'social'" class="wsc__body">
      <div v-for="net in ['Facebook', 'Instagram', 'TikTok']" :key="net" class="mb-3">
        <label class="form-label">{{ net }} URL</label>
        <input class="form-control" readonly placeholder="https://…" />
      </div>
    </div>

    <!-- Hours -->
    <div v-else-if="tab === 'hours'" class="wsc__body">
      <p class="text-muted small">Weekly opening hours grid — static preview.</p>
      <div class="border rounded-3 p-3 bg-light small text-muted">Mon — Sun · configure in next iteration</div>
    </div>

    <!-- Sections -->
    <div v-else-if="tab === 'sections'" class="wsc__body">
      <p class="text-muted small">Toggle homepage sections (menu, gallery, testimonials) — static.</p>
      <ul class="list-group">
        <li v-for="s in ['Menu highlight', 'Gallery', 'Reviews']" :key="s" class="list-group-item d-flex justify-content-between">
          {{ s }}
          <span class="badge bg-success">On</span>
        </li>
      </ul>
    </div>

    <!-- Preferences -->
    <div v-else-if="tab === 'preferences'" class="wsc__body">
      <p class="text-muted small">Miscellaneous website flags — static.</p>
      <div class="form-check form-switch mb-2">
        <input class="form-check-input" type="checkbox" checked disabled id="p1" />
        <label class="form-check-label" for="p1">Show cookie banner</label>
      </div>
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" disabled id="p2" />
        <label class="form-check-label" for="p2">Maintenance mode</label>
      </div>
    </div>

    <div class="wsc__foot">
      <button type="button" class="btn wsc__save" @click="onSaveSection">
        <i class="fas fa-save me-2" aria-hidden="true"></i>
        Save
      </button>
      <span class="text-muted small ms-3">Marks this section complete (green dot) — full save API coming next.</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSettingsSectionProgress } from '../../../composables/useSettingsSectionProgress'

const route = useRoute()
const tab = computed(() => route.meta.websiteTab || 'template')

const { markDone } = useSettingsSectionProgress()

function onSaveSection() {
  markDone('website', tab.value)
}

const heads = {
  template: { title: 'Storefront layout', sub: 'Pick how your online menu and homepage feel to guests.', icon: 'fas fa-layer-group' },
  branding: { title: 'Brand & story', sub: 'Name, logo, and short story guests see on your public site.', icon: 'fas fa-palette' },
  seo: { title: 'Findability', sub: 'Search and social previews so diners can find you.', icon: 'fas fa-search' },
  domain: { title: 'Custom domain', sub: 'Point your own web address to this ordering site.', icon: 'fas fa-link' },
  contact: { title: 'Guest contact', sub: 'Phone, email, and address shown to customers.', icon: 'fas fa-address-book' },
  hero: { title: 'Home hero', sub: 'Top banner on your homepage — offers, photos, or welcome text.', icon: 'fas fa-image' },
  theme: { title: 'Colors & theme', sub: 'Primary and accent colors for your guest-facing site.', icon: 'fas fa-star' },
  social: { title: 'Social links', sub: 'Instagram, Facebook, and other profiles.', icon: 'fas fa-share-alt' },
  hours: { title: 'Hours & service', sub: 'When you welcome dine-in, pickup, or delivery.', icon: 'fas fa-clock' },
  sections: { title: 'Page sections', sub: 'Turn homepage blocks like menu highlights or gallery on or off.', icon: 'fas fa-th-large' },
  preferences: { title: 'Site preferences', sub: 'Cookie banner, maintenance, and other behaviour.', icon: 'fas fa-sliders-h' }
}

const head = computed(() => heads[tab.value] || heads.template)

const templates = [
  { id: 'classic', name: 'Heritage dining', on: false },
  { id: 'modern', name: 'Showcase bistro', on: true },
  { id: 'minimal', name: 'Essentials', on: false }
]
</script>

<style scoped>
.wsc {
  --a: #00844d;
  --ink: #0f172a;
  --muted: #64748b;
  --line: #e2e8f0;
  --surface: #f1f5f9;
  color: var(--ink);
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.wsc__head {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
  margin-bottom: clamp(1rem, 3vw, 1.25rem);
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--line);
}
.wsc__icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--a) 12%, #fff);
  color: var(--a);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}
.wsc__title {
  font-size: clamp(1.05rem, 2.5vw, 1.2rem);
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.wsc__sub {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: var(--muted);
  line-height: 1.5;
}
.tpl {
  position: relative;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 0.75rem;
  background: #fff;
}
.tpl--on {
  border-color: var(--a);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--a) 25%, #fff);
}
.tpl__mock {
  height: 72px;
  border-radius: 8px;
}
.tpl__mock--classic {
  background: linear-gradient(180deg, #ffc107 28%, #f5f5f5 28%);
}
.tpl__mock--modern {
  background: linear-gradient(180deg, #1e293b 32%, #f8fafc 32%);
}
.tpl__mock--minimal {
  background: #eceff1;
}
.tpl__check {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
.swatch {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid var(--line);
}
.nav-preview__bar {
  background: #00844d;
  border-radius: 8px 8px 0 0;
  padding: 0.65rem 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-preview__btn {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
}
.nav-preview__accent {
  height: 4px;
  background: #0d9488;
  border-radius: 0 0 8px 8px;
}
.wsc__foot {
  margin-top: 1.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.wsc__save {
  background: var(--a);
  color: #fff;
  border: none;
  border-radius: 999px;
  font-weight: 700;
  padding: 0.55rem 1.35rem;
}
</style>
