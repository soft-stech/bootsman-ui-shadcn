import { BuiCalendar } from '@/components/calendar'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

const meta = {
  component: BuiCalendar,
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof BuiCalendar>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { BuiCalendar },
    setup() {
      const date = ref(new Date())
      return { args, date }
    },
    template: `
      <div class="flex min-h-[350px] w-full items-center justify-center p-10">
        <BuiCalendar v-model="date" mode="dateTime" is24hr />
      </div>
    `
  })
}

export const Range: Story = {
  args: {},
  render: (args) => ({
    components: { BuiCalendar },
    setup() {
      const range = ref({
        start: new Date(2020, 0, 6),
        end: new Date(2020, 0, 10)
      })

      const rules = ref([
        {
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0
        },
        {
          hours: 23,
          minutes: 59,
          seconds: 59,
          milliseconds: 999
        }
      ])
      return { args, range, rules }
    },
    template: `
      <div class="flex min-h-[350px] w-full items-center justify-center p-10">
        <BuiCalendar v-model.range="range" :rules="rules" />
      </div>
    `
  })
}
