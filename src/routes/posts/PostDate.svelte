<script lang="ts">
  export let date: Date | string;
  date = typeof date == "string" ? new Date(date) : date;

  // function Day(props: { date: Date | string }) {
  export function yyyy() {
    return date.getFullYear().toString();
  }
  export function mm() {
    return (date.getMonth() + 1).toString().padStart(2, "0");
  }
  export function dd() {
    return date.getDate().toString().padStart(2, "0");
  }
  /// yyyy
  /// mmdd
</script>

<span class="date">
  <div class="year">{yyyy()}</div>
  <div class="mmdd">
    <span class="mm">{mm()}</span>
    <span class="dd">{dd()}</span>
  </div>
</span>

<style>
</style>
