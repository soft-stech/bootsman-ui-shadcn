<script setup lang="ts">
import { BuiButton } from '@/components/button'
import {
  BuiCommand,
  BuiCommandEmpty,
  BuiCommandGroup,
  BuiCommandInput,
  BuiCommandItem,
  BuiCommandList,
  BuiCommandNewItem
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
import { CheckIcon, ChevronDown, CirclePlusIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import { z } from 'zod'

const search = ref<string>('')
const formSchema = z.object({
  namespace: z.string().min(2),
  groups: z.array(z.string())
})
const isGroupsPopoverOpen = ref(false)
const existingGroups = ref(['group-1', 'group-2', 'group-3'])
</script>

<template>
  <BuiForm :validation-schema="formSchema" :initial-values="{ groups: ['group-1'] }">
    <BuiFormField v-slot="{ meta, validate, value, setValue }" name="groups">
      <BuiFormItem class="w-full">
        <BuiLabel :for="`groups`" class="flex gap-2">
          <div class="flex">Groups</div>
        </BuiLabel>

        <BuiPopover
          v-model:open="isGroupsPopoverOpen"
          @update:open="
            (isOpen) => {
              if (!isOpen) {
                validate()
              }
            }
          "
        >
          <BuiPopoverTrigger :id="`groups`" as-child>
            <BuiButton
              variant="outline"
              size="lg"
              role="combobox"
              :aria-expanded="isGroupsPopoverOpen"
              class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm whitespace-nowrap text-inherit hover:bg-transparent focus:ring-2 focus:ring-offset-2 focus:outline-hidden active:bg-transparent active:ring-0 active:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 [&>span]:min-w-0 [&>span]:truncate"
              :class="!meta.valid && meta.validated ? 'border-destructive-foreground!' : ''"
            >
              <span>
                {{ value.length ? value.join(', ') : 'Select multiple or add' }}
              </span>
              <ChevronDown class="h-4 w-4 shrink-0 opacity-50" />
            </BuiButton>
          </BuiPopoverTrigger>

          <BuiPopoverContent class="w-(--reka-popper-anchor-width) p-0">
            <BuiCommand class="p-0">
              <BuiCommandInput
                v-model="search"
                class="h-9"
                placeholder="Search or create new"
                @input="(event: Event) => (search = (event.target as HTMLInputElement).value)"
              />
              <BuiCommandEmpty class="flex w-full py-1 pl-1">
                <BuiCommandNewItem
                  v-if="search"
                  @create="
                    () => {
                      setValue([...value, search])
                      existingGroups = [...existingGroups, search]
                      search = ''
                      isGroupsPopoverOpen = false
                    }
                  "
                >
                  <CirclePlusIcon class="mr-2 h-4 w-4" />
                  <span>Create "{{ search }}"</span>
                </BuiCommandNewItem>
              </BuiCommandEmpty>
              <BuiFormControl>
                <BuiCommandList>
                  <BuiCommandGroup>
                    <BuiCommandNewItem
                      v-if="search"
                      @create="
                        () => {
                          setValue([...value, search])
                          existingGroups = [...existingGroups, search]
                          search = ''
                          isGroupsPopoverOpen = false
                        }
                      "
                    >
                      <CirclePlusIcon class="mr-2 h-4 w-4" />
                      <span>Create "{{ search }}"</span>
                    </BuiCommandNewItem>

                    <BuiCommandItem
                      v-for="element in existingGroups"
                      :key="element"
                      :value="element"
                      @select="
                        () => {
                          if (value.includes(element)) {
                            setValue(value.filter((item: string) => item !== element))
                          } else {
                            setValue([...value, element])
                          }

                          isGroupsPopoverOpen = false
                        }
                      "
                    >
                      <CheckIcon
                        class="mr-2 h-4 w-4"
                        :class="value.includes(element) ? 'opacity-100' : 'opacity-0'"
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
