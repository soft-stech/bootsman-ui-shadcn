<script setup lang="ts">
import { BuiCollapsible, BuiCollapsibleContent, BuiCollapsibleTrigger, BuiButton } from '@/index'
import { ChevronsUpDown } from 'lucide-vue-next'
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <Story title="BuiCollapsible" autoPropsDisabled>
    <Variant :key="`variant-default`" :title="`Default`">
      <div class="flex justify-center pt-12">
        <BuiCollapsible v-model:open="isOpen" class="w-[350px] space-y-2">
          <div class="flex items-center justify-between space-x-4 px-4">
            <h4 class="text-sm font-semibold">@peduarte starred 3 repositories</h4>
            <BuiCollapsibleTrigger as-child>
              <BuiButton variant="ghost" size="sm" class="w-9 p-0">
                <ChevronsUpDown class="h-4 w-4" />
                <span class="sr-only">Toggle</span>
              </BuiButton>
            </BuiCollapsibleTrigger>
          </div>
          <div class="rounded-md border px-4 py-3 font-mono text-sm">@reka-ui/primitives</div>
          <BuiCollapsibleContent class="space-y-2">
            <div class="rounded-md border px-4 py-3 font-mono text-sm">@reka-ui/colors</div>
            <div class="rounded-md border px-4 py-3 font-mono text-sm">@stitches/react</div>
          </BuiCollapsibleContent>
        </BuiCollapsible>
      </div>
    </Variant>
  </Story>
</template>
