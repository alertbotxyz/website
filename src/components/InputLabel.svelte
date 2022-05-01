<script>
    export let labelFor;
    export let labelText;
    export let required = false;
</script>

<label
    class="text-gray-300 font-bold"
    for={labelFor}
>
    {labelText}
    {#if required}
        <span class="text-red-400">*</span>
    {/if}
</label>