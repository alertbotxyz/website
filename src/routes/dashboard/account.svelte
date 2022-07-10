<!-- <script context="module" lang="ts"> -->
<script context="module">
    import { getBotUser, getUserAccountData, updateBotToken, logout } from "../../api/auth";
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
    import "../../styles/account.css";

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
        });
    };

    const handleLogout = () => {
        const getCookie = (name) => {
            return document.cookie.split(';').some(c => {
                return c.trim().startsWith(name + '=');
            });
        };

        const deleteCookie = (name, path, domain) => {
            if (getCookie(name)) {
                document.cookie = name + "=" +
                    ((path) ? ";path=" + path : "") +
                    ((domain) ? ";domain=" + domain : "") +
                    ";expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            };
        };

        logout().then(() => {
            deleteCookie("DISCORD_SESSION_ID", "/", window.location.hostname);
            window.location.pathname = "/";
        });
    };
</script>
<Loading {loading}>
    <div class="flex flex-col w-full items-center pb-8 overflow-x-hidden">
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
                <div class="flex flex-row lg:flex-col-reverse lg:items-center w-full my-8 mb-16">
                    <div class="flex flex-row 2xs:w-full">
                        {#if bot && bot.token && !error}
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
                                defaultValue={bot.token}
                                on:change={handleBotChange}
                                reactive
                                type="text"
                            />
                            <button
                                class="primary-button bg-accent ml-4 w-64 2xs:ml-0 2xs:mt-4 2xs:w-full"
                                aria-label="Save bot token"
                                on:click={handleSubmitToken}
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
                <span
                    class="text-2xl font-bold min-w-fit my-2 flex flex-row items-center"
                    id="current-plan"
                >
                    <img
                        src="/icons/{dropdowns.current_plan ? "down" : "right"}-arrow.svg"
                        alt="arrow"
                        class="h-4 mr-2"
                        on:click={() => dropdowns.current_plan = !dropdowns.current_plan}
                    />
                    Current Plan
                </span>
                {#if dropdowns.current_plan}
                    <div
                        class="mb-12"
                        transition:slide={{ duration: 300 }}
                    >
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
                {/if}
                <span
                    class="text-2xl font-bold min-w-fit my-2 flex flex-row items-center"
                    id="billing-history"
                >
                    <img
                        src="/icons/{dropdowns.billing_history ? "down" : "right"}-arrow.svg"
                        alt="arrow"
                        class="h-4 mr-2"
                        on:click={() => dropdowns.billing_history = !dropdowns.billing_history}
                    />
                    Billing History
                </span>
                {#if dropdowns.billing_history}
                    <div 
                        class="mb-24"
                        transition:slide={{ duration: 300 }}
                    >
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
                {/if}
                <span
                    class="text-2xl font-bold min-w-fit my-2 flex flex-row items-center"
                    id="alert-history"
                >
                    <img
                        src="/icons/{dropdowns.alert_history ? "down" : "right"}-arrow.svg"
                        alt="arrow"
                        class="h-4 mr-2"
                        on:click={() => dropdowns.alert_history = !dropdowns.alert_history}
                    />
                    Alert History
                </span>
                {#if dropdowns.alert_history}
                    <!-- svelte-ignore missing-declaration -->
                    <div
                        class="mb-24 {!dropdowns.alert_history && "hidden"}"
                        transition:slide={{ duration: 300 }}
                    >
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
                {/if}
            </div>
        {/if}
    </div>
</Loading>