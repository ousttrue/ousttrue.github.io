<script lang="ts">
  import type { PostTagType } from "$lib";
  export let tag: string | PostTagType;
  import "../app.css";
  import { TagColorMap } from "$lib/tagColorMap";

  $: tagName = typeof tag == "string" ? tag : tag.name;
  $: color = TagColorMap[tagName] ?? {
    tagColor: "default",
    devicon: "",
  };
  // const { tagColor, devicon } = color;

  // console.log(tagName, tagColor);
  $: href = typeof tag == "string" ? `/tags/${tag}` : `/tags/${tag.name}`;
</script>

<a class="btn variant-filled m-1 p-1" {href}
  ><i class={color.devicon}></i>
  {#if typeof tag == "string"}
    {tag}
  {:else}
    {tag.name}
    <div class="badge variant-filled-surface">{tag.count}</div>
  {/if}
</a>
