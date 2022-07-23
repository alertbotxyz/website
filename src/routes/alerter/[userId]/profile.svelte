<script>
    import { params } from "@roxi/routify";
    import { userStore } from "../../../stores/user";
    import { getUser } from "../../../api/auth";
    import { getAllTrackedAlerts } from "../../../api/alert";
    import { addToast } from "../../../stores/toasts";
    import data from "../../../utils/data";
    import Loading from "../../../components/Loading.svelte";
    import TradeStats from "../../../components/dashboard/TradeStats.svelte";
    import "../../../styles/dashboard.css";

    $: userId = $params.userId;
    $: user = $userStore;
</script>

<div class="min-h-screen pt-32 w-full flex justify-center">
    <div class="bg-light-primary p-8 rounded-md w-5/6 h-fit mt-16">
        {#if user?._id}
            <div class="flex flex-row md:flex-col  xs:items-center">
                <img
                    src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.uid}/${user.avatar}.png?size=96` : data.images.default_avatar} 
                    alt="avatar"
                    class="w-24 h-24 mr-8 md:mr-0 rounded-md"
                />
                <div class="flex flex-col w-full md:mt-4  xs:items-center">
                    <span class="username">{user.name}#{user.discriminator}</span>
                    <span class="alert-type">
                        {#each user.profile?.alertType as type, i}
                            {type} {i !== user.profile?.alertType.length - 1 ? ", " : ""}
                        {/each}
                    </span>
                    <TradeStats
                        tradeCount={user.stats?.tradeCount}
                        winCount={user.stats?.winCount}
                        winRate={user.stats?.winRate}
                        gainPerTrade={user.stats?.gainPerTrade}
                    />
                    <div class="flex flex-row mt-8 w-full md:flex-col xs:flex-col">
                        <div class="section full-width md:mb-4">
                            <span class="title">Bio</span>
                            <span class="description">{user.profile?.bio || "No user profile"}</span>
                        </div>
                        <div class="flex flex-row xs:flex-col">
                            <div class="section">
                                <span class="title">Socials</span>
                                <span class="description">
                                    {#each Object.entries(user.profile?.socials) as [key, value]}
                                        {#if key !== "_id"}
                                            <a class="social" href={value}><img src="/icons/{key}.svg" alt={key}></a>
                                        {/if}
                                    {/each}
                                </span>
                            </div>
                            <div class="section xs:mt-8">
                                <span class="title">Timeframe</span>
                                <span class="description">
                                    {#each user.profile?.timeframe as timeframe, i}
                                        {timeframe} {i !== user.profile?.timeframe.length - 1 ? ", " : ""}
                                    {/each}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {:else}
            <span>No user found <a href="/" class="primary-link">Go back home.</a></span>
        {/if}
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
    .section.full-width {
        @apply md:w-full;
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