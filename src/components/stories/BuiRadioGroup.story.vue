<script setup lang="ts">
import { BuiRadioGroup, BuiRadioGroupItem, BuiLabel } from '@/index'
</script>

<template>
  <Story title="BuiRadioGroup" autoPropsDisabled :layout="{ type: 'grid', width: '50%' }">
    <Variant :key="`variant`" :title="`Radio Group`">
      <BuiRadioGroup default-value="option-one">
        <div class="flex items-center space-x-2">
          <BuiRadioGroupItem id="option-one" value="option-one" />
          <BuiLabel for="option-one">Option One</BuiLabel>
        </div>
        <div class="flex items-center space-x-2">
          <BuiRadioGroupItem id="option-two" value="option-two" />
          <BuiLabel for="option-two">Option Two</BuiLabel>
        </div>
        <div class="flex items-center space-x-2">
          <BuiRadioGroupItem id="option-three" value="option-three" disabled />
          <BuiLabel for="option-three" class="opacity-50">Option Three Disabled</BuiLabel>
        </div>
      </BuiRadioGroup>
    </Variant>
  </Story>
</template>
