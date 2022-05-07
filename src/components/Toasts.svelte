<script>
    import { removeToast, toasts } from "../stores/toasts";
    import { fly } from "svelte/transition";

    $: toastArray = toasts;

    const handleRemoveToast = (id) => removeToast(id);
</script>
{#if toastArray}
    <div class="toast-container flex flex-col items-end pr-16 pt-8">
        {#each $toastArray as toast}
            <div
                class="toast {toast.type} flex flex-row rounded-md w-96 pb-2 my-2 bg-gray-600"
                in:fly={{ x: 200, duration: 300 }}
                out:fly={{ x: -200, duration: 300 }}
            >
                {#if toast.type === "error"}
                    <i class='icons left bx bx-error-alt'></i>
                {:else if toast.type === "success"}
                    <i class='icons left bx bx-check-circle'></i>
                {:else if toast.type === "info"}
                    <i class='icons left bx bx-info-circle' ></i>
                {/if}
                <div class="flex flex-col pt-3 w-full pl-3">
                    <span class="title font-bold">{toast.title}</span>
                    <span class="text font-bold text-sm">{toast.message || "An unknown error occured"}</span>
                </div>
                <button
                    class="bg-transparent flex items-start h-12"
                    on:click={() => handleRemoveToast(toast.id)}
                >
                    <i class='icons bx bx-x'></i>
                </button>
            </div>
        {/each}
    </div>
{/if}

<style lang="postcss">
    .toast-container {
        display: flex;
        position: absolute;
        right: 0;
    }
    .toast.error .icons.left {
        @apply text-error;
    }
    .toast.success .icons.left {
        @apply text-green-400;
    }
    .toast.info .icons.left {
        @apply text-blue-400;
    }
    .toast.error .title {
        @apply text-error;
    }
    .toast.success .title {
        @apply text-green-400;
    }
    .toast.info .title {
        @apply text-blue-400;
    }
    .icons {
        @apply flex justify-center text-2xl p-3;
    }
</style>