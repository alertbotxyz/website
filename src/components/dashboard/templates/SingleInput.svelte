<script>
    import { createEventDispatcher } from "svelte";
    import "./inputs.css";

    import Input from "../../Input.svelte";
    import InputLabel from "../../InputLabel.svelte";

    export let name;
    export let title;
    export let placeholder;
    export let error = undefined;
    export let defaultValue = undefined;
    export let required = false;
    export let url = false;
    export let passesOwnValidation = undefined;
    export let help = "";
    
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
        {help}
    />
    <Input 
        className="input focus:border-accent"
        reactive
        {defaultValue}
        on:input={change}
        {name}
        {error}
        {placeholder}
        {url}
        {required}
        bind:hasError={hasError}
        {passesOwnValidation}
    />
</div>