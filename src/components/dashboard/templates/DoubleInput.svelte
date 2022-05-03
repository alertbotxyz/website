<script>
    import { createEventDispatcher } from "svelte";

    import Input from "../../Input.svelte";
    import InputLabel from "../../InputLabel.svelte";

    export let title;
    export let required = false;
    export let left;
    export let right;
    
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
        labelFor={left.name}
        labelText={title}
        {required}
    />
    <div class="flex flex-row w-full">
        <Input 
            className="rounded-md border border-solid border-gray-600 text-gray-300 bg-transparent px-4 py-3 mb-2 font-bold focus:border-accent"
            name={left.name}
            error={right.error ? "_empty" : left.error}
            placeholder={left.placeholder}
            defaultValue={left.defaultValue}
            url={left.url}
            divClass="mr-2"
            reactive
            on:input={change}
            bind:hasError={hasError}
        />
        <Input 
            className="rounded-md border border-solid border-gray-600 text-gray-300 bg-transparent px-4 py-3 mb-2 font-bold focus:border-accent"
            name={right.name}
            error={left.error ? "_empty" : right.error}
            placeholder={right.placeholder}
            defaultValue={right.defaultValue}
            url={right.url}
            divClass="ml-2"
            reactive
            on:input={change}
            bind:hasError={hasError}
        />
    </div>
</div>