<script>
    import { params } from "@roxi/routify";
    import { userStore } from "../../../stores/user";
    import { addToast } from "../../../stores/toasts";
    import { getAllTrackedAlerts } from "../../../api/alert";
    import data from "../../../utils/data";
    import TradeList from "../../../components/dashboard/TradeList.svelte";
    import Loading from "../../../components/Loading.svelte";
    import "../../../styles/dashboard.css";

    $: alertsArray = [];
    $: loading = true;
    $: user = $userStore;

    const startDate = new Date($params.date).getTime();
    const endDate = startDate + 1000 * 60 * 60 * 24 * 6;

    $: if (user) {
        if (new Date(startDate).getDay() === 1) {
            getAllTrackedAlerts(true, user.uid, {
                start: startDate,
                end: endDate
            }).then(res => {
                if (res.ok) {
                    alertsArray = res.data;
                } else {
                    addToast({
                        type: "error",
                        message: "There was an error fetching alerts\n" + res.error.message,
                        title: "There was an error",
                    });
                };
                loading = false;
            });
        } else {
            addToast({
                type: "error",
                message: "Invalid day. Day should be a monday",
                title: "Invalid day",
            });
            loading = false;
        };
    };
</script>
<div class="bg-dark-primary p-4 rounded-md mt-16 mb-4 w-10xx lg:w-5/6">
    <div class="flex flex-row items-center">
        <img
            src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.uid}/${user.avatar}.png?size=96` : data.images.default_avatar} 
            alt="avatar"
            class="w-16 h-16 mr-4 rounded-md"
        />
        <a
            class="font-bold text-lg"
            href="/alerter/{user.uid}/profile"
        >
            {user.name}#<span class="text-gray-400">{user.discriminator}</span>
        </a>
    </div>
</div>
<div class="w-10xx lg:w-5/6 pb-24">
    <Loading {loading}>
        {#if alertsArray?.length > 0}
            <TradeList
                {alertsArray}
                isPublic
            />
        {:else}
            <span class="p-2 font-bold bg-dark-primary w-full my-8 rounded-md">No trades found for this week</span>
        {/if}
    </Loading>
</div>
