<script setup lang="ts">
import { BuiButton } from '@/components/button'
import { BuiCalendar } from '@/components/calendar'
import { BuiPopover, BuiPopoverContent, BuiPopoverTrigger } from '@/components/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const date = ref<Date>()
</script>

<template>
  <BuiPopover>
    <BuiPopoverTrigger as-child>
      <BuiButton
        :variant="'outline'"
        :class="
          cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <span>{{ date ? date.toLocaleDateString() : 'Pick a date' }}</span>
      </BuiButton>
    </BuiPopoverTrigger>
    <BuiPopoverContent class="w-auto p-0">
      <BuiCalendar v-model="date" />
    </BuiPopoverContent>
  </BuiPopover>
</template>
