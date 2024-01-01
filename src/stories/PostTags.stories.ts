import type { Meta, StoryObj } from '@storybook/svelte';
import PostTags from '../routes/tags/PostTags.svelte';

const meta = {
  title: 'Site/PostTags',
  component: PostTags,
  tags: ['autodocs'],
  parameters: {
    // layout: 'fullscreen',
  },
} satisfies Meta<PostTags>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PostTagsText: Story = {
  args: {
    tags: ["linux", "windows", "go"]
  },
};
