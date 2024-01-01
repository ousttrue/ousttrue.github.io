<script lang="ts">
  type QuadData = {
    name: string;
    icon: string;
    url: string;
  };
  export let data: QuadData;
</script>

<a class="w-60 h-60 m-2" href={data.url}>
  {data.icon}
  {data.name}
</a>
