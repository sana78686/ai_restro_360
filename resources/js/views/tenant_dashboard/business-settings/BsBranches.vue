<template>
  <BsPageFrame
    progress-key="branches"
    title="Branches"
    subtitle="Manage your restaurant branches, working hours, and delivery zones."
    icon="fas fa-store"
    save-label="Save changes"
    @saved="onFrameSave"
  >
    <p class="text-muted small mb-3">
      Branches control where orders are prepared and which menus / delivery zones apply. Changes sync to the branch switcher in the header.
    </p>

    <div class="d-flex justify-content-end mb-3">
      <button type="button" class="btn btn-add" :disabled="loading" @click="startCreate">
        <i class="fas fa-plus me-1"></i> Add branch
      </button>
    </div>

    <!-- Modal -->
    <div
      v-if="showForm"
      class="branch-modal-backdrop"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      @click.self="cancelForm"
    >
      <div class="branch-modal card border-0 shadow-lg" @click.stop>
        <div class="branch-modal__head d-flex align-items-center justify-content-between">
          <h5 class="fw-bold mb-0">{{ formTitle }}</h5>
          <button type="button" class="btn btn-link text-muted p-0 branch-modal__close" aria-label="Close" @click="cancelForm">
            <i class="fas fa-times fa-lg"></i>
          </button>
        </div>
        <div class="branch-modal__body">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label small fw-bold text-muted text-uppercase">Branch name</label>
              <input v-model="form.name" type="text" class="form-control" placeholder="e.g. Gulgasht" />
            </div>
            <div class="col-md-6">
              <label class="form-label small fw-bold text-muted text-uppercase">Code (optional)</label>
              <input
                v-model="form.code"
                type="text"
                class="form-control"
                placeholder="Auto from name if empty"
                :disabled="formMode === 'edit'"
              />
              <div v-if="formMode === 'edit'" class="form-text small">Code cannot be changed after creation.</div>
            </div>
            <div class="col-12">
              <label class="form-label small fw-bold text-muted text-uppercase">Address</label>
              <input v-model="form.address" type="text" class="form-control" placeholder="Street, city" />
            </div>
            <div class="col-md-6">
              <label class="form-label small fw-bold text-muted text-uppercase">Phone</label>
              <input v-model="form.phone" type="text" class="form-control" placeholder="03XX-XXXXXXX" />
            </div>
            <div class="col-md-3">
              <label class="form-label small fw-bold text-muted text-uppercase">Opens at</label>
              <input v-model="form.opens_at" type="time" class="form-control" />
            </div>
            <div class="col-md-3">
              <label class="form-label small fw-bold text-muted text-uppercase">Closes at</label>
              <input v-model="form.closes_at" type="time" class="form-control" />
            </div>
            <div class="col-12">
              <label class="form-label small fw-bold text-muted text-uppercase">Business day cutoff</label>
              <select v-model="form.cutoff_time" class="form-select">
                <option v-for="opt in cutoffOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
              <div class="form-text small">Orders after this time will count towards the next business day.</div>
            </div>
            <div v-if="formMode === 'create'" class="col-12">
              <div class="form-check">
                <input id="bd" v-model="form.is_default" class="form-check-input" type="checkbox" />
                <label class="form-check-label small" for="bd">Set as default branch</label>
              </div>
            </div>
            <div v-else class="col-12">
              <div class="form-check">
                <input id="bde" v-model="form.is_default" class="form-check-input" type="checkbox" />
                <label class="form-check-label small" for="bde">Default branch for this restaurant</label>
              </div>
            </div>
          </div>
        </div>
        <div class="branch-modal__foot d-flex justify-content-end gap-2">
          <button type="button" class="btn btn-outline-secondary rounded-pill px-3" :disabled="saving" @click="cancelForm">
            Cancel
          </button>
          <button type="button" class="btn btn-save-form rounded-pill px-4" :disabled="saving" @click="submitForm">
            <span v-if="saving" class="spinner-border spinner-border-sm me-1" role="status"></span>
            {{ formMode === 'edit' ? 'Save branch' : 'Create branch' }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading && !rows.length" class="text-center py-5 text-muted">
      <div class="spinner-border spinner-border-sm text-success" role="status"></div>
      <div class="small mt-2">Loading branches…</div>
    </div>

    <div v-else class="table-responsive branch-table-wrap rounded-3 overflow-hidden border">
      <table class="table branch-table table-hover align-middle mb-0">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Code</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">Opens</th>
            <th scope="col">Closes</th>
            <th scope="col">Business day cutoff</th>
            <th scope="col" class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in rows" :key="b.id">
            <td>
              <span v-if="b.is_default" class="badge branch-table__badge branch-table__badge--default me-2">Current</span>
              <span v-else class="badge branch-table__badge branch-table__badge--switch me-2">Switch</span>
              <strong class="branch-table__name">{{ b.name }}</strong>
            </td>
            <td><code class="branch-table__code">{{ b.code || '—' }}</code></td>
            <td class="text-muted">{{ b.address || '—' }}</td>
            <td class="text-muted">{{ b.phone || '—' }}</td>
            <td>{{ formatTimeCell(b.opens_at) }}</td>
            <td>{{ formatTimeCell(b.closes_at) }}</td>
            <td>{{ formatCutoffLabel(b.cutoff_time) }}</td>
            <td class="text-end text-nowrap">
              <button
                type="button"
                class="btn btn-link btn-sm p-0 me-2 td-act"
                :disabled="b.is_default"
                @click="setDefault(b)"
              >
                {{ b.is_default ? 'Default' : 'Set default' }}
              </button>
              <button type="button" class="btn btn-link btn-sm p-0 me-2 td-act" @click="startEdit(b)">
                <i class="fas fa-pen"></i>
              </button>
              <button type="button" class="btn btn-link btn-sm p-0 text-danger" :disabled="rows.length <= 1" @click="remove(b)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </BsPageFrame>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import BsPageFrame from './BsPageFrame.vue'
import { refreshTenantBranchesList } from '../../../composables/useTenantBranches'

const rows = ref([])
const loading = ref(false)
const saving = ref(false)
const showForm = ref(false)
const formMode = ref('create')
const editingId = ref(null)

const form = ref({
  name: '',
  code: '',
  address: '',
  phone: '',
  opens_at: '',
  closes_at: '',
  cutoff_time: '04:00',
  is_default: false,
})

function formatTimeLabel(hhmm) {
  if (!hhmm || typeof hhmm !== 'string') return '—'
  const parts = hhmm.split(':')
  if (parts.length < 2) return hhmm
  const h = Number(parts[0])
  const m = Number(parts[1])
  if (Number.isNaN(h) || Number.isNaN(m)) return hhmm
  const d = new Date()
  d.setHours(h, m, 0, 0)
  return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
}

const cutoffOptions = computed(() => {
  const opts = []
  for (let hour = 0; hour < 24; hour++) {
    for (const minute of [0, 30]) {
      const hh = String(hour).padStart(2, '0')
      const mm = String(minute).padStart(2, '0')
      const value = `${hh}:${mm}`
      opts.push({ value, label: formatTimeLabel(value) })
    }
  }
  return opts
})

const formTitle = computed(() => (formMode.value === 'edit' ? 'Edit branch' : 'Add branch'))

function formatTimeCell(val) {
  if (!val) return '—'
  return formatTimeLabel(val.length >= 5 ? val.slice(0, 5) : val)
}

function formatCutoffLabel(val) {
  if (!val) return '—'
  const v = val.length >= 5 ? val.slice(0, 5) : val
  return formatTimeLabel(v)
}

function emptyForm() {
  form.value = {
    name: '',
    code: '',
    address: '',
    phone: '',
    opens_at: '',
    closes_at: '',
    cutoff_time: '04:00',
    is_default: false,
  }
}

async function loadBranches() {
  loading.value = true
  try {
    const { data } = await axios.get('/tenant/branches', { withCredentials: true })
    if (data.success && Array.isArray(data.data)) {
      rows.value = data.data
    } else {
      rows.value = []
    }
  } catch (e) {
    rows.value = []
    Swal.fire('Error', e.response?.data?.message || 'Could not load branches', 'error')
  } finally {
    loading.value = false
  }
}

function startCreate() {
  formMode.value = 'create'
  editingId.value = null
  emptyForm()
  showForm.value = true
}

function startEdit(b) {
  formMode.value = 'edit'
  editingId.value = b.id
  form.value = {
    name: b.name,
    code: b.code || '',
    address: b.address || '',
    phone: b.phone || '',
    opens_at: normalizeTimeForInput(b.opens_at),
    closes_at: normalizeTimeForInput(b.closes_at),
    cutoff_time: normalizeCutoffForSelect(b.cutoff_time),
    is_default: !!b.is_default,
  }
  showForm.value = true
}

function normalizeTimeForInput(val) {
  if (!val) return ''
  const s = String(val)
  if (s.length >= 5) return s.slice(0, 5)
  return s
}

function normalizeCutoffForSelect(val) {
  if (!val) return '04:00'
  const s = String(val).replace('.', ':')
  if (/^\d{1,2}:\d{2}$/.test(s)) {
    const [h, m] = s.split(':')
    return `${h.padStart(2, '0')}:${m}`
  }
  if (s.length >= 5) return s.slice(0, 5)
  return '04:00'
}

function cancelForm() {
  showForm.value = false
  editingId.value = null
  emptyForm()
}

async function submitForm() {
  if (!form.value.name?.trim()) {
    Swal.fire('Missing fields', 'Branch name is required.', 'warning')
    return
  }
  saving.value = true
  try {
    const cutoff = form.value.cutoff_time?.trim() || null
    const opens = form.value.opens_at?.trim() || null
    const closes = form.value.closes_at?.trim() || null

    if (formMode.value === 'create') {
      const codeTrim = form.value.code?.trim()
      const { data } = await axios.post(
        '/tenant/branches',
        {
          name: form.value.name.trim(),
          code: codeTrim || null,
          address: form.value.address?.trim() || null,
          phone: form.value.phone?.trim() || null,
          opens_at: opens,
          closes_at: closes,
          cutoff_time: cutoff,
          is_default: form.value.is_default,
        },
        { withCredentials: true }
      )
      if (!data.success) throw new Error(data.message || 'Create failed')
      Swal.fire('Created', data.message || 'Branch added', 'success')
    } else {
      const { data } = await axios.put(
        `/tenant/branches/${editingId.value}`,
        {
          name: form.value.name.trim(),
          address: form.value.address?.trim() || null,
          phone: form.value.phone?.trim() || null,
          opens_at: opens,
          closes_at: closes,
          cutoff_time: cutoff,
          is_default: form.value.is_default,
        },
        { withCredentials: true }
      )
      if (!data.success) throw new Error(data.message || 'Update failed')
      Swal.fire('Updated', data.message || 'Branch saved', 'success')
    }
    cancelForm()
    await loadBranches()
    refreshTenantBranchesList()
  } catch (e) {
    const msg = e.response?.data?.message || e.message || 'Request failed'
    if (e.response?.status === 422 && e.response?.data?.errors) {
      const first = Object.values(e.response.data.errors)[0]
      Swal.fire('Validation', Array.isArray(first) ? first[0] : msg, 'warning')
    } else {
      Swal.fire('Error', msg, 'error')
    }
  } finally {
    saving.value = false
  }
}

async function setDefault(b) {
  try {
    const { data } = await axios.post(`/tenant/branches/${b.id}/set-default`, {}, { withCredentials: true })
    if (!data.success) throw new Error(data.message)
    await loadBranches()
    refreshTenantBranchesList()
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Default branch updated', showConfirmButton: false, timer: 2200 })
  } catch (e) {
    Swal.fire('Error', e.response?.data?.message || e.message, 'error')
  }
}

async function remove(b) {
  const ok = await Swal.fire({
    title: 'Delete branch?',
    text: b.name,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#00844d',
    confirmButtonText: 'Delete',
  })
  if (!ok.isConfirmed) return
  try {
    const { data } = await axios.delete(`/tenant/branches/${b.id}`, { withCredentials: true })
    if (!data.success) throw new Error(data.message)
    await loadBranches()
    refreshTenantBranchesList()
    Swal.fire('Deleted', data.message || 'Branch removed', 'success')
  } catch (e) {
    Swal.fire('Error', e.response?.data?.message || e.message, 'error')
  }
}

async function onFrameSave() {
  await loadBranches()
  refreshTenantBranchesList()
}

onMounted(loadBranches)
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
.btn-add:disabled {
  opacity: 0.65;
}
.branch-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1050;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.branch-modal {
  width: 100%;
  max-width: 560px;
  border-radius: 16px;
  overflow: hidden;
  max-height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
}
.branch-modal__head {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e2e8f0;
  background: #fff;
}
.branch-modal__body {
  padding: 1.25rem;
  overflow-y: auto;
  background: #fff;
}
.branch-modal__body :deep(.form-control),
.branch-modal__body :deep(.form-select) {
  border-radius: 10px;
  border: 1px solid #e2e8f0;
}
.branch-modal__foot {
  padding: 1rem 1.25rem;
  border-top: 1px solid #e2e8f0;
  background: #fafafa;
}
.branch-modal__close {
  text-decoration: none;
}
.branch-table-wrap {
  background: #fff;
  border-color: #e2e8f0 !important;
}
.branch-table thead th {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #64748b;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 0.65rem 0.85rem;
  white-space: nowrap;
}
.branch-table tbody td {
  padding: 0.75rem 0.85rem;
  vertical-align: middle;
  border-color: #f1f5f9;
  font-size: 0.9rem;
}
.branch-table tbody tr:hover {
  background: #fafafa;
}
.branch-table__name {
  font-weight: 700;
  color: #0f172a;
}
.branch-table__code {
  font-size: 0.82rem;
  padding: 0.2rem 0.45rem;
  border-radius: 6px;
  background: #f1f5f9;
  color: #0f172a;
  border: 1px solid #e2e8f0;
}
.branch-table__badge {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.28rem 0.5rem;
  border-radius: 999px;
}
.branch-table__badge--default {
  background: color-mix(in srgb, #00844d 14%, #fff) !important;
  color: #00844d !important;
  border: 1px solid color-mix(in srgb, #00844d 28%, #e2e8f0);
}
.branch-table__badge--switch {
  background: #f1f5f9 !important;
  color: #64748b !important;
  border: 1px solid #e2e8f0;
}
.btn-save-form {
  background: #00844d;
  color: #fff;
  border: none;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.45rem 1.1rem;
}
.td-act {
  color: #00844d !important;
  font-weight: 600;
  font-size: 0.8rem;
}
</style>
