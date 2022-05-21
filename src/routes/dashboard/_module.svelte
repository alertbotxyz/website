<script>
    import { getUser } from "../../api/auth";
    import { makeRequest } from "../../api/utils";
    import Sidebar from "../../components/navigation/Sidebar.svelte";
    import Navbar from "../../components/navigation/Navbar.svelte";
    import Loading from "../../components/Loading.svelte";

    export let error;
    $: loading = true;
    $: user = undefined;
    
    makeRequest("/").then(res => {
        if(!res.ok) {
            error = res.error.message;
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
    <Navbar>
        <div class="h-full w-full flex flex-col items-center justify-center slow-fade-in">
            <h1 class="error-code font-bold animate-bounce">500</h1>
            <span class="text-3xl font-bold">Service Unavailable</span>
            <span class="text-xl text-gray-400">We are sorry but out service is currently unavailable...</span>
        </div>
    </Navbar>
{:else}
    <div class="flex flex-row max-h-screen overflow-hidden">
        <Sidebar {user} loggedIn={user && !error}/>
        <div class="w-full slow-fade-in overflow-y-scroll">
            <Loading {loading}>
                <slot />
            </Loading>
        </div>
    </div>
{/if}

<style lang="postcss">
    .error-code {
        font-size: 12rem;
        background: -webkit-linear-gradient(left, rgb(214, 127, 255), rgb(126, 28, 255));
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