import BuiAutoFormFieldArray from './BuiAutoFormFieldArray.vue'
import BuiAutoFormFieldBoolean from './BuiAutoFormFieldBoolean.vue'
import BuiAutoFormFieldDate from './BuiAutoFormFieldDate.vue'
import BuiAutoFormFieldEnum from './BuiAutoFormFieldEnum.vue'
import BuiAutoFormFieldFile from './BuiAutoFormFieldFile.vue'
import BuiAutoFormFieldInput from './BuiAutoFormFieldInput.vue'
import BuiAutoFormFieldNumber from './BuiAutoFormFieldNumber.vue'
import BuiAutoFormFieldObject from './BuiAutoFormFieldObject.vue'
import BuiAutoFormFieldObjectCard from '@/components/ui/auto-form/BuiAutoFormFieldObjectCard.vue'

export const INPUT_COMPONENTS = {
  date: BuiAutoFormFieldDate,
  select: BuiAutoFormFieldEnum,
  radio: BuiAutoFormFieldEnum,
  checkbox: BuiAutoFormFieldBoolean,
  switch: BuiAutoFormFieldBoolean,
  textarea: BuiAutoFormFieldInput,
  number: BuiAutoFormFieldNumber,
  string: BuiAutoFormFieldInput,
  file: BuiAutoFormFieldFile,
  array: BuiAutoFormFieldArray,
  object: BuiAutoFormFieldObjectCard
}

/**
 * Define handlers for specific Zod types.
 * You can expand this object to support more types.
 */
export const DEFAULT_ZOD_HANDLERS: {
  [key: string]: keyof typeof INPUT_COMPONENTS
} = {
  ZodString: 'string',
  ZodBoolean: 'checkbox',
  ZodDate: 'date',
  ZodEnum: 'select',
  ZodNativeEnum: 'select',
  ZodNumber: 'number',
  ZodArray: 'array',
  ZodObject: 'object'
}
