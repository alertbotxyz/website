<script>
    import Navbar from "../components/navigation/Navbar.svelte";
</script>

<div class="w-full h-full flex items-center justify-center ">
    <Navbar>
        <div class="h-full w-full flex flex-col items-center justify-center slow-fade-in mt-48">
            <h1 class="error-code font-bold">404</h1>
            <span class="text-3xl font-bold">Page not found</span>
            <a
                class="text-xl text-gray-400"
                href="/"
            >
                Go back home
            </a>
        </div>
    </Navbar>
</div>

<style lang="postcss">
    .error-code {
        font-size: 12rem;
        background: -webkit-linear-gradient(left, rgb(0, 255, 170), rgb(28, 255, 236));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    .slow-fade-in {
        animation: fadeIn 1s ease-in-out;
    }
</style>