<script setup lang="ts">
import {
  BuiCard,
  BuiCardContent,
  BuiCardHeader,
  BuiCardTitle,
  BuiCardDescription
} from '@/components/ui/card'
import {
  BuiSelect,
  BuiSelectContent,
  BuiSelectItem,
  BuiSelectTrigger,
  BuiSelectValue
} from '@/components/ui/select'
import { BuiInput } from '@/components/ui/input'
import { BuiLabel } from '@/components/ui/label'
import { BuiButton } from '@/components/ui/button'
import { BuiProgress } from '@/components/ui/progress'
</script>

<template>
  <Story title="BuiCard" autoPropsDisabled :layout="{ type: 'grid', width: '50%' }">
    <Variant title="Default">
      <div class="flex items-center space-x-2 p-10">
        <BuiCard class="w-[350px]">
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
      </div>
    </Variant>
  </Story>
</template>
