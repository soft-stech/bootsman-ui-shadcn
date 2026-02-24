import { isClient, useElementBounding, useEventListener } from '@vueuse/core'
import { type MaybeRefOrGetter, ref, toValue } from 'vue'

export function useColorDraggable(
  targetElement: MaybeRefOrGetter<HTMLElement | null>,
  containerElement: MaybeRefOrGetter<HTMLElement | null>,
  axis: 'x' | 'y' | 'both' = 'both',
  initialPosition = { x: 0, y: 0 },
  disabled?: MaybeRefOrGetter<boolean | undefined>
) {
  const position = ref<{ x: number; y: number }>(initialPosition)
  const pressedDelta = ref<{ x: number; y: number }>()

  const handlePointerDown = (event: PointerEvent) => {
    if (toValue(disabled)) return event.preventDefault()

    const container = toValue(containerElement)
    const targetRect = useElementBounding(targetElement)
    const containerRect = useElementBounding(containerElement)

    pressedDelta.value = {
      x:
        event.clientX -
        (container
          ? event.clientX - containerRect.left.value + container.scrollLeft
          : targetRect.left.value),
      y:
        event.clientY -
        (container
          ? event.clientY - containerRect.top.value + container.scrollTop
          : targetRect.top.value)
    }

    handlePointerMove(event)
  }
  const handlePointerMove = (event: PointerEvent) => {
    if (!pressedDelta.value) return

    const container = toValue(containerElement)
    let { x, y } = position.value

    if (container && (axis === 'x' || axis === 'both')) {
      x = Math.min(
        Math.max(0, ((event.clientX - pressedDelta.value.x) / container.scrollWidth) * 100),
        100
      )
    }

    if (container && (axis === 'y' || axis === 'both')) {
      y = Math.min(
        Math.max(0, ((event.clientY - pressedDelta.value.y) / container.scrollHeight) * 100),
        100
      )
    }

    position.value = { x, y }
  }
  const handlePointerUp = () => {
    if (!pressedDelta.value) {
      return
    }

    pressedDelta.value = undefined
  }

  if (isClient) {
    useEventListener(containerElement, 'pointerdown', handlePointerDown)
    useEventListener(window, 'pointermove', handlePointerMove)
    useEventListener(window, 'pointerup', handlePointerUp)
  }

  return {
    position
  }
}
