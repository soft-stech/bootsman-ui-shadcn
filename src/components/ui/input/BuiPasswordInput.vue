<script setup lang="ts">
import { BuiInput } from '@/components/ui/input/index'
import { cn } from '@/lib/utils'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { ref } from 'vue'

defineOptions({
  inheritAttrs: false
})

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
    <BuiInput v-bind="$attrs" :type="type" :class="cn($attrs.class ?? '', 'pr-8')" />
    <span
      @click="togglePasswordShow"
      class="absolute right-3 top-0 flex h-full items-center justify-center"
    >
      <EyeIcon v-if="type === 'password'" class="h-4 w-4 cursor-pointer" />
      <EyeOffIcon v-else class="h-4 w-4 cursor-pointer" />
    </span>
  </div>
</template>
