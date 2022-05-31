<script>
    import Info from "../../components/Info.svelte";
    import InputLabel from "../../components/inputs/InputLabel.svelte";
    import StandardInput from "../../components/inputs/StandardInput.svelte";
    import data from "../../utils/data.ts";
    import "../../styles/account.css";

    $: bot = {
        token: "ABdrF-Edno0q4i1o1GFX7jv_0yo48ns0kQ:1638388220428",
        name: "Alertbot",
        discriminator: "6969",
        avatarUrl: data.images.logo,
        id: "965663863313936415",
    };

    const handleBotChange = e => {
        const { name, value } = e.detail;
        bot[name] = value;
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

<div class="flex flex-col w-full items-center pb-8">
    <div class="flex flex-col w-11/12">
        <h1 class="my-16 lg:my-12">Account</h1>
        <div class="flex flex-row lg:flex-col-reverse lg:items-center w-full">
            <div class="flex flex-row 2xs:w-full">
                {#if bot.token}
                    <div class="rounded-md border border-solid border-gray-600 py-3 px-4 flex flex-row items-center lg:mt-8 2xs:flex-col 2xs:w-full">
                        <div class="flex flex-row items-center">
                            <img
                                src={bot.avatarUrl}
                                alt="bot avatar"
                                class="rounded-full w-12 h-12 shadow-sm shadow-gray-600"
                            />
                            <div class="flex flex-row text-xl ml-2 font-bold">
                                <span>{bot.name}</span>
                                <span class="text-gray-400 ml-0.5">#{bot.discriminator}</span>
                            </div>
                            <Info
                                text="Invite this bot to every server you want to alert to."
                                style="text-xl mt-0.5"
                            />
                        </div>
                        <a
                            href="/"
                            class=" py-2 w-32 ml-8 text-center bg-accent rounded-md"
                        >
                            Invite
                        </a>
                    </div>
                    <!-- <span class="ml-4 font-bold">You can edit your bot in the discord <a href="/" class="primary-link">developer dashboard</a></span> -->
                {/if}
            </div>
            <div class="flex flex-col ml-8 lg:ml-0 w-full">
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
        <h2 class="my-8">Plan</h2>
        <div class="flex flex-col w-full">
            <div class="plan rounded-t-md">
                <div class="text-container">
                    <span class="name">{data.premium.plans.free.name}</span>
                    <div class="price">
                        <span>${data.premium.plans.free.price}</span>
                        <span class="ml-1 textsm text-gray-400">/month</span>
                    </div>
                    <span class="desc">{data.premium.plans.free.description}</span>
                </div>
                <button
                    class="bg-dark-primary"
                    aria-label="Free subscription"
                >
                    Cancel your subscripttion
                </button>
            </div>
            <div class="plan">
                <div class="text-container">
                    <span class="name">{data.premium.plans.premium.name}</span>
                    <div class="price">
                        <span>${data.premium.plans.premium.price}</span>
                        <span class="ml-1 textsm text-gray-400">/month</span>
                    </div>
                    <span class="desc">{data.premium.plans.premium.description}</span>
                </div>
                <button 
                    class="bg-accent"
                    aria-label="Premium subscription"
                >
                    Upgrade
                </button>
            </div>
            <div class="plan rounded-b-md">
                <div class="text-container">
                    <span class="name">{data.premium.plans.extra.name}</span>
                    <div class="price">
                        <span>${data.premium.plans.extra.price}</span>
                        <span class="ml-1 textsm text-gray-400">/month</span>
                    </div>
                    <span class="desc">{data.premium.plans.extra.description}</span>
                </div>
                <button 
                    class="bg-accent"
                    aria-label="Extra subscription"
                >
                    Upgrade
                </button>
            </div>
        </div>
        <h2 class="my-8">Billing history</h2>
        <div class="flex flex-col w-full">
            <div class="payment rounded-t-md">
                <div class="flex flex-row lg:w-full lg:justify-between 2xs:flex-col">
                    <span class="w-64 font-bold lg:w-auto">28/05/2022</span>
                    <span class="w-84 text-gray-400 lg:w-auto lg:my-2">Alertbot Extra - Monthly Billing</span>
                    <span class="ml-32 lg:ml-0">US$19.99</span>
                </div>
                <a
                    href="/"
                    class="primary-link lg:mt-4"
                >
                    View invoice
                </a>
            </div>
        </div>
    </div>
</div>