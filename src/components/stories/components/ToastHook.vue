<script setup lang="ts">
import { BuiButton } from '@/components/ui/button'

import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
</script>

<template>
  <div class="flex justify-center pt-12">
    <BuiButton
      variant="outline"
      @click="
        () => {
          toast({
            title: 'Scheduled: Catch up',
            description: 'Friday, February 10, 2023 at 5:57 PM'
          })
        }
      "
    >
      Add to calendar
    </BuiButton>
  </div>
</template>
