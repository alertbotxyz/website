<script>
    import Info from "../Info.svelte";
    export let labelFor;
    export let labelText;
    export let required = false;
    export let help = "";
</script>

<label
    class="text-gray-300 font-bold flex flex-row"
    for={labelFor}
>
    {#if help}
        <Info
            text={help} 
            right
        />
    {/if}
    {labelText}
    {#if required}
        <span class="text-red-400">*</span>
    {/if}
</label>