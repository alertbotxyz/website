<script context="module">
    import { setUser, userStore } from "../../stores/user";

    export const load = () => {
        getUser().then(res => {
            if (res.ok) {
                setUser(res.data);
                return {
                    props: { user: res.data },
                };
            } else {
                return {
                    props: {
                        error: res.error.message,
                        status: res.status,
                    },
                };
            };
        });
    };
</script>
<script>
    import { fade, fly } from "svelte/transition";
    import { addToast } from "../../stores/toasts";
    import { getUser } from "../../api/auth";
    import { makeRequest } from "../../api/utils";
    import Sidebar from "../../components/navigation/Sidebar.svelte";
    import Loading from "../../components/Loading.svelte";
    import ErrorPage from "../../components/errors/ErrorPage.svelte";
    import User from "../../components/dashboard/User.svelte";
    import "../../styles/errors.css";
    import data from "../../utils/data";

    export let error;
    export let user;
    export let status;

    $: loading = true;
    $: user = $userStore;
    $: menu = false;
    $: loggedIn = user && !error;

    const handleMenu = () => {
        menu = !menu;
        document.querySelector("body").classList.toggle("overflow-hidden");
        document.querySelector("html").classList.toggle("overflow-hidden");
    };
    
    makeRequest("/").then(res => {
        if (status === 401) return;

        if (!res.ok) {
            error = res.error.message;
            addToast({
                type: "error",
                message: res.error.message,
                title: "There was an error communicating with the server",
            });
        };

        loading = false;
    });

    const betaUsers = [
        "808299695310766090",
        "579327324315582464",
        "275043451211481090",
        "778004079246311455",
        "806657133960495154",
    ];
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
        {#if betaUsers.find(betaUser => betaUser === user.uid)}
            <div class="hidden xl:flex flex-col {menu ?? "h-screen"}">
                <div class="hidden xl:flex justify-between w-full bg-light-primary h-20 px-6 items-center">
                    <button
                        class="bg-none bg-transparent outline-none focus:outline-none mr-4"
                        on:click={handleMenu}
                        aria-label="Open sidebar"
                    >
                        <img
                            src="/icons/menu-left.svg"
                            alt="menu"
                            class="h-8"
                        />
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
        {:else}
            <div class="w-full h-screen items-center justify-center flex flex-col px-64 text-center">
                <span class="text-4xl font-bold">Alertbot is in closed beta!</span>
                <span class="para">Alertbot is in closed beta and as such only a select few users can access the dashboard.</span>
                <span class="para">As a beta tester you get access to an <span class="text-accent">exclusive role</span> on the support server as well as a <span class="text-accent">50% discount</span> on your first month of alertbot and unlimited free use in the closed beta period.</span>
                <span class="para">If you are interested in becoming a beta user email us at <a class="primary-link" href="mailto:{data.core.contact.email}">{data.core.contact.email}</a> or message me on discord at: oscarッ#0671.</span>
                <a
                    class="w-64 h-12 flex items-center justify-center text-xl font-bold mt-4 rounded-md bg-light-primary text-center"
                    href="/"
                >
                    Go back home
                </a>
            </div>
        {/if}
    </div>
{/if}

<style lang="postcss">
    .para {
        @apply text-gray-400 text-xl mt-4;
    }
</style>