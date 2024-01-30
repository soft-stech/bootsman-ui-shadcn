<script setup lang="ts">
import { BuiAvatar, BuiAvatarImage, BuiAvatarFallback } from '@/components/ui/avatar'

const shapeOptions = ['circle', 'square'] as const
const sizes: {
  name: string
  value: 'lg' | 'base' | 'sm'
}[] = [
  {
    name: 'Small',
    value: 'sm'
  },
  {
    name: 'Base',
    value: 'base'
  },
  {
    name: 'Large',
    value: 'lg'
  }
]
</script>

<template>
  <Story title="BuiAvatar" autoPropsDisabled :layout="{ type: 'grid', width: '33%' }">
    <div v-for="shape in shapeOptions" :title="shape" :key="`${shape}`">
      <div v-for="size in sizes" :key="`${shape}-${size.value}`">
        <Variant :key="`shape-${shape}-{${size.value}`" :title="`${shape} ${size.value}`">
          <BuiAvatar :shape="shape" :size="size.value">
            <BuiAvatarImage src="/src/assets/logo.png" alt="Bootsman" />
            <BuiAvatarFallback>B</BuiAvatarFallback>
          </BuiAvatar>
        </Variant>
      </div>
    </div>

    <Variant title="Fallback example">
      <BuiAvatar>
        <BuiAvatarImage src="/src/assets/logo-xxx.png" alt="Bootsman" />
        <BuiAvatarFallback>B</BuiAvatarFallback>
      </BuiAvatar>
    </Variant>
  </Story>
</template>
