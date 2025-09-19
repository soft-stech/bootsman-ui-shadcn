import type { Meta, StoryObj } from '@storybook/vue3-vite'
import {
  BuiDropdownMenu,
  BuiDropdownMenuContent,
  BuiDropdownMenuGroup,
  BuiDropdownMenuItem,
  BuiDropdownMenuLabel,
  BuiDropdownMenuPortal,
  BuiDropdownMenuSeparator,
  BuiDropdownMenuShortcut,
  BuiDropdownMenuSub,
  BuiDropdownMenuSubContent,
  BuiDropdownMenuSubTrigger,
  BuiDropdownMenuTrigger
} from '@/components/dropdown-menu'
import BuiDropdownMenuStory from './components/BuiDropdownMenuStory.vue'

const meta = {
  component: BuiDropdownMenu,
  subcomponents: {
    BuiDropdownMenuContent,
    BuiDropdownMenuGroup,
    BuiDropdownMenuItem,
    BuiDropdownMenuLabel,
    BuiDropdownMenuPortal,
    BuiDropdownMenuSeparator,
    BuiDropdownMenuShortcut,
    BuiDropdownMenuSub,
    BuiDropdownMenuSubContent,
    BuiDropdownMenuSubTrigger,
    BuiDropdownMenuTrigger
  },
  tags: ['autodocs'],
  args: {}
} satisfies Meta<typeof BuiDropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiDropdownMenuStory },
    setup() {
      return { args }
    },
    template: `
      <BuiDropdownMenuStory v-bind="args" />
    `
  })
}
