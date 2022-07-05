<script>
    import Divider from "./Divider.svelte";
    export let last = false;
</script>

<div class="subsection">
    <slot />
</div>
{#if !last}
    <Divider />
{/if}