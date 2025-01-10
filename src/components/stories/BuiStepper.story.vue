<script setup lang="ts">
import BuiButton from '@/components/ui/button/BuiButton.vue'
import BuiStepper from '@/components/ui/stepper/BuiStepper.vue'
import BuiStepperDescription from '@/components/ui/stepper/BuiStepperDescription.vue'
import BuiStepperItem from '@/components/ui/stepper/BuiStepperItem.vue'
import BuiStepperSeparator from '@/components/ui/stepper/BuiStepperSeparator.vue'
import BuiStepperTitle from '@/components/ui/stepper/BuiStepperTitle.vue'
import BuiStepperTrigger from '@/components/ui/stepper/BuiStepperTrigger.vue'
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
</script>

<template>
  <Story title="BuiStepper" autoPropsDisabled :layout="{ type: 'grid', width: '100%' }">
    <Variant title="Horizontal">
      <BuiStepper class="flex w-full items-start gap-2 p-10">
        <BuiStepperItem
          v-for="step in steps"
          :key="step.step"
          v-slot="{ state }"
          class="relative flex w-full flex-col items-center justify-center"
          :step="step.step"
        >
          <BuiStepperSeparator
            v-if="step.step !== steps[steps.length - 1].step"
            class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
          />

          <BuiStepperTrigger as-child>
            <BuiButton
              :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
              class="z-10 size-10 shrink-0 rounded-full"
              :class="[
                state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background'
              ]"
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
              class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
            >
              {{ step.description }}
            </BuiStepperDescription>
          </div>
        </BuiStepperItem>
      </BuiStepper>
    </Variant>

    <Variant title="Vertical">
      <BuiStepper
        orientation="vertical"
        class="mx-auto flex w-full max-w-md flex-col justify-start gap-10 p-10"
      >
        <BuiStepperItem
          v-for="step in steps"
          :key="step.step"
          v-slot="{ state }"
          class="relative flex w-full items-start gap-6"
          :step="step.step"
        >
          <BuiStepperSeparator
            v-if="step.step !== steps[steps.length - 1].step"
            class="absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
          />

          <BuiStepperTrigger as-child>
            <BuiButton
              :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
              class="z-10 size-10 shrink-0 rounded-full"
              :class="[
                state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background'
              ]"
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
              class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
            >
              {{ step.description }}
            </BuiStepperDescription>
          </div>
        </BuiStepperItem>
      </BuiStepper>
    </Variant>
  </Story>
</template>
