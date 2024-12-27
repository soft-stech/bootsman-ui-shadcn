<script setup lang="ts">
import BuiSheet from '@/components/ui/sheet/BuiSheet.vue'
import BuiSheetClose from '@/components/ui/sheet/BuiSheetClose.vue'
import BuiSheetContent from '@/components/ui/sheet/BuiSheetContent.vue'
import BuiSheetDescription from '@/components/ui/sheet/BuiSheetDescription.vue'
import BuiSheetFooter from '@/components/ui/sheet/BuiSheetFooter.vue'
import BuiSheetHeader from '@/components/ui/sheet/BuiSheetHeader.vue'
import BuiSheetTitle from '@/components/ui/sheet/BuiSheetTitle.vue'
import BuiSheetTrigger from '@/components/ui/sheet/BuiSheetTrigger.vue'
import BuiButton from '@/components/ui/button/BuiButton.vue'

const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const
</script>

<template>
  <Story title="BuiSheet" autoPropsDisabled :layout="{ type: 'grid', width: '50%' }">
    <Variant v-for="side in SHEET_SIDES" :key="side" :title="side">
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
            Bootsman is designed for managing kubernetes multi-clusters with a set of ready-made
            tools for deployment, monitoring, load balancing, auto-scaling of container loads,
            strict security policies and backup.
          </div>
          <BuiSheetFooter>
            <BuiSheetClose as-child>
              <BuiButton type="submit"> Close sheet </BuiButton>
            </BuiSheetClose>
          </BuiSheetFooter>
        </BuiSheetContent>
      </BuiSheet>
    </Variant>
  </Story>
</template>
