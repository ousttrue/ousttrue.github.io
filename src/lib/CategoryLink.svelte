<script lang="ts">
  import type { CategoryType } from "$lib/CategoryType";
  import { isSelected } from "$lib/getCategories";
  export let data: CategoryType;
  export let select: CategoryType;

  // https://github.com/sveltejs/kit/issues/4895
  $: active = isSelected(data, select);
</script>

<a style={active ? "color: white" : ""} href={`/categories/${data.slug}`}
  >{data.title}</a
>
