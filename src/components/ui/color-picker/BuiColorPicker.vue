<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { watchThrottled, watchPausable } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { ColorTranslator } from 'colortranslator'
import { colorPickerSelectorVariants, colorPickerTrackVariants } from '.'
import {
  type HSVColor,
  HSLtoHSV,
  HSVtoHSL,
  normalizeBrightness,
  normalizeHue
} from '@/lib/colorUtils'
import { useColorDraggable } from '@/lib/useColorDraggable'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    as?: string
    disabled?: boolean
    size?: NonNullable<Parameters<typeof colorPickerSelectorVariants>[0]>['size']
    defaultValue?: string
    format?: 'hex' | 'rgb' | 'hsl' | 'cmyk' | 'lab'
    throttle?: number
    ui?: {
      selectorClass?: string
      trackClass?: string
    }
  }>(),
  {
    as: 'div',
    format: 'hex',
    defaultValue: '#FFFFFF',
    throttle: 50
  }
)

const modelValue = defineModel<string>(undefined)

const pickedColor = computed<HSVColor>({
  get() {
    try {
      const color = new ColorTranslator(modelValue.value || props.defaultValue)

      return HSLtoHSV(color.HSLObject)
    } catch (_) {
      return { h: 0, s: 0, v: 100 }
    }
  },

  set(value) {
    const color = new ColorTranslator(HSVtoHSL(value), {
      labUnit: 'percent',
      cmykUnit: 'percent',
      cmykFunction: 'cmyk'
    })

    switch (props.format) {
      case 'rgb':
        modelValue.value = color.RGB
        break
      case 'hsl':
        modelValue.value = color.HSL
        break
      case 'cmyk':
        modelValue.value = color.CMYK
        break
      case 'lab':
        modelValue.value = color.CIELab
        break
      case 'hex':
      default:
        modelValue.value = color.HEX
    }
  }
})

const selectorRef = ref<HTMLDivElement | null>(null)
const selectorThumbRef = ref<HTMLDivElement | null>(null)
const trackRef = ref<HTMLDivElement | null>(null)
const trackThumbRef = ref<HTMLDivElement | null>(null)

const { position: selectorThumbPosition } = useColorDraggable(
  selectorThumbRef,
  selectorRef,
  'both',
  {
    x: pickedColor.value.s,
    y: normalizeBrightness(pickedColor.value.v)
  },
  props.disabled
)

const { position: trackThumbPosition } = useColorDraggable(
  trackThumbRef,
  trackRef,
  'y',
  {
    x: 0,
    y: normalizeHue(pickedColor.value.h, 'right')
  },
  props.disabled
)

const trackThumbColor = computed(
  () =>
    new ColorTranslator(
      HSVtoHSL({
        h: normalizeHue(trackThumbPosition.value.y),
        s: 100,
        v: 100
      })
    ).HEX
)

const selectorStyle = computed(() => ({
  backgroundColor: trackThumbColor.value
}))

const selectorThumbStyle = computed(() => ({
  backgroundColor: new ColorTranslator(modelValue.value || props.defaultValue).HEX,
  left: `${selectorThumbPosition.value.x}%`,
  top: `${selectorThumbPosition.value.y}%`
}))

const trackThumbStyle = computed(() => ({
  backgroundColor: trackThumbColor.value,
  top: `${trackThumbPosition.value.y}%`
}))

const { pause: pauseWatchColor, resume: resumeWatchColor } = watchPausable(pickedColor, (hsv) => {
  selectorThumbPosition.value = {
    x: hsv.s,
    y: normalizeBrightness(hsv.v)
  }
  trackThumbPosition.value = {
    x: 0,
    y: normalizeHue(hsv.h, 'right')
  }
})

watchThrottled(
  [selectorThumbPosition, trackThumbPosition],
  () => {
    pauseWatchColor()

    pickedColor.value = {
      h: normalizeHue(trackThumbPosition.value.y),
      s: selectorThumbPosition.value.x,
      v: normalizeBrightness(selectorThumbPosition.value.y)
    }

    nextTick(resumeWatchColor)
  },
  { throttle: () => props.throttle }
)
</script>
<template>
  <Primitive
    :as="as"
    class="data-disabled:opacity-75"
    :data-disabled="disabled ? true : undefined"
  >
    <div class="flex gap-4">
      <div ref="selectorRef" :class="colorPickerSelectorVariants({ size })" :style="selectorStyle">
        <div class="relative h-full w-full rounded-md" data-color-picker-background>
          <div
            ref="selectorThumbRef"
            :class="
              cn(
                'absolute size-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full ring-2 ring-background data-disabled:cursor-not-allowed',
                ui?.selectorClass
              )
            "
            :style="selectorThumbStyle"
            :data-disabled="disabled ? true : undefined"
          ></div>
        </div>
      </div>
      <div ref="trackRef" :class="colorPickerTrackVariants({ size })" data-color-picker-track>
        <div
          ref="trackThumbRef"
          :class="
            cn(
              'absolute size-4 -translate-x-[4px] -translate-y-1/2 transform cursor-pointer rounded-full ring-2 ring-background data-disabled:cursor-not-allowed rtl:translate-x-[4px]',
              ui?.trackClass
            )
          "
          :style="trackThumbStyle"
          :data-disabled="disabled ? true : undefined"
        ></div>
      </div>
    </div>
  </Primitive>
</template>

<style scoped>
[data-color-picker-background] {
  background-image: linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0) 100%),
    linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
}

[data-color-picker-track] {
  background-image: linear-gradient(
    0deg,
    red 0,
    #f0f 17%,
    #00f 33%,
    #0ff 50%,
    #0f0 67%,
    #ff0 83%,
    red
  );
}
</style>
