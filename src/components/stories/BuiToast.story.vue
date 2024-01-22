<script setup lang="ts">
import { BuiButton } from '@/components/ui/button'
import { BuiToaster } from '@/components/ui/toast'
import { h } from 'vue'

import { useToast } from '@/components/ui/toast/use-toast'

import { BuiToastAction } from '@/components/ui/toast'

const { toast } = useToast()
</script>

<template>
  <Story title="BuiToast" autoPropsDisabled :layout="{ type: 'grid', width: '50%' }">
    <Variant :key="`variant-default`" :title="`Default`">
      <BuiToaster />

      <BuiButton
        variant="outline"
        @click="
          () => {
            toast({
              title: 'Scheduled: Catch up',
              description: 'Friday, February 10, 2023 at 5:57 PM',
              action: h(
                BuiToastAction,
                {
                  altText: 'Close'
                },
                {
                  default: () => 'Close'
                }
              )
            })
          }
        "
      >
        Add to calendar
      </BuiButton>
    </Variant>

    <Variant :key="`variant-destructive`" :title="`Destructive`">
      <BuiToaster />

      <BuiButton
        variant="outline"
        @click="
          () => {
            toast({
              title: 'Uh oh! Something went wrong.',
              description: 'There was a problem with your request.',
              variant: 'destructive',
              action: h(
                BuiToastAction,
                {
                  altText: 'Try again'
                },
                {
                  default: () => 'Try again'
                }
              )
            })
          }
        "
      >
        Add to calendar
      </BuiButton>
    </Variant>
  </Story>
</template>
