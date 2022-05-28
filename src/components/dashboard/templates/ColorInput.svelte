<script>
    import { createEventDispatcher } from "svelte";
    import "./inputs.css";

    import Input from "../../Input.svelte";
    import InputLabel from "../../InputLabel.svelte";

    export let name;
    export let title;
    export let placeholder;
    export let color = "#000000";
    export let error = undefined;
    export let required = false;
    
    export let hasError = false;

    const dispatch = createEventDispatcher();

    const change = e => {
        const { name, value } = e.detail ?? e.target;
        
        const isValidColor = /^#[0-9a-fA-F]{6}?$/i.test(value);

        if (!isValidColor) {
            error = "Invalid color";
            hasError = true;
        } else {
            error = "";
            color = value;
            hasError = false;
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
            className="input"
            {name}
            {error}
            {placeholder}
            defaultValue={color}
            reactive
            on:input={change}
            bind:hasError={hasError}
            isColorInput
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