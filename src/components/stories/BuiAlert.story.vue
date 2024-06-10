<script setup lang="ts">
import { BuiAlert, BuiAlertDescription, BuiAlertTitle } from '@/components/ui/alert'
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-vue-next'
import BuiButtonVue from '@/components/ui/button/BuiButton.vue'
</script>

<template>
  <Story title="BuiAlert" autoPropsDisabled>
    <Variant title="Destructive Alert">
      <BuiAlert variant="destructive">
        <BuiAlertTitle>Error</BuiAlertTitle>
        <BuiAlertDescription> Your session has expired. Please log in again. </BuiAlertDescription>

        <template #icon>
          <AlertTriangle class="h-4 w-4" aria-hidden="true" />
        </template>
      </BuiAlert>
    </Variant>

    <Variant title="Success Alert">
      <BuiAlert variant="success">
        <BuiAlertTitle>Successfully uploaded</BuiAlertTitle>
        <BuiAlertDescription> Your files has been uploaded. </BuiAlertDescription>

        <template #icon>
          <CheckCircle class="h-4 w-4" aria-hidden="true" />
        </template>
      </BuiAlert>
    </Variant>

    <Variant title="Info Alert">
      <BuiAlert variant="info">
        <BuiAlertTitle>Successfully uploaded</BuiAlertTitle>
        <BuiAlertDescription> Your files has been uploaded. </BuiAlertDescription>

        <template #icon>
          <Info class="h-4 w-4" aria-hidden="true" />
        </template>
      </BuiAlert>
    </Variant>

    <Variant title="Warning Alert">
      <BuiAlert variant="warning">
        <BuiAlertTitle>Warning!</BuiAlertTitle>
        <BuiAlertDescription> Files must be less than 10Mb. </BuiAlertDescription>

        <template #icon>
          <AlertTriangle class="h-4 w-4" aria-hidden="true" />
        </template>
      </BuiAlert>
    </Variant>

    <Variant title="Destructive Alert with button">
      <BuiAlert variant="destructive">
        <BuiAlertTitle> Upload failed </BuiAlertTitle>
        <BuiAlertDescription> Something went wrong </BuiAlertDescription>

        <template #icon>
          <AlertTriangle class="h-4 w-4" aria-hidden="true" />
        </template>

        <template #actions>
          <BuiButtonVue variant="outline" size="sm"> Retry </BuiButtonVue>
          <BuiButtonVue variant="ghost" size="icon">
            <span class="sr-only">Dismiss</span>
            <X class="h-5 w-5" aria-hidden="true" />
          </BuiButtonVue>
        </template>
      </BuiAlert>
    </Variant>
  </Story>
</template>
