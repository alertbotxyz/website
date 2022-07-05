<script>
    import Divider from "./Divider.svelte";
    export let last = false;
    export let name;
    export let type; // string, color, url
    export let required;
</script>

<div class="attribute">
    <div class="flex flex-row mb-1">
        <span class="font-bold flex flex-row">
            {name}
            {#if required}
                <span class="text-red-400 ml-0.5">*</span>
            {/if}
        </span>
        <span class="text-gray-400 font-bold ml-1">{type}</span>
    </div>
    <slot />
    {#if !last}
        <Divider short />
    {/if}
</div>