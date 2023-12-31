import type { Meta, StoryObj } from '@storybook/svelte';
import Header from '../routes/Header.svelte';

const meta = {
  title: 'Site/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderDefault: Story = {
  args: {
  },
};

