<script setup lang="ts">
import { CalendarDays } from 'lucide-vue-next'
import { BuiHoverCard, BuiHoverCardContent, BuiHoverCardTrigger } from '@/components/hover-card'
import BuiButton from '@/components/button/BuiButton.vue'
import { BuiAvatar, BuiAvatarFallback, BuiAvatarImage } from '@/components/avatar'
</script>

<template>
  <div class="flex justify-center pt-12">
    <BuiHoverCard>
      <BuiHoverCardTrigger as-child>
        <BuiButton variant="link"> @bootsman </BuiButton>
      </BuiHoverCardTrigger>
      <BuiHoverCardContent class="w-80">
        <div class="flex flex-row justify-between gap-4">
          <BuiAvatar>
            <BuiAvatarImage src="/src/assets/logo.png" alt="Bootsman" />
            <BuiAvatarFallback>B</BuiAvatarFallback>
          </BuiAvatar>
          <div class="flex flex-col gap-4">
            <h4 class="text-sm font-semibold">@bootsman</h4>
            <p class="text-sm">
              Bootsman is designed for managing kubernetes multi-clusters with a set of ready-made
              tools for deployment, monitoring, load balancing, auto-scaling of container loads,
              strict security policies and backup.
            </p>
            <div class="flex items-center pt-2">
              <CalendarDays class="mr-2 h-4 w-4 opacity-70" />
              <span class="text-muted-foreground text-xs"> Joined January 2024 </span>
            </div>
          </div>
        </div>
      </BuiHoverCardContent>
    </BuiHoverCard>
  </div>
</template>
