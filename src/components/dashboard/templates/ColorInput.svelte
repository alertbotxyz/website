<script>
    import { createEventDispatcher } from "svelte";

    import Input from "../../Input.svelte";
    import InputLabel from "../../InputLabel.svelte";

    export let name;
    export let title;
    export let placeholder;
    export let color = "#000000";
    export let error = undefined;
    export let required = false;
    
    export let hasError;

    const dispatch = createEventDispatcher();

    const change = e => {
        const { name, value } = e.detail ?? e.target;
        
        const isValidColor = /^#[0-9a-fA-F]{6}?$/i.test(value);

        if (!isValidColor) {
            error = "Invalid color";
        } else {
            error = "";
            color = value;
            dispatch("change", {
                name,
                value,
            });
        };
    };
</script>

<div class="flex flex-col">
    <InputLabel
        labelFor={name}
        labelText={title}
        {required}
    />
    <div class="flex flex-row">
        <Input 
            className="rounded-md border border-solid border-gray-600 text-gray-300 bg-transparent px-4 py-3 mb-2 w-full font-bold"
            {name}
            {error}
            {placeholder}
            defaultValue={color}
            reactive
            on:input={change}
            bind:hasError={hasError}
        />
        <div class="flex flex-col">
            {#if error}
                <span class="text-transparent">a</span>
            {/if}
            <input
                class="w-11 h-11 ml-4 text-transparent border-none"
                type="color"
                value={color}
                name={name}
                on:change={change}
            />
        </div>
    </div>
</div>