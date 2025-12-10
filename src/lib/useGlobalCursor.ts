import { onUnmounted } from 'vue'

export function useGlobalCursor() {
  function setCursor(cursor: string) {
    document.body.style.cursor = cursor
  }

  function resetCursor() {
    document.body.style.cursor = ''
  }

  onUnmounted(() => {
    resetCursor()
  })

  return { setCursor, resetCursor }
}
