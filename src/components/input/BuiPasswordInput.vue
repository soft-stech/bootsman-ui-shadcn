<script setup lang="ts">
import { BuiInput } from '@/components/input/index'
import { cn } from '@/lib/utils'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const props = defineProps<{
  defaultValue?: 'password' | 'text'
}>()

defineOptions({
  inheritAttrs: false
})

const type = ref(props.defaultValue ?? 'password')
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
      class="absolute top-0 right-3 flex h-full items-center justify-center"
    >
      <EyeIcon
        v-if="type === 'password'"
        class="h-4 w-4 cursor-pointer opacity-[0.56] hover:opacity-100"
      />
      <EyeOffIcon v-else class="h-4 w-4 cursor-pointer opacity-[0.56] hover:opacity-100" />
    </span>
  </div>
</template>
