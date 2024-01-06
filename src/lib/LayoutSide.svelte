<script lang="ts">
</script>

<div class="flex items-stretch h-full bg-green-300">
  <nav class="w-44 bg-pink-500 flex">
    <div
      class="w-full h-full flex justify-center text-gray-900 text-xl border-4 border-gray-900 border-dashed"
    >
      <slot name="sidebar" />
    </div>
  </nav>

  <main class="grow bg-white overflow-x-hidden overflow-y-auto">
    <slot />
  </main>
</div>
