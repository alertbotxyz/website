<script>
    import { setUser, userStore } from "../../stores/user";
    import constants from "../../utils/constants";
    import { fade, fly } from "svelte/transition";
    import { addToast } from "../../stores/toasts";
    import { getUser, logout } from "../../api/auth";
    import { makeRequest } from "../../api/utils";
    import Sidebar from "../../components/navigation/Sidebar.svelte";
    import Loading from "../../components/Loading.svelte";
    import ErrorPage from "../../components/errors/ErrorPage.svelte";
    import User from "../../components/dashboard/User.svelte";
    import data from "../../utils/data";
    import "../../styles/errors.css";

    $: error = "";
    $: status = null;
    $: loading = true;
    $: user = $userStore;
    $: menu = false;
    $: loggedIn = user && !error;

    const handleMenu = (close = false) => {
        menu = close === true ? false : !menu;
        document.querySelector("body").classList.toggle("overflow-hidden");
        document.querySelector("html").classList.toggle("overflow-hidden");
    };

    getUser().then(res => {
        if (res.ok) {
            setUser(res.data);
        } else {
            if (res.status === 401) window.location.href = `${constants.api.url}/discord/login`;

            error = res.error.message;
            status = res.status;
        };
    });
    
    makeRequest("/").then(res => {
        if (res.status === 401) return;

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
     // "978042575082618890", // atomッ#4262
        "808299695310766090", // Chicago#2093
        "579327324315582464", // LoGiK#7612
        "275043451211481090", // Vocaloid#2937
        "778004079246311455", // stonks#3378
        "806657133960495154", // oscarッ#0671
        "230054408044544000", // Expo Jesse#9564
        "173468647916961792", // qiko#0001
        "177435130267172864", // hadan#2294
        "786253410974433310", // NLT | Kanton 👑#0001
        "735154545696440330", // $ The Market Bishop#8888
        "956043403706134549", // chuckfu#6397
        "327572501011890186", // clearlystocks#6413
        "744979462290014258", // MarketTradeAdvisor#0347
        "926215350226391110", // ! SkyHighTrades#4390
        "207124078723596288", // yike#1889
    ];
</script>

<Loading {loading}>
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
                                    on:closeSidebar={() => {
                                        handleMenu(true);
                                    }}
                                />
                            </div>
                        </div>
                    {/if}
                </div>
                <div class="w-full slow-fade-in overflow-y-scroll">
                    <slot />
                </div>
            {:else}
                <div class="w-full h-screen items-center justify-center flex flex-col px-64 text-center overflow-y-scroll lg:py-16 lg:px-16 2xs:px-8">
                    <span class="text-4xl font-bold xs:text-2xl">Alertbot is in closed beta!</span>
                    <span class="para">Alertbot is in closed beta and as such only a select few users can access the dashboard.</span>
                    <span class="para ">As a beta tester you get access to an <span class="text-accent">exclusive role</span> on the support server as well as a <span class="text-accent">50% discount</span> on your first month of alertbot and unlimited free use in the closed beta period.</span>
                    <span class="para">If you are interested in becoming a beta user email us at <a class="primary-link" href="mailto:{data.core.contact.email}">{data.core.contact.email}</a> or message me on discord at: oscarッ#0671.</span>
                    <a
                        class="w-64 h-12 flex items-center justify-center text-xl font-bold mt-4 rounded-md bg-light-primary text-center tiny:w-48 tiny:h-8 tiny:text-sm"
                        href="/"
                    >
                        Go back home
                    </a>
                    <a
                        class="w-64 h-12 flex items-center justify-center text-xl font-bold mt-4 rounded-md bg-accent text-center tiny:w-48 tiny:h-8 tiny:text-sm"
                        href="/"
                        on:click={() => {
                            logout().then(() => {
                                return;
                            });
                        }}
                    >
                        Logout
                    </a>
                </div>
            {/if}
        </div>
    {/if}
</Loading>

<style lang="postcss">
    .para {
        @apply text-gray-400 text-xl mt-4 xs:text-base;
    }
</style>