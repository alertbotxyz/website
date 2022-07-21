<script>
    import { params } from "@roxi/routify";
    import { getUser } from "../../api/auth";
    import Navbar from "../../components/navigation/Navbar.svelte";
    import { setUser } from "../../stores/user";

    $: userId = $params.userId;
    $: loadingUser = true;
    $: user = undefined;

    $: if (userId) getUser(userId).then(res => {
        if (res.ok) {
            setUser(res.data);
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
    <slot test="someTestValue"/>
</Navbar>