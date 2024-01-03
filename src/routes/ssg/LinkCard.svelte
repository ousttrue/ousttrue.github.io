<script lang="ts">
  type Meta = {
    url: string;
    title: string;
    description: string;
    og: string | undefined;
    icon: string | undefined;
  };
  export let meta: Meta;
</script>

<a href={meta.url} target="_blank" rel="noreferrer">
  <div
    class="w-full flex justify-around bg-white rounded-md p-3 border lg:w-1/2"
  >
    <div class="w-1/2">
      <img src={meta.og} alt={meta.title} class="max-h-20 m-auto" />
    </div>
    <div class="flex flex-col justify-start px-1 ml-3">
      <div class="text-sm font-bold text-black whitespace-pre-wrap">
        {meta.title}
      </div>
      <div class="text-gray-400 text-xs whitespace-pre-wrap">
        {meta.description}
      </div>
    </div>
  </div>
</a>
