<script setup lang="ts">
import {
  BuiAccordion,
  BuiAccordionContent,
  BuiAccordionItem,
  BuiAccordionTrigger
} from '@/components/accordion'
import BuiButton from '@/components/button/BuiButton.vue'

const props = defineProps<{
  disabled?: boolean
  collapsible?: boolean
  type?: 'single' | 'multiple'
  orientation?: 'horizontal' | 'vertical'
  class?: string
}>()
</script>

<template>
  <BuiAccordion v-bind="props">
    <BuiAccordionItem value="item-1">
      <BuiAccordionTrigger>
        Member Roles

        <template #description>
          Control who has access to the cluster and what permission they have to change it
        </template>
      </BuiAccordionTrigger>

      <BuiAccordionContent>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus a voluptatem, ipsa autem
        aspernatur beatae fugiat deleniti laborum dolorem obcaecati necessitatibus harum dolore
        error! Perferendis nostrum eius eligendi dolorum reprehenderit?
      </BuiAccordionContent>
    </BuiAccordionItem>
    <BuiAccordionItem value="item-2">
      <BuiAccordionTrigger> Container Default Resource Limit </BuiAccordionTrigger>

      <BuiAccordionContent>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus a voluptatem, ipsa autem
        aspernatur beatae fugiat deleniti laborum dolorem obcaecati necessitatibus harum dolore
        error! Perferendis nostrum eius eligendi dolorum reprehenderit?
      </BuiAccordionContent>
    </BuiAccordionItem>

    <BuiAccordionItem value="item-3">
      <BuiAccordionTrigger>
        Resource Quotas

        <template #description>
          Define the admission control mode you want to use for the pod security
        </template>

        <template #actions>
          <BuiButton size="sm" variant="outline">Review</BuiButton>
        </template>
      </BuiAccordionTrigger>

      <BuiAccordionContent>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus a voluptatem, ipsa autem
        aspernatur beatae fugiat deleniti laborum dolorem obcaecati necessitatibus harum dolore
        error! Perferendis nostrum eius eligendi dolorum reprehenderit?
      </BuiAccordionContent>
    </BuiAccordionItem>
  </BuiAccordion>
</template>
