<script setup lang="ts">
import { useEmitAsProps } from 'reka-ui'
import type { DialogRootEmits, DialogRootProps } from 'reka-ui'
import Command from './BuiCommand.vue'
import { BuiDialog, BuiDialogContent } from '@/components/ui/dialog'

const props = defineProps<DialogRootProps>()
const emits = defineEmits<DialogRootEmits>()

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <BuiDialog v-bind="{ ...props, ...emitsAsProps }">
    <BuiDialogContent class="overflow-hidden p-0 shadow-level2">
      <Command
        class="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
      >
        <slot />
      </Command>
    </BuiDialogContent>
  </BuiDialog>
</template>
