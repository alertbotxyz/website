<script>
    export let className;
    export let name;
    
    export let reactive = false;
    export let url = false;
    export let required = false;
    export let defaultValue = undefined;
    export let placeholder = undefined;
    export let divClass = undefined;
    export let error = undefined;
    export let type = undefined;
    export let passesOwnValidation = undefined;

    export let hasError = false;

    import { createEventDispatcher } from "svelte";
    import { isValidUrl } from "../utils/validation";
    
    const dispatch = createEventDispatcher();

    const checkValue = value => {
        if (required) {
            if (value === "" || !value) {
                error = "This field is required";
                hasError = true;
            } else if (url && !isValidUrl(value)) {
                error = "Invalid URL";
                hasError = true;
            } else {
                hasError = false;
                error = "";
            };
        } else if (passesOwnValidation !== undefined || passesOwnValidation) {
            error = undefined;
            hasError = false;
        };
    };

    $: checkValue(defaultValue);

    const change = e => {
        checkValue(e.target.value);

        dispatch("input", {
            name: e.target.name,
            value: e.target.value,
        });
    };
</script>
<div class="flex flex-col w-full {divClass}">
    {#if hasError && error}
        <span class={error === "_empty" ? "text-transparent" : "text-error"}>{error === "_empty" ? "a" : error}</span>
    {/if}
    <input 
        class="{className} {error && "error"}"
        type={type ?? "text"}
        name={name}
        value={defaultValue ?? ""}
        on:input={reactive && change}
        placeholder={placeholder}
    />
</div>

<style lang="postcss">
    .error {
        @apply border-red-400 text-error;
    }
</style>