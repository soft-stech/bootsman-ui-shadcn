<script setup lang="ts">
import {
  BuiSelect,
  BuiSelectContent,
  BuiSelectGroup,
  BuiSelectItem,
  BuiSelectLabel,
  BuiSelectTrigger,
  BuiSelectValue
} from '@/components/ui/select'
</script>

<template>
  <Story title="BuiSelect" autoPropsDisabled>
    <Variant title="Default">
      <div class="flex min-h-[350px] w-full items-center justify-center p-10">
        <BuiSelect>
          <BuiSelectTrigger class="w-[180px]">
            <BuiSelectValue placeholder="Select a fruit" />
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
      </div>
    </Variant>
  </Story>
</template>
