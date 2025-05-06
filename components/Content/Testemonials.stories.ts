import type { Meta, StoryObj } from '@storybook/vue3'

import Testemonial from './Testimonial.vue'
import type { TestimonialProps } from './Testimonial.vue'

const meta = {
  title: 'Components/Testemonials',
  component: Testemonial,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        // component: `Cards are very flexibly containers for small bits of content. They are usually used as navigation blocks. For example, they are used for listing events, groups or articles.`,
      },
    },
  },
} satisfies Meta<typeof Testemonial>

export default meta
type Story = StoryObj<typeof meta>

export const Story: Story = {
  argTypes: {} as Record<keyof TestimonialProps, any>,

  args: {
    testimonials: [
      {
        author: 'Lisa',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        author: 'John',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
    ],
  },
}
