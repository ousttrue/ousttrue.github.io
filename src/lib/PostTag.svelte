<script lang="ts">
  import type { PostTagType } from "$lib";
  export let tag: string | PostTagType;
  import "../app.css";
  import { TagColorMap } from "$lib/tagColorMap";

  const tagName = typeof tag == "string" ? tag : tag.name;
  const { tagColor, devicon } = TagColorMap[tagName] ?? {
    tagColor: "default",
    devicon: "",
  };

  // console.log(tagName, tagColor);
  const href = typeof tag == "string" ? `/tags/${tag}` : `/tags/${tag.name}`;
</script>

<a class="btn variant-filled m-1 p-1" {href}
  ><i class={devicon}></i>
  {#if typeof tag == "string"}
    {tag}
  {:else}
    {tag.name}
    <div class="badge variant-filled-surface">{tag.count}</div>
  {/if}
</a>
