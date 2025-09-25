<script setup lang="ts">
import BuiButton from '@/components/button/BuiButton.vue'
import BuiCheckbox from '@/components/checkbox/BuiCheckbox.vue'
import {
  BuiForm,
  BuiFormControl,
  BuiFormField,
  BuiFormItem,
  BuiFormLabel,
  BuiFormMessage
} from '@/components/form'
import BuiInput from '@/components/input/BuiInput.vue'
import BuiPasswordInput from '@/components/input/BuiPasswordInput.vue'
import BuiLabel from '@/components/label/BuiLabel.vue'
import BuiPopover from '@/components/popover/BuiPopover.vue'
import BuiPopoverContent from '@/components/popover/BuiPopoverContent.vue'
import BuiPopoverTrigger from '@/components/popover/BuiPopoverTrigger.vue'
import BuiRadioGroup from '@/components/radio-group/BuiRadioGroup.vue'
import BuiRadioGroupItem from '@/components/radio-group/BuiRadioGroupItem.vue'
import BuiSelect from '@/components/select/BuiSelect.vue'
import BuiSelectContent from '@/components/select/BuiSelectContent.vue'
import BuiSelectGroup from '@/components/select/BuiSelectGroup.vue'
import BuiSelectItem from '@/components/select/BuiSelectItem.vue'
import BuiSelectTrigger from '@/components/select/BuiSelectTrigger.vue'
import BuiSelectValue from '@/components/select/BuiSelectValue.vue'
import BuiSwitch from '@/components/switch/BuiSwitch.vue'
import BuiTextarea from '@/components/textarea/BuiTextarea.vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const loginFormSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(8).max(64),
    remember: z.boolean(),
    favoriteFruit: z.enum(['banana']),
    description: z.string().min(2).max(10),
    display: z.enum(['default', 'compact', 'comfortable'])
  })
)

const initialValues = {
  email: 'test@example.com',
  password: '12345678',
  remember: false,
  favoriteFruit: 'banana',
  description: 'test',
  display: 'default'
}

const onSubmit = (values: unknown) => {
  console.debug('Form submitted!', values)
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div
        class="bg-logo dark:bg-logo-dark mx-auto h-10 bg-contain bg-center bg-no-repeat"
        alt="Bootsman"
      />
      <h2
        class="mt-6 text-center text-2xl leading-9 font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
        <BuiForm
          v-slot="{ meta }"
          class="space-y-6"
          :initial-values="initialValues"
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
                  <BuiPasswordInput
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

          <BuiFormField v-slot="{ value, handleChange }" name="remember">
            <BuiFormItem class="mt-2 flex items-center gap-2 space-y-0">
              <BuiFormControl>
                <BuiCheckbox :model-value="value" @update:model-value="handleChange" />
              </BuiFormControl>
              <div class="space-y-1 leading-none">
                <BuiFormLabel>Remember me</BuiFormLabel>
                <BuiFormMessage />
              </div>
            </BuiFormItem>
          </BuiFormField>

          <BuiFormField v-slot="{ componentField }" name="favoriteFruit">
            <BuiFormItem class="">
              <BuiFormLabel>Fruits</BuiFormLabel>
              <BuiFormControl>
                <BuiSelect v-bind="componentField">
                  <BuiSelectTrigger>
                    <BuiSelectValue />
                  </BuiSelectTrigger>
                  <BuiSelectContent>
                    <BuiSelectGroup>
                      <BuiSelectLabel>Fruits</BuiSelectLabel>
                      <BuiSelectItem value="apple"> Apple </BuiSelectItem>
                      <BuiSelectItem value="banana"> Banana </BuiSelectItem>
                      <BuiSelectItem value="blueberry"> Blueberry </BuiSelectItem>
                      <BuiSelectItem value="grapes"> Grapes </BuiSelectItem>
                      <BuiSelectItem value="pineapple"> Pineapple </BuiSelectItem>
                    </BuiSelectGroup>
                  </BuiSelectContent>
                </BuiSelect>
              </BuiFormControl>
              <BuiFormMessage class="mt-0.5!" />
            </BuiFormItem>
          </BuiFormField>

          <BuiFormField v-slot="{ componentField }" name="description">
            <BuiFormItem>
              <BuiFormLabel>Email address</BuiFormLabel>
              <div class="mt-2">
                <BuiFormControl>
                  <BuiTextarea placeholder="Description" v-bind="componentField" />
                </BuiFormControl>
                <BuiFormMessage class="mt-1" />
              </div>
            </BuiFormItem>
          </BuiFormField>

          <BuiFormField v-slot="{ componentField }" name="display">
            <BuiFormItem class="">
              <BuiRadioGroup v-bind="componentField">
                <div class="flex items-center space-x-2">
                  <BuiRadioGroupItem id="default" value="default" />
                  <BuiLabel for="default">Default</BuiLabel>
                </div>
                <div class="flex items-center space-x-2">
                  <BuiRadioGroupItem id="compact" value="compact" />
                  <BuiLabel for="compact">Compact</BuiLabel>
                </div>
                <div class="flex items-center space-x-2">
                  <BuiRadioGroupItem id="comfortable" value="comfortable" />
                  <BuiLabel for="comfortable">Comfortable</BuiLabel>
                </div>
              </BuiRadioGroup>
            </BuiFormItem>
          </BuiFormField>

          <BuiFormField v-slot="{ value, handleChange }" name="remember">
            <BuiFormItem class="mt-2 flex items-center gap-2 space-y-0">
              <BuiFormControl>
                <BuiSwitch :checked="value" @update:checked="handleChange"></BuiSwitch>
              </BuiFormControl>
              <div class="space-y-1 leading-none">
                <BuiFormLabel>Remember me switch</BuiFormLabel>
                <BuiFormMessage />
              </div>
            </BuiFormItem>
          </BuiFormField>

          <BuiPopover>
            <BuiPopoverTrigger as-child>
              <BuiButton variant="outline"> Open popover </BuiButton>
            </BuiPopoverTrigger>
            <BuiPopoverContent class="w-80">
              <div class="grid gap-4">
                <div class="space-y-2">
                  <h4 class="leading-none font-medium">Dimensions</h4>
                  <p class="text-muted-foreground text-sm">Set the dimensions for the layer.</p>
                </div>
                <div class="grid gap-2">
                  <div class="grid grid-cols-3 items-center gap-4">
                    <BuiLabel for="width">Width</BuiLabel>
                    <BuiInput id="width" type="text" default-value="100%" class="col-span-2 h-8" />
                  </div>
                  <div class="grid grid-cols-3 items-center gap-4">
                    <BuiLabel for="maxWidth">Max. width</BuiLabel>
                    <BuiInput
                      id="maxWidth"
                      type="text"
                      default-value="300px"
                      class="col-span-2 h-8"
                    />
                  </div>
                  <div class="grid grid-cols-3 items-center gap-4">
                    <BuiLabel for="height">Height</BuiLabel>
                    <BuiInput id="height" type="text" default-value="25px" class="col-span-2 h-8" />
                  </div>
                  <div class="grid grid-cols-3 items-center gap-4">
                    <BuiLabel for="maxHeight">Max. height</BuiLabel>
                    <BuiInput
                      id="maxHeight"
                      type="text"
                      default-value="none"
                      class="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </BuiPopoverContent>
          </BuiPopover>

          <div>
            <BuiButton class="w-full" type="submit" :disabled="!meta.valid">Sign in</BuiButton>
          </div>
        </BuiForm>
      </div>
    </div>
  </div>
</template>
