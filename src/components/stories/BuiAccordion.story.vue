<script setup lang="ts">
import BuiAccordion from '@/components/ui/accordion/BuiAccordion.vue'
import BuiAccordionContent from '@/components/ui/accordion/BuiAccordionContent.vue'
import BuiAccordionItem from '@/components/ui/accordion/BuiAccordionItem.vue'
import BuiAccordionTrigger from '@/components/ui/accordion/BuiAccordionTrigger.vue'
import BuiButton from '@/components/ui/button/BuiButton.vue'
import BuiAdvancedAccordionTrigger from '@/components/ui/accordion/BuiAdvancedAccordionTrigger.vue'
</script>

<template>
  <Story title="BuiAccordion" autoPropsDisabled>
    <Variant title="Default">
      <BuiAccordion type="single" collapsible class="flex flex-col gap-4 px-2">
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

        <BuiAccordionItem value="item-2" disabled>
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
    </Variant>
    <Variant title="AdvancedTrigger">
      <BuiAccordion type="single" collapsible class="flex flex-col gap-4 px-2">
        <BuiAccordionItem value="item-1" class="border-orange-400">
          <BuiAdvancedAccordionTrigger
            border-color-class="border-orange-400"
            bg-color-class="bg-orange-400/[0.16]"
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
            bg-color-class="bg-orange-400/[0.16]"
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
    </Variant>
  </Story>
</template>
