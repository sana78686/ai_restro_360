<template>
  <BsPageFrame
    title="General"
    subtitle="Basic details and branding for your restaurant website."
    icon="fas fa-cog"
    save-label="Save changes"
    progress-key="general"
  >
    <div class="row g-4">
      <div class="col-lg-7">
        <p class="bsp-kicker">Restaurant identity</p>
        <div class="mb-3">
          <label class="form-label">Restaurant name</label>
          <input type="text" class="form-control" value="Your restaurant" readonly />
        </div>
        <div class="mb-3">
          <label class="form-label">Description</label>
          <textarea class="form-control" rows="4" readonly>Short description for your public site.</textarea>
        </div>
        <p class="bsp-kicker mt-4">Contact</p>
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Phone</label>
            <input type="text" class="form-control" placeholder="+92 …" readonly />
          </div>
          <div class="col-md-6">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" placeholder="hello@restaurant.com" readonly />
          </div>
        </div>
        <div class="mt-3">
          <label class="form-label">Operating currency</label>
          <select class="form-select bg-light" disabled>
            <option>PKR — Pakistani Rupee</option>
          </select>
        </div>
      </div>
      <div class="col-lg-5">
        <p class="bsp-kicker">Logo</p>
        <div class="logo-box">
          <div class="logo-toggle" role="group">
            <button type="button" class="logo-toggle__url" disabled>URL</button>
            <button type="button" class="logo-toggle__up" disabled>Upload</button>
          </div>
          <div class="logo-drop text-muted small">
            Click to browse — static preview
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
.logo-box {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
  background: #f8fafc;
}
.logo-toggle {
  display: inline-flex;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  margin-bottom: 0.5rem;
}
.logo-toggle__url,
.logo-toggle__up {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.35rem 0.85rem;
  border: none;
  cursor: default;
}
.logo-toggle__url {
  background: #fff;
  color: #475569;
}
.logo-toggle__up {
  background: #00844d;
  color: #fff;
}
.logo-drop {
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #fff;
  border: 1px dashed #cbd5e1;
  margin-top: 0.35rem;
}
</style>
