<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  import PageTags from "$lib/PageTags.svelte";
</script>

<PageTags {data} />
