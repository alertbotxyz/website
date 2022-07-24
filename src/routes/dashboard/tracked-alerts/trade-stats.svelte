<script>
    import { userStore } from "../../../stores/user";
    import { getAllTrackedAlerts, sendRecap } from "../../../api/alert";
    import { updateUserStats } from "../../../api/auth";
    import { formatDate } from "../../../utils/core";
    import constants from "../../../utils/constants";
    import Loading from "../../../components/Loading.svelte";
    import TradeList from "../../../components/dashboard/TradeList.svelte";
    import TradeStats from "../../../components/dashboard/TradeStats.svelte";
    import "../../../styles/dashboard.css";

    $: recentAlertsAreLoading = true;
    $: recentAlertsArray = [];

    const today = new Date();
    const recentMonday = today.getTime() - (today.getDay() - 1 < 0 ? 6 : today.getDay() - 1) * 1000 * 60 * 60 * 24;
    const recentSunday = new Date(recentMonday).getTime() + 6 * 1000 * 60 * 60 * 24;

    getAllTrackedAlerts(true, undefined, {
        start: recentMonday,
        end: recentSunday,
    }).then(res => {
        if (res.ok) {
            recentAlertsArray = res.data;
        } else {
            addToast({
                type: "error",
                message: "There was an error fetching alerts\n" + res.error.message,
                title: "There was an error",
            });
        };
        recentAlertsAreLoading = false;
    });

    $: userStats = {
        tradeCount: $userStore?.stats?.tradeCount || 0,
        winCount: $userStore?.stats?.winCount || 0,
        winRate: $userStore?.stats?.winRate.toFixed(2) || 0.00,
        gainPerTrade: $userStore?.stats?.gainPerTrade.toFixed(2) || 0.00,
    };
</script>

<div class="flex flex-col w-full items-center fade-in pb-16">
    <h1>Trade Stats</h1>
    <div class="flex flex-col mt-8 w-10xx lg:w-5/6">
        <div class="p-6 my-2 bg-dark-primary rounded-md">
            <span class="font-bold text-xl">Lifetime Stats</span>
            <TradeStats
                tradeCount={userStats.tradeCount}
                winCount={userStats.winCount}
                winRate={userStats.winRate}
                gainPerTrade={userStats.gainPerTrade}
            />
        </div>
        <Loading loading={recentAlertsAreLoading}>
            <TradeList alertsArray={recentAlertsArray}/>
        </Loading>
    </div>
</div>