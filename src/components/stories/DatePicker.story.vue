<script setup lang="ts">
import { BuiButton, BuiCalendar, BuiPopover, BuiPopoverContent, BuiPopoverTrigger } from '@/index'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const date = ref<Date>()
</script>

<template>
  <Story title="Date Picker" autoPropsDisabled>
    <Variant :key="`variant-default`" :title="`BuiPopover + BuiCalendar`">
      <div class="flex justify-center pt-12">
        <BuiPopover>
          <BuiPopoverTrigger as-child>
            <BuiButton
              :variant="'outline'"
              :class="
                cn(
                  'w-[280px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )
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
      </div>
    </Variant>
  </Story>
</template>
