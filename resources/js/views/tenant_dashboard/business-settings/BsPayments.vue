<template>
  <BsPageFrame
    progress-key="payments"
    title="Payment accounts"
    subtitle="Bank accounts, mobile wallets, or cash drawers for reconciliation."
    icon="fas fa-wallet"
    save-label="Save"
  >
    <p class="text-muted small">These accounts appear in POS payment options and reports.</p>
    <div class="d-flex justify-content-end mb-3">
      <button type="button" class="btn btn-add" disabled>
        <i class="fas fa-plus me-1"></i> Add account
      </button>
    </div>
    <div class="empty-state text-center text-muted py-5 px-3">
      <i class="fas fa-wallet fa-2x mb-3 opacity-50"></i>
      <p class="mb-1 fw-semibold text-dark">No payment accounts yet</p>
      <p class="small mb-0">Add bank accounts, mobile wallets, or cash drawer accounts for POS.</p>
    </div>
  </BsPageFrame>
</template>

<script setup>
import BsPageFrame from './BsPageFrame.vue'
</script>

<style scoped>
.btn-add {
  background: #00844d;
  color: #fff;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.45rem 1rem;
  border: none;
}
.empty-state {
  border: 2px dashed #ddd;
  border-radius: 12px;
  background: #fafafa;
}
</style>
