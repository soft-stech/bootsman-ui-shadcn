<script setup lang="ts">
import { BuiButton } from '@/components/button'
import {
  BuiCommand,
  BuiCommandEmpty,
  BuiCommandGroup,
  BuiCommandInput,
  BuiCommandItem,
  BuiCommandList
} from '@/components/command'
import {
  BuiForm,
  BuiFormControl,
  BuiFormField,
  BuiFormItem,
  BuiFormMessage
} from '@/components/form'
import { BuiLabel } from '@/components/label'
import { BuiPopover, BuiPopoverContent, BuiPopoverTrigger } from '@/components/popover'
import { toTypedSchema } from '@vee-validate/zod'
import { CheckIcon, ChevronDown } from 'lucide-vue-next'
import { ref } from 'vue'
import { z } from 'zod'

const formSchema = toTypedSchema(
  z.object({
    namespace: z.string().min(2),
    groups: z.array(z.string())
  })
)
const isNamespacesPopoverOpen = ref(false)
const namespaces = ['default', 'local', 'my-namespace']
</script>

<template>
  <BuiForm :validation-schema="formSchema" :initial-values="{ namespace: '' }">
    <BuiFormField v-slot="{ componentField, meta, validate }" name="namespace">
      <BuiFormItem class="w-full">
        <BuiLabel :for="`namespace`" class="flex gap-2">
          <div class="flex">Namespace</div>
        </BuiLabel>

        <BuiPopover
          v-model:open="isNamespacesPopoverOpen"
          @update:open="
            (isOpen) => {
              if (!isOpen) {
                validate()
              }
            }
          "
        >
          <BuiPopoverTrigger :id="`namespace`" as-child>
            <BuiButton
              variant="outline"
              size="lg"
              role="combobox"
              :aria-expanded="isNamespacesPopoverOpen"
              class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm whitespace-nowrap text-inherit hover:bg-transparent focus:ring-2 focus:ring-offset-2 focus:outline-hidden active:bg-transparent active:ring-0 active:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 [&>span]:min-w-0 [&>span]:truncate"
              :class="!meta.valid && meta.validated ? 'border-destructive-foreground!' : ''"
            >
              <span>
                {{ componentField.modelValue ? componentField.modelValue : 'Select' }}
              </span>
              <ChevronDown class="h-4 w-4 shrink-0 opacity-50" />
            </BuiButton>
          </BuiPopoverTrigger>

          <BuiPopoverContent class="w-(--reka-popper-anchor-width) p-0">
            <BuiCommand class="p-0">
              <BuiCommandInput class="h-9" placeholder="Search" />
              <BuiCommandEmpty> No results </BuiCommandEmpty>
              <BuiFormControl>
                <BuiCommandList>
                  <BuiCommandGroup>
                    <BuiCommandItem
                      v-for="element in namespaces"
                      :key="element"
                      :value="element"
                      @select="
                        () => {
                          if (componentField['onUpdate:modelValue']) {
                            componentField['onUpdate:modelValue'](element)
                            isNamespacesPopoverOpen = false
                          }
                        }
                      "
                    >
                      <CheckIcon
                        class="mr-2 h-4 w-4"
                        :class="element === componentField.modelValue ? 'opacity-100' : 'opacity-0'"
                      />
                      {{ element }}
                    </BuiCommandItem>
                  </BuiCommandGroup>
                </BuiCommandList>
              </BuiFormControl>
            </BuiCommand>
          </BuiPopoverContent>

          <BuiFormMessage />
        </BuiPopover>
      </BuiFormItem>
    </BuiFormField>
  </BuiForm>
</template>
