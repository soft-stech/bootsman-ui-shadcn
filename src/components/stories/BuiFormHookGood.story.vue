<script setup lang="ts">
import LoginFormExample from './LoginFormExample.vue'
</script>

<template>
  <Story title="BuiForm useForm hook " autoPropsDisabled>
    <Variant title="Default">
      <LoginFormExample />
    </Variant>
  </Story>
</template>

<docs lang="md">
Calling useForm creates a form context in the component and provides it for any child component that injects it. This means you should stick to calling useForm once in a component.

Creating a form context does a few things:

- Acts as a value collector for all the fields you will declare as child components.
- Validates the fields and aggregates the errors.
- Aggregates the validity, touched, and dirty states of all the fields.

See [vee-validate - Getting started](https://vee-validate.logaretm.com/v4/guide/composition-api/getting-started/)
</docs>
