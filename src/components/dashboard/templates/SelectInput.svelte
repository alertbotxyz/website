<script>
    import { createEventDispatcher } from "svelte";
    import "./inputs.css";

    import InputLabel from "../../InputLabel.svelte";

    export let name;
    export let title;
    export let placeholder;
    export let error = undefined;
    export let defaultValue = undefined;
    export let required = false;
    export let options = [];
    export let extraClass = "";
    export let fullWidth = false;
    export let help = "";

    export let hasError = false;

    const dispatch = createEventDispatcher();

    if (required && !defaultValue) {
        error = "This field is required";
        hasError = true;
    };

    const change = e => {
        const { name, value } = e.target;

        if (required && value === "" || !value) {
            error = "This field is required";
            hasError = true;
        } else {
            error = undefined;
            hasError = false;
        };

        dispatch("change", {
            name,
            value,
        });
    };
</script>

<div class="flex flex-col mx-4 {fullWidth && "lg:w-full"}">
    <InputLabel
        labelFor={name}
        labelText={title}
        {required}
        {help}
    />
    {#if error}
        <span class={error === "_empty" ? "text-transparent" : "text-error"}>{error === "_empty" ? "a" : error}</span>
    {/if}
    <select
        name={name}
        on:change={change}
        class="{error && "error"} {extraClass} select {fullWidth && "full-width"} focus:border-accent"
    >
        {#if placeholder}
            <option value="" selected={!defaultValue} disabled hidden>{placeholder}</option>
        {/if}
        {#if defaultValue}
            <option value={defaultValue.value} selected>{defaultValue.text}</option>
        {/if}
        {#each options as option}
            <option value={option.value}>{option.text}</option>
        {/each}
    </select>
</div>

<style lang="postcss">
    .error {
        @apply border-red-400 text-error;
    }
</style>