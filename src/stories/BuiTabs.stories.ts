import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { BuiInput } from '@/components/input'
import { BuiLabel } from '@/components/label'
import { BuiTabs, BuiTabsContent, BuiTabsList, BuiTabsTrigger } from '@/components/tabs'
import { BuiButton } from '@/components/button'
import {
  BuiCard,
  BuiCardContent,
  BuiCardDescription,
  BuiCardFooter,
  BuiCardHeader,
  BuiCardTitle
} from '@/components/card'
import { AlertCircleIcon } from 'lucide-vue-next'

const meta = {
  component: BuiTabs,
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof BuiTabs>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: {
      BuiTabs,
      BuiTabsTrigger,
      BuiTabsList,
      BuiTabsContent,
      BuiCard,
      BuiCardHeader,
      BuiCardTitle,
      BuiCardDescription,
      BuiCardContent,
      BuiCardFooter,
      BuiLabel,
      BuiInput,
      BuiButton,
      AlertCircleIcon
    },
    setup() {
      return { args }
    },
    template: `
      <BuiTabs default-value="account" class="w-[400px]">
        <BuiTabsList class="grid w-full grid-cols-2" variant="default">
          <BuiTabsTrigger value="account" variant="default"> Account </BuiTabsTrigger>
          <BuiTabsTrigger value="password" variant="default"
            >Password
            <AlertCircleIcon class="ml-2 h-5 w-5 text-destructive-foreground" />
          </BuiTabsTrigger>
        </BuiTabsList>
        <BuiTabsContent value="account">
          <BuiCard>
            <BuiCardHeader>
              <BuiCardTitle>Account</BuiCardTitle>
              <BuiCardDescription>
                Make changes to your account here. Click save when you're done.
              </BuiCardDescription>
            </BuiCardHeader>
            <BuiCardContent class="space-y-2">
              <div class="space-y-1">
                <BuiLabel for="name">Name</BuiLabel>
                <BuiInput id="name" default-value="Pedro Duarte" />
              </div>
              <div class="space-y-1">
                <BuiLabel for="username">Username</BuiLabel>
                <BuiInput id="username" default-value="@peduarte" />
              </div>
            </BuiCardContent>
            <BuiCardFooter>
              <BuiButton>Save changes</BuiButton>
            </BuiCardFooter>
          </BuiCard>
        </BuiTabsContent>
        <BuiTabsContent value="password">
          <BuiCard>
            <BuiCardHeader>
              <BuiCardTitle>Password</BuiCardTitle>
              <BuiCardDescription>
                Change your password here. After saving, you'll be logged out.
              </BuiCardDescription>
            </BuiCardHeader>
            <BuiCardContent class="space-y-2">
              <div class="space-y-1">
                <BuiLabel for="current">Current password</BuiLabel>
                <BuiInput id="current" type="password" />
              </div>
              <div class="space-y-1">
                <BuiLabel for="new">New password</BuiLabel>
                <BuiInput id="new" type="password" />
              </div>
            </BuiCardContent>
            <BuiCardFooter>
              <BuiButton>Save password</BuiButton>
            </BuiCardFooter>
          </BuiCard>
        </BuiTabsContent>
      </BuiTabs>
    `
  })
}

export const Ghost: Story = {
  render: (args) => ({
    components: {
      BuiTabs,
      BuiTabsTrigger,
      BuiTabsList,
      BuiTabsContent,
      BuiCard,
      BuiCardHeader,
      BuiCardTitle,
      BuiCardDescription,
      BuiCardContent,
      BuiCardFooter,
      BuiLabel,
      BuiInput,
      BuiButton,
      AlertCircleIcon
    },
    setup() {
      return { args }
    },
    template: `
      <BuiTabs default-value="account" class="w-[400px]">
        <BuiTabsList class="grid w-full grid-cols-2" variant="ghost">
          <BuiTabsTrigger value="account" variant="ghost"> Account </BuiTabsTrigger>
          <BuiTabsTrigger value="password" variant="ghost"
            >Password
            <AlertCircleIcon class="ml-2 h-5 w-5 text-destructive-foreground" />
          </BuiTabsTrigger>
        </BuiTabsList>
        <BuiTabsContent value="account">
          <BuiCard>
            <BuiCardHeader>
              <BuiCardTitle>Account</BuiCardTitle>
              <BuiCardDescription>
                Make changes to your account here. Click save when you're done.
              </BuiCardDescription>
            </BuiCardHeader>
            <BuiCardContent class="space-y-2">
              <div class="space-y-1">
                <BuiLabel for="name">Name</BuiLabel>
                <BuiInput id="name" default-value="Pedro Duarte" />
              </div>
              <div class="space-y-1">
                <BuiLabel for="username">Username</BuiLabel>
                <BuiInput id="username" default-value="@peduarte" />
              </div>
            </BuiCardContent>
            <BuiCardFooter>
              <BuiButton>Save changes</BuiButton>
            </BuiCardFooter>
          </BuiCard>
        </BuiTabsContent>
        <BuiTabsContent value="password">
          <BuiCard>
            <BuiCardHeader>
              <BuiCardTitle>Password</BuiCardTitle>
              <BuiCardDescription>
                Change your password here. After saving, you'll be logged out.
              </BuiCardDescription>
            </BuiCardHeader>
            <BuiCardContent class="space-y-2">
              <div class="space-y-1">
                <BuiLabel for="current">Current password</BuiLabel>
                <BuiInput id="current" type="password" />
              </div>
              <div class="space-y-1">
                <BuiLabel for="new">New password</BuiLabel>
                <BuiInput id="new" type="password" />
              </div>
            </BuiCardContent>
            <BuiCardFooter>
              <BuiButton>Save password</BuiButton>
            </BuiCardFooter>
          </BuiCard>
        </BuiTabsContent>
      </BuiTabs>
    `
  })
}

export const Vertical: Story = {
  render: (args) => ({
    components: {
      BuiTabs,
      BuiTabsTrigger,
      BuiTabsList,
      BuiTabsContent,
      BuiCard,
      BuiCardHeader,
      BuiCardTitle,
      BuiCardDescription,
      BuiCardContent,
      BuiCardFooter,
      BuiLabel,
      BuiInput,
      BuiButton,
      AlertCircleIcon
    },
    setup() {
      return { args }
    },
    template: `
      <BuiTabs default-value="general" class="flex" orientation="vertical">
        <BuiTabsList variant="vertical">
          <BuiTabsTrigger value="general" variant="vertical">General</BuiTabsTrigger>
          <BuiTabsTrigger value="health" variant="vertical">Health check</BuiTabsTrigger>
          <BuiTabsTrigger value="resources" variant="vertical">
            A Very Very Veeeeeery Long Label For Resources
          </BuiTabsTrigger>
        </BuiTabsList>
        <BuiTabsContent value="general" class="mt-0 grow bg-background p-2">
          General content
        </BuiTabsContent>
        <BuiTabsContent value="health" class="mt-0 bg-background p-2">
          Health check content
        </BuiTabsContent>
        <BuiTabsContent value="resources" class="mt-0 bg-background p-2">
          Resources content
        </BuiTabsContent>
      </BuiTabs>
    `
  })
}
