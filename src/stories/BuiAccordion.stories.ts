import type { Meta, StoryObj } from '@storybook/vue3-vite'
import {
  BuiAccordion,
  BuiAccordionContent,
  BuiAccordionItem,
  BuiAccordionTrigger
} from '@/components/accordion'
import BuiAccordionStory from '@/stories/components/BuiAccordionStory.vue'
import BuiAccordionAdvancedTriggerStory from '@/stories/components/BuiAccordionAdvancedTriggerStory.vue'

const meta = {
  component: BuiAccordion,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple']
    }
  },
  args: {
    disabled: false,
    type: 'single',
    collapsible: true,
    class: 'flex flex-col gap-4 px-2'
  }
} satisfies Meta<typeof BuiAccordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { BuiAccordion, BuiAccordionContent, BuiAccordionItem, BuiAccordionTrigger },
    setup() {
      return { args }
    },
    template: `
    <BuiAccordion v-bind="args">
      <BuiAccordionItem value="item-1">
        <BuiAccordionTrigger>
          Member Roles

          <template #description>
            Control who has access to the cluster and what permission they have to change it
          </template>
        </BuiAccordionTrigger>

        <BuiAccordionContent>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus a voluptatem, ipsa autem
          aspernatur beatae fugiat deleniti laborum dolorem obcaecati necessitatibus harum dolore
          error! Perferendis nostrum eius eligendi dolorum reprehenderit?
        </BuiAccordionContent>
      </BuiAccordionItem>
    </BuiAccordion>
    `
  })
}

export const NotCollapsible: Story = {
  name: 'Not Collapsible',
  args: {
    ...Default.args,
    collapsible: false
  },
  render: (args) => ({
    components: { BuiAccordionStory },
    setup() {
      return { args }
    },
    template: `
      <BuiAccordionStory v-bind="args"/>
    `
  })
}

export const Multiple: Story = {
  name: 'Type: Multiple',
  args: {
    ...Default.args,
    type: 'multiple'
  },
  render: (args) => ({
    components: { BuiAccordionStory },
    setup() {
      return { args }
    },
    template: `
      <BuiAccordionStory v-bind="args"/>
    `
  })
}

export const AdvancedTrigger: Story = {
  name: 'Advanced Trigger',
  args: {
    ...Default.args
  },
  render: (args) => ({
    components: { BuiAccordionAdvancedTriggerStory },
    setup() {
      return { args }
    },
    template: `
      <BuiAccordionAdvancedTriggerStory v-bind="args"/>
    `
  })
}
