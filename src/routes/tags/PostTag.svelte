<script lang="ts">
  import "../../app.css";
  import type { PostTagType } from "$lib/getPosts";
  export let tag: PostTagType;
</script>

{#if typeof tag == "string"}
  <a class="btn btn-xs" href="/tags/{tag}">{tag}</a>
{:else}
  <a class="btn btn-xs" href="/tags/{tag.name}"
    >{tag.name}
    <div class="badge badge-secondary">{tag.count}</div>
  </a>
{/if}
