import type { Meta, StoryObj } from '@storybook/svelte';
import PostTag from '../routes/tags/PostTag.svelte';

const meta = {
  title: 'Site/PostTag',
  component: PostTag,
  tags: ['autodocs'],
  parameters: {
    // layout: 'fullscreen',
  },
} satisfies Meta<PostTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PostTagText: Story = {
  args: {
    tag: "tag"
  },
};

export const PostTagObject: Story = {
  args: {
    tag: {
      name: "tag",
      count: 10,
    },
  },
};
