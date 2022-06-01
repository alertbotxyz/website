<script>
    import { fade, fly } from "svelte/transition";
    import Footer from "../footer/Footer.svelte";
    import Logo from "../Logo.svelte";

    export let scroll = false;
    $: menu = false;

    const handleMenu = () => {
        menu = !menu;
        document.querySelector("body").classList.toggle("overflow-hidden");
        document.querySelector("html").classList.toggle("overflow-hidden");
    };
</script>

<div class="flex flex-col min-h-screen w-full items-center justify-between">
    <div class="navbar bg-gray-300 dark:bg-light-primary flex flex-row w-screen h-20 items-center justify-between px-8 z-20">
        <Logo />
        <div class="flex flex-row px-8 lg:px-2 md:hidden">
            <a
                class="text-xl mx-4 text-gray-600 dark:text-gray-300 lg:mx-2 lg:text-lg"
                href="/dashboard/templates/view"
            >
                Dashboard
            </a>
            <a
                class="text-xl mx-4 text-gray-600 dark:text-gray-300 lg:mx-2 lg:text-lg"
                href="/premium"
            >
                Premium
            </a>
            <a
                class="text-xl mx-4 text-gray-600 dark:text-gray-300 lg:mx-2 lg:text-lg"
                href="/redirect?link=docs"
            >
                Documentation
            </a>
            <a
                class="text-xl mx-4 text-gray-600 dark:text-gray-300 lg:mx-2 lg:text-lg"
                href="/redirect?link=support-server"
            >
                Support
            </a>
        </div>
        <div class="flex flex-row md:hidden">
            <a
                href="/dashboard/templates/view"
                class="primary-button bg-accent px-6 "
            >
                Dashboard
            </a>
        </div>
        <div class="hidden md:flex">
            <button
                class="bg-none bg-transparent outline-none focus:outline-none"
                on:click={handleMenu}
                aria-label="Open navbar"
            >
                <img
                    src="/icons/menu-right.svg"
                    alt="menu-right"
                    class="w-8"
                />
            </button>
        </div>
    </div>
    {#if menu}
        <div 
            class="hidden md:flex flex-col {menu ? "absolute" : "hidden"} h-screen top-20 items-center bg-black bg-opacity-70 w-full justify-between z-50"
            in:fade={{ duration: 300 }}
            out:fade={{ duration: 300 }}
        >
            <div
                class="bg-light-primary w-full flex flex-col items-center pb-12"
                in:fly={{ x: 200, duration: 300 }}
                out:fly={{ x: 200, duration: 300 }}
            >
                <div class="flex flex-col px-8 w-full mb-16">
                    <a
                        class="text-xl my-4 text-gray-300 lg:mx-2 lg:text-lg"
                        href="/dashboard/templates/view"
                    >
                        Dashboard
                    </a>
                    <a
                        class="text-xl my-4 text-gray-300 lg:mx-2 lg:text-lg"
                        href="/premium"
                    >
                        Premium
                    </a>
                    <a
                        class="text-xl my-4 text-gray-300 lg:mx-2 lg:text-lg"
                        href="/redirect?link=docs"
                    >
                        Documentation
                    </a>
                    <a
                        class="text-xl my-4 text-gray-300 lg:mx-2 lg:text-lg"
                        href="/redirect?link=support-server"
                    >
                        Support
                    </a>
                </div>
                <div>
                    <a
                        href="/dashboard/templates/view"
                        class="primary-button bg-accent md:px-20 md:py-4 md:text-xl"
                    >
                        Dashboard
                    </a>
                </div>
            </div>
        </div>
    {/if}
    <div class="flex flex-col h-full justify-between w-full items-center">
        {#if scroll}
            <div class="w-full 2xs:overflow-scroll  2xs:mr-8">
                <slot/>
            </div>
        {:else}
            <slot />
        {/if}
        <Footer />
    </div>
</div>