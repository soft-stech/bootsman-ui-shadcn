<script setup lang="ts">
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
} from '@/components/ui/context-menu'
</script>

<template>
  <Story title="BuiContextMenu" autoPropsDisabled>
    <Variant title="Default">
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
    </Variant>
  </Story>
</template>
