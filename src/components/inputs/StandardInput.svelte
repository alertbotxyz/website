<script>
    export let style;
    export let name;

    export let type;
    export let required = false;
    export let reactive = false;
    export let defaultValue = undefined;
    export let placeholder = undefined;
    export let passesOwnValidation = undefined;
    export let divClass = undefined;
    export let error = undefined;
    export let hasError = false;
    export let data = undefined;
    export let validation = {
        url: false,
    };

    export let fullWidth = false;
    export let extraClass = "";

    import { createEventDispatcher } from "svelte";
    import { isValidUrl, isValidColor } from "../../utils/validation";
    
    const dispatch = createEventDispatcher();

    const checkValue = value => {
        if (required) {
            if (value === "" || !value) {
                error = "This field is required";
                hasError = true;
            } else {
                hasError = false;
                error = "";
            };
        } else if (validation?.color) {
            if (!isValidColor(defaultValue, required)) {
                error = "Invalid color";
                hasError = true;
            } else {
                error = "";
                hasError = false;
            };
        } else if (validation?.url && !isValidUrl(value, required)) {
            error = "Invalid URL";
            hasError = true;
        } else if (passesOwnValidation === undefined || passesOwnValidation) {
            error = undefined;
            hasError = false;
        };
    };

    $: checkValue(defaultValue);

    const change = e => {
        checkValue(e.target.value);

        dispatch("change", {
            name: e.target.name,
            value: e.target.value,
        });
    };
</script>
<div class="flex flex-col w-full {divClass}">
    {#if error}
        <span class={error === "_empty" ? "text-transparent" : "text-error"}>{error === "_empty" ? "a" : error}</span>
    {/if}
    {#if type === "select"}
        <select
            {name}
            class="{style} {error && "error"} {extraClass} select {fullWidth && "full-width"} focus:border-accent"
            on:change={change}
        >
            {#if placeholder}
                <option value="" selected={!defaultValue} disabled hidden>{placeholder}</option>
            {/if}
            {#if defaultValue}
                <option value={defaultValue.value} selected>{defaultValue.text}</option>
            {/if}
            {#each data.options as option}
                <option value={option.value}>{option.text}</option>
            {/each}
        </select>
    {:else if type === "textarea"}
        <textarea
            class="{style} {error && "error"} {extraClass} textarea {fullWidth && "full-width"} focus:border-accent"
            {name}
            on:input={reactive && change}
            {placeholder}
            bind:value={defaultValue}
        />
    {:else}
        <input 
            class="{style} {error && "error"}"
            type={type ?? "text"}
            {name}
            value={defaultValue ?? ""}
            on:input={reactive && change}
            {placeholder}
        />
    {/if}
</div>

<style lang="postcss">
    .error {
        @apply border-red-400 text-error;
    }
</style>