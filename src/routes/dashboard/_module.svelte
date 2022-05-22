<script>
    import { getUser } from "../../api/auth";
    import { makeRequest } from "../../api/utils";
    import Sidebar from "../../components/navigation/Sidebar.svelte";
    import Navbar from "../../components/navigation/Navbar.svelte";
    import Loading from "../../components/Loading.svelte";

    import "../../styles/errors.css";
import ErrorPage from "../../components/ErrorPage.svelte";

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
    <ErrorPage 
        code={500}
        title="Internal server error"
        message="Something went wrong on our end. Please try again later..."
    />
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