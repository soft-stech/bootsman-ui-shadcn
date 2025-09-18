import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-vue-next'
import {
  BuiCommand,
  BuiCommandEmpty,
  BuiCommandGroup,
  BuiCommandInput,
  BuiCommandItem,
  BuiCommandList,
  BuiCommandSeparator,
  BuiCommandShortcut
} from '@/components/command'

const meta = {
  component: BuiCommand,
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof BuiCommand>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: {
      BuiCommand,
      BuiCommandEmpty,
      BuiCommandGroup,
      BuiCommandInput,
      BuiCommandItem,
      BuiCommandList,
      BuiCommandSeparator,
      BuiCommandShortcut,
      Calculator,
      Calendar,
      CreditCard,
      Settings,
      Smile,
      User
    },
    setup() {
      return { args }
    },
    template: `
      <BuiCommand class="max-w-[450px]">
        <BuiCommandInput placeholder="Type a command or search..." />
        <BuiCommandList>
          <BuiCommandEmpty>No results found.</BuiCommandEmpty>
          <BuiCommandGroup heading="Suggestions">
            <BuiCommandItem value="Calendar">
              <Calendar class="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </BuiCommandItem>
            <BuiCommandItem value="Search Emoji">
              <Smile class="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </BuiCommandItem>
            <BuiCommandItem value="Calculator">
              <Calculator class="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </BuiCommandItem>
          </BuiCommandGroup>
          <BuiCommandSeparator />
          <BuiCommandGroup heading="Settings">
            <BuiCommandItem value="Profile">
              <User class="mr-2 h-4 w-4" />
              <span>Profile</span>
              <BuiCommandShortcut>⌘P</BuiCommandShortcut>
            </BuiCommandItem>
            <BuiCommandItem value="Billing">
              <CreditCard class="mr-2 h-4 w-4" />
              <span>Billing</span>
              <BuiCommandShortcut>⌘B</BuiCommandShortcut>
            </BuiCommandItem>
            <BuiCommandItem value="Settings">
              <Settings class="mr-2 h-4 w-4" />
              <span>Settings</span>
              <BuiCommandShortcut>⌘S</BuiCommandShortcut>
            </BuiCommandItem>
          </BuiCommandGroup>
        </BuiCommandList>
      </BuiCommand>
    `
  })
}
