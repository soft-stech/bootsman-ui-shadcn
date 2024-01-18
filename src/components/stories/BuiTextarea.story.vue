<script setup lang="ts">
import BuiTextarea from '@/components/ui/textarea/BuiTextarea.vue'
import BuiLabel from '@/components/ui/label/BuiLabel.vue'
</script>

<template>
  <Story title="BuiTextarea" autoPropsDisabled :layout="{ type: 'grid', width: '33%' }">
    <Variant title="Default">
      <div class="flex items-center space-x-2 p-1">
        <BuiTextarea type="email" placeholder="Email" />
      </div>
    </Variant>

    <Variant title="Disabled">
      <div class="flex items-center space-x-2 p-1">
        <BuiTextarea type="email" placeholder="Email" disabled />
      </div>
    </Variant>

    <Variant title="With label">
      <div class="flex items-center space-x-2 p-1">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <BuiLabel for="email">Email</BuiLabel>
          <BuiTextarea id="email" type="email" placeholder="Email" />
        </div>
      </div>
    </Variant>

    <Variant title="Success with label">
      <div class="flex items-center space-x-2 p-1">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <BuiLabel for="email">Email</BuiLabel>
          <BuiTextarea id="email" type="email" placeholder="Email" variant="success" />
        </div>
      </div>
    </Variant>

    <Variant title="Error with label">
      <div class="flex items-center space-x-2 p-1">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <BuiLabel for="email">Email</BuiLabel>
          <BuiTextarea id="email" type="email" placeholder="Email" variant="destructive" />
        </div>
      </div>
    </Variant>

    <Variant title="Error based on aria-invalid">
      <div class="flex items-center space-x-2 p-1">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <BuiLabel for="email">Email</BuiLabel>
          <BuiTextarea id="email" type="email" placeholder="Email" aria-invalid="true" />
        </div>
      </div>
    </Variant>
  </Story>
</template>
