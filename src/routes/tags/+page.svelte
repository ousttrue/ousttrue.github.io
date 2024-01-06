<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  import LayoutTag from "$lib/LayoutTag.svelte";
</script>

<LayoutTag {data} />
