import type { Meta, StoryObj } from '@storybook/svelte';
import PostDate from '../routes/posts/PostDate.svelte';

const meta = {
  title: 'Site/PostDate',
  component: PostDate,
  tags: ['autodocs'],
  parameters: {
    // layout: 'fullscreen',
  },
} satisfies Meta<PostDate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PostDate202312: Story = {
  args: {
    date: new Date('2023-12-01')
  },
};

