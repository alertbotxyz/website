<script>
    import { addToast } from "../../stores/toasts";
    import { sendRecap } from "../../api/alert";
    import constants from "../../utils/constants";
    import { formatDate } from "../../utils/core";
    import TradeStats from "../../components/dashboard/TradeStats.svelte";
    import Loading from "../Loading.svelte";

    export let alertsArray;
    export let isPublic;

    $: alertsAreLoading = false;
    $: alertStats = {};
    $: alertDays = [];
    $: submitting = false;

    $: if (alertsArray?.length > 0) {
        const tradeCount = alertsArray.length;
        const winCount = alertsArray.filter(alert => {
            const btoWin = alert.trackedData?.closedData?.price > alert.trackedData.price;
            const stoWin = alert.trackedData?.closedData?.price < alert.trackedData.price;
            
            const longshort = alert.trackedData?.longshort;

            return longshort === "bto" && btoWin || longshort === "sto" && stoWin;
        }).length;

        let totalPercentGain = 0;
        let days = [];

        alertsArray.forEach(alert => {
            const openPrice = alert.trackedData?.price;
            const closePrice = alert.trackedData?.closedData?.price;

            let percent = (closePrice - openPrice) / openPrice * 100;
            if (alert.trackedData.longshort === "sto") percent = (openPrice - closePrice) / closePrice * 100;

            percent *= (alert.trackedData?.leverage || 1);

            totalPercentGain += percent;

            const day = new Date(alert.date).getDay();
            const dayAlerts = days[day];

            if (dayAlerts) {
                days[day] = {
                    alertsArray: [
                        ...dayAlerts.alertsArray,
                        {
                            ...alert,
                            percentGain: percent.toFixed(2),
                        },
                    ],
                    totalGain: dayAlerts.totalGain + percent,
                    tradeCount: dayAlerts.tradeCount + 1,
                    wonTradeCount: dayAlerts.wonTradeCount + (percent > 0 ? 1 : 0),
                    dayOfTheWeek: dayAlerts.dayOfTheWeek,
                    date: dayAlerts.date,
                    unix: dayAlerts.unix,
                };
            } else {
                days[day] = {
                    alertsArray: [
                        {
                            ...alert,
                            percentGain: percent.toFixed(2),
                        }
                    ],
                    totalGain: percent,
                    tradeCount: 1,
                    wonTradeCount: percent > 0 ? 1 : 0,
                    dayOfTheWeek: constants.daysOfTheWeek[new Date(alert.date).getDay()],
                    date: formatDate(new Date(alert.date), "dd/MM/yy"),
                    unix: alert.date,
                };
            };

        });

        alertDays = days.sort((a, b) => a.unix - b.unix);

        alertStats = {
            tradeCount,
            winCount,
            winRate: (winCount / tradeCount * 100).toFixed(2),
            gainPerTrade: (totalPercentGain / tradeCount).toFixed(2),
        };
    };

    // the first day of alerts
    $: firstAlertDay = "";
    $: daysSinceMondayOfWeek = 0;
    $: firstAlertDayUnix = 0;
    $: startDay = formatDate(Date.now() + 1000 * 60 * 60 * 24, "dd/MM");
    $: endDay = formatDate(Date.now() + 1000 * 60 * 60 * 24 * 7, "dd/MM");

    $: if (alertDays?.length > 0) {
        // the first day of alerts
        firstAlertDay = alertDays.find(day => day);
        daysSinceMondayOfWeek = alertDays.findIndex(day => day === firstAlertDay);

        firstAlertDayUnix = firstAlertDay.unix - 1000 * 60 * 60 * 24 * daysSinceMondayOfWeek;

        startDay = formatDate(new Date(firstAlertDayUnix), "dd/MM");
        endDay = formatDate(new Date(firstAlertDayUnix + 1000 * 60 * 60 * 24 * 6), "dd/MM");
    };

    const handleSendRecap = () => {
        submitting = true;
        sendRecap(alertDays, {
            ...alertStats,
            startDay,
            endDay,
        }).then(res => {
            if (res.ok) {
                addToast({
                    type: "success",
                    message: "Recap sent successfully",
                    title: "Success",
                });
            } else {
                addToast({
                    type: "error",
                    message: "Failed to send recap\n" + res.error.message,
                    title: "There was an error",
                });
            };
            submitting = false;
        });
    };
</script>

<div class="p-6 my-2 bg-dark-primary rounded-md flex flex-col">
    <div class="flex flex-row items-center 2xs:flex-col 2xs:items-start">
        <div class="flex flex-row tiny:flex-col">
            <span class="font-bold text-xl 2xs:text-base">Weekly Recap</span>
            {#if !isPublic}
                <button
                    class="ml-4 bg-accent w-24 rounded-md h-6 font-bold 2xs:text-sm tiny:ml-0 tiny:my-2"
                    on:click={handleSendRecap}
                    disabled={submitting}
                >
                    Send Recap
                </button>
            {/if}
        </div>
        <span class="ml-4 font-bold text-gray-400 2xs:text-sm 2xs:ml-0 2xs:mt-2 tiny:mt-0">{startDay} - {endDay}</span>
    </div>
    <Loading loading={alertsAreLoading}>
        <TradeStats
            tradeCount={alertStats.tradeCount}
            winCount={alertStats.winCount}
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
                    {#each day.alertsArray as alert}
                        <span class="trade-container">
                            <div class="flex flex-row tiny:flex-col">
                                <div class="ticker">{alert.trackedData?.ticker || "TICKER"}</div>
                                <div class="change">{alert.trackedData?.price.toFixed(2) || "OPEN"} -> {alert.trackedData?.closedData?.price.toFixed(2) || "CLOSE"}</div>
                            </div>
                            <span class="percent {alert.percentGain > 0 ? "positive" : "negative"}">{alert.percentGain > 0 ? "+" : ""}{alert.percentGain}%</span>
                        </span>
                    {/each}
                    <span class="win-rate">Win Rate: {(day.wonTradeCount / day.tradeCount * 100).toFixed(2)}%</span>
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