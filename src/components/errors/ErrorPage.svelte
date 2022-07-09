<script>
    import Navbar from "../navigation/Navbar.svelte";
    import "../../styles/errors.css";

    export let code = 404;
    export let title = "Page not found";
    export let message = undefined;
</script>

<Navbar>
    <div class="py-44 w-full flex flex-col items-center justify-center slow-fade-in xs:mt-8 z-10 ">
        <h1 class="error-code font-bold">{code}</h1>
        <span class="text-5xl sm:text-3xl font-bold text-center">{title}</span>
        {#if message}
            <span class="text-2xl sm:text-xl text-gray-400 text-center px-2 my-2 sm:my-8">{message}</span>
        {/if}
        <div class="flex flex-row mt-4">
            <a
                class="bg-accent link"
                href="/"
            >
                Go back home
            </a>
            <a 
                href="https://status.alert-bot.xyz"
                class="bg-light-primary link"
            >
                Check Status
            </a>
        </div>
    </div>
</Navbar>

<style lang="postcss">
    .link {
        @apply w-32 h-12 rounded-md mx-2 font-bold flex flex-col items-center justify-center;
    }
</style>