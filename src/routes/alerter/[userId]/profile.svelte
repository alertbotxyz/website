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
                        <div class="lifetime-stats">
                            <div class="stat-container first">
                                <span class="title">Alerts</span>
                                <span class="value">{user.stats.trades || 0}</span>
                            </div>
                            <div class="stat-container">
                                <span class="title">Wins</span>
                                <span class="value">{user.stats.wins || 0}</span>
                            </div>
                            <div class="stat-container">
                                <span class="title">Win Rate</span>
                                <span class="value">{user.stats?.winRate.toFixed(2) || 0}%</span>
                            </div>
                            <div class="stat-container">
                                <span class="title">Avg Gain Per Trade</span>
                                <span class="value">{user.stats?.gainPerTrade.toFixed(2) || 0}%</span>
                            </div>
                        </div>
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