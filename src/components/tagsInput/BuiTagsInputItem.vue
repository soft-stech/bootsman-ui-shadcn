<script setup lang="ts">
import type { TagsInputItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

import { reactiveOmit } from '@vueuse/core'
import { TagsInputItem, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<TagsInputItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TagsInputItem
    v-bind="forwardedProps"
    :class="
      cn(
        'text-foreground bg-primary/8 hover:bg-primary/16 dark:bg-primary/30 dark:hover:bg-primary/65 flex h-6 items-center justify-center gap-1 rounded-sm leading-5',
        props.class
      )
    "
  >
    <slot />
  </TagsInputItem>
</template>
