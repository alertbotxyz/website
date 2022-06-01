<script>
    import { userStore } from "../../stores/user";
    import { getBotUser } from "../../api/auth";
    import Info from "../../components/Info.svelte";
    import InputLabel from "../../components/inputs/InputLabel.svelte";
    import StandardInput from "../../components/inputs/StandardInput.svelte";
    import data from "../../utils/data.ts";
    import "../../styles/account.css";
    import Loading from "../../components/Loading.svelte";

    $: loading = false;
    $: bot = {
        token: "",
        name: "",
        discriminator: "",
        avatarUrl: "",
        id: "",
    };
    $: user = {
        subscription: {
            level: "Premium",
            price: "9.99",
            interval: "month",
            renews: "29/06/2022",
            billing: [
                {
                    date: "30/05/2022",
                    interval: "Monthly",
                    level: "Premium",
                    price: "9.99",
                    invoiceUrl: "",
                },
            ],
        },
    };

    const getBot = () => {
        loading = true
        getBotUser().then(res => {
            if (res.ok) {
                bot = {
                    token: $userStore?.botToken,
                    name: res.data.username,
                    discriminator: res.data.discriminator,
                    avatarUrl: res.data.avatar ? `https://cdn.discordapp.com/avatars/${res.data.id}/${res.data.avatar}.png?size=96` : data.images.default_avatar,
                    id: res.data.id,
                };
            } else {
                // toasts
            };
            loading = false;
        });
    };

    getBot();

    const handleBotChange = e => {
        const { name, value } = e.detail;
        // bot[name] = value;
    };
</script>
<!-- 
    Billing history:
    array:
        date
        description
        amount
        invoice
 -->

<div class="flex flex-col w-full items-center pb-8 overflow-x-hidden">
    <div class="flex flex-col w-11/12">
        <h1 class="my-16 lg:my-12">Account</h1>
        <Loading {loading}>
            <div class="flex flex-row lg:flex-col-reverse lg:items-center w-full">
                <div class="flex flex-row 2xs:w-full">
                    {#if bot.token}
                        <div class="rounded-md border border-solid border-gray-600 py-3 px-4 flex flex-row items-center lg:mt-8 2xs:flex-col 2xs:w-full mr-8 lg:mr-0">
                            <div class="flex flex-row items-center tiny:flex-col">
                                <img
                                    src={bot.avatarUrl}
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
                            >
                                Invite
                            </a>
                        </div>
                        <!-- <span class="ml-4 font-bold">You can edit your bot in the discord <a href="/" class="primary-link">developer dashboard</a></span> -->
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
                        />
                        <button
                            class="primary-button bg-accent ml-4 w-64 2xs:ml-0 2xs:mt-4 2xs:w-full"
                            aria-label="Save bot token"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </Loading>
        <span class="flex flex-col my-8">
            <span class="text-2xl font-bold min-w-fit">Current Plan</span>
            <hr class="border-gray-400 border border-solid border-opacity-40 rounded-xl h-0 mt-4 w-full"/>
        </span>
        <div class="flex flex-row lg:flex-col">
            <div class="flex flex-row justify-between pt-4 pb-12 w-6xx md:w-auto 2xs:flex-col">
                <div class="flex flex-col justify-between">
                    <span class="text-2xl font-bold">Alertbot {user.subscription.level}</span>
                    <span class="flex flex-row">
                        <span class="text-xl">${user.subscription.price}</span>
                        <span class="text-sm text-gray-400 m-0.5">/{user.subscription.interval}</span>
                    </span>
                    <span>Your plan renews on <span class="text-gray-400">{user.subscription.renews}</span></span>
                </div>
                <div class="flex flex-col 2xs:mt-8">
                    <a href="/" class="bg-accent px-12 py-2 rounded-md text-center text-sm mb-1">Update Plan</a>
                    <a href="/" class="bg-light-primary px-12 py-2 rounded-md text-center text-sm mt-1">Cancel Plan</a>
                </div>
            </div>
            <span class="ml-32 lg:ml-0">
                You can view and edit your subscription in the
                <a
                    href="/"
                    class="primary-link"
                >
                    Stripe Dashboard
                </a>
            </span>
        </div>
        <span class="flex flex-col my-8">
            <span class="text-2xl font-bold min-w-fit">Billing History</span>
            <hr class="border-gray-400 border border-solid border-opacity-40 rounded-xl h-0 mt-4 w-full"/>
        </span>
        {#if user.subscription.billing}
            <div class="flex flex-col w-full">
                <div class="border-b-0 payment rounded-t-md">
                    <span class="w-1/4 flex xs:text-sm">Date</span>
                    <span class="w-1/4 flex xs:text-sm ">Description</span>
                    <span class="w-1/4 flex xs:text-sm justify-center">Price</span>
                    <span class="w-1/4 flex justify-end xs:text-sm">Invoice</span>
                </div>
                {#each user.subscription.billing as invoice, i}
                    <div class="payment {(i + 1 === user.subscription.billing.length) && "last"}">
                        <span class="w-1/4 flex font-bold 2xs:text-xs xs:text-tiny">{invoice.date}</span>
                        <span class="w-1/4 flex text-gray-400 2xs:text-xs xs:text-tiny xs:justify-center xs:text-center">Alertbot {invoice.level} - {invoice.interval} Billing</span>
                        <span class="w-1/4 flex justify-center 2xs:text-xs">US${invoice.price}</span>
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
</div>