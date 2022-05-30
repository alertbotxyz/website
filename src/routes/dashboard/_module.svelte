<script>
    import { fade, fly } from "svelte/transition";
    import { addToast } from "../../stores/toasts";
    import { getUser } from "../../api/auth";
    import { makeRequest } from "../../api/utils";
    import Sidebar from "../../components/navigation/Sidebar.svelte";
    import Navbar from "../../components/navigation/Navbar.svelte";
    import Loading from "../../components/Loading.svelte";
    import ErrorPage from "../../components/ErrorPage.svelte";
    import User from "../../components/dashboard/User.svelte";
    import Logo from "../../components/Logo.svelte";
    import "../../styles/errors.css";

    export let error;
    $: loading = true;
    $: user = undefined;
    $: menu = false;
    $: loggedIn = user && !error;

    const handleMenu = () => {
        menu = !menu;
        document.querySelector("body").classList.toggle("overflow-hidden");
        document.querySelector("html").classList.toggle("overflow-hidden");
    };
    
    makeRequest("/").then(res => {
        if(!res.ok) {
            error = res.error.message;
            addToast({
                type: "error",
                message: res.error.message,
                title: "There was an error communicating with the server"
            });
        };
        loading = false;
    });

    getUser().then(res => {
        if (res.ok) {
            user = res.data;
        };
    });
</script>

{#if error}
    <ErrorPage 
        code={500}
        title="Internal server error"
        message="Something went wrong on our end. Please try again later... {error}"
    />
{:else}
    <div class="flex flex-row xl:flex-col max-h-screen overflow-hidden">
        <Sidebar
            {user}
            {loggedIn}
        />
        <div class="hidden xl:flex flex-col {menu ?? "h-screen"}">
            <div class="hidden xl:flex justify-between w-full bg-light-primary h-20 px-6 items-center">
                <button
                    class="bg-none bg-transparent outline-none focus:outline-none mr-4"
                    on:click={handleMenu}
                >
                    <i class='bx bx-menu-alt-left text-3xl'></i>
                </button>
                <User
                    {user}
                    {loggedIn}
                />
            </div>
            {#if menu}
                <div
                    class="flex flex-col {menu ? "absolute" : "hidden"} items-start h-screen top-20 w-full bg-black bg-opacity-70 justify-between z-50"
                    in:fade={{ duration: 300 }}
                    out:fade={{ duration: 300 }}
                >
                    <div
                        class="bg-light-primary h-full"
                        in:fly={{ duration: 300, x: -200 }}
                        out:fly={{ duration: 300, x: -200 }}
                    >
                        <Sidebar
                            {user}
                            {loggedIn}
                            active={menu}
                            linksOnly={true}
                        />
                    </div>
                </div>
            {/if}
        </div>
        <div class="w-full slow-fade-in overflow-y-scroll">
            <Loading {loading}>
                <slot />
            </Loading>
        </div>
    </div>
{/if}