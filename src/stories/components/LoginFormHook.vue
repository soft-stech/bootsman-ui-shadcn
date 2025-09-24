<script setup lang="ts">
import BuiButton from '@/components/button/BuiButton.vue'
import BuiInput from '@/components/input/BuiInput.vue'

import {
  BuiFormControl,
  BuiFormField,
  BuiFormItem,
  BuiFormLabel,
  BuiFormMessage,
  useBuiForm
} from '@/components/form'
import * as z from 'zod'

const loginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(64)
})

const initialValues = {
  email: 'test@example.com',
  password: '12345678'
}

const { handleSubmit, meta } = useBuiForm({
  validationSchema: loginFormSchema,
  initialValues
})

const onSubmit = handleSubmit((values) => {
  console.debug('Form submitted!', values)
})
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div
        class="bg-logo dark:bg-logo-dark mx-auto h-10 bg-contain bg-center bg-no-repeat"
        alt="Bootsman"
      />
      <h2
        class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
        <form class="space-y-6" @submit="onSubmit">
          <BuiFormField v-slot="{ componentField }" name="email">
            <BuiFormItem>
              <BuiFormLabel>Email address</BuiFormLabel>
              <div class="mt-2">
                <BuiFormControl>
                  <BuiInput
                    type="email"
                    autocomplete="email"
                    placeholder="Email"
                    v-bind="componentField"
                  />
                </BuiFormControl>
                <BuiFormMessage class="mt-1" />
              </div>
            </BuiFormItem>
          </BuiFormField>

          <BuiFormField v-slot="{ componentField }" name="password">
            <BuiFormItem>
              <BuiFormLabel>Password</BuiFormLabel>
              <div class="mt-2">
                <BuiFormControl>
                  <BuiInput
                    type="password"
                    autocomplete="current-password"
                    placeholder="Password"
                    v-bind="componentField"
                  />
                </BuiFormControl>
                <BuiFormMessage class="mt-1" />
              </div>
            </BuiFormItem>
          </BuiFormField>

          <div>
            <BuiButton class="w-full" type="submit" :disabled="!meta.valid">Sign in</BuiButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
