<script setup lang="ts">
import BuiButton from '@/components/ui/button/BuiButton.vue'

const variantOptions = ['default', 'outline', 'ghost'] as const
const sizes: {
  name: string
  value: 'lg' | 'default' | 'sm'
}[] = [
  {
    name: 'Large',
    value: 'lg'
  },
  {
    name: 'Default',
    value: 'default'
  },
  {
    name: 'Small',
    value: 'sm'
  }
]
</script>

<template>
  <Story title="BuiButton" autoPropsDisabled :layout="{ type: 'grid', width: '33%' }">
    <div v-for="variant in variantOptions" :title="variant" :key="`${variant}`">
      <div v-for="size in sizes" :key="`${variant}-${size.value}`">
        <Variant :key="`variant-${variant}-{${size.value}`" :title="`${variant} ${size.value}`">
          <BuiButton :variant="variant" :size="size.value" class="m-1"> Button text </BuiButton>
        </Variant>
      </div>
    </div>

    <div v-for="variant in variantOptions" :title="variant" :key="`disabled-${variant}`">
      <div v-for="size in sizes" :key="`disabled-${variant}-${size.value}`">
        <Variant
          :key="`disabled-variant-${variant}-{${size.value}`"
          :title="`Disabled ${variant} ${size.value}`"
        >
          <BuiButton :variant="variant" :size="size.value" disabled> Button text </BuiButton>
        </Variant>
      </div>
    </div>
  </Story>
</template>
