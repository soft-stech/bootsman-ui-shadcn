<script setup lang="ts">
import {
  BuiAccordion,
  BuiAccordionContent,
  BuiAccordionItem,
  BuiAdvancedAccordionTrigger
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
    <BuiAccordionItem value="item-1" class="border-orange-400">
      <BuiAdvancedAccordionTrigger
        border-color-class="border-orange-400"
        bg-color-class="bg-orange-400/16"
        description-color-class="text-orange-400"
        icon-bg-class="bg-orange-400"
      >
        Member Roles

        <template #description>
          Control who has access to the cluster and what permission they have to change it
        </template>
      </BuiAdvancedAccordionTrigger>

      <BuiAccordionContent>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus a voluptatem, ipsa autem
        aspernatur beatae fugiat deleniti laborum dolorem obcaecati necessitatibus harum dolore
        error! Perferendis nostrum eius eligendi dolorum reprehenderit?
      </BuiAccordionContent>
    </BuiAccordionItem>
    <BuiAccordionItem value="item-2" class="border-orange-400" :disabled="true">
      <BuiAdvancedAccordionTrigger
        border-color-class="border-orange-400"
        bg-color-class="bg-orange-400/16"
        description-color-class="text-orange-400"
        icon-bg-class="bg-orange-400"
        :is-disabled-as-normal="true"
        :is-icon-hidden="true"
      >
        Member Roles

        <template #description>
          Control who has access to the cluster and what permission they have to change it
        </template>
        <template #actions>
          <BuiButton
            variant="outline"
            class="border-orange-400 text-orange-400"
            @click="
              () => {
                console.log('click')
              }
            "
          >
            LOG: click
          </BuiButton>
        </template>
      </BuiAdvancedAccordionTrigger>
    </BuiAccordionItem>
  </BuiAccordion>
</template>
