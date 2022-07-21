<script>
    import { userStore } from "../../../stores/user";
    import { getAllTrackedAlerts, sendRecap } from "../../../api/alert";
    import { updateUserStats } from "../../../api/auth";
    import { formatDate } from "../../../utils/core";
    import constants from "../../../utils/constants";
    import Loading from "../../../components/Loading.svelte";
    import TradeList from "../../../components/dashboard/TradeList.svelte";
    import "../../../styles/dashboard.css";

    $: recentAlertsLoading = true;
    $: recentAlerts = [];

    getAllTrackedAlerts(true).then(res => {
        if (res.ok) {
            recentAlerts = res.data.filter(alert => {
                const alertDay = new Date(alert.date).getDay();
                const alertDate = new Date(alert.date).getDate();
                const today = new Date().getDay();
                const todayDate = new Date().getDate();

                const lastSundayDate = todayDate - today - alertDay;

                return alertDate > lastSundayDate && alert.trackedData?.closedData?.price;
            });
        };
        recentAlertsLoading = false;
    });

    $: userStats = {
        trades: $userStore?.stats?.trades || 0,
        wins: $userStore?.stats?.wins || 0,
        winRate: $userStore?.stats?.winRate.toFixed(2) || 0.00,
        gainPerTrade: $userStore?.stats?.gainPerTrade.toFixed(2) || 0.00,
    };
</script>

<div class="flex flex-col w-full items-center fade-in pb-16">
    <h1>Trade Stats</h1>
    <div class="flex flex-col mt-8 w-10xx lg:w-5/6">
        <div class="p-6 my-2 bg-dark-primary rounded-md">
            <span class="font-bold text-xl">Lifetime Stats</span>
            <div class="lifetime-stats">
                <div class="stat-container first">
                    <span class="title">Alerts</span>
                    <span class="value">{userStats.trades}</span>
                </div>
                <div class="stat-container">
                    <span class="title">Wins</span>
                    <span class="value">{userStats.wins}</span>
                </div>
                <div class="stat-container">
                    <span class="title">Win Rate</span>
                    <span class="value">{userStats.winRate}%</span>
                </div>
                <div class="stat-container">
                    <span class="title">Avg Gain Per Trade</span>
                    <span class="value">{userStats.gainPerTrade}%</span>
                </div>
            </div>
        </div>
        <Loading loading={recentAlertsLoading}>
            <TradeList alerts={recentAlerts}/>
        </Loading>
    </div>
</div>