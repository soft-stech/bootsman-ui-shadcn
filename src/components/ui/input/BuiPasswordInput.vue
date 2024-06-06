<script setup lang="ts">
import { BuiInput, inputVariants } from '@/components/ui/input/index'
import { type HTMLAttributes, ref } from 'vue'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'

const type = ref('password')
function togglePasswordShow() {
  if (type.value === 'password') {
    type.value = 'text'
  } else {
    type.value = 'password'
  }
}
</script>

<template>
  <div class="relative flex">
    <BuiInput v-bind="$attrs" :type="type" />
    <span
      @click="togglePasswordShow"
      class="absolute right-3 top-0 flex h-full items-center justify-center"
    >
      <EyeIcon v-if="type === 'password'" class="h-4 w-4" />
      <EyeOffIcon v-else class="h-4 w-4" />
    </span>
  </div>
</template>
