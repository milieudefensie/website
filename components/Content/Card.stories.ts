import type { Meta, StoryObj } from '@storybook/vue3'

import Card from './Card.vue'
import type { CardProps } from './Card.vue'

const meta = {
  title: 'Components/Card',
  component: Card,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Cards are very flexibly containers for small bits of content. They are usually used as navigation blocks. For example, they are used for listing events, groups or articles.`,
      },
    },
  },
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
    badges: ['Badge'],
    title: 'Card title',
    subtitle: 'Card subtitle',
    images: [
      {
        src: 'https://picsum.photos/801',
        alt: 'Placeholder image',
      },
      {
        src: 'https://picsum.photos/802',
        alt: 'Placeholder image',
      },
      {
        src: 'https://picsum.photos/803',
        alt: 'Placeholder image',
      },
    ],
    content:
      'This is a description of the card. It can be a short summary or an introduction to the content.',
    buttons: {
      buttons: [
        {
          label: 'Button 1',
          color: 'secondary',
          style: 'default',
          width: 'default',
        },
        {
          label: 'Button 2',
          color: 'secondary',
          style: 'outline',
          width: 'default',
        },
      ],
      size: 'md',
    },
    variant: 'shadow',
    reverse: false,
    list: {
      items: [
        {
          title: 'Item 1',
          subtitle: 'Subtitle',
          link: 'https://example.com',
          type: 'event',
        },
        {
          title: 'Item 2',
          subtitle: 'Subtitle',
          link: 'https://example.com',
          type: 'event',
        },
        {
          title: 'Item 3',
          subtitle: 'Subtitle',
          link: 'https://example.com',
          type: 'event',
        },
      ],
      color: 'secondary',
    },
  },
}
