<script setup lang="ts">
import { BuiButton } from '@/components/ui/button'
import {
  BuiDialog,
  BuiDialogContent,
  BuiDialogDescription,
  BuiDialogFooter,
  BuiDialogHeader,
  BuiDialogTitle,
  BuiDialogTrigger
} from '@/components/ui/dialog'
import { BuiInput } from '@/components/ui/input'
import { BuiLabel } from '@/components/ui/label'
</script>

<template>
  <Story title="BuiDialog" autoPropsDisabled>
    <Variant title="Dialog">
      <div class="flex flex-col items-center gap-4">
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, expedita ipsum id
          enim similique, sed sequi aliquid, sapiente dicta blanditiis in ratione modi minus aut
          tempora voluptatum eius ut iusto!
        </div>
        <div>
          <BuiDialog>
            <BuiDialogTrigger as-child>
              <BuiButton variant="outline"> Edit Profile </BuiButton>
            </BuiDialogTrigger>
            <BuiDialogContent class="sm:max-w-[425px]">
              <BuiDialogHeader>
                <BuiDialogTitle>Edit profile</BuiDialogTitle>
                <BuiDialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </BuiDialogDescription>
              </BuiDialogHeader>
              <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                  <BuiLabel for="name" class="text-right"> Name </BuiLabel>
                  <BuiInput id="name" value="Pedro Duarte" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <BuiLabel for="username" class="text-right"> Username </BuiLabel>
                  <BuiInput id="username" value="@peduarte" class="col-span-3" />
                </div>
              </div>
              <BuiDialogFooter>
                <BuiButton type="submit"> Save changes </BuiButton>
              </BuiDialogFooter>
            </BuiDialogContent>
          </BuiDialog>
        </div>
      </div>
    </Variant>
  </Story>
</template>
