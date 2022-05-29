<script>
    import { removeToast, toasts } from "../../stores/toasts";
    import { fly } from "svelte/transition";
    import "../../styles/toasts.css";

    $: toastArray = toasts;

    const handleRemoveToast = (id) => removeToast(id);
</script>
{#if toastArray}
    <div class="toast-container absolute right-0 flex flex-col items-end 2xs:items-center pr-16 2xs:px-8 pt-8 2xs:w-screen z-50">
        {#each $toastArray as toast}
            <div
                class="toast {toast.type} flex flex-row rounded-md w-96 2xs:w-full pb-2 my-2 bg-gray-600"
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
                <div class="flex flex-col pt-3 w-full pl-3 xs:pl-1">
                    <span class="title font-bold xs:text-xs">{toast.title}</span>
                    <span class="text font-bold text-sm xs:text-xs">
                        {#if toast.message?.includes("\n")}
                            {#each toast.message.split("\n") as line}
                                <span>{line}<br/></span>
                            {/each}
                        {:else}
                            {toast.message || "An unknown error occured"}
                        {/if}
                    </span>
                </div>
                <button
                    class="bg-transparent flex items-start h-12 hover:cursor-pointer"
                    on:click={() => handleRemoveToast(toast.id)}
                >
                    <i class='icons bx bx-x'></i>
                </button>
            </div>
        {/each}
    </div>
{/if}