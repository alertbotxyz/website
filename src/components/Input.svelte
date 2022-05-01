<script>
    export let className;
    export let name;
    
    export let reactive = false;
    export let defaultValue = undefined;
    export let placeholder = undefined;
    export let divClass = undefined;
    export let error = undefined;
    export let type = undefined;
    
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    const change = e => {
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
        class="{className} {error && "border-red-400 text-error"}"
        type={type ?? "text"}
        name={name}
        value={defaultValue ?? ""}
        on:input={reactive && change}
        placeholder={placeholder}
    />
</div>