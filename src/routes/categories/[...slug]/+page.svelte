<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  import PageCategory from "$lib/PageCategory.svelte";

  $: data = data;
  console.log(data);
</script>

<article class="mx-auto md:flex md:justify-center pl-4">
  <div class="md:w-4xl overflow-y-auto">
    <div class="prose">
      {@html data.html}
    </div>
  </div>
</article>
<PageCategory {data} />
