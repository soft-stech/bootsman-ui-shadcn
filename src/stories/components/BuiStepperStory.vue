<script setup lang="ts">
import {
  BuiStepper,
  BuiStepperDescription,
  BuiStepperItem,
  BuiStepperSeparator,
  BuiStepperTitle,
  BuiStepperTrigger
} from '@/components/stepper'
import BuiButton from '@/components/button/BuiButton.vue'
import { Check, Circle, Dot } from 'lucide-vue-next'

const steps = [
  {
    step: 1,
    title: 'Your details',
    description: 'Provide your name and email'
  },
  {
    step: 2,
    title: 'Company details',
    description: 'A few details about your company'
  },
  {
    step: 3,
    title: 'Invite your team',
    description: 'Start collaborating with your team'
  }
]

const props = defineProps<{
  class?: string
  orientation?: 'horizontal' | 'vertical'
}>()
</script>

<template>
  <BuiStepper
    v-if="props.orientation === 'horizontal'"
    :orientation="props.orientation"
    :class="props.class"
  >
    <BuiStepperItem
      v-for="step in steps"
      :key="step.step"
      v-slot="{ state }"
      class="relative flex w-full flex-col items-center justify-center"
      :step="step.step"
    >
      <BuiStepperSeparator
        v-if="step.step !== steps[steps.length - 1].step"
        class="bg-muted group-data-[state=completed]:bg-primary absolute top-5 right-[calc(-50%+10px)] left-[calc(50%+20px)] block h-0.5 shrink-0 rounded-full"
      />

      <BuiStepperTrigger as-child>
        <BuiButton
          :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
          class="z-10 size-10 shrink-0 rounded-full"
          :class="[state === 'active' && 'ring-ring ring-offset-background ring-2 ring-offset-2']"
        >
          <Check v-if="state === 'completed'" class="size-5" />
          <Circle v-if="state === 'active'" />
          <Dot v-if="state === 'inactive'" />
        </BuiButton>
      </BuiStepperTrigger>

      <div class="mt-5 flex flex-col items-center text-center">
        <BuiStepperTitle
          :class="[state !== 'active' && 'text-primary']"
          class="text-sm font-semibold transition lg:text-base"
        >
          {{ step.title }}
        </BuiStepperTitle>
        <BuiStepperDescription
          :class="[state !== 'active' && 'text-primary']"
          class="text-muted-foreground sr-only text-xs transition md:not-sr-only lg:text-sm"
        >
          {{ step.description }}
        </BuiStepperDescription>
      </div>
    </BuiStepperItem>
  </BuiStepper>
  <BuiStepper v-else :orientation="props.orientation" :class="props.class">
    <BuiStepperItem
      v-for="step in steps"
      :key="step.step"
      v-slot="{ state }"
      class="relative flex w-full items-start gap-6"
      :step="step.step"
    >
      <BuiStepperSeparator
        v-if="step.step !== steps[steps.length - 1].step"
        class="bg-muted group-data-[state=completed]:bg-primary absolute top-[38px] left-[18px] block h-[105%] w-0.5 shrink-0 rounded-full"
      />

      <BuiStepperTrigger as-child>
        <BuiButton
          :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
          class="z-10 size-10 shrink-0 rounded-full"
          :class="[state === 'active' && 'ring-ring ring-offset-background ring-2 ring-offset-2']"
        >
          <Check v-if="state === 'completed'" class="size-5" />
          <Circle v-if="state === 'active'" />
          <Dot v-if="state === 'inactive'" />
        </BuiButton>
      </BuiStepperTrigger>

      <div class="flex flex-col gap-1">
        <BuiStepperTitle
          :class="[state !== 'active' && 'text-primary']"
          class="text-sm font-semibold transition lg:text-base"
        >
          {{ step.title }}
        </BuiStepperTitle>
        <BuiStepperDescription
          :class="[state !== 'active' && 'text-primary']"
          class="text-muted-foreground sr-only text-xs transition md:not-sr-only lg:text-sm"
        >
          {{ step.description }}
        </BuiStepperDescription>
      </div>
    </BuiStepperItem>
  </BuiStepper>
</template>
