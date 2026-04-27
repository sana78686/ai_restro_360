<template>
  <div class="bss">
    <div class="bss__grid">
      <aside class="bss__nav" aria-label="Business settings sections">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="bss__link"
          active-class="bss__link--active"
        >
          <i :class="item.icon" class="bss__ico" aria-hidden="true"></i>
          <span class="bss__label">{{ item.label }}</span>
          <span
            class="bss__dot"
            :class="item.done ? 'bss__dot--on' : 'bss__dot--off'"
            aria-hidden="true"
          />
        </router-link>
      </aside>
      <section class="bss__content">
        <router-view />
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsSectionProgress } from '../../../composables/useSettingsSectionProgress'

const { isDone } = useSettingsSectionProgress()

const rawNav = [
  { to: '/dashboard/settings/general', label: 'General', icon: 'fas fa-cog', progressKey: 'general' },
  { to: '/dashboard/settings/branches', label: 'Branches', icon: 'fas fa-store', progressKey: 'branches' },
  { to: '/dashboard/settings/bill', label: 'Bill', icon: 'fas fa-file-invoice', progressKey: 'bill' },
  { to: '/dashboard/settings/discounts', label: 'Discounts', icon: 'fas fa-percent', progressKey: 'discounts' },
  { to: '/dashboard/settings/payments', label: 'Payments', icon: 'fas fa-wallet', progressKey: 'payments' }
]

const navItems = computed(() =>
  rawNav.map((row) => ({
    ...row,
    done: isDone('business', row.progressKey)
  }))
)
</script>

<style scoped>
.bss {
  --bss-accent: #00844d;
  --bss-border: #e2e8f0;
  --bss-muted: #64748b;
  --bss-surface: #f8fafc;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #fff;
  min-height: 100%;
}

.bss__grid {
  display: flex;
  gap: clamp(1rem, 3vw, 1.75rem);
  align-items: flex-start;
}

.bss__nav {
  width: min(200px, 36vw);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
  padding: 0.4rem;
  background: #fff;
  border: 1px solid var(--bss-border);
  border-radius: 12px;
}

.bss__link {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.5rem 0.65rem;
  border-radius: 10px;
  text-decoration: none;
  color: #334155;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid transparent;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.bss__link:hover {
  background: var(--bss-surface);
  color: #0f172a;
}

.bss__link--active {
  border-color: color-mix(in srgb, var(--bss-accent) 45%, var(--bss-border));
  background: color-mix(in srgb, var(--bss-accent) 11%, #fff);
  color: var(--bss-accent);
  font-weight: 700;
}

.bss__ico {
  width: 1.05rem;
  font-size: 0.85rem;
  text-align: center;
  color: var(--bss-accent);
  flex-shrink: 0;
}

.bss__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-left: auto;
  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.06);
}
.bss__dot--on {
  background: #22c55e;
}
.bss__dot--off {
  background: #e2e8f0;
  border: 1px solid #cbd5e1;
}

.bss__link--active .bss__ico {
  color: var(--bss-accent);
}

.bss__label {
  line-height: 1.3;
}

.bss__content {
  flex: 1;
  min-width: 0;
}

@media (max-width: 767.98px) {
  .bss__grid {
    flex-direction: column;
  }
  .bss__nav {
    width: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    gap: 0.35rem;
    padding: 0.35rem;
    scrollbar-width: thin;
  }
  .bss__link {
    flex: 0 0 auto;
    white-space: nowrap;
  }
}
</style>
