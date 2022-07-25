<script>
    export let text = "";
    export let style = "";
    export let left = false;
    export let right = false;
</script>
<span data-tooltip={text} class="{left && "left"} {right && "right"} pt-0.5 px-1 {style} info">
    <img
        src="/icons/info-circle.svg" 
        alt="info-circle"
        class="w-4"
    />
</span>

<style>
    .info {
        z-index: 10;
    }
</style>