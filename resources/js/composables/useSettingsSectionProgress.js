import { ref, onMounted, onUnmounted } from 'vue'
import { isSectionComplete, markSectionComplete, subscribeProgress } from './settingsProgress'

export function useSettingsSectionProgress() {
  const tick = ref(0)
  let unsub = () => {}

  onMounted(() => {
    unsub = subscribeProgress(() => {
      tick.value++
    })
  })

  onUnmounted(() => {
    unsub()
  })

  return {
    isDone(scope, key) {
      tick.value
      return isSectionComplete(scope, key)
    },
    markDone(scope, key) {
      markSectionComplete(scope, key)
    }
  }
}
