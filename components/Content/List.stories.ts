import type { Meta, StoryObj } from '@storybook/vue3'

import List from './List.vue'
import type { ListProps } from './List.vue'

const meta = {
  title: 'Components/List',
  component: List,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        // component: `Cards are very flexibly containers for small bits of content. They are usually used as navigation blocks. For example, they are used for listing events, groups or articles.`,
      },
    },
  },
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

export const Story: Story = {
  argTypes: {} as Record<keyof ListProps, any>,

  args: {
    color: 'primary',
    items: [
      {
        title: 'Lorem ipsum dolor sit amet',
        subtitle: 'Lorem',
        link: '/',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        type: 'group',
      },

      {
        title: 'Lorem ipsum dolor sit amet',
        subtitle: 'Lorem',
        link: '/',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        type: 'group',
      },

      {
        title: 'Lorem ipsum dolor sit amet',
        subtitle: 'Lorem',
        link: '/',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        type: 'group',
      },
    ],
  },
}
