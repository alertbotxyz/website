<script>
    export let active = false;
</script>

<div class="modal bg-black bg-opacity-70 hidden w-screen h-screen fixed top-0 left-0 {active ? "active" : "inactive"}">
    <div class="content">
        <slot />
    </div>
</div>

<style lang="postcss">
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    .modal.active {
        @apply flex items-center justify-center;
        animation: 0.1s ease-in-out fadeIn;
    }
    .modal.active .content{
        animation: 0.1s ease-in-out fadeIn;
    }
    .modal.inactive .content{
        animation: 0.1s ease-in-out fadeOut;
    }
</style>