<script>
    import { params } from "@roxi/routify";
    import { getUser } from "../../../api/auth";
    import { getAllTrackedAlerts } from "../../../api/alert";
    import { addToast } from "../../../stores/toasts";
    import data from "../../../utils/data";
    import Loading from "../../../components/Loading.svelte";
    import "../../../styles/dashboard.css";

    $: userId = $params.userId;
    $: user = undefined;
    $: loading = true;
    $: statsLoading = true;
    $: userStats = {
        alerts: 0,
        wins: 0,
        wr: 0,
        gainPerTrade: 0,
        trades: [
            // {
            //     ticker: "AAPL",
            //     open: 28.00,
            //     close: 30.00,
            //     percent: 14.3,
            // },
        ],
    };

    getAllTrackedAlerts().then(res => {
        if (res.ok) {
            const allAlerts = res.data?.filter(alert => alert.trackedData?.closedData);

            const trades = allAlerts.length;
            const wins = allAlerts.filter(a => (a.trackedData.closedData?.price || 0) > a.trackedData.price).length;
            const wr = trades > 0 ? (wins / trades * 100).toFixed(2) : 0;
            let gainPerTrade = 0;

            for (let i = 0; i < trades; i++) {
                const alert = allAlerts[i];
                const openPrice = alert.trackedData.price;
                const closedPrice = alert.trackedData.closedData?.price || openPrice * 2;

                const percentChange = (closedPrice - openPrice) / openPrice * 100;

                gainPerTrade += percentChange;
            };

            userStats = {
                trades: allAlerts
                    .filter(trade => Date.now() - trade.date > 1000 * 60 * 60 * 24 * 7)
                    .map(trade => {
                        const open = trade.trackedData.price;
                        const closed = trade.trackedData.closedData?.price || openPrice * 2;
                        const percent = (closedPrice - openPrice) / openPrice * 100;

                        return {
                            ticker: trade.trackedData.ticker,
                            open,
                            close,
                            percent,
                        };
                    }),
                alerts: trades,
                wins,
                wr,
                gainPerTrade,
            }
        };
        
        statsLoading = false;
    });

    getUser(userId).then(res => {
        if (res.ok) {
            user = res.data;
        } else {
            addToast({
                type: "error",
                message: "There was an error getting this user's profile\n" + res.data.message,
                title: "Error getting user",
            });
        };
        loading = false;
    });
</script>

<div class="h-screen pt-32">
    <div class="bg-light-primary p-8 rounded-md w-12xx min-h-3xx mt-16">
        <Loading {loading}>
            {#if user}
                <div class="flex flex-row">
                    <img
                        src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.uid}/${user.avatar}.png?size=96` : data.images.default_avatar} 
                        alt="avatar"
                        class="w-24 h-24 mr-8 rounded-md"
                    />
                    <div class="flex flex-col w-full">
                        <span class="username">{user.name}#{user.discriminator}</span>
                        <span class="alert-type">
                            {#each user.profile.alertType as type, i}
                                {type} {i !== user.profile.alertType.length - 1 ? ", " : ""}
                            {/each}
                        </span>
                        <Loading loading={statsLoading}>
                            <div class="lifetime-stats">
                                <div class="stat-container first">
                                    <span class="title">Alerts</span>
                                    <span class="value">{userStats.alerts}</span>
                                </div>
                                <div class="stat-container">
                                    <span class="title">Wins</span>
                                    <span class="value">{userStats.wins}</span>
                                </div>
                                <div class="stat-container">
                                    <span class="title">Win Rate</span>
                                    <span class="value">{Math.round(userStats.wr).toFixed(1)}%</span>
                                </div>
                                <div class="stat-container">
                                    <span class="title">Avg Gain Per Trade</span>
                                    <span class="value">{Math.round(userStats.gainPerTrade).toFixed(1)}%</span>
                                </div>
                            </div>
                        </Loading>
                        <div class="flex flex-row mt-8 w-full">
                            <div class="section">
                                <span class="title">Bio</span>
                                <span class="description">{user.profile.bio}</span>
                            </div>
                            <div class="section">
                                <span class="title">Socials</span>
                                <span class="description">
                                    {#each Object.entries(user.profile.socials) as [key, value]}
                                        {#if key !== "_id"}
                                            <a class="social" href={value}><img src="/icons/{key}.svg" alt={key}></a>
                                        {/if}
                                    {/each}
                                </span>
                            </div>
                            <div class="section">
                                <span class="title">Timeframe</span>
                                <span class="description">
                                    {#each user.profile.timeframe as timeframe, i}
                                        {timeframe} {i !== user.profile.timeframe.length - 1 ? ", " : ""}
                                    {/each}
                                </span>
                            </div>
                        </div>
                        <span class="font-bold my-4">Recent trades</span>
                        {#if userStats.trades?.length > 0}
                            {#each userStats.trades as trade}
                                <span class="trade-container">
                                    <div class="ticker">{trade.ticker}</div>
                                    <div class="change">{Math.round(trade.open).toFixed(2)} -> {Math.round(trade.close).toFixed(2)}</div>
                                    <span class="percent {trade.percent > 0 ? "positive" : "negative"}">{trade.percent > 0 ? "+" : ""}{Math.round(trade.percent).toFixed(1)}%</span>
                                </span>
                            {/each}
                        {:else}
                            <span class="text-gray-400">No recent trades found</span>
                        {/if}
                    </div>
                </div>
            {:else}
                <span>No user found <a href="/" class="primary-link">Go back home.</a></span>
            {/if}
        </Loading>
    </div>
</div>

<style lang="postcss">
    .username {
        @apply text-xl font-bold;
    }
    .alert-type {
        @apply text-gray-400 mt-1;
    }
    .section {
        @apply flex flex-col mr-8 w-1/3;
    }
    .section .title {
        @apply font-bold text-xl;
    }
    .section .description {
        @apply text-gray-400 mt-2;
    }
    .section .social {
        @apply mr-2;
    }
</style>