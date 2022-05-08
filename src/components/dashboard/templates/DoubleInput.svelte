<script>
    import { createEventDispatcher } from "svelte";
    import "./inputs.css";

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
            className="input focus:border-accent"
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
            className="input focus:border-accent"
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