<script setup lang="ts">
import {
  BuiAlertDialog,
  BuiAlertDialogAction,
  BuiAlertDialogCancel,
  BuiAlertDialogContent,
  BuiAlertDialogDescription,
  BuiAlertDialogFooter,
  BuiAlertDialogHeader,
  BuiAlertDialogTitle,
  BuiAlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { BuiButton } from '@/components/ui/button'
</script>

<template>
  <Story title="BuiAlertDialog" autoPropsDisabled>
    <Variant title="Default">
      <div class="flex justify-center p-10">
        <BuiAlertDialog>
          <BuiAlertDialogTrigger as-child>
            <BuiButton variant="outline"> Show Dialog </BuiButton>
          </BuiAlertDialogTrigger>
          <BuiAlertDialogContent>
            <BuiAlertDialogHeader>
              <BuiAlertDialogTitle>Are you absolutely sure?</BuiAlertDialogTitle>
              <BuiAlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
              </BuiAlertDialogDescription>
            </BuiAlertDialogHeader>
            <BuiAlertDialogFooter>
              <BuiAlertDialogCancel>Cancel</BuiAlertDialogCancel>
              <BuiAlertDialogAction>Continue</BuiAlertDialogAction>
            </BuiAlertDialogFooter>
          </BuiAlertDialogContent>
        </BuiAlertDialog>
      </div>
    </Variant>
  </Story>
</template>
