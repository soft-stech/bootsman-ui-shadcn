<script setup lang="ts">
import { ref } from 'vue'
import { Primitive } from 'radix-vue'
import { colorPickerSelectorVariants, colorPickerTrackVariants } from '.'

const props = withDefaults(
  defineProps<{
    as?: string
    disabled?: boolean
    size?: NonNullable<Parameters<typeof colorPickerSelectorVariants>[0]>['size']
  }>(),
  {
    as: 'div'
  }
)

const selectorRef = ref<HTMLDivElement | null>(null)
const selectorThumbRef = ref<HTMLDivElement | null>(null)
const trackRef = ref<HTMLDivElement | null>(null)
const trackThumbRef = ref<HTMLDivElement | null>(null)
</script>
<template>
  <Primitive
    :as="as"
    class="data-[disabled]:opacity-75"
    :data-disabled="disabled ? true : undefined"
  >
    <div class="flex gap-4">
      <div ref="selectorRef" :class="colorPickerSelectorVariants({ size })">
        <div class="relative h-full w-full rounded-md" data-color-picker-background>
          <div
            ref="selectorThumbRef"
            class="absolute size-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full ring-2 ring-background data-[disabled]:cursor-not-allowed"
            :data-disabled="disabled ? true : undefined"
          ></div>
        </div>
      </div>
      <div ref="trackRef" :class="colorPickerTrackVariants({ size })" data-color-picker-track>
        <div
          ref="trackThumbRef"
          class="absolute size-4 -translate-x-[4px] -translate-y-1/2 transform cursor-pointer rounded-full ring-2 ring-background data-[disabled]:cursor-not-allowed rtl:translate-x-[4px]"
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
