import type { Meta, StoryObj } from '@storybook/vue3-vite'
import {
  BuiContextMenu,
  BuiContextMenuCheckboxItem,
  BuiContextMenuContent,
  BuiContextMenuItem,
  BuiContextMenuLabel,
  BuiContextMenuRadioGroup,
  BuiContextMenuRadioItem,
  BuiContextMenuSeparator,
  BuiContextMenuShortcut,
  BuiContextMenuSub,
  BuiContextMenuSubContent,
  BuiContextMenuSubTrigger,
  BuiContextMenuTrigger
} from '@/components/context-menu'

const meta = {
  component: BuiContextMenu,
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof BuiContextMenu>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: {
      BuiContextMenu,
      BuiContextMenuTrigger,
      BuiContextMenuContent,
      BuiContextMenuItem,
      BuiContextMenuSeparator,
      BuiContextMenuCheckboxItem,
      BuiContextMenuRadioGroup,
      BuiContextMenuRadioItem,
      BuiContextMenuLabel,
      BuiContextMenuShortcut,
      BuiContextMenuSub,
      BuiContextMenuSubTrigger,
      BuiContextMenuSubContent
    },
    setup() {
      return { args }
    },
    template: `
      <div class="flex items-center space-x-2 p-1">
        <BuiContextMenu>
          <BuiContextMenuTrigger
            class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
          >
            Right click here
          </BuiContextMenuTrigger>
          <BuiContextMenuContent class="w-64">
            <BuiContextMenuItem inset>
              Back
              <BuiContextMenuShortcut>⌘[</BuiContextMenuShortcut>
            </BuiContextMenuItem>
            <BuiContextMenuItem inset disabled>
              Forward
              <BuiContextMenuShortcut>⌘]</BuiContextMenuShortcut>
            </BuiContextMenuItem>
            <BuiContextMenuItem inset>
              Reload
              <BuiContextMenuShortcut>⌘R</BuiContextMenuShortcut>
            </BuiContextMenuItem>
            <BuiContextMenuSub>
              <BuiContextMenuSubTrigger inset> More Tools </BuiContextMenuSubTrigger>
              <BuiContextMenuSubContent class="w-48">
                <BuiContextMenuItem>
                  Save Page As...
                  <BuiContextMenuShortcut>⇧⌘S</BuiContextMenuShortcut>
                </BuiContextMenuItem>
                <BuiContextMenuItem>Create Shortcut...</BuiContextMenuItem>
                <BuiContextMenuItem>Name Window...</BuiContextMenuItem>
                <BuiContextMenuSeparator />
                <BuiContextMenuItem>Developer Tools</BuiContextMenuItem>
              </BuiContextMenuSubContent>
            </BuiContextMenuSub>
            <BuiContextMenuSeparator />
            <BuiContextMenuCheckboxItem checked>
              Show Bookmarks Bar
              <BuiContextMenuShortcut>⌘⇧B</BuiContextMenuShortcut>
            </BuiContextMenuCheckboxItem>
            <BuiContextMenuCheckboxItem>Show Full URLs</BuiContextMenuCheckboxItem>
            <BuiContextMenuSeparator />
            <BuiContextMenuRadioGroup model-value="pedro">
              <BuiContextMenuLabel inset> People </BuiContextMenuLabel>
              <BuiContextMenuSeparator />
              <BuiContextMenuRadioItem value="pedro"> Pedro Duarte </BuiContextMenuRadioItem>
              <BuiContextMenuRadioItem value="colm"> Colm Tuite </BuiContextMenuRadioItem>
            </BuiContextMenuRadioGroup>
          </BuiContextMenuContent>
        </BuiContextMenu>
      </div>
    `
  })
}
