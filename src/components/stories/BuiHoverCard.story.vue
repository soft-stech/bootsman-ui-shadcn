<script setup lang="ts">
import { CalendarDays } from 'lucide-vue-next'

import { BuiAvatar, BuiAvatarFallback, BuiAvatarImage } from '@/components/ui/avatar'
import { BuiButton } from '@/components/ui/button'
import { BuiHoverCard, BuiHoverCardContent, BuiHoverCardTrigger } from '@/components/ui/hover-card'
</script>

<template>
  <Story title="BuiHoverCard" autoPropsDisabled>
    <Variant :key="`variant-default`" :title="`Tooltip`">
      <div class="flex justify-center pt-12">
        <BuiHoverCard>
          <BuiHoverCardTrigger as-child>
            <BuiButton variant="link"> @bootsman </BuiButton>
          </BuiHoverCardTrigger>
          <BuiHoverCardContent class="w-80">
            <div class="flex justify-between space-x-4">
              <BuiAvatar>
                <BuiAvatarImage src="/src/assets/logo.png" alt="Bootsman" />
                <BuiAvatarFallback>B</BuiAvatarFallback>
              </BuiAvatar>
              <div class="space-y-1">
                <h4 class="text-sm font-semibold">@bootsman</h4>
                <p class="text-sm">
                  Bootsman is designed for managing kubernetes multi-clusters with a set of
                  ready-made tools for deployment, monitoring, load balancing, auto-scaling of
                  container loads, strict security policies and backup.
                </p>
                <div class="flex items-center pt-2">
                  <CalendarDays class="mr-2 h-4 w-4 opacity-70" />
                  <span class="text-xs text-muted-foreground"> Joined January 2024 </span>
                </div>
              </div>
            </div>
          </BuiHoverCardContent>
        </BuiHoverCard>
      </div>
    </Variant>
  </Story>
</template>
