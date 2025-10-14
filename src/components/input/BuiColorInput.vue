<script setup lang="ts">
import BuiInput from './BuiInput.vue'
import { BuiPopover, BuiPopoverTrigger, BuiPopoverContent } from '../popover'
import { useElementBounding } from '@vueuse/core'
import { ref, watch } from 'vue'
import { Palette as PaletteIcon } from 'lucide-vue-next'
import BuiColorPicker from '../color-picker/BuiColorPicker.vue'
import { HEX_REGEXP, HEX_REGEXP_NO_POUND } from '@/lib/colorUtils'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    id?: string
    defaultValue?: string
    disabled?: boolean
    ui?: {
      badgeClass?: string
      inputClass?: string
    }
  }>(),
  {
    defaultValue: '#FFFFFF',
    disabled: false
  }
)

const modelValue = defineModel<string>(undefined)

const paletteBadge = ref<HTMLDivElement | null>(null)
const { width } = useElementBounding(paletteBadge)
const MAGIC_NUMBER = 12 // 8 (right-2) + 4 (just some offset)

const validatedDefaultValue = () => {
  if (modelValue.value && HEX_REGEXP.test(modelValue.value)) return modelValue.value

  if (props.defaultValue && HEX_REGEXP.test(props.defaultValue)) return props.defaultValue

  return '#FFFFFF'
}

const writtenColor = ref<string>(validatedDefaultValue().substring(1))
const pickedColor = ref<string>(validatedDefaultValue())

watch(writtenColor, () => {
  if (HEX_REGEXP_NO_POUND.test(writtenColor.value)) {
    modelValue.value = `#${writtenColor.value}`
    pickedColor.value = `#${writtenColor.value}`
  }
})

watch(pickedColor, () => {
  modelValue.value = pickedColor.value
  writtenColor.value = pickedColor.value.substring(1)
})
</script>

<template>
  <BuiPopover>
    <BuiPopoverTrigger>
      <div class="nowrap text-foreground relative flex w-32 flex-row font-medium uppercase">
        <div
          ref="paletteBadge"
          :class="cn('absolute top-1.5 left-2 flex flex-row items-center gap-1', ui?.badgeClass)"
        >
          <PaletteIcon class="h-4 w-4 shrink-0" />
          <div class="h-4 w-4 rounded-sm" :style="{ backgroundColor: pickedColor }"></div>
          <div class="text-foreground/[.56] font-bold">#</div>
        </div>
        <BuiInput
          v-model="writtenColor"
          :id="id"
          :style="{ paddingLeft: width + MAGIC_NUMBER + 'px' }"
          :disabled="disabled"
          :class="ui?.inputClass"
        />
      </div>
    </BuiPopoverTrigger>
    <BuiPopoverContent class="w-fit" align="start">
      <BuiColorPicker
        v-model="pickedColor"
        format="hex"
        :disabled="disabled"
        :ui="{ selectorClass: 'ring-popover', trackClass: 'ring-popover' }"
      />
    </BuiPopoverContent>
  </BuiPopover>
</template>
