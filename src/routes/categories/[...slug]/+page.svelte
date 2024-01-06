<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  import PageCategory from "$lib/PageCategory.svelte";
</script>

<PageCategory {data} />
