import type { Meta, StoryObj } from '@storybook/vue3'

import Card from './Card.vue'
import type { CardProps } from './Card.vue'

const meta = {
  title: 'Components/Card',
  component: Card,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Story: Story = {
  argTypes: {
    variant: {
      options: ['shadow', 'border'],
      control: { type: 'radio' },
    },
  } as Record<keyof CardProps, any>,

  args: {
    title: 'Card title',
    subtitle: 'Card subtitle',
    content:
      'This is a description of the card. It can be a short summary or an introduction to the content.',

    variant: 'shadow',
    reverse: false,
  },
}
