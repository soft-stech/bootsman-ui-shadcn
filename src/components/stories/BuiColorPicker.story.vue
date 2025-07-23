<script setup lang="ts">
import BuiColorPicker from '@/components/ui/color-picker/BuiColorPicker.vue'
import {
  BuiButton,
  BuiPopover,
  BuiPopoverTrigger,
  BuiPopoverContent,
  BuiSelect,
  BuiSelectContent,
  BuiSelectGroup,
  BuiSelectItem,
  BuiSelectTrigger,
  BuiSelectValue
} from '@/index'
import { ref } from 'vue'

const sizes: {
  name: string
  value: 'lg' | 'sm' | 'xs' | 'md' | 'xl'
}[] = [
  {
    name: 'Extra Small',
    value: 'xs'
  },
  {
    name: 'Small',
    value: 'sm'
  },
  {
    name: 'Medium',
    value: 'md'
  },
  {
    name: 'Large',
    value: 'lg'
  },
  {
    name: 'Extra Large',
    value: 'xl'
  }
]

const pickedColor = ref<string>('#29CCFF')
const currentSize = ref<'lg' | 'sm' | 'xs' | 'md' | 'xl' | undefined>(undefined)
</script>

<template>
  <Story title="BuiColorPicker" autoPropsDisabled :layout="{ type: 'grid', width: '33%' }">
    <Variant key="basic" title="Basic">
      <div class="flex flex-col gap-4 p-4">
        <BuiColorPicker />
      </div>
    </Variant>

    <Variant key="defaultColor" title="Default color">
      <div class="flex flex-col gap-4 p-4">
        <BuiColorPicker :defaultValue="'#29CCFF'" />
      </div>
    </Variant>

    <Variant key="disabled" title="Disabled">
      <div class="flex flex-col gap-4 p-4">
        <BuiColorPicker disabled />
      </div>
    </Variant>

    <Variant key="sizes" title="Available sizes">
      <div class="flex flex-col gap-4 p-4">
        <BuiSelect v-model="currentSize">
          <BuiSelectTrigger class="w-[180px]">
            <BuiSelectValue placeholder="Select size" />
          </BuiSelectTrigger>
          <BuiSelectContent>
            <BuiSelectGroup>
              <BuiSelectItem v-for="size in sizes" :key="size.value" :value="size.value">
                {{ size.name }}
              </BuiSelectItem>
            </BuiSelectGroup>
          </BuiSelectContent>
        </BuiSelect>

        <BuiColorPicker :size="currentSize" :defaultValue="'#008422'" />
      </div>
    </Variant>
    <Variant key="withPopover" title="With Popover">
      <div class="flex w-full flex-row justify-center pt-4">
        <BuiPopover>
          <BuiPopoverTrigger>
            <BuiButton
              variant="outline"
              class="flex flex-row gap-2 text-sm"
              :style="{ color: pickedColor, borderColor: pickedColor }"
            >
              <span :style="{ backgroundColor: pickedColor }" class="size-3 rounded-full" />
              <span>Pick a color</span>
            </BuiButton>
          </BuiPopoverTrigger>
          <BuiPopoverContent class="w-80">
            <div class="flex flex-col gap-4 p-4">
              <BuiColorPicker v-model="pickedColor" />
            </div>
          </BuiPopoverContent>
        </BuiPopover>
      </div>
    </Variant>
  </Story>
</template>
