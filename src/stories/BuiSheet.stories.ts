import type { Meta, StoryObj } from '@storybook/vue3-vite'
import {
  BuiSheet,
  BuiSheetClose,
  BuiSheetContent,
  BuiSheetDescription,
  BuiSheetFooter,
  BuiSheetHeader,
  BuiSheetTitle,
  BuiSheetTrigger
} from '@/components/sheet'
import BuiSheetStory from './components/BuiSheetStory.vue'

const meta = {
  component: BuiSheet,
  subcomponents: {
    BuiSheetClose,
    BuiSheetContent,
    BuiSheetDescription,
    BuiSheetFooter,
    BuiSheetHeader,
    BuiSheetTitle,
    BuiSheetTrigger
  },
  tags: ['autodocs'],
  args: {}
} satisfies Meta<typeof BuiSheet>

export default meta
type Story = StoryObj<typeof meta>

export const Top: Story = {
  render: (args) => ({
    components: { BuiSheetStory },
    setup() {
      return { args }
    },
    template: `
      <BuiSheetStory v-bind="args" side="top"/>
    `
  })
}

export const Right: Story = {
  render: (args) => ({
    components: { BuiSheetStory },
    setup() {
      return { args }
    },
    template: `
      <BuiSheetStory v-bind="args" side="right"/>
    `
  })
}

export const Bottom: Story = {
  render: (args) => ({
    components: { BuiSheetStory },
    setup() {
      return { args }
    },
    template: `
      <BuiSheetStory v-bind="args" side="bottom"/>
    `
  })
}

export const Left: Story = {
  render: (args) => ({
    components: { BuiSheetStory },
    setup() {
      return { args }
    },
    template: `
      <BuiSheetStory v-bind="args" side="left"/>
    `
  })
}
