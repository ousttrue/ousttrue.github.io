<script lang="ts">
  import type { PostTagType } from "$lib/getPosts";
  export let tag: PostTagType;
</script>

{#if typeof tag == "string"}
  <a class="btn p-0" href="/tags/{tag}">{tag}</a>
{:else}
  <a class="btn p-0" href="/tags/{tag.name}"
    >{tag.name}
    <span class="badge">{tag.count}</span>
  </a>
{/if}
