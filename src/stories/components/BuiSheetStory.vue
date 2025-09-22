<script setup lang="ts">
import {
  BuiSheet,
  BuiSheetClose,
  BuiSheetContent,
  BuiSheetDescription,
  BuiSheetFooter,
  BuiSheetHeader,
  BuiSheetTitle,
  BuiSheetTrigger
} from '@/components/sheet'
import BuiButton from '@/components/button/BuiButton.vue'

const props = defineProps<{
  side?: 'top' | 'right' | 'bottom' | 'left' | null
}>()
</script>

<template>
  <BuiSheet>
    <BuiSheetTrigger as-child>
      <BuiButton variant="outline"> {{ side }} </BuiButton>
    </BuiSheetTrigger>
    <BuiSheetContent :side="side">
      <BuiSheetHeader>
        <BuiSheetTitle>Bootsman</BuiSheetTitle>
        <BuiSheetDescription> what is Bootsman? </BuiSheetDescription>
      </BuiSheetHeader>
      <div class="flex w-full py-4">
        Bootsman is designed for managing kubernetes multi-clusters with a set of ready-made tools
        for deployment, monitoring, load balancing, auto-scaling of container loads, strict security
        policies and backup.
      </div>
      <BuiSheetFooter>
        <BuiSheetClose as-child>
          <BuiButton type="submit"> Close sheet </BuiButton>
        </BuiSheetClose>
      </BuiSheetFooter>
    </BuiSheetContent>
  </BuiSheet>
</template>
