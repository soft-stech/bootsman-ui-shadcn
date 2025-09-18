import { BuiForm } from '@/components/form';
import LoginForm from '@/stories/components/LoginForm.vue';
import LoginFormHook from '@/stories/components/LoginFormHook.vue';
import UseBuiField from '@/stories/components/UseBuiField.vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';

const meta = {
  component: BuiForm,
  argTypes: {},
  args: {}
} satisfies Meta<typeof BuiForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FormComponent: Story = {
  render: (args) => ({
    components: { LoginForm },
    setup() {
      return { args }
    },
    template: `
      <LoginForm  />
    `
  })
}

export const useBuiFormHook: Story = {
  name: 'useBuiFormHook',
  render: (args) => ({
    components: { LoginFormHook },
    setup() {
      return { args }
    },
    template: `
      <LoginFormHook  />
    `
  })
}

export const useBuiField: Story = {
  name: 'useBuiField',
  render: (args) => ({
    components: { UseBuiField },
    setup() {
      return { args }
    },
    template: `
      <UseBuiField  />
    `
  })
}