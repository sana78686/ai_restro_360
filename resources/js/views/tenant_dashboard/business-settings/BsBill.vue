<template>
  <BsPageFrame
    progress-key="bill"
    title="Bill Settings"
    subtitle="Logo and footer used on printed bills and kitchen tickets."
    icon="fas fa-file-invoice"
    save-label="Save bill settings"
  >
    <div class="row g-4">
      <div class="col-lg-7">
        <div class="btn-group btn-group-sm mb-3" role="group">
          <button type="button" class="btn btn-brand-active" disabled>URL</button>
          <button type="button" class="btn btn-outline-secondary" disabled>Upload</button>
        </div>
        <div class="mb-3">
          <label class="form-label">Logo URL</label>
          <input type="text" class="form-control" placeholder="https://…" readonly />
        </div>
        <div class="mb-3">
          <label class="form-label">Logo height (px)</label>
          <input type="number" class="form-control" value="100" readonly />
        </div>
        <div class="mb-3">
          <label class="form-label">Bill footer message</label>
          <textarea class="form-control" rows="3" readonly>Thank you for your order!</textarea>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="preview-card">
          <div class="preview-card__title">
            <i class="fas fa-receipt me-2 text-accent"></i>
            Live bill preview
          </div>
          <div class="receipt">
            <div class="receipt__brand">Your restaurant</div>
            <div class="receipt__meta text-muted small">Invoice # — · Dine-in</div>
            <hr class="receipt__hr" />
            <div class="small text-muted">Items appear here when connected to POS.</div>
            <hr class="receipt__hr" />
            <div class="small">Thank you for your order!</div>
          </div>
        </div>
      </div>
    </div>
  </BsPageFrame>
</template>

<script setup>
import BsPageFrame from './BsPageFrame.vue'
</script>

<style scoped>
.btn-brand-active {
  background: #00844d;
  color: #fff;
  border-color: #00844d;
}
.text-accent {
  color: #00844d;
}
.preview-card {
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 1rem;
  background: #fafafa;
  height: 100%;
}
.preview-card__title {
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}
.receipt {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  font-size: 0.8rem;
  max-width: 280px;
  margin: 0 auto;
}
.receipt__brand {
  font-weight: 800;
  text-align: center;
  margin-bottom: 0.35rem;
}
.receipt__meta {
  text-align: center;
}
.receipt__hr {
  border: none;
  border-top: 1px dashed #ccc;
  margin: 0.65rem 0;
}
</style>
