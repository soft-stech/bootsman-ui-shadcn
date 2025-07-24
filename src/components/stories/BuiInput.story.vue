<script setup lang="ts">
import BuiInput from '@/components/ui/input/BuiInput.vue'
import BuiLabel from '@/components/ui/label/BuiLabel.vue'
import { BuiPasswordInput } from '@/components/ui/input'
import { BuiBadgedInput } from '@/components/ui/input'
import { BuiColorInput } from '@/components/ui/input'
</script>

<template>
  <Story title="BuiInput" autoPropsDisabled :layout="{ type: 'grid', width: '33%' }">
    <Variant title="Default">
      <div class="flex items-center space-x-2 p-1">
        <BuiInput type="email" placeholder="Email" />
      </div>
    </Variant>

    <Variant title="Disabled">
      <div class="flex items-center space-x-2 p-1">
        <BuiInput type="email" placeholder="Email" disabled />
      </div>
    </Variant>

    <Variant title="With label">
      <div class="flex items-center space-x-2 p-1">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <BuiLabel for="email">Email</BuiLabel>
          <BuiInput id="email" type="email" placeholder="Email" />
        </div>
      </div>
    </Variant>

    <Variant title="Success with label">
      <div class="flex items-center space-x-2 p-1">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <BuiLabel for="email">Email</BuiLabel>
          <BuiInput id="email" type="email" placeholder="Email" variant="success" />
        </div>
      </div>
    </Variant>

    <Variant title="Error with label">
      <div class="flex items-center space-x-2 p-1">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <BuiLabel for="email">Email</BuiLabel>
          <BuiInput id="email" type="email" placeholder="Email" variant="destructive" />
        </div>
      </div>
    </Variant>

    <Variant title="Error based on aria-invalid">
      <div class="flex items-center space-x-2 p-1">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <BuiLabel for="email">Email</BuiLabel>
          <BuiInput id="email" type="email" placeholder="Email" aria-invalid="true" />
        </div>
      </div>
    </Variant>

    <Variant title="Password">
      <div class="flex items-center space-x-2 p-1">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <BuiLabel for="email">Password</BuiLabel>
          <BuiPasswordInput placeholder="Password" />
        </div>
      </div>
    </Variant>

    <Variant title="Password with default value">
      <div class="flex items-center space-x-2 p-1">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <BuiLabel for="email">Password</BuiLabel>
          <BuiPasswordInput default-value="text" placeholder="Password" />
        </div>
      </div>
    </Variant>

    <Variant title="With units">
      <div class="flex items-center space-x-2 p-1">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <BuiLabel for="email">CPU limit</BuiLabel>
          <BuiBadgedInput badge="mCPUs" type="number" placeholder="CPU limit" />
        </div>
      </div>
    </Variant>

    <Variant title="Color picker">
      <div class="flex items-center space-x-2 p-1">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <BuiLabel for="colorPicker">Color</BuiLabel>
          <BuiColorInput id="colorPicker" :defaultValue="'#E05FA3'" />
        </div>
      </div>
    </Variant>
  </Story>
</template>
