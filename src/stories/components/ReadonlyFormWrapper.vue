<script setup lang="ts">
import { FORM_READONLY_INJECTION_KEY } from '@/components/form'
import { provide, ref, watchEffect } from 'vue'

const props = defineProps<{
  readonly?: boolean
}>()

const readonly = ref(props.readonly)
watchEffect(() => (readonly.value = props.readonly))

provide(FORM_READONLY_INJECTION_KEY, readonly)
</script>

<template>
  <slot name="default" />
</template>
