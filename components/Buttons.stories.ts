import type { Meta, StoryObj } from '@storybook/vue3'

import Buttons from './Buttons.vue'
import type { ButtonProps } from './Buttons.vue'


const meta = {
  title: 'Components/Buttons',
  component: Buttons,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Buttons>

export default meta
type Story = StoryObj<typeof meta>

export const Story: Story = {
  argTypes: {
    buttons: {
      control: {
        type: 'object',
      },
    },
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'radio' },
    },
  } as Record<keyof ButtonProps, any>,

  args: {
    buttons: [
      {
        label: 'Button 1',
        link: 'https://nuxt.com/docs/getting-started/introduction',
        color: 'primary',
        style: 'default',
        width: 'default',
      },
      {
        label: 'Button 2',
        link: 'https://nuxt.com/docs/getting-started/introduction',
        color: 'secondary',
        style: 'outline',
        width: 'default',
      },
    ],

    size: 'md',
  },
}
