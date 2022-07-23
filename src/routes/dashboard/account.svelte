<!-- <script context="module" lang="ts"> -->
<script context="module">
    import { getBotUser, getUserAccountData, updateBotToken, logout, updateUserProfile } from "../../api/auth";
    import { userStore } from "../../stores/user";

    // : {
    //     id: string;
    //     username: string;
    //     discriminator: string;
    //     avatar?: string;
    //     token?: string;
    // }

    const setNewBot = (botData) => {
        const bot = {
            name: botData.username,
            discriminator: botData.discriminator,
            avatar: botData.avatar ? `https://cdn.discordapp.com/avatars/${botData.id}/${botData.avatar}.png` : data.images.default_avatar,
            id: botData.id,
            token: botData.token,
        };

        return bot;
    };

    export const load = async () => {
        const res = await getBotUser();

        if (res.ok) {
            return {
                props: { bot: setNewBot(res.data) },
            };
        } else {
            return {
                props: {
                    error: res.error?.message,
                },
            };
        };
    };
</script>

<script>
// <script lang="ts">
    import { slide } from "svelte/transition";
    // import { AccountUser, AlertData, AlertPage } from "../../types/user";
    import { addToast } from "../../stores/toasts";
    import { getAlertPage } from "../../api/alert";
    import constants from "../../utils/constants";
    import data from "../../utils/data";
    import { formatDate } from "../../utils/core";
    import Info from "../../components/Info.svelte";
    import InputLabel from "../../components/inputs/InputLabel.svelte";
    import StandardInput from "../../components/inputs/StandardInput.svelte";
    import Loading from "../../components/Loading.svelte";
    import DiscordChat from "../../components/discord/DiscordChat.svelte";
    import DashboardInput from "../../components/inputs/DashboardInput.svelte";
    import "../../styles/account.css";
    import SaveChangesPopup from "../../components/dashboard/templates/SaveChangesPopup.svelte";
    import SuccessModal from "../../components/modals/SuccessModal.svelte";

    export let bot;
    export let error;

    $: loading = true;
    $: botIsLoading = false;

    // let user: AccountUser;
    let user;
    $: user = {
        customerId: $userStore.customerId,
        subscription: $userStore.subscription,
        billing: [],
        alerts: [],
        stats: {
            templates: 0,
            servers: 0,
            alerts: 0,
        },
        portalUrl: `${constants.api.url}/subscription/customer-portal?customerId=${$userStore.customerId}`,
    };
    $: bot = {
        token: $userStore.botToken,
        ...bot
    };

    $: newBotToken = "";
    $: alertHistoryPage = 1;
    // $: alertHistoryPageData = ([] as AlertData[]);
    $: alertHistoryPageData = [];
    $: hash = window.location.hash.substring(1);
    $: dropdowns = {
        current_plan: hash === "current-plan" || !hash,
        billing_history: hash === "billing-history",
        alert_history: hash === "alert-history",
    };

    $: updated = false;
    $: hasError = false;
    $: submitting = false;
    $: success = {
        successful: false,
        message: "",
        title: "",
    };

    if (error) addToast({
        type: $userStore.botToken ? "error" : "warning",
        message: error,
        title: "There was an error.",
    });

    if (!bot || !bot.token) {
        loading = true;
        getBotUser().then(res => {
            if (res.ok) bot = setNewBot(res.data);
            else error = res.error?.message;
            loading = false;
        });
    };

    getUserAccountData().then(res => {
        if (res.ok) {
            user = {
                ...user,
                billing: res.data.billingHistory,
                alerts: [ 
                    {
                        pageNumber: 1,
                        alertHistory: res.data.alertHistory
                    },
                ],
                stats: {
                    templates: res.data.templateCount,
                    servers: res.data.serverCount,
                    alerts: res.data.alertCount,
                },
            };
            alertHistoryPageData = res.data.alertHistory;
            
            bot = {
                ...bot,
                token: $userStore.botToken,
            };
        } else {
            addToast({
                type: "error",
                message: "Something went wrong while fetching your account data.",
                title: "Error",
            });
        };

        loading = false;
    });

    const changePage = pageNumber => {
        const pageCount = Math.ceil(user.stats.alerts / 20);

        if (pageNumber > pageCount || pageNumber < 1) return;
        // const existingPage: AlertPage | undefined = user.alerts?.find(page => page.pageNumber === pageNumber);
        const existingPage = user.alerts?.find(page => page.pageNumber === pageNumber);

        if (existingPage) {
            alertHistoryPage = pageNumber;
            alertHistoryPageData = existingPage.alertHistory;
        } else {
            getAlertPage(pageNumber).then(res => {
                if (res.ok) {
                    user = {
                        ...user,
                        alerts: [
                            ...user.alerts || [],
                            {
                                pageNumber,
                                alertHistory: res.data,
                            },
                        ],
                    };

                    alertHistoryPage = pageNumber;
                    alertHistoryPageData = res.data;
                } else {
                    addToast({
                        type: "error",
                        message: "Something went wrong while fetching this alert page.",
                        title: "Error",
                    });
                };
            });
        };
    };

    const handleBotChange = e => {
        const { value } = e.detail;
        newBotToken = value;
    };

    const handleSubmitToken = () => {
        if (!newBotToken) {
            return addToast({
                type: "error",
                message: "No token provided.",
                title: "Error",
            });
        };
        botIsLoading = true;
        submitting = true;

        // update the bot token on the user
        updateBotToken(newBotToken).then(res => {
            if (res.ok) {
                // fetch bot data using updated token (from the user)
                getBotUser().then(res => {
                    if (res.ok) {
                        error = undefined;
                        bot = setNewBot({
                            token: newBotToken,
                            ...res.data
                        });
                    } else {
                        addToast({
                            type: "error",
                            message: "Something went wrong while fetching your bot data.",
                            title: "Error",
                        });
                    };
                });
            } else {
                addToast({
                    type: "error",
                    message: res.error?.message,
                    title: "Error",
                });
            };

            botIsLoading = false;
            submitting = false;
        });
    };

    const handleLogout = () => {
        logout().then(() => {
            return;
        });
    };
    
    let originalUserProfile = JSON.parse(JSON.stringify($userStore.profile ?? {}));
    const checkUpdate = () => updated = JSON.stringify(originalUserProfile) !== JSON.stringify($userStore.profile);

    const handleUserProfileChange = e => {
        const { value, name } = e.detail;
        
        if (name === "alertType" || name === "timeframe") {
            if ($userStore.profile[name].includes(value)) return;
            $userStore.profile[name] = [...$userStore.profile[name], value];
        } else {
            const nested = name.split(".");

            if (nested[1]) {
                let obj = null;

                nested.forEach(key => {
                    if (obj === null) {
                        obj = {
                            [key]: $userStore.profile[key],
                        };
                    } else {
                        obj[Object.keys(obj)[0]][key] = value;
                    };
                });

                $userStore.profile[nested[0]] = obj[nested[0]];
            } else {
                $userStore.profile[name] = value;
            };
        };
        
        checkUpdate();
    };

    const handleDeleteTag = (name, tag) => {
        $userStore.profile[name] = $userStore.profile[name].filter(t => t !== tag);

        checkUpdate();
    };

    const handleUpdateUserProfile = () => {
        submitting = true;
        updateUserProfile($userStore.profile).then(res => {
            if (res.ok) {
                success = {
                    successful: true,
                    message: "Your profile has been updated successfully",
                    title: "User profile updated",
                };
                updated = false;
            } else {
                addToast({
                    type: "error",
                    message: res.error.message,
                    title: "There was an error updating your profile",
                });
            };
            submitting = false;
        });
    };
</script>

<SaveChangesPopup
    disabled={hasError || submitting}
    {updated}
    on:cancelSaveChanges={() => {
        $userStore.profile = JSON.parse(JSON.stringify(originalUserProfile));
        checkUpdate();
    }}
    on:confirmSaveChanges={handleUpdateUserProfile}
/>
<SuccessModal
    active={success.successful}
    title={success.title}
    message={success.message}
    options={[
        {
            type: "button",
            text: "Edit profile",
            color: "bg-dark-primary",
        },
        {
            type: "link",
            text: "View profile",
            color: "bg-accent",
            url: `/alerter/${$userStore.uid}/profile`,
        },
    ]}
    on:close={() => {
        success.successful = false;
        success.message = "";
        success.title = "";
    }}
/>
<Loading {loading}>
    <div class="account ">
        {#if user}
            <div class="flex flex-col w-11/12">
                <div class="flex flex-row justify-between w-full my-16 lg:my-12">
                    <h1>Account</h1>
                    <span
                        class="bg-error rounded-md flex flex-col items-center justify-center font-bold px-8 hover:cursor-pointer"
                        on:click={handleLogout}
                    >
                        Logout
                    </span>
                </div>
                <div class="flex flex-row lg:flex-col-reverse lg:items-center w-full my-8">
                    <div class="flex flex-row 2xs:w-full">
                        {#if bot && (bot.token || $userStore.botToken) && !error}
                            <Loading loading={botIsLoading}>
                                <div class="rounded-md border border-solid border-gray-600 py-3 px-4 flex flex-row items-center lg:mt-8 2xs:flex-col 2xs:w-full mr-8 lg:mr-0">
                                    <div class="flex flex-row items-center tiny:flex-col">
                                        <img
                                            src={bot.avatar}
                                            alt="bot avatar"
                                            class="rounded-full w-12 h-12 shadow-sm shadow-gray-600"
                                        />
                                        <div class="flex flex-row tiny:py-2">
                                            <div class="flex flex-row text-xl ml-2 font-bold">
                                                <span>{bot.name}</span>
                                                <span class="text-gray-400 ml-0.5">#{bot.discriminator}</span>
                                            </div>
                                            <Info
                                                text="Invite this bot to every server you want to alert to."
                                                style="text-xl mt-0.5"
                                                left
                                            />
                                        </div>
                                    </div>
                                    <a
                                        href=" https://discord.com/oauth2/authorize?client_id={bot.id}&scope=bot%20applications.commands&permissions=8"
                                        class=" py-2 w-32 ml-8 2xs:ml-0 text-center bg-accent rounded-md"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Invite
                                    </a>
                                </div>
                            </Loading>
                        {/if}
                    </div>
                    <div class="flex flex-col lg:ml-0 w-full">
                        <InputLabel
                            labelFor="token"
                            labelText="Bot Token"
                            help="Your bot token is used to connect to your bot. You can find, create or edit your bot in the discord developer dashboard."
                        />
                        <div class="flex flex-row 2xs:flex-col">
                            <StandardInput
                                style="w-full rounded-md border border-solid border-gray-600 text-gray-300 bg-transparent px-4 py-3 font-bold"
                                name="token"
                                placeholder="Enter your bots token"
                                defaultValue={bot.token || $userStore.botToken}
                                on:change={handleBotChange}
                                reactive
                                type="text"
                            />
                            <button
                                class="primary-button bg-accent ml-4 w-64 2xs:ml-0 2xs:mt-4 2xs:w-full"
                                aria-label="Save bot token"
                                on:click={handleSubmitToken}
                                disabled={hasError || submitting}
                            >
                                Save
                            </button>
                        </div>
                        <span class="mt-2">
                            You can edit your bot in the discord
                            <a
                                href="https://discord.com/developers/applications/{bot.id ? `${bot.id}/information` : ""}"
                                class="primary-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                developer dashboard
                            </a>
                        </span>
                    </div>
                </div>
                <div class="flex flex-col my-8 mb-24">
                    <span class="my-2 font-bold text-xl">Profile</span>
                    <DashboardInput
                        name="bio"
                        title="Bio"
                        type="textarea"
                        placeholder="Tell us about yourself"
                        defaultValue={$userStore.profile?.bio}
                        on:change={handleUserProfileChange}
                    />
                    <DashboardInput
                        name="alertType"
                        title="Type"
                        help="The types of alerts you send"
                        type="select"
                        data={{
                            options: [
                                {
                                    text: "Stocks",
                                    value: "Stocks"
                                },
                                {
                                    text: "Crypto",
                                    value: "Crypto"
                                },
                                {
                                    text: "Options",
                                    value: "Options"
                                },
                                {
                                    text: "Forex",
                                    value: "Forex"
                                },
                                {
                                    text: "Futures",
                                    value: "Futures"
                                },
                                {
                                    text: "Commodities",
                                    value: "Commodities"
                                },
                                {
                                    text: "OTC",
                                    value: "OTC"
                                },
                            ]
                        }}
                        on:change={handleUserProfileChange}
                    />
                    <div class="flex flex-row my-2">
                        {#if $userStore?.profile?.alertType?.length > 0}
                            {#each $userStore?.profile?.alertType as type}
                                <span class="tag">{type} <span class="x" on:click={() => handleDeleteTag("alertType", type)}>x</span></span>
                            {/each}
                        {/if}
                    </div>
                    <DashboardInput
                        name="timeframe"
                        title="Timeframe"
                        help="The timeframes in which you trade"
                        type="select"
                        data={{
                            options: [
                                {
                                    text: "Scalps",
                                    value: "Scalps"
                                },
                                {
                                    text: "Day Trades",
                                    value: "Day Trades"
                                },
                                {
                                    text: "Swing Trades",
                                    value: "Swing Trades"
                                },
                                {
                                    text: "Investing",
                                    value: "Investing"
                                },
                            ]
                        }}
                        on:change={handleUserProfileChange}
                    />
                    <div class="flex flex-row my-2">
                        {#if $userStore?.profile?.timeframe?.length > 0}
                            {#each $userStore?.profile?.timeframe as timeframe}
                                <span class="tag">{timeframe} <span class="x" on:click={() => handleDeleteTag("timeframe", timeframe)}>x</span></span>
                            {/each}
                        {/if}
                    </div>
                    <span class="my-2 font-bold text-xl">Socials</span>
                    <DashboardInput
                        name="socials.twitter"
                        title="Twitter"
                        type="prefix"
                        placeholder="alertbotxyz"
                        data={{ prefix: "https://twitter.com/" }}
                        on:change={handleUserProfileChange}
                        defaultValue={$userStore.profile?.socials?.twitter}
                    />
                    <DashboardInput
                        name="socials.instagram"
                        title="Instagram"
                        type="prefix"
                        placeholder="alertbotxyz"
                        data={{ prefix: "https://instagram.com/" }}
                        on:change={handleUserProfileChange}
                        defaultValue={$userStore.profile?.socials?.instagram}
                    />
                    <DashboardInput
                        name="socials.discord"
                        title="Discord Server"
                        type="prefix"
                        placeholder="WpQT3jzfum"
                        data={{ prefix: "https://discord.com/invite/" }}
                        on:change={handleUserProfileChange}
                        defaultValue={$userStore.profile?.socials?.discord}
                    />
                    <DashboardInput
                        name="socials.patreon"
                        title="Patreon"
                        type="prefix"
                        placeholder="alertbotxyz"
                        data={{ prefix: "https://patreon.com/" }}
                        on:change={handleUserProfileChange}
                        defaultValue={$userStore.profile?.socials?.patreon}
                    />
                    <DashboardInput
                        name="socials.website"
                        title="Website"
                        placeholder="https://alert-bot.xyz"
                        validation={{ url: true }}
                        on:change={handleUserProfileChange}
                        bind:hasError={hasError}
                        defaultValue={$userStore.profile?.socials?.website}
                    />
                    <a
                        href="/alerter/{$userStore.uid}/profile"
                        class="mt-4 rounded-md bg-accent font-bold h-8 w-28 flex items-center justify-center"
                    >
                        View Profile
                    </a>
                </div>
                <span
                    class="text-2xl font-bold min-w-fit my-2 flex flex-row items-center"
                    id="current-plan"
                >
                    Current Plan
                </span>
                <div class="mb-12">
                    <hr class="border-gray-400 border border-solid border-opacity-40 rounded-xl h-0 my-4 w-full"/>
                    {#if user.subscription?.level === "premium" || user.subscription?.level === "extra"}
                        <div class="flex flex-row lg:flex-col">
                            <div class="flex flex-row justify-between pt-4 pb-12 w-6xx md:w-auto 2xs:flex-col">
                                <div class="flex flex-col justify-between">
                                    <span class="text-2xl font-bold">Alertbot {user.subscription?.level}</span>
                                    <span class="flex flex-row my-1">
                                        <span class="text-xl">${user.subscription?.price / 100}</span>
                                        <span class="text-sm text-gray-400 m-0.5">/{user.subscription?.interval}</span>
                                    </span>
                                    <span>Your plan renews on <span class="text-gray-400">{formatDate(new Date($userStore.subscription?.expires || 0), "dd/MM/yyyy")}</span></span>
                                </div>
                                <div class="flex flex-col 2xs:mt-8 justify-between">
                                    <a href={user.portalUrl} class="bg-accent px-12 py-2 rounded-md text-center text-sm mb-1">Update Plan</a>
                                    <a href={user.portalUrl} class="bg-light-primary px-12 py-2 rounded-md text-center text-sm mt-1">Cancel Plan</a>
                                </div>
                            </div>
                            <span class="ml-32 lg:ml-0">
                                You can view and edit your subscription in the
                                <a
                                    href={user.portalUrl}
                                    class="primary-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Stripe Customer Portal
                                </a>
                            </span>
                        </div>
                    {:else}
                        <span>Subscribe to <a href="/premium" class="primary-link" >alertbot premium</a></span>
                    {/if}
                </div>
                <span
                    class="text-2xl font-bold min-w-fit my-2 flex flex-row items-center"
                    id="billing-history"
                >
                    Billing History
                </span>
                <div class="mb-24">
                    <hr class="border-gray-400 border border-solid border-opacity-40 rounded-xl h-0 my-8 w-full"/>
                    {#if user.billing && user.billing.length > 0}
                        <div class="flex flex-col w-full">
                            <div class="border-b-0 payment rounded-t-md">
                                <span class="w-1/4 flex xs:text-sm">Date</span>
                                <span class="w-1/4 flex xs:text-sm ">Description</span>
                                <span class="w-1/4 flex xs:text-sm justify-center">Price</span>
                                <span class="w-1/4 flex justify-end xs:text-sm">Invoice</span>
                            </div>
                            {#each user.billing as invoice, i}
                                <div class="payment {(i + 1 === user.billing.length) && "last"}">
                                    <span class="w-1/4 flex font-bold 2xs:text-xs xs:text-tiny">{formatDate(new Date(invoice.date), "dd/MM/yy")}</span>
                                    <span class="w-1/4 flex text-gray-400 2xs:text-xs xs:text-tiny xs:justify-center xs:text-center">Alertbot premium - {invoice.interval}ly billing</span>
                                    <span class="w-1/4 flex justify-center 2xs:text-xs">{invoice.amount / 100}({invoice.currency.toUpperCase() || "USD"})</span>
                                    <a
                                        href={invoice.invoiceUrl}
                                        class="primary-link w-1/4 flex justify-end 2xs:text-xs"
                                    >
                                        View invoice
                                    </a>
                                </div>
                            {/each}
                        </div>
                    {:else}
                        <span class="text-gray-400">No billing history found</span>
                    {/if}
                </div>
                <span
                    class="text-2xl font-bold min-w-fit my-2 flex flex-row items-center"
                    id="alert-history"
                >
                    Alert History
                </span>
                <!-- svelte-ignore missing-declaration -->
                <div class="mb-24">
                    <hr class="border-gray-400 border border-solid border-opacity-40 rounded-xl h-0 mt-4 w-full"/>
                    <div class="stats flex flex-row w-full justify-between 2xs:flex-col 2xs:items-center mt-8">
                        <div class="stat">
                            <span class="text">Sent</span>
                            <span class="number">{user.stats.alerts}</span>
                            <span class="text">Alerts</span>
                        </div>
                        <div class="stat center">
                            <span class="text">Created</span>
                            <span class="number">{user.stats.templates}</span>
                            <span class="text">Templates</span>
                        </div>
                        <div class="stat">
                            <span class="text">Alerting to</span>
                            <span class="number">{user.stats.servers}</span>
                            <span class="text">Servers</span>
                        </div>
                    </div>
                    <span class="font-bold text-xl">Alerts</span>
                    <div class="pb-8 pt-4 grid">
                        {#if alertHistoryPageData.length > 0}
                            <!-- svelte-ignore missing-declaration -->
                            <DiscordChat
                                messages={
                                alertHistoryPageData
                                    .map(alert => {
                                        return {
                                            type: "embed",
                                            data: alert.embed,
                                            date: alert.date,
                                            author: {
                                                name: bot.name,
                                                iconUrl: bot.avatarUrl,
                                                id: bot.id,
                                            },
                                            link: `/dashboard/alerts/${alert.alertId}`
                                        };
                                    })
                                }
                            />
                            {#if user.stats.alerts >= 20}
                                <div class="flex flex-row mt-4">
                                    <span
                                        class="px-2 py-1 font-bold bg-light-primary rounded-l-md hover:cursor-pointer"
                                        on:click={() => changePage(alertHistoryPage - 1)}
                                    >
                                        {"<"}
                                    </span>
                                    {#each {length: Math.ceil(user.stats.alerts / 20)} as _, pageNumber}
                                        <span 
                                            class="px-2 py-1 ml-1 font-bold bg-light-primary hover:cursor-pointer {pageNumber + 1 === alertHistoryPage && "bg-dark-primary"}"
                                            on:click={() => changePage(pageNumber + 1)}
                                        >
                                            {pageNumber + 1}
                                        </span>
                                    {/each}
                                    <span
                                        class="px-2 py-1 font-bold bg-light-primary rounded-r-md hover:cursor-pointer ml-1"
                                        on:click={() => changePage(alertHistoryPage + 1)}
                                    >
                                        {">"}
                                    </span>
                                </div>
                            {/if}
                        {:else}
                            <span>No alerts found</span>
                        {/if}
                    </div>
                </div>
            </div>
        {/if}
    </div>
</Loading>