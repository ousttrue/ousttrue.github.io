<script lang="ts">
  import CustomMarkdown from "$lib/CustomMarkdown.svelte";
  import PostTags from "../tags/PostTags.svelte";
  import LinkCard from "./LinkCard.svelte";
  import md from "./_page.md?raw";
</script>

<PostTags tags={["ssg", "sphinx", "hugo"]} />

<LinkCard
  meta={{
    url: "",
    title: "title",
    description: "desc",
    og: "src",
    icon: "icon",
  }}
/>

<CustomMarkdown {md} />
