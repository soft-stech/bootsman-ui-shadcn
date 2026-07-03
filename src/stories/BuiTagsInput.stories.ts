import {
  BuiTagsInput,
  BuiTagsInputInput,
  BuiTagsInputItem,
  BuiTagsInputItemDelete,
  BuiTagsInputItemText
} from '@/components/tagsInput'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

const meta = {
  component: BuiTagsInput,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success']
    }
  },
  args: {
    disabled: false,
    readonly: false,
    addOnTab: true,
    addOnPaste: true,
    addOnBlur: false,
    placeholder: 'Agg tag...',
    variant: 'default'
  }
} satisfies Meta<typeof BuiTagsInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: {
      BuiTagsInput,
      BuiTagsInputInput,
      BuiTagsInputItem,
      BuiTagsInputItemDelete,
      BuiTagsInputItemText
    },
    setup() {
      const tags = ref(['Vue', 'React', 'Angular'])
      return { args, tags }
    },
    template: `
      <div class="mb-2">{{ tags.join('; ') }}</div>
      <BuiTagsInput
        v-model="tags"
        class="w-full max-w-sm"
        v-bind="args"
      >
        <BuiTagsInputItem v-for="tag in tags" :key="tag" :value="tag">
          <BuiTagsInputItemText />
          <BuiTagsInputItemDelete />
        </BuiTagsInputItem>
        <BuiTagsInputInput :placeholder="args.placeholder" id="tagsInput" name="tags-input"/>
      </BuiTagsInput>
    `
  })
}
