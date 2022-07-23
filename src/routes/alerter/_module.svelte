<script>
    import { params } from "@roxi/routify";
    import { addToast } from "../../stores/toasts";
    import { setUser } from "../../stores/user";
    import { getUser } from "../../api/auth";
    import Loading from "../../components/Loading.svelte";
    import Navbar from "../../components/navigation/Navbar.svelte";

    $: userId = $params.userId;
    $: loadingUser = true;
    $: user = undefined;

    $: if (userId) getUser(userId).then(res => {
        if (res.ok) {
            setUser(res.data);
            user = res.data;
        } else {
            addToast({
                type: "error",
                message: "There was an error getting this user's profile\n" + res.data.message,
                title: "Error getting user",
            });
        };
        loadingUser = false;
    });
</script>
<Navbar>
    <Loading loading={loadingUser}>
        {#if user && user.uid}
            <slot/>
        {:else}
            <span class="font-bold">User not found</span>
        {/if}
    </Loading>
</Navbar>