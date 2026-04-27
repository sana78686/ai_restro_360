<template>
  <div class="bsp">
    <header class="bsp__head">
      <div class="bsp__head-icon" aria-hidden="true">
        <i :class="icon"></i>
      </div>
      <div>
        <h1 class="bsp__title">{{ title }}</h1>
        <p class="bsp__sub">{{ subtitle }}</p>
      </div>
    </header>
    <div class="bsp__body">
      <slot />
    </div>
    <footer v-if="showSave" class="bsp__foot">
      <button type="button" class="bsp__save" @click="onSaveClick">
        <i class="fas fa-check me-2" aria-hidden="true"></i>
        {{ saveLabel }}
      </button>
      <span class="bsp__note text-muted small ms-3">Static preview — wiring soon</span>
    </footer>
  </div>
</template>

<script setup>
import { useSettingsSectionProgress } from '../../../composables/useSettingsSectionProgress'

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  icon: { type: String, default: 'fas fa-cog' },
  showSave: { type: Boolean, default: true },
  saveLabel: { type: String, default: 'Save changes' },
  /** When set, marks this business-settings subsection complete (green dot in sidebar). */
  progressKey: { type: String, default: '' }
})

const emit = defineEmits(['saved'])

const { markDone } = useSettingsSectionProgress()

function onSaveClick() {
  if (props.progressKey) {
    markDone('business', props.progressKey)
  }
  emit('saved')
}
</script>

<style scoped>
.bsp {
  --a: #00844d;
  --ink: #0f172a;
  --muted: #64748b;
  --line: #e2e8f0;
  --surface: #f1f5f9;
  color: var(--ink);
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.bsp__head {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--line);
}

.bsp__head-icon {
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

.bsp__title {
  font-size: clamp(1.05rem, 2.5vw, 1.2rem);
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.bsp__sub {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: var(--muted);
  line-height: 1.5;
  max-width: 42rem;
}

.bsp__body :deep(.bsp-kicker) {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.65rem;
  margin-top: 0.25rem;
}

.bsp__body :deep(.form-label),
.bsp__body :deep(label):not(.form-check-label) {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--muted);
}

.bsp__body :deep(.form-control),
.bsp__body :deep(textarea.form-control),
.bsp__body :deep(select.form-select) {
  border-radius: 10px;
  border: 1px solid var(--line);
  font-size: 0.9375rem;
  background: #fff;
}

.bsp__body :deep(.form-control:focus),
.bsp__body :deep(select:focus) {
  border-color: var(--a);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--a) 18%, #fff);
}

.bsp__foot {
  margin-top: 1.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--line);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.bsp__save {
  border: none;
  border-radius: 999px;
  background: var(--a);
  color: #fff;
  font-weight: 700;
  font-size: 0.88rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.65rem 1.35rem;
  cursor: pointer;
  transition: filter 0.15s;
}

.bsp__save:hover {
  filter: brightness(0.95);
}
</style>
