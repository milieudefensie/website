import type { Meta, StoryObj } from '@storybook/vue3'

import Steps from './Steps.vue'
import type { StepsProps } from './Steps.vue'

const meta = {
  title: 'Components/Steps',
  component: Steps,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Steps>

export default meta
type Story = StoryObj<typeof meta>

export const Story: Story = {
  // argTypes: {
  //   ,
  // } as Record<keyof StepsProps, any>,

  args: {
    steps: [
      { title: 'Step 1', link: '#1' },
      { title: 'Step 2', link: '#2' },
      { title: 'Step 3', link: '#3' },
      { title: 'Step 4', link: '#4' },
    ],
  },
}
