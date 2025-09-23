import ReadonlyForm from '@/stories/components/ReadonlyForm.vue'
import ReadonlyFormWrapper from '@/stories/components/ReadonlyFormWrapper.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  component: ReadonlyForm,
  argTypes: {},
  args: {
    // @ts-expect-error wrapper property
    readonly: false
  }
} satisfies Meta<typeof ReadonlyForm>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { ReadonlyForm, ReadonlyFormWrapper },
    setup() {
      return { args }
    },
    template: `
      <ReadonlyFormWrapper v-bind="args">
        <ReadonlyForm />
      </ReadonlyFormWrapper>
    `
  })
}
