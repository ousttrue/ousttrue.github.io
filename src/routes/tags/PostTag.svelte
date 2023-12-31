<script lang="ts">
  export let tag: PostTagType;
  import "../../app.css";
  import type { PostTagType } from "$lib/getPosts";
  import { TagColorMap } from "./tagColorMap";

  const tagName = typeof tag == "string" ? tag : tag.name;
  const { tagColor, devicon } = TagColorMap[tagName] ?? {
    tagColor: "default",
    devicon: "",
  };

  // console.log(tagName, tagColor);
</script>

{#if typeof tag == "string"}
  <a class="btn btn-xs btn-{tagColor} m-1" href="/tags/{tag}"
    ><i class={devicon}></i>{tag}</a
  >
{:else}
  <a class="btn btn-xs btn-{tagColor} m-1" href="/tags/{tag.name}">
    <i class={devicon}></i>
    {tag.name}
    <div class="badge">{tag.count}</div>
  </a>
{/if}
