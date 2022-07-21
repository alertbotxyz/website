<script>
    import { userStore } from "../../../stores/user";
    import { getAllTrackedAlerts } from "../../../api/alert";
    import { updateUserStats } from "../../../api/auth";
    import { formatDate } from "../../../utils/core";
    import constants from "../../../utils/constants";
    import Loading from "../../../components/Loading.svelte";
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

    $: recentStats = {};
    $: recentAlertsDays = [];

    $: if (recentAlerts?.length > 0) {
        const trades = recentAlerts.length;
        const wins = recentAlerts.filter(alert => {
            const btoWin = alert.trackedData?.closedData?.price > alert.trackedData.price;
            const stoWin = alert.trackedData?.closedData?.price < alert.trackedData.price;
            
            const longshort = alert.trackedData?.longshort;

            return longshort === "bto" && btoWin || longshort === "sto" && stoWin;
        }).length;

        let totalPercentGain = 0;
        let days = [];

        recentAlerts.forEach(alert => {
            const openPrice = alert.trackedData?.price;
            const closePrice = alert.trackedData?.closedData?.price;

            let percent = (closePrice - openPrice) / openPrice * 100;
            if (alert.trackedData.longshort === "sto") percent = (openPrice - closePrice) / closePrice * 100;

            totalPercentGain += percent;

            const day = new Date(alert.date).getDay();
            const dayAlerts = days[day];

            if (dayAlerts) {
                days[day] = {
                    alerts: [
                        ...dayAlerts.alerts,
                        {
                            ...alert,
                            percentGain: percent.toFixed(2),
                        },
                    ],
                    totalGain: dayAlerts.totalGain + percent,
                    trades: dayAlerts.trades + 1,
                    wonAlerts: dayAlerts.wonAlerts + (percent > 0 ? 1 : 0),
                    dayOfTheWeek: dayAlerts.dayOfTheWeek,
                    date: dayAlerts.date,
                };
            } else {
                days[day] = {
                    alerts: [
                        {
                            ...alert,
                            percentGain: percent.toFixed(2),
                        }
                    ],
                    totalGain: percent,
                    trades: 1,
                    wonAlerts: percent > 0 ? 1 : 0,
                    dayOfTheWeek: constants.daysOfTheWeek[new Date(alert.date).getDay()],
                    date: formatDate(new Date(alert.date), "dd/MM/yy"),
                };
            };

        });

        recentAlertsDays = days;

        recentStats = {
            trades,
            wins,
            winRate: (wins / trades * 100).toFixed(2),
            gainPerTrade: (totalPercentGain / trades).toFixed(2),
        };
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
        <div class="p-6 my-2 bg-dark-primary rounded-md flex flex-col">
            <span class="font-bold text-xl">Weekly Recap</span>
            <Loading loading={recentAlertsLoading}>
                <div class="lifetime-stats">
                    <div class="stat-container first">
                        <span class="title">Alerts</span>
                        <span class="value">{recentStats.trades || 0}</span>
                    </div>
                    <div class="stat-container">
                        <span class="title">Wins</span>
                        <span class="value">{recentStats.wins || 0}</span>
                    </div>
                    <div class="stat-container">
                        <span class="title">Win Rate</span>
                        <span class="value">{recentStats.winRate || 0}%</span>
                    </div>
                    <div class="stat-container">
                        <span class="title">Avg Gain Per Trade</span>
                        <span class="value">{recentStats.gainPerTrade || 0}%</span>
                    </div>
                </div>
                {#if recentAlertsDays?.length > 0}
                    {#each recentAlertsDays as day}
                        {#if day}
                            <span class="date-container">
                                <span class="md:text-sm {day.totalGain > 0 ? "text-green-400" : "text-red-400"}">{day.dayOfTheWeek} {day.date}</span>
                                <span class="md:text-sm">({day.totalGain > 0 ? "+" : ""}{day.totalGain.toFixed(2)}%)</span>
                            </span>
                            {#each day.alerts as alert}
                                <span class="trade-container">
                                    <div class="flex flex-row tiny:flex-col">
                                        <div class="ticker">{alert.trackedData?.ticker || "TICKER"}</div>
                                        <div class="change">{alert.trackedData?.price.toFixed(2) || "OPEN"} -> {alert.trackedData?.closedData?.price.toFixed(2) || "CLOSE"}</div>
                                    </div>
                                    <span class="percent {alert.percentGain > 0 ? "positive" : "negative"}">{alert.percentGain > 0 ? "+" : ""}{alert.percentGain}%</span>
                                </span>
                            {/each}
                            <span class="win-rate">Win Rate: {(day.wonAlerts / day.trades * 100).toFixed(2)}%</span>
                        {/if}
                    {/each}
                {:else}
                    <span>No trades found</span>
                {/if}
            </Loading>
        </div>
    </div>
</div>

<style lang="postcss">
    .date-container {
        @apply font-bold text-xl mb-2;
    }
    .win-rate {
        @apply font-bold my-2;
    }
</style>