<script>
    import { toasts } from "../stores/toasts";

    $: toastArray = toasts;
</script>

{#if toastArray}
    <div class="toast-container flex flex-col items-end pr-16 pt-8">
        {#each $toastArray as toast}
            <div class="toast error flex flex-row rounded-md h-20 w-96 mb-4 bg-gray-600">
                <i class='icons left bx bx-error-alt'></i>
                <div class="flex flex-col pt-3 w-full pl-3">
                    <span class="title font-bold">{toast.title}</span>
                    <span class="text font-bold text-sm">{toast.message}</span>
                </div>
                <i class='icons bx bx-x'></i>
            </div>
        {/each}
    </div>
{/if}
<slot />

<style lang="postcss">
    .toast-container {
        display: flex;
        position: absolute;
    }
    .toast.error .icons.left, .title {
        color: #cf6c6c;
    }
    .icons {
        @apply flex justify-center text-2xl p-3;
    }
</style>