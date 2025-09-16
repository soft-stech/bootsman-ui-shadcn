<script setup lang="ts">
import { BuiButton } from '@/components/ui/button'
import { useBuiField } from '@/components/ui/form'
import { BuiLabel } from '@/components/ui/label'

const { value: value1, handleChange: handleChange1 } = useBuiField('meta.field')
const { value: value2, handleChange: handleChange2 } = useBuiField('example')
</script>

<template>
  <div class="rounded px-4 py-4 shadow-sm">
    <h2 class="mb-2 text-lg">Sub form</h2>
    <div class="flex items-center justify-between space-y-2">
      <BuiLabel>Field 1:</BuiLabel> {{ value1 }}
      <BuiButton @click="handleChange1('New value for field 1')">Change Field 1</BuiButton>
    </div>
    <div class="flex items-center justify-between space-y-2">
      <BuiLabel>Field 2:</BuiLabel> {{ value2 }}
      <BuiButton @click="handleChange2('New value for field 2')">Change Field 2</BuiButton>
    </div>
  </div>
</template>
