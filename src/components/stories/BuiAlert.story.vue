<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle, CheckCircle, X } from 'lucide-vue-next'
import BuiButtonVue from '@/components/ui/button/BuiButton.vue'
</script>

<template>
  <Story title="BuiAlert" autoPropsDisabled>
    <Variant title="Destructive Alert">
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription> Your session has expired. Please log in again. </AlertDescription>

        <template #icon>
          <AlertTriangle class="h-4 w-4" aria-hidden="true" />
        </template>
      </Alert>
    </Variant>

    <Variant title="Success Alert">
      <Alert variant="success">
        <AlertTitle>Successfully uploaded</AlertTitle>
        <AlertDescription> Your files has been uploaded. </AlertDescription>

        <template #icon>
          <CheckCircle class="h-4 w-4" aria-hidden="true" />
        </template>
      </Alert>
    </Variant>

    <Variant title="Info Alert">
      <Alert variant="info">
        <AlertTitle>Successfully uploaded</AlertTitle>
        <AlertDescription> Your files has been uploaded. </AlertDescription>

        <template #icon>
          <CheckCircle class="h-4 w-4" aria-hidden="true" />
        </template>
      </Alert>
    </Variant>

    <Variant title="Destructive Alert with button">
      <Alert variant="destructive">
        <AlertTitle> Upload failed </AlertTitle>
        <AlertDescription> Something went wrong </AlertDescription>

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
      </Alert>
    </Variant>
  </Story>
</template>
