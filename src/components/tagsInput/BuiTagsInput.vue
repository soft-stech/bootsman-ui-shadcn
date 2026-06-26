<script setup lang="ts">
import type { TagsInputRootEmits, TagsInputRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TagsInputRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import { tagsInputVariants } from '.'

const props = defineProps<
  TagsInputRootProps & {
    class?: HTMLAttributes['class']
    variant?: NonNullable<Parameters<typeof tagsInputVariants>[0]>['variant']
    readonly?: boolean | 'true' | 'false'
    disabled?: boolean
    placeholder?: string
  }
>()
const emits = defineEmits<TagsInputRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TagsInputRoot
    v-slot="slotProps"
    v-bind="forwarded"
    :class="
      cn(
        'group',
        tagsInputVariants({ variant }),
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-30 data-[disabled]:dark:opacity-55',
        props.readonly && 'pointer-events-none opacity-30 dark:opacity-55',
        props.class
      )
    "
  >
    <slot v-bind="slotProps" />
  </TagsInputRoot>
</template>
