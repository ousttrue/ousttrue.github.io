<script lang="ts">
  export let date: Date | string;
  date = typeof date == "string" ? new Date(date) : date;

  const year = [
    "🐀",
    "🐂",
    "🐅",
    "🐇",
    "🐉",
    "🐍",
    "🐴",
    "🐏",
    "🐒",
    "🐔",
    "🐕",
    "🐗",
  ];
  const month = [
    "⛄", // 1
    "⛄",
    "🌸", // 3
    "🌸",
    "🌸",
    "🌻", // 7
    "🌻", // 7
    "🌻",
    "🍂", // 11
    "🍂", // 11
    "🍂", // 11
    "⛄",
  ];

  // function Day(props: { date: Date | string }) {
  export function yyyy() {
    const y = date.getFullYear();
    return `${year[(y + 8) % year.length]}${y}`;
  }
  export function mmdd() {
    const m = date.getMonth();
    const d = date.getDate();
    // .toString().padStart(2, "0");
    return `${month[m % month.length]}${(m + 1).toString().padStart(2, "0")}${d
      .toString()
      .padStart(2, "0")}`;
  }
  /// yyyy
  /// mmdd
</script>

<div class="year">{yyyy()}</div>
<div class="mmdd">{mmdd()}</div>

<style>
</style>
