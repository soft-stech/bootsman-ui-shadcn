<script setup lang="ts">
import { BuiInput } from '@/components/input/index'
import { cn } from '@/lib/utils'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import BuiButton from '@/components/button/BuiButton.vue'

const props = defineProps<{
  defaultValue?: 'password' | 'text'
  showPasswordTranslation?: string
  hidePasswordTranslation?: string
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

const showPasswordText = computed(() => props.showPasswordTranslation ?? 'Show password')
const hidePasswordText = computed(() => props.hidePasswordTranslation ?? 'Hide password')
</script>

<template>
  <div class="relative flex">
    <BuiInput v-bind="$attrs" :type="type" :class="cn($attrs.class ?? '', 'pr-8')" />
    <BuiButton
      @click="togglePasswordShow"
      variant="none"
      class="text-muted-foreground hover:text-foreground absolute top-0 right-3 flex h-fit h-full w-fit items-center justify-center p-0"
      :aria-label="type === 'password' ? showPasswordText : hidePasswordText"
      :aria-pressed="type !== 'password'"
    >
      <EyeIcon
        v-if="type === 'password'"
        class="pointer-events-none h-4 w-4 shrink-0 cursor-pointer"
      />
      <EyeOffIcon v-else class="pointer-events-none h-4 w-4 shrink-0 cursor-pointer" />
    </BuiButton>
  </div>
</template>
