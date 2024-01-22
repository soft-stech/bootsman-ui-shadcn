<script setup lang="ts">
import { ref } from 'vue'
import { BuiCalendar } from '@/components/ui/calendar'
import { logEvent } from 'histoire/client'

const date = ref(new Date())

const range = ref({
  start: new Date(2020, 0, 6),
  end: new Date(2020, 0, 10)
})

const rules = ref([
  {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  },
  {
    hours: 23,
    minutes: 59,
    seconds: 59,
    milliseconds: 999
  }
])
</script>

<template>
  <Story title="BuiCalendar" autoPropsDisabled :layout="{ type: 'grid', width: '50%' }">
    <Variant :key="`variant-default`" :title="`With time`">
      <div class="flex min-h-[350px] w-full items-center justify-center p-10">
        <BuiCalendar v-model="date" mode="dateTime" is24hr />
      </div>
    </Variant>

    <Variant :key="`variant-range`" :title="`Range`">
      <div class="flex min-h-[350px] w-full items-center justify-center p-10">
        <BuiCalendar v-model.range="range" :rules="rules" />
      </div>
    </Variant>
  </Story>
</template>
