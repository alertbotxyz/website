<script>
    import Logo from "../Logo.svelte";
</script>

<div class="navbar bg-light-primary flex flex-row w-screen h-20 items-center justify-between px-8">
    <Logo />
    <div class="flex flex-row px-8">
        <a
            class="nav-link"
            href="/dashboard"
        >
            Dashboard
        </a>
        <a
            class="nav-link"
            href="/premium"
        >
            Premium
        </a>
        <a
            class="nav-link"
            href="/redirect?link=docs"
        >
            Documentation
        </a>
        <a
            class="nav-link"
            href="/redirect?link=support-server"
        >
            Support Server
        </a>
    </div>
    <div class="flex flex-row">
        <a
            href="/dashboard/templates/view"
            class="primary-button px-6 "
        >
            Dashboard
        </a>
    </div>
</div>

<style lang="postcss">
    .nav-link {
        @apply text-xl mx-4 text-gray-300;
    }
</style>