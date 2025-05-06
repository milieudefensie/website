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

export const DefaultWidth: Story = {
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
        color: 'primary',
        style: 'outline',
        width: 'default',
      },
      {
        label: 'Button 3',
        link: 'https://nuxt.com/docs/getting-started/introduction',
        color: 'primary',
        style: 'dash',
        width: 'default',
      },
      {
        label: 'Button 4',
        link: 'https://nuxt.com/docs/getting-started/introduction',
        color: 'primary',
        style: 'ghost',
        width: 'default',
      },
    ],

    size: 'md',
  },
}

export const FullWidth: Story = {
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
        color: 'secondary',
        style: 'default',
        width: 'full',
      },
      {
        label: 'Button 2',
        link: 'https://nuxt.com/docs/getting-started/introduction',
        color: 'secondary',
        style: 'outline',
        width: 'full',
      },
      {
        label: 'Button 3',
        link: 'https://nuxt.com/docs/getting-started/introduction',
        color: 'secondary',
        style: 'dash',
        width: 'full',
      },
      {
        label: 'Button 4',
        link: 'https://nuxt.com/docs/getting-started/introduction',
        color: 'secondary',
        style: 'ghost',
        width: 'full',
      },
    ],

    size: 'md',
  },
}

export const WideWidth: Story = {
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
        color: 'accent',
        style: 'default',
        width: 'wide',
      },
      {
        label: 'Button 2',
        link: 'https://nuxt.com/docs/getting-started/introduction',
        color: 'accent',
        style: 'outline',
        width: 'wide',
      },
      {
        label: 'Button 3',
        link: 'https://nuxt.com/docs/getting-started/introduction',
        color: 'accent',
        style: 'dash',
        width: 'wide',
      },
      {
        label: 'Button 4',
        link: 'https://nuxt.com/docs/getting-started/introduction',
        color: 'accent',
        style: 'ghost',
        width: 'wide',
      },
    ],

    size: 'md',
  },
}

export const XLSize: Story = {
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
        color: 'neutral',
        style: 'default',
        width: 'wide',
      },
      {
        label: 'Button 2',
        link: 'https://nuxt.com/docs/getting-started/introduction',
        color: 'neutral',
        style: 'outline',
        width: 'wide',
      },
    ],

    size: 'xl',
  },
}
