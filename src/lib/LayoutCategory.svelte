<script lang="ts">
  import type { CategoryType } from "$lib/CategoryType";
  export let category: CategoryType;
</script>

<div>{category.slug}</div>
