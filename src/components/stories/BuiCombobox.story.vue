<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { BuiButton } from '@/components/ui/button'
import {
  BuiCommand,
  BuiCommandEmpty,
  BuiCommandGroup,
  BuiCommandInput,
  BuiCommandItem,
  BuiCommandList
} from '@/components/ui/command'
import { BuiPopover, BuiPopoverContent, BuiPopoverTrigger } from '@/components/ui/popover'
import { CheckIcon, ChevronsUpDownIcon, ChevronDown } from 'lucide-vue-next'
import {
  BuiForm,
  BuiFormField,
  BuiFormMessage,
  BuiFormItem,
  BuiFormControl
} from '@/components/ui/form'
import { BuiLabel } from '@/components/ui/label'
import { toTypedSchema } from '@vee-validate/zod'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' }
]

const open = ref(false)
const value = ref<string>('')

const formSchema = toTypedSchema(
  z.object({
    namespace: z.string().min(2)
  })
)
const isNamespacesPopoverOpen = ref(false)
const namespaces = ['default', 'local', 'my-namespace']

// const filterFunction = (list: typeof frameworks, search: string) => list.filter(i => i.value.toLowerCase().includes(search.toLowerCase()))
</script>

<template>
  <Story title="BuiCombobox" autoPropsDisabled>
    <Variant :key="`variant-default`" :title="`BuiPopover + BuiCommand`">
      <div class="flex justify-center p-12">
        <BuiPopover v-model:open="open">
          <BuiPopoverTrigger as-child>
            <BuiButton
              variant="outline"
              role="combobox"
              :aria-expanded="open"
              class="w-[200px] justify-between"
            >
              {{
                value
                  ? frameworks.find((framework) => framework.value === value)?.label
                  : 'Select framework...'
              }}
              <ChevronsUpDownIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </BuiButton>
          </BuiPopoverTrigger>
          <BuiPopoverContent class="w-[200px] p-0">
            <BuiCommand>
              <BuiCommandInput class="h-9" placeholder="Search framework..." />
              <BuiCommandEmpty>No framework found.</BuiCommandEmpty>
              <BuiCommandList>
                <BuiCommandGroup>
                  <BuiCommandItem
                    v-for="framework in frameworks"
                    :key="framework.value"
                    :value="framework.value"
                    @select="
                      (ev) => {
                        if (typeof ev.detail.value === 'string') {
                          value = ev.detail.value
                        }
                        open = false
                      }
                    "
                  >
                    {{ framework.label }}
                    <CheckIcon
                      :class="
                        cn(
                          'ml-auto h-4 w-4',
                          value === framework.value ? 'opacity-100' : 'opacity-0'
                        )
                      "
                    />
                  </BuiCommandItem>
                </BuiCommandGroup>
              </BuiCommandList>
            </BuiCommand>
          </BuiPopoverContent>
        </BuiPopover>
      </div>
    </Variant>
    <Variant key="select-style" title="Select style + form fields">
      <div class="p-4">
        <BuiForm :validation-schema="formSchema" :initial-values="{ namespace: '' }">
          <BuiFormField name="namespace" v-slot="{ componentField, meta, validate }">
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
                <BuiPopoverTrigger as-child :id="`namespace`">
                  <BuiButton
                    variant="outline"
                    size="lg"
                    role="combobox"
                    :aria-expanded="isNamespacesPopoverOpen"
                    class="flex h-10 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm text-inherit ring-offset-background placeholder:text-muted-foreground hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:bg-transparent active:outline-none active:ring-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:min-w-0 [&>span]:truncate"
                    :class="!meta.valid && meta.validated ? '!border-destructive-foreground' : ''"
                  >
                    <span>
                      {{ componentField.modelValue ? componentField.modelValue : 'Select' }}
                    </span>
                    <ChevronDown class="h-4 w-4 flex-shrink-0 opacity-50" />
                  </BuiButton>
                </BuiPopoverTrigger>

                <BuiPopoverContent class="w-[var(--radix-popper-anchor-width)] p-0">
                  <BuiCommand class="p-0">
                    <BuiCommandInput class="h-9" placeholder="Search" />
                    <BuiCommandEmpty> No results </BuiCommandEmpty>
                    <BuiFormControl>
                      <BuiCommandList>
                        <BuiCommandGroup>
                          <BuiCommandItem
                            v-for="element in namespaces"
                            :value="element"
                            :key="element"
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
                              :class="
                                element === componentField.modelValue ? 'opacity-100' : 'opacity-0'
                              "
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
      </div>
    </Variant>
  </Story>
</template>
