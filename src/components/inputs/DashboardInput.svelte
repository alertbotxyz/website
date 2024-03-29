<script>
    import { createEventDispatcher } from "svelte";
    import InputLabel from "./InputLabel.svelte";
    import StandardInput from "./StandardInput.svelte";
    import "./inputs.css";

    export let name;
    export let title;
    export let required = false;
    export let help = "";
    export let type = "text";
    export let defaultValue = undefined;
    export let placeholder = undefined;
    export let passesOwnValidation = undefined;
    export let error = undefined;
    export let validation = undefined;
    export let data = {};

    export let fullWidth = false;
    export let extraClass = "";
    export let inputStyle = "";
    
    export let hasError = false;

    const dispatch = createEventDispatcher();

    $: dispatch("checkError", {
        name,
        hasError,
    });

    const change = e => {
        const { name, value } = e.detail || e.target;

        if (validation?.color) defaultValue = value;

        dispatch("change", {
            name,
            value,
        });

        dispatch("checkError", {
            name,
            hasError,
        });
    };
</script>

<div class="flex flex-col {fullWidth && "lg:w-full"}">
    <InputLabel
        labelFor={name}
        labelText={title}
        {required}
        {help}
    />
    <div class="flex flex-row">
        {#if !data?.double}
            <div class="flex flex-row w-full">
                {#if type === "prefix"}
                    <div class="flex flex-col justify-center px-2 h-11 rounded-l-md bg-dark-primary bg-opacity-60 text-gray-400 font-bold border border-solid border-gray-600 border-r-0 w-64 text-sm truncate md:text-xs">
                        {data.prefix}
                    </div>
                {/if}
                <StandardInput
                    style="{inputStyle} input focus:border-accent {type === "prefix" && "prefix-input"}"
                    reactive
                    {name}
                    {type}
                    {required}
                    {defaultValue}
                    {placeholder}
                    {passesOwnValidation}
                    {error}
                    {validation}
                    {data}
                    bind:hasError={hasError}
                    on:change={change}
                    {fullWidth}
                    {extraClass}
                />
            </div>
        {/if}
        {#if data.double}
            <div class="flex flex-row w-full xs:flex-col">
                {#each [ "left", "right" ] as side}
                    <StandardInput
                        style="input focus:border-accent xs:mr-0"
                        reactive
                        name={data[side].name}
                        {type}
                        defaultValue={data[side].defaultValue}
                        placeholder={data[side].placeholder}
                        passesOwnValidation={data[side].passesOwnValidation}
                        error={data[side].error}
                        validation={data[side].validation}
                        required={data[side].required}
                        bind:hasError={hasError}
                        on:change={change}
                        divClass={side === "left" ? "mr-2 xs:mr-0" : "ml-2 xs:ml-0"}
                        {fullWidth}
                        {extraClass}
                    />
                {/each}
            </div>
        {/if}
        {#if validation?.color}
            <div class="flex flex-col">
                {#if error}
                    <span class="text-transparent">a</span>
                {/if}
                <input
                    class="w-11 h-11 ml-4 text-transparent border-none"
                    type="color"
                    value={defaultValue}
                    name={name}
                    on:change={change}
                />
            </div>
        {/if}
    </div>
</div>