<script setup lang="ts">
import BuiButton from '@/components/ui/button/BuiButton.vue'
import BuiInput from '@/components/ui/input/BuiInput.vue'

import {
  BuiForm,
  BuiFormControl,
  BuiFormField,
  BuiFormItem,
  BuiFormLabel,
  BuiFormMessage
} from '@/components/ui/form'

import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const loginFormSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(8).max(64)
  })
)

const initialValues = {
  email: 'test@example.com',
  password: '12345678'
}

// https://github.com/logaretm/vee-validate/discussions/3571
// TODO refactor to useForm hook
const onSubmit = (values: any) => {
  console.debug('Form submitted!', values)
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div
        class="mx-auto h-10 bg-logo bg-contain bg-center bg-no-repeat dark:bg-logo-dark"
        alt="Bootsman"
      />
      <h2
        class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <BuiForm
          class="space-y-6"
          v-slot="{ meta }"
          :initialValues="initialValues"
          :validation-schema="loginFormSchema"
          @submit="onSubmit"
        >
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
        </BuiForm>
      </div>
    </div>
  </div>
</template>
