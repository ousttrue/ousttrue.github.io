import type { Meta, StoryObj } from '@storybook/svelte';
import PostTitle from '../routes/posts/PostTitle.svelte';

const meta = {
  title: 'Site/PostTitle',
  component: PostTitle,
  tags: ['autodocs'],
  parameters: {
    // layout: 'fullscreen',
  },
} satisfies Meta<PostTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PostTitleDefault: Story = {
  args: {
    post: {
      title: "タイトル",
      date: new Date(),
      tags: ["c++", "sgg", "webxr"]
    },
  },
};
