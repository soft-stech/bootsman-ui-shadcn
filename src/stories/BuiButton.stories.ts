import { BuiButton } from '@/components/button'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  component: BuiButton,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost', 'link', 'none', 'destructive']
    }
  },
  args: {
    disabled: false
  }
} satisfies Meta<typeof BuiButton>

//👇 This default export determines where your story goes in the story list
export default meta
type Story = StoryObj<typeof meta>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
    default: 'Button text' // slot
  }
}
