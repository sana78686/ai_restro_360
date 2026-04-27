import { ref, computed, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

const LS_ACTIVE = 'tenant_active_branch_id_v1'
const REFRESH_EVENT = 'tenant-branches-refreshed'

const ALL_ITEM = { id: '__all__', name: 'All branches', all: true }

export function useTenantBranches() {
  const branches = ref([ALL_ITEM])
  const activeBranchId = ref('__all__')
  const loading = ref(false)
  const loadError = ref(null)

  function readSavedActiveId() {
    try {
      return localStorage.getItem(LS_ACTIVE)
    } catch {
      return null
    }
  }

  function persistActiveId(id) {
    try {
      localStorage.setItem(LS_ACTIVE, id)
    } catch { /* ignore */ }
  }

  async function fetchBranches() {
    loading.value = true
    loadError.value = null
    try {
      const { data } = await axios.get('/tenant/branches', { withCredentials: true })
      const rows = data?.data ?? data
      const list = Array.isArray(rows) ? rows : []
      const mapped = list.map((b) => ({
        id: String(b.id),
        name: b.name,
        code: b.code,
        address: b.address ?? '',
        cutoff_time: b.cutoff_time ?? '',
        is_default: !!b.is_default,
        all: false
      }))
      branches.value = [ALL_ITEM, ...mapped]

      const saved = readSavedActiveId()
      const validIds = new Set(['__all__', ...mapped.map((m) => m.id)])
      if (saved && validIds.has(saved)) {
        activeBranchId.value = saved
      } else {
        activeBranchId.value = '__all__'
        persistActiveId('__all__')
      }
    } catch (e) {
      loadError.value = e?.response?.data?.message || e?.message || 'Failed to load branches'
      branches.value = [ALL_ITEM]
      activeBranchId.value = '__all__'
    } finally {
      loading.value = false
    }
  }

  function onRefresh() {
    fetchBranches()
  }

  onMounted(() => {
    fetchBranches()
    window.addEventListener(REFRESH_EVENT, onRefresh)
  })

  onUnmounted(() => {
    window.removeEventListener(REFRESH_EVENT, onRefresh)
  })

  const activeBranch = computed(() => {
    const list = branches.value
    return list.find((b) => b.id === activeBranchId.value) || ALL_ITEM
  })

  function selectBranch(id) {
    if (!branches.value.some((b) => b.id === id)) return
    activeBranchId.value = id
    persistActiveId(id)
    window.dispatchEvent(new CustomEvent('tenant-branch-changed', { detail: { branchId: id } }))
  }

  /** Call after creating/updating/deleting branches so the header & pages stay in sync */
  function notifyBranchesChanged() {
    window.dispatchEvent(new Event(REFRESH_EVENT))
  }

  return {
    branches,
    activeBranchId,
    activeBranch,
    loading,
    loadError,
    selectBranch,
    fetchBranches,
    reloadBranches: fetchBranches,
    notifyBranchesChanged
  }
}

export function refreshTenantBranchesList() {
  window.dispatchEvent(new Event(REFRESH_EVENT))
}

export function getStoredActiveBranchId() {
  try {
    return localStorage.getItem(LS_ACTIVE) || '__all__'
  } catch {
    return '__all__'
  }
}
