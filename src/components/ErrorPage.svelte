<script>
    import Navbar from "./navigation/Navbar.svelte";
    import "../styles/errors.css";

    export let code = 404;
    export let title = "Page not found";
    export let message = undefined;
</script>

<Navbar>
    <div class="h-screen absolute w-full flex flex-col items-center justify-center slow-fade-in xs:mt-8">
        <h1 class="error-code font-bold">{code}</h1>
        <span class="text-5xl sm:text-3xl font-bold">{title}</span>
        {#if message}
            <span class="text-2xl sm:text-xl text-gray-400 text-center px-2 my-2 sm:my-8">{message}</span>
        {/if}
        <a
            class="text-xl text-accent"
            href="/"
        >
            Go back home
        </a>
    </div>
</Navbar>