<script setup lang="ts">
import { BuiAutoForm } from '@/components/ui/auto-form'
import { z } from 'zod'
import { ref } from 'vue'
import { useBuiForm } from '@/components/ui/form'
import { toTypedSchema } from '@vee-validate/zod'

enum Sports {
  Football = 'Football/Soccer',
  Basketball = 'Basketball',
  Baseball = 'Baseball',
  Hockey = 'Hockey (Ice)',
  None = "I don't like sports"
}

const schema = z.object({
  addons: z.array(
    z
      .object({
        type: z.nativeEnum(Sports),
        name: z.string().min(1),
        email: z.string().email()
      })
      .describe('Addon')
  ),
  username: z
    .string({
      required_error: 'Username is required.'
    })
    .min(2, {
      message: 'Username must be at least 2 characters.'
    }),

  password: z
    .string({
      required_error: 'Password is required.'
    })
    .min(8, {
      message: 'Password must be at least 8 characters.'
    }),

  favouriteNumber: z.coerce
    .number({
      invalid_type_error: 'Favourite number must be a number.'
    })
    .min(1, {
      message: 'Favourite number must be at least 1.'
    })
    .max(10, {
      message: 'Favourite number must be at most 10.'
    })
    .default(1)
    .optional(),

  acceptTerms: z.boolean().refine((value) => value, {
    message: 'You must accept the terms and conditions.',
    path: ['acceptTerms']
  }),

  sendMeMails: z.boolean().optional(),

  birthday: z.coerce.date().optional(),

  color: z.enum(['red', 'green', 'blue']).optional(),

  // Another enum example
  marshmallows: z.enum(['not many', 'a few', 'a lot', 'too many']),

  // Native enum example
  sports: z.nativeEnum(Sports).describe('What is your favourite sport?'),

  bio: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.'
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.'
    })
    .optional(),

  customParent: z.string().optional(),

  file: z.string().optional()
})

const form = useBuiForm({
  validationSchema: toTypedSchema(schema)
})
</script>

<template>
  <Story title="BuiAutoForm" autoPropsDisabled :layout="{ type: 'grid', width: '100%' }">
    <Variant title="Default">
      <BuiAutoForm :schema="schema" :form="form" class="m-4" />
    </Variant>
  </Story>
</template>
