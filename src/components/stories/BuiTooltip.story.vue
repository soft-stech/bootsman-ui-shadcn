<script setup lang="ts">
import {
  BuiButton,
  BuiTooltip,
  BuiTooltipContent,
  BuiTooltipProvider,
  BuiTooltipTrigger
} from '@/index'
</script>

<template>
  <Story title="BuiTooltip" autoPropsDisabled>
    <Variant :key="`variant-default`" :title="`Tooltip`">
      <div class="flex justify-center pt-12">
        <BuiTooltipProvider>
          <BuiTooltip>
            <BuiTooltipTrigger as-child>
              <BuiButton variant="outline"> Hover </BuiButton>
            </BuiTooltipTrigger>
            <BuiTooltipContent>
              <p>Hello there</p>
            </BuiTooltipContent>
          </BuiTooltip>
        </BuiTooltipProvider>
      </div>
    </Variant>
  </Story>
</template>
