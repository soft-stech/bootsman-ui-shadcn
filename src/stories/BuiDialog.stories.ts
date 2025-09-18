import { BuiButton } from '@/components/button'
import {
  BuiDialog,
  BuiDialogContent,
  BuiDialogDescription,
  BuiDialogFooter,
  BuiDialogHeader,
  BuiDialogTitle,
  BuiDialogTrigger
} from '@/components/dialog'
import { BuiInput } from '@/components/input'
import { BuiLabel } from '@/components/label'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  component: BuiDialog,
  tags: ['autodocs'],
  argTypes: {},
  args: {}
} satisfies Meta<typeof BuiDialog>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: {
      BuiDialog,
      BuiDialogTrigger,
      BuiDialogContent,
      BuiDialogHeader,
      BuiDialogTitle,
      BuiDialogDescription,
      BuiDialogFooter,
      BuiButton,
      BuiInput,
      BuiLabel
    },
    setup() {
      return { args }
    },
    template: `
       <div class="flex flex-col items-center gap-4">
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, expedita ipsum id
          enim similique, sed sequi aliquid, sapiente dicta blanditiis in ratione modi minus aut
          tempora voluptatum eius ut iusto!
        </div>
        <div>
          <BuiDialog>
            <BuiDialogTrigger as-child>
              <BuiButton variant="outline"> Edit Profile </BuiButton>
            </BuiDialogTrigger>
            <BuiDialogContent class="sm:max-w-[425px]">
              <BuiDialogHeader>
                <BuiDialogTitle>Edit profile</BuiDialogTitle>
                <BuiDialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </BuiDialogDescription>
              </BuiDialogHeader>
              <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                  <BuiLabel for="name" class="text-right"> Name </BuiLabel>
                  <BuiInput id="name" value="Pedro Duarte" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <BuiLabel for="username" class="text-right"> Username </BuiLabel>
                  <BuiInput id="username" value="@peduarte" class="col-span-3" />
                </div>
              </div>
              <BuiDialogFooter>
                <BuiButton type="submit"> Save changes </BuiButton>
              </BuiDialogFooter>
            </BuiDialogContent>
          </BuiDialog>
        </div>
      </div>
    `
  })
}
