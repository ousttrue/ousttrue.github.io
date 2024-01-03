<script lang="ts">
  import CustomMarkdown from "$lib/CustomMarkdown.svelte";
  import PostTags from "../tags/PostTags.svelte";
  import md from "./_page.md?raw";
</script>

<PostTags tags={["buildtool", "cmake", "vcpkg"]} />
<CustomMarkdown {md} />
