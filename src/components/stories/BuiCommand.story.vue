<script setup lang="ts">
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
} from '@/components/ui/command'
const variant = 'default'
</script>

<template>
  <Story title="BuiCommand" autoPropsDisabled>
    <Variant :key="`variant`" :title="`${variant}`">
      <BuiCommand class="max-w-[450px] rounded-lg border shadow-md">
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
    </Variant>
  </Story>
</template>
