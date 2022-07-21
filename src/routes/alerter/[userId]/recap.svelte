<script>
    import { params } from "@roxi/routify";
    import { userStore } from "../../../stores/user";
    import { getAllTrackedAlerts } from "../../../api/alert";
    import data from "../../../utils/data";
    import TradeList from "../../../components/dashboard/TradeList.svelte";
    import Loading from "../../../components/Loading.svelte";
    import "../../../styles/dashboard.css";

    $: alerts = [];
    $: loading = true;
    $: user = $userStore;

    const startDate = new Date($params.date).getTime();
    const endDate = startDate + 1000 * 60 * 60 * 24 * 7;

    getAllTrackedAlerts(true, {
        start: startDate,
        end: endDate
    }).then(res => {
        if (res.ok) {
            alerts = res.data;
        };
        loading = false;
    });
</script>
<div class="bg-dark-primary p-4 rounded-md mt-16 mb-4 w-10xx lg:w-5/6">
    <div class="flex flex-row items-center">
        {#if user?._id}
            <img
                src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.uid}/${user.avatar}.png?size=96` : data.images.default_avatar} 
                alt="avatar"
                class="w-16 h-16 mr-4 rounded-md"
            />
            <span class="font-bold text-lg">{user.name}#<span class="text-gray-400">{user.discriminator}</span></span>
        {/if}
    </div>
</div>
<div class="w-10xx lg:w-5/6 pb-24">
    <Loading {loading}>
        <TradeList
            {alerts}
            isPublic
        />
    </Loading>
</div>
