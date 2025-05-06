import type { Meta, StoryObj } from '@storybook/vue3'

import Countdown from './Countdown.vue'
import type { CountdownProps } from './Countdown.vue'

const meta = {
  title: 'Components/Countdown',
  component: Countdown,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        // component: `Cards are very flexibly containers for small bits of content. They are usually used as navigation blocks. For example, they are used for listing events, groups or articles.`,
      },
    },
  },
} satisfies Meta<typeof Countdown>

export default meta
type Story = StoryObj<typeof meta>

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)

export const Story: Story = {
  argTypes: {} as Record<keyof CountdownProps, any>,

  args: {
    title: 'The next big thing is coming',
    countToDate: tomorrow,
    buttons: [
      {
        label: 'Join us',
        link: '',
        color: 'neutral',
        style: 'default',
        width: 'wide',
      },
    ],
    finishedTitle: 'The next big thing has started!',
    finishedButtons: [
      {
        label: 'Join us now',
        link: '',
        color: 'neutral',
        style: 'default',
        width: 'wide',
      },
    ],
  },
}
