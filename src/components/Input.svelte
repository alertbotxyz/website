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

    export let hasError = false;

    import { createEventDispatcher } from "svelte";
    import { isValidUrl } from "../utils/validation";
    
    const dispatch = createEventDispatcher();

    if(required && !defaultValue) {
        error = "This field is required";
        hasError = true;
    };

    const change = e => {
        if (required && e.target.value === "" || !e.target.value) {
            error = "This field is required";
            hasError = true;
        } else {
            error = undefined;
            hasError = false;
        };

        if (url && e.target.value !== "" && !isValidUrl(e.target.value)) {
            error = "Invalid URL";
            hasError = true;
        } else if (!required) {
            error = undefined;
            hasError = false;
        };

        dispatch("input", {
            name: e.target.name,
            value: e.target.value,
        });
    };
</script>
<div class="flex flex-col w-full {divClass}">
    {#if error}
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