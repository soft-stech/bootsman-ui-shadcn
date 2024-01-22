<script setup lang="ts">
import {
  BuiButton,
  BuiPopover,
  BuiPopoverTrigger,
  BuiPopoverContent,
  BuiLabel,
  BuiInput
} from '@/index'
</script>

<template>
  <Story title="BuiPopover" autoPropsDisabled>
    <Variant :key="`variant-default`" :title="`Popover`">
      <div class="flex justify-center pt-12">
        <BuiPopover>
          <BuiPopoverTrigger>
            <BuiButton variant="outline"> Open popover </BuiButton>
          </BuiPopoverTrigger>
          <BuiPopoverContent class="w-80">
            <div class="grid gap-4">
              <div class="space-y-2">
                <h4 class="font-medium leading-none">Dimensions</h4>
                <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
              </div>
              <div class="grid gap-2">
                <div class="grid grid-cols-3 items-center gap-4">
                  <BuiLabel for="width">Width</BuiLabel>
                  <BuiInput id="width" type="text" default-value="100%" class="col-span-2 h-8" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <BuiLabel for="maxWidth">Max. width</BuiLabel>
                  <BuiInput
                    id="maxWidth"
                    type="text"
                    default-value="300px"
                    class="col-span-2 h-8"
                  />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <BuiLabel for="height">Height</BuiLabel>
                  <BuiInput id="height" type="text" default-value="25px" class="col-span-2 h-8" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <BuiLabel for="maxHeight">Max. height</BuiLabel>
                  <BuiInput
                    id="maxHeight"
                    type="text"
                    default-value="none"
                    class="col-span-2 h-8"
                  />
                </div>
              </div>
            </div>
          </BuiPopoverContent>
        </BuiPopover>
      </div>
    </Variant>
  </Story>
</template>
