<script lang="ts">
  export let tag: PostTagType;
  import "../../app.css";
  import type { PostTagType } from "$lib/getPosts";
  import { TagColorMap } from "./tagColorMap";

  const tagName = typeof tag == "string" ? tag : tag.name;
  const tagColor = TagColorMap[tagName] ?? "default";
  console.log(tagName, tagColor);
</script>

{#if typeof tag == "string"}
  <a class="btn btn-xs btn-{tagColor} m-1" href="/tags/{tag}">{tag}</a>
{:else}
  <a class="btn btn-xs btn-{tagColor} m-1" href="/tags/{tag.name}"
    >{tag.name}
    <div class="badge">{tag.count}</div>
  </a>
{/if}
