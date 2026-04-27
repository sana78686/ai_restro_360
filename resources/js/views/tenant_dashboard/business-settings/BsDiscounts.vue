<template>
  <BsPageFrame
    progress-key="discounts"
    title="Discounts"
    subtitle="Configure POS presets, manager PIN, and required reasons."
    icon="fas fa-percent"
    :show-save="false"
  >
    <div class="stack">
      <section class="panel">
        <h2 class="h6 fw-bold">Discount presets</h2>
        <p class="small text-muted">Quick-apply percentages on the POS (static).</p>
        <div class="table-responsive">
          <table class="table table-sm align-middle">
            <tbody>
              <tr v-for="row in presets" :key="row.label">
                <td><input class="form-control form-control-sm" :value="row.label" readonly /></td>
                <td style="width: 90px"><input class="form-control form-control-sm" :value="row.pct" readonly /></td>
                <td style="width: 100px">
                  <span class="badge" :class="row.locked ? 'bg-warning bg-opacity-25 text-dark' : 'bg-light text-muted'">
                    {{ row.locked ? 'PIN' : 'Open' }}
                  </span>
                </td>
                <td style="width: 48px" class="text-end text-muted small">—</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button type="button" class="btn btn-outline-secondary btn-sm rounded-pill" disabled>+ Add preset</button>
      </section>

      <section class="panel">
        <h2 class="h6 fw-bold">Manager PIN</h2>
        <p class="small text-muted">Required for discounts marked with a lock.</p>
        <p class="small"><strong>Status:</strong> Not set</p>
        <div class="row g-2">
          <div class="col-md-6">
            <input type="password" class="form-control" placeholder="New PIN" readonly />
          </div>
          <div class="col-md-6">
            <input type="password" class="form-control" placeholder="Confirm PIN" readonly />
          </div>
        </div>
        <div class="mt-3 d-flex flex-wrap gap-2">
          <button type="button" class="btn btn-save-pill" disabled>Save PIN</button>
          <button type="button" class="btn btn-outline-danger rounded-pill" disabled>Clear PIN</button>
        </div>
      </section>

      <section class="panel">
        <h2 class="h6 fw-bold">Discount reasons</h2>
        <p class="small text-muted">Reasons cashiers select when applying a discount.</p>
        <div v-for="r in reasons" :key="r" class="input-group input-group-sm mb-2">
          <input class="form-control" :value="r" readonly />
          <button class="btn btn-outline-danger" type="button" disabled><i class="fas fa-times"></i></button>
        </div>
        <button type="button" class="btn btn-outline-secondary btn-sm rounded-pill" disabled>+ Add reason</button>
      </section>
    </div>

    <div class="floating-save">
      <button type="button" class="btn btn-save-pill btn-lg" disabled>
        Save discount settings
      </button>
    </div>
  </BsPageFrame>
</template>

<script setup>
import BsPageFrame from './BsPageFrame.vue'

const presets = [
  { label: '10% off', pct: '10', locked: false },
  { label: '20% off', pct: '20', locked: false },
  { label: 'Staff meal (50%)', pct: '50', locked: true },
  { label: 'Complimentary (100%)', pct: '100', locked: true }
]
const reasons = ['Customer complaint', 'Staff meal', 'Loyalty reward']
</script>

<style scoped>
.stack {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.panel {
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 1.15rem 1.25rem;
  background: #fff;
}
.btn-save-pill {
  background: #00844d;
  color: #fff;
  border: none;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 0.5rem 1.25rem;
}
.floating-save {
  position: sticky;
  bottom: 1rem;
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
  pointer-events: none;
}
.floating-save .btn {
  pointer-events: auto;
  box-shadow: 0 8px 24px rgba(0, 132, 77, 0.25);
}
</style>
