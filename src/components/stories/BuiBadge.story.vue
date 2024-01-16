<script setup lang="ts">
import BuiBadge from '@/components/ui/badge/BuiBadge.vue'
import { logEvent } from 'histoire/client'
</script>

<template>
  <Story title="BuiBadge" autoPropsDisabled :layout="{ type: 'grid', width: '50%' }">
    <Variant :key="`variant`" :title="`Default`">
      <BuiBadge>Name tag</BuiBadge>
    </Variant>

    <Variant :key="`variant`" :title="`Dissmisable`">
      <BuiBadge dissmisable @close="logEvent('close', $event)">Name tag</BuiBadge>
    </Variant>
  </Story>
</template>
