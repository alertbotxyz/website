<script>
    import { createEventDispatcher } from "svelte";

    import Input from "../../Input.svelte";
    import InputLabel from "../../InputLabel.svelte";

    export let name;
    export let title;
    export let placeholder;
    export let error = undefined;
    export let defaultValue = undefined;
    export let required = false;
    export let url = false;
    
    export let hasError = false;

    const dispatch = createEventDispatcher();

    const change = e => {
        const { name, value } = e.detail;
        dispatch("change", {
            name,
            value,
        });
    };
</script>

<div class="flex flex-col">
    <InputLabel
        labelFor={name}
        labelText={title}
        {required}
    />
    <Input 
        className="rounded-md border border-solid border-gray-600 text-gray-300 bg-transparent px-4 py-3 mb-2 w-full font-bold focus:border-accent"
        reactive
        {defaultValue}
        on:input={change}
        {name}
        {error}
        {placeholder}
        {url}
        {required}
        bind:hasError={hasError}
    />
</div>