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
import { BuiPopover, BuiPopoverContent, BuiPopoverTrigger } from '@/components/popover'
import { cn } from '@/lib/utils'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' }
]

const open = ref(false)
const value = ref<string>('')
</script>

<template>
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
                  cn('ml-auto h-4 w-4', value === framework.value ? 'opacity-100' : 'opacity-0')
                "
              />
            </BuiCommandItem>
          </BuiCommandGroup>
        </BuiCommandList>
      </BuiCommand>
    </BuiPopoverContent>
  </BuiPopover>
</template>
