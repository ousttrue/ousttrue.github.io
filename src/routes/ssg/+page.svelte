<script lang="ts">
  import CustomMarkdown from "$lib/CustomMarkdown.svelte";
  import PostTags from "../tags/PostTags.svelte";
  import md from "./page.md?raw";
</script>

<PostTags tags={["ssg", "sphinx", "hugo"]} />

<CustomMarkdown {md} />
