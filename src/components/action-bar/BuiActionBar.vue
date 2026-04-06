<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import BuiButton from '@/components/button/BuiButton.vue'
import {
  BuiDropdownMenu,
  BuiDropdownMenuContent,
  BuiDropdownMenuItem,
  BuiDropdownMenuSeparator,
  BuiDropdownMenuTrigger
} from '@/components/dropdown-menu'
import {
  BuiTooltipProvider,
  BuiTooltip,
  BuiTooltipTrigger,
  BuiTooltipContent
} from '@/components/tooltip'
import { type ActionBarItem } from '.'

const props = defineProps<{
  actions: ActionBarItem[]
  selectedCount?: number
  translations?: {
    more?: string
    affects?: string
    of?: string
  }
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const visibleCount = ref(props.actions.length)

const BUTTON_GAP = 12
const MORE_BUTTON_WIDTH = 90
const SELECTED_SECTION_WIDTH = 100
const DEFAULT_CHAR_WIDTH = 9.6
const charWidth = ref<number>(DEFAULT_CHAR_WIDTH)

const getButtonWidth = (action: ActionBarItem) => {
  // Включаем в ширину кнопки длину лейбла, паддинги, гап и ширину иконки
  return action.label.length * charWidth.value + 50
}

const getAllButtonsWidth = (actions: ActionBarItem[]) => {
  return actions.reduce((width, action) => (width += getButtonWidth(action)), 0)
}

const recalculate = () => {
  if (!containerRef.value) return
  const available = containerRef.value.offsetWidth

  // Все кнопки влезают
  const allWidth =
    getAllButtonsWidth(props.actions) + props.actions.length * BUTTON_GAP + SELECTED_SECTION_WIDTH

  if (allWidth <= available) {
    visibleCount.value = props.actions.length
    return
  }

  // Ищем максимальное количество кнопок, которые влезают вместе с "Ещё"
  // Обязательно оставить хотя бы одну кнопку
  const currentActions = [...props.actions]
  while (currentActions.length > 1) {
    const width =
      getAllButtonsWidth(currentActions) +
      currentActions.length * BUTTON_GAP +
      SELECTED_SECTION_WIDTH +
      MORE_BUTTON_WIDTH
    if (width <= available) break
    currentActions.pop()
  }

  visibleCount.value = currentActions.length
}

const visibleActions = computed(() => props.actions.slice(0, visibleCount.value))
const overflowActions = computed(() => props.actions.slice(visibleCount.value))

onMounted(() => {
  const { charWidth: w } = measureMonospaceCharWidth()
  charWidth.value = w

  recalculate()

  if (containerRef.value) {
    useResizeObserver(containerRef, recalculate)
  }
})

const measureMonospaceCharWidth = () => {
  const span = document.createElement('span')
  span.style.cssText = `
    position: absolute;
    visibility: hidden;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 16px;
    white-space: pre;
  `
  span.textContent = 'X'
  document.body.appendChild(span)

  const charWidth = span.getBoundingClientRect().width
  const charHeight = span.getBoundingClientRect().height
  document.body.removeChild(span)

  return { charWidth, charHeight }
}

watch(
  () => props.actions,
  () => {
    recalculate()
  },
  { deep: true }
)
</script>

<template>
  <div ref="containerRef" class="flex h-full grow flex-row items-center gap-3">
    <BuiTooltipProvider>
      <template v-for="action in visibleActions" :key="action.label">
        <BuiTooltip :disabled="!(props.selectedCount && action.affectsCount)">
          <BuiTooltipTrigger as-child>
            <BuiButton
              class="relative flex gap-2 whitespace-nowrap"
              :variant="action.variant === 'destructive' ? 'destructive' : 'outline'"
              :disabled="action.disabled"
              @click="action.handler"
            >
              <component v-if="action.icon" :is="action.icon" class="h-4 w-4" />
              <span>
                {{ action.label }}
              </span>
            </BuiButton>
          </BuiTooltipTrigger>
          <BuiTooltipContent>
            {{ props.translations?.affects || 'Affects' }} {{ action.affectsCount }}
            {{ props.translations?.of || 'of' }} {{ props.selectedCount }}
          </BuiTooltipContent>
        </BuiTooltip>
      </template>

      <BuiDropdownMenu v-if="overflowActions.length">
        <BuiDropdownMenuTrigger as-child>
          <BuiButton variant="ghost" class="items-cente flex gap-1">
            <span>{{ props.translations?.more || 'More' }}</span>
            <span>{{ ` (${overflowActions.length})` }}</span>
          </BuiButton>
        </BuiDropdownMenuTrigger>
        <BuiDropdownMenuContent align="end" class="min-w-40">
          <template v-for="(action, index) in overflowActions" :key="index">
            <BuiDropdownMenuSeparator
              v-if="
                action.variant === 'destructive' &&
                index > 0 &&
                overflowActions[index - 1]?.variant !== 'destructive'
              "
            />

            <BuiTooltip :disabled="!(props.selectedCount && action.affectsCount)">
              <BuiTooltipTrigger as-child>
                <BuiDropdownMenuItem
                  :disabled="action.disabled"
                  class="flex gap-2"
                  :class="
                    action.variant === 'destructive'
                      ? 'text-destructive-foreground focus:text-destructive-foreground'
                      : ''
                  "
                  @click="action.handler"
                >
                  <component v-if="action.icon" :is="action.icon" class="h-4 w-4" />
                  <span>{{ action.label }}</span>
                </BuiDropdownMenuItem>
              </BuiTooltipTrigger>
              <BuiTooltipContent>
                {{ props.translations?.affects || 'Affects' }} {{ action.affectsCount }}
                {{ props.translations?.of || 'of' }} {{ props.selectedCount }}
              </BuiTooltipContent>
            </BuiTooltip>
          </template>
        </BuiDropdownMenuContent>
      </BuiDropdownMenu>
    </BuiTooltipProvider>
    <slot name="selected"></slot>
  </div>
</template>
