import type { InjectionKey, Ref } from 'vue'

export {
  Form as BuiForm,
  Field as BuiFormField,
  FieldArray as BuiFormFieldArray,
  useField as useBuiField,
  useFieldArray as useBuiFieldArray,
  useForm as useBuiForm
} from 'vee-validate'
// export { default as BuiFormControl } from './BuiFormControl.vue'
// export { default as BuiFormDescription } from './BuiFormDescription.vue'
// export { default as BuiFormItem } from './BuiFormItem.vue'
// export { default as BuiFormLabel } from './BuiFormLabel.vue'
// export { default as BuiFormMessage } from './BuiFormMessage.vue'

export const FORM_READONLY_INJECTION_KEY = Symbol() as InjectionKey<Ref<boolean>>
