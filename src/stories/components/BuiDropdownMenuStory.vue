<script setup lang="ts">
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users
} from 'lucide-vue-next'

import { BuiButton } from '@/components/button'
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
</script>

<template>
  <div class="flex flex-row justify-center gap-2 p-1">
    <BuiDropdownMenu>
      <BuiDropdownMenuTrigger as-child>
        <BuiButton variant="outline"> Open </BuiButton>
      </BuiDropdownMenuTrigger>
      <BuiDropdownMenuContent class="w-64">
        <BuiDropdownMenuLabel>My Account</BuiDropdownMenuLabel>
        <BuiDropdownMenuSeparator />
        <BuiDropdownMenuGroup>
          <BuiDropdownMenuItem>
            <User class="mr-2 h-4 w-4" />
            <span>Profile</span>
            <BuiDropdownMenuShortcut>⇧⌘P</BuiDropdownMenuShortcut>
          </BuiDropdownMenuItem>
          <BuiDropdownMenuItem>
            <CreditCard class="mr-2 h-4 w-4" />
            <span>Billing</span>
            <BuiDropdownMenuShortcut>⌘B</BuiDropdownMenuShortcut>
          </BuiDropdownMenuItem>
          <BuiDropdownMenuItem>
            <Settings class="mr-2 h-4 w-4" />
            <span>Settings</span>
            <BuiDropdownMenuShortcut>⌘S</BuiDropdownMenuShortcut>
          </BuiDropdownMenuItem>
          <BuiDropdownMenuItem>
            <Keyboard class="mr-2 h-4 w-4" />
            <span>Keyboard shortcuts</span>
            <BuiDropdownMenuShortcut>⌘K</BuiDropdownMenuShortcut>
          </BuiDropdownMenuItem>
        </BuiDropdownMenuGroup>
        <BuiDropdownMenuSeparator />
        <BuiDropdownMenuGroup>
          <BuiDropdownMenuItem>
            <Users class="mr-2 h-4 w-4" />
            <span>Team</span>
          </BuiDropdownMenuItem>
          <BuiDropdownMenuSub>
            <BuiDropdownMenuSubTrigger>
              <UserPlus class="mr-2 h-4 w-4" />
              <span>Invite users</span>
            </BuiDropdownMenuSubTrigger>
            <BuiDropdownMenuPortal>
              <BuiDropdownMenuSubContent>
                <BuiDropdownMenuItem>
                  <Mail class="mr-2 h-4 w-4" />
                  <span>Email</span>
                </BuiDropdownMenuItem>
                <BuiDropdownMenuItem>
                  <MessageSquare class="mr-2 h-4 w-4" />
                  <span>Message</span>
                </BuiDropdownMenuItem>
                <BuiDropdownMenuSeparator />
                <BuiDropdownMenuItem>
                  <PlusCircle class="mr-2 h-4 w-4" />
                  <span>More...</span>
                </BuiDropdownMenuItem>
              </BuiDropdownMenuSubContent>
            </BuiDropdownMenuPortal>
          </BuiDropdownMenuSub>
          <BuiDropdownMenuItem>
            <Plus class="mr-2 h-4 w-4" />
            <span>New Team</span>
            <BuiDropdownMenuShortcut>⌘+T</BuiDropdownMenuShortcut>
          </BuiDropdownMenuItem>
        </BuiDropdownMenuGroup>
        <BuiDropdownMenuSeparator />
        <BuiDropdownMenuItem>
          <Github class="mr-2 h-4 w-4" />
          <span>GitHub</span>
        </BuiDropdownMenuItem>
        <BuiDropdownMenuItem>
          <LifeBuoy class="mr-2 h-4 w-4" />
          <span>Support</span>
        </BuiDropdownMenuItem>
        <BuiDropdownMenuItem disabled>
          <Cloud class="mr-2 h-4 w-4" />
          <span>API</span>
        </BuiDropdownMenuItem>
        <BuiDropdownMenuSeparator />
        <BuiDropdownMenuItem>
          <LogOut class="mr-2 h-4 w-4" />
          <span>Log out</span>
          <BuiDropdownMenuShortcut>⇧⌘Q</BuiDropdownMenuShortcut>
        </BuiDropdownMenuItem>
      </BuiDropdownMenuContent>
    </BuiDropdownMenu>
  </div>
</template>
