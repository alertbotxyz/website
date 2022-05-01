<script>
    import Navbar from "../components/navigation/Navbar.svelte";
</script>

<div class="flex flex-col h-full">
    <Navbar />
    <div class="flex flex-col">
        <div class="flex flex-row items-center w-full mt-48 justify-evenly px-96">
            <div class="mx-20">
                <h1 class="text-8xl">Alertbot</h1>
                <p class="text-2xl my-8 w-96 text-gray-300">Create presets and templates for seemless alerting.</p>
                <div class="flex flex-row">
                    <a
                        href="/"
                        class="button-links bg-gray-500 mr-4"
                    >
                        Invite
                    </a>
                    <a
                        href="/"
                        class="button-links bg-indigo-500 ml-4"
                    >
                        Features
                    </a>
                </div>
            </div>
            <img
                src="https://cdn.discordapp.com/attachments/967845567612989462/969704897794678794/dashboard.png"
                alt="alertbot-dashboard"
                class="example-image rounded-md mx-20"
            />
        </div>
    </div>
</div>

<style lang="postcss">
    .button-links {
        @apply rounded-md flex items-center justify-center text-white text-xl py-3 w-48;
    }
    .example-image {
        width: 600px;
    }
</style>