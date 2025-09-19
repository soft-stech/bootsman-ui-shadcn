<script setup lang="ts">
import {
  BuiCard,
  BuiCardContent,
  BuiCardDescription,
  BuiCardFooter,
  BuiCardHeader,
  BuiCardTitle
} from '@/components/card'
import BuiLabel from '@/components/label/BuiLabel.vue'
import BuiInput from '@/components/input/BuiInput.vue'
import {
  BuiSelect,
  BuiSelectTrigger,
  BuiSelectContent,
  BuiSelectItem,
  BuiSelectValue
} from '@/components/select'
import BuiProgress from '@/components/progress/BuiProgress.vue'
import BuiButton from '@/components/button/BuiButton.vue'

const props = defineProps<{
  class: string
}>()
</script>

<template>
  <BuiCard :class="props.class">
    <BuiCardHeader>
      <BuiCardTitle>Create project</BuiCardTitle>
      <BuiCardDescription>Deploy your new project in one-click.</BuiCardDescription>
    </BuiCardHeader>
    <BuiCardContent>
      <form>
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
            <BuiLabel for="name">Name</BuiLabel>
            <BuiInput id="name" placeholder="Name of your project" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <BuiLabel for="framework">Framework</BuiLabel>
            <BuiSelect>
              <BuiSelectTrigger id="framework">
                <BuiSelectValue placeholder="Select" />
              </BuiSelectTrigger>
              <BuiSelectContent position="popper">
                <BuiSelectItem value="nuxt"> Nuxt.js </BuiSelectItem>
                <BuiSelectItem value="next"> Next.js </BuiSelectItem>
                <BuiSelectItem value="sveltekit"> SvelteKit </BuiSelectItem>
                <BuiSelectItem value="astro"> Astro </BuiSelectItem>
              </BuiSelectContent>
            </BuiSelect>
          </div>

          <div>
            <BuiLabel for="progress">Progress</BuiLabel>
            <BuiProgress id="progress" :model-value="75" />
          </div>
        </div>
      </form>
    </BuiCardContent>
    <BuiCardFooter class="flex justify-between px-6 pb-6">
      <BuiButton variant="outline"> Cancel </BuiButton>
      <BuiButton>Deploy</BuiButton>
    </BuiCardFooter>
  </BuiCard>
</template>
