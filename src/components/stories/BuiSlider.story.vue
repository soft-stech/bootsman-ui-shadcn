<script setup lang="ts">
import { BuiSlider } from '@/index'
import { cn } from '@/lib/utils'
import { ref } from 'vue'

const modelValue = ref([50])
</script>

<template>
  <Story title="BuiSlider" autoPropsDisabled :layout="{ type: 'grid', width: '50%' }">
    <Variant title="Default">
      <div class="m-4">
        <div class="mb-3">Value: {{ modelValue[0] }}</div>

        <BuiSlider
          v-model="modelValue"
          :max="100"
          :step="1"
          :class="cn('w-[100%]', $attrs.class ?? '')"
        />
      </div>
    </Variant>
  </Story>
</template>
