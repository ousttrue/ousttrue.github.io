<script lang="ts">
  import type { CategoryType } from "$lib/CategoryType";
  import { isSelected } from "$lib/getCategories";
  export let data: CategoryType;
  export let select: CategoryType;

  // https://github.com/sveltejs/kit/issues/4895
  $: active = isSelected(data, select);
  // console.log(data);
</script>

{#if data}
  <a
    class={active
      ? "text-orange-400"
      : data.posts.length == 0
        ? "text-slate-400"
        : ""}
    href={`/categories/${data.slug}`}>{data.title}</a
  >
{/if}
