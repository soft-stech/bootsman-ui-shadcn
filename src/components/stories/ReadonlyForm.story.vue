<script setup lang="ts">
import ReadonlyForm from '@/components/stories/components/ReadonlyForm.vue'
import ReadonlyFormWrapper from '@/components/stories/components/ReadonlyFormWrapper.vue'
import { ref } from 'vue'

const readonly = ref(false)
</script>

<template>
  <Story
    title="ReadonlyForm"
    autoPropsDisabled
    :layout="{ type: 'grid', width: '100%' }"
    :controls="{
      readonly: { type: 'boolean', default: false, description: 'Toggle readonly mode' }
    }"
  >
    <template #controls>
      <input type="checkbox" id="checkbox" v-model="readonly" />
      <label for="checkbox">Readonly</label>
    </template>

    <Variant title="Default">
      <ReadonlyFormWrapper :readonly="readonly">
        <ReadonlyForm />
      </ReadonlyFormWrapper>
    </Variant>
  </Story>
</template>
