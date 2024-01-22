<script setup lang="ts">
import { isVNode } from 'vue'
import { useToast } from './use-toast'
import {
  BuiToast,
  BuiToastClose,
  BuiToastDescription,
  BuiToastProvider,
  BuiToastTitle,
  BuiToastViewport
} from '.'

const { toasts } = useToast()
</script>

<template>
  <BuiToastProvider>
    <BuiToast v-for="toast in toasts" :key="toast.id" v-bind="toast">
      <div class="grid gap-1">
        <BuiToastTitle v-if="toast.title">
          {{ toast.title }}
        </BuiToastTitle>
        <template v-if="toast.description">
          <BuiToastDescription v-if="isVNode(toast.description)">
            <component :is="toast.description" />
          </BuiToastDescription>
          <BuiToastDescription v-else>
            {{ toast.description }}
          </BuiToastDescription>
        </template>
        <BuiToastClose />
      </div>
      <component :is="toast.action" />
    </BuiToast>
    <BuiToastViewport />
  </BuiToastProvider>
</template>
