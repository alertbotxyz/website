<script>
    import TradeStats from "../../components/dashboard/TradeStats.svelte";
    import constants from "../../utils/constants";
    import { formatDate } from "../../utils/core";
    import Loading from "../Loading.svelte";

    export let alerts;
    export let isPublic;

    $: alertsLoading = false;
    $: alertStats = {};
    $: alertDays = [];

    $: if (alerts?.length > 0) {
        const trades = alerts.length;
        const wins = alerts.filter(alert => {
            const btoWin = alert.trackedData?.closedData?.price > alert.trackedData.price;
            const stoWin = alert.trackedData?.closedData?.price < alert.trackedData.price;
            
            const longshort = alert.trackedData?.longshort;

            return longshort === "bto" && btoWin || longshort === "sto" && stoWin;
        }).length;

        let totalPercentGain = 0;
        let days = [];

        alerts.forEach(alert => {
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
                    unix: dayAlerts.unix,
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
                    unix: alert.date,
                };
            };

        });

        alertDays = days;

        alertStats = {
            trades,
            wins,
            winRate: (wins / trades * 100).toFixed(2),
            gainPerTrade: (totalPercentGain / trades).toFixed(2),
        };
    };

    // the first day of alerts
    $: firstAlertDay = "";
    $: daysSinceMondayOfWeek = 0;
    $: firstAlertDayUnix = 0;
    $: startDay = "";
    $: endDay = "";

    $: if (alertDays?.length > 0) {
        // the first day of alerts
        firstAlertDay = alertDays.find(day => day);
        daysSinceMondayOfWeek = alertDays.findIndex(day => day === firstAlertDay);

        firstAlertDayUnix = firstAlertDay.unix - 1000 * 60 * 60 * 24 * daysSinceMondayOfWeek

        startDay = formatDate(new Date(firstAlertDayUnix), "dd/MM");
        endDay = formatDate(new Date(firstAlertDayUnix + 1000 * 60 * 60 * 24 * 7), "dd/MM");
    };

    const handleSendRecap = () => {
        sendRecap(alertDays, {
            ...recentStats,
            startDay,
            endDay,
        }).then(res => {
            console.log(res);
        });
    };
</script>

<div class="p-6 my-2 bg-dark-primary rounded-md flex flex-col">
    <div class="flex flex-row items-center">
        <span class="font-bold text-xl">Weekly Recap</span>
        {#if !isPublic}
            <button
                class="ml-4 bg-accent w-24 rounded-md h-6 font-bold"
                on:click={handleSendRecap}
            >
                Send Recap
            </button>
        {/if}
        <span class="ml-4 font-bold text-gray-400">{startDay} - {endDay}</span>
    </div>
    <Loading loading={alertsLoading}>
        <TradeStats
            trades={alertStats.trades}
            wins={alertStats.wins}
            winRate={alertStats.winRate}
            gainPerTrade={alertStats.gainPerTrade}
        />
        {#if alertDays?.length > 0}
            {#each alertDays as day}
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

<style lang="postcss">
    .date-container {
        @apply font-bold text-xl mb-2;
    }
    .win-rate {
        @apply font-bold my-2;
    }
</style>