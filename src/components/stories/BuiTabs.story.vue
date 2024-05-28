<script setup lang="ts">
import { BuiInput } from '@/components/ui/input'
import { BuiLabel } from '@/components/ui/label'
import { BuiTabs, BuiTabsContent, BuiTabsList, BuiTabsTrigger } from '@/components/ui/tabs'
import { BuiButton } from '@/components/ui/button'
import {
  BuiCard,
  BuiCardContent,
  BuiCardDescription,
  BuiCardFooter,
  BuiCardHeader,
  BuiCardTitle
} from '@/components/ui/card'
import { AlertCircleIcon } from 'lucide-vue-next'

const variantOptions = ['default', 'ghost'] as const
</script>

<template>
  <Story title="BuiTabs" autoPropsDisabled :layout="{ type: 'grid', width: '50%' }">
    <Variant v-for="variant in variantOptions" :title="variant" :key="`${variant}`">
      <div class="flex justify-center p-10">
        <BuiTabs default-value="account" class="w-[400px]">
          <BuiTabsList class="grid w-full grid-cols-2" :variant="variant">
            <BuiTabsTrigger value="account" :variant="variant"> Account </BuiTabsTrigger>
            <BuiTabsTrigger value="password" :variant="variant"
              >Password
              <AlertCircleIcon class="ml-2 h-5 w-5 text-destructive-foreground" />
            </BuiTabsTrigger>
          </BuiTabsList>
          <BuiTabsContent value="account">
            <BuiCard>
              <BuiCardHeader>
                <BuiCardTitle>Account</BuiCardTitle>
                <BuiCardDescription>
                  Make changes to your account here. Click save when you're done.
                </BuiCardDescription>
              </BuiCardHeader>
              <BuiCardContent class="space-y-2">
                <div class="space-y-1">
                  <BuiLabel for="name">Name</BuiLabel>
                  <BuiInput id="name" default-value="Pedro Duarte" />
                </div>
                <div class="space-y-1">
                  <BuiLabel for="username">Username</BuiLabel>
                  <BuiInput id="username" default-value="@peduarte" />
                </div>
              </BuiCardContent>
              <BuiCardFooter>
                <BuiButton>Save changes</BuiButton>
              </BuiCardFooter>
            </BuiCard>
          </BuiTabsContent>
          <BuiTabsContent value="password">
            <BuiCard>
              <BuiCardHeader>
                <BuiCardTitle>Password</BuiCardTitle>
                <BuiCardDescription>
                  Change your password here. After saving, you'll be logged out.
                </BuiCardDescription>
              </BuiCardHeader>
              <BuiCardContent class="space-y-2">
                <div class="space-y-1">
                  <BuiLabel for="current">Current password</BuiLabel>
                  <BuiInput id="current" type="password" />
                </div>
                <div class="space-y-1">
                  <BuiLabel for="new">New password</BuiLabel>
                  <BuiInput id="new" type="password" />
                </div>
              </BuiCardContent>
              <BuiCardFooter>
                <BuiButton>Save password</BuiButton>
              </BuiCardFooter>
            </BuiCard>
          </BuiTabsContent>
        </BuiTabs>
      </div>
    </Variant>

    <Variant title="vertical">
      <BuiTabs default-value="general" class="flex" orientation="vertical">
        <BuiTabsList class="w-40" variant="vertical">
          <BuiTabsTrigger value="general" variant="vertical">General</BuiTabsTrigger>
          <BuiTabsTrigger value="health" variant="vertical">Health check</BuiTabsTrigger>
          <BuiTabsTrigger value="resources" variant="vertical">Resources</BuiTabsTrigger>
        </BuiTabsList>
        <BuiTabsContent value="general" class="mt-0 flex-grow"> General content </BuiTabsContent>
        <BuiTabsContent value="health" class="mt-0"> Health check content </BuiTabsContent>
        <BuiTabsContent value="resources" class="mt-0"> Resources content </BuiTabsContent>
      </BuiTabs>
    </Variant>
  </Story>
</template>
