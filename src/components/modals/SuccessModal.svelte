<script>
    import { createEventDispatcher } from "svelte";
    import Modal from "./Modal.svelte";
    import "../../styles/index.css";

    export let title = "";
    export let message = "";
    export let active = false;
    export let options = [];
    export let reload = false;

    const dispatch = createEventDispatcher();

    const handleModal = () => {
        active = false;
        if (reload) window.location.reload();
        dispatch("close", { close: true });
    };
</script>

<Modal {active}>
    <div class="modal md:min-w-0 md:w-11/12 flex flex-col items-center rounded-md bg-light-primary p-4">
        <img
            src="/icons/green-check-circle.svg"
            alt="green-check-circle"
            class="w-14"
        />
        <span class="text-3xl font-bold mt-4">{title}</span>
        <span class="text-gray-400 my-4 text-center">{message}</span>
        <div class="flex flex-row w-full justify-center mt-4">
            {#each options as option}
                {#if option.type === "link"}
                    <a
                        href={option.url}
                        class="button {option.color || "bg-accent"}"
                    >
                        {option.text}
                    </a>
                {:else}
                    <button
                        class="button {option.color || "bg-accent"}"
                        on:click={handleModal}
                        aria-label={option.text}
                    >
                        {option.text}
                    </button>
                {/if}
            {/each}
        </div>
    </div>
</Modal>