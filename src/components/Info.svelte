<script>
    export let text = "";
    export let style = "";
    export let left = false;
    export let right = false;
</script>
<span data-tooltip={text} class="{left && "left"} {right && "right"} pt-0.5 px-1 {style}">
    <img
        src="/icons/info-circle.svg" 
        alt="info-circle"
        class="w-4"
    />
</span>
<!-- <script>
    import { fade } from "svelte/transition";

    export let text = "";
    export let style = "";

    $: hovering = false;
</script>
<span
    class="tooltip-container pt-0.5 px-1 {style}"
    on:mouseenter={() => hovering = true}
    on:mouseleave={() => hovering = false}
>   
    {#if hovering}
        <span
            class="bg-very-dark-primary p-2 absolute block tooltip rounded-md transition-all"
            transition:fade={{ duration: 200 }}
        >
            {text}
        </span>
    {/if}
    <img
        src="/icons/info-circle.svg" 
        alt="info-circle"
        class="w-4"
    />
</span>

<style lang="postcss">
    .tooltip {
        transform: translate(-47%, -44px);
    } 
    .tooltip::after {
        content: " ";
        position: absolute;
        top: 100%; /* At the bottom of the tooltip */
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        @apply border-t-very-dark-primary border-x-transparent border-b-transparent;
    }
</style> -->