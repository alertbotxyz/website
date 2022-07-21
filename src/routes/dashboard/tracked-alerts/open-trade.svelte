<script>    
    import { sendAlert } from "../../../api/alert";
    import { addToast } from "../../../stores/toasts";
    import SendAlertForm from "../../../components/dashboard/SendAlertForm.svelte";
    import DiscordChat from "../../../components/discord/DiscordChat.svelte";
    import DashboardInput from "../../../components/inputs/DashboardInput.svelte";
    import Loading from "../../../components/Loading.svelte";
import { sendTrackedAlert } from "../../../utils/dashboard";

    const defaultTrade = "BTO - () @";

    $: loading = false;
    $: submitting = false;
    $: template = undefined;
    $: alertType = undefined;
    $: hasError = false;
    $: trade = defaultTrade;
    $: inputData = {};
    $: discordImageUrl = "";

    const templates = [
        { name: "Stocks" },
        { name: "Options" },
        { name: "Crypto" },
    ];

    const handleTemplateSelect = e => {
        const templateName = e.target.value;
        template = templates.find(t => t.name === templateName);

        alertType = template.name.toLowerCase();
        trade = defaultTrade;

        switch (alertType) {
            case "stocks":
                inputData = {
                    "longshort": "bto",
                    "ticker": "",
                    "price": "",
                };
                break;
            case "options":
                inputData = {
                    "longshort": "",
                    "ticker": "",
                    "strike": "",
                    "callput": "",
                    "price": "",
                    "expiry": "",
                };
        };
    };

    const handeInputChange = e => {
        inputData[e.detail.name] = e.detail.value;

        switch (alertType) {
            case "stocks":
                trade = `${inputData.longshort?.toUpperCase() || "BTO"} - ${inputData.ticker?.toUpperCase() || "()"} @ ${parseFloat(inputData.price || 0).toFixed(2)}${inputData.comment ? "\n" + inputData.comment : ""}`;
                break;
            case "options":
                trade = `${inputData.longshort?.toUpperCase() || "BTO"} - ${inputData.ticker?.toUpperCase() || "()"} ${inputData.strike || ""}${inputData.strike ? inputData.callput?.toUpperCase().charAt(0) || "C" : inputData.callput || "Call"} @ ${parseFloat(inputData.price || 0).toFixed(2)} ${inputData.expiry || "Nearest Expiration"}${inputData.comment ? "\n" + inputData.comment : ""}`;
        };
    };

    const sendTrade = () => {
        submitting = true;

        sendTrackedAlert({
            type: "open",
            trade,
            inputData,
            discordImageUrl,
            alertType,
        }).then(res => {
            if (res.ok && !res.data.errors) {
                inputData = { "longshort": "bto" };
                trade = defaultTrade;
            };

            submitting = false;
        });
    };
    const handleImageChange = e => {
        const { value } = e.detail;
        discordImageUrl = value;
    };
</script>

<Loading {loading}>
    <div class="flex flex-col w-full items-center fade-in">
        <h1>Open a Trade</h1>
        <select
            name="template"
            class="w-96 sm:w-5/6 lg:w-120 rounded-md p-3 border border-solid border-gray-600 mt-4 bg-primary"
            on:change={handleTemplateSelect}
        >
            <option value="" selected disabled hidden>Choose the alert type</option>
            <option value="Crypto">Cryptocurrency</option>
            <option value="Stocks">Stocks</option>
            <option value="Options">Options</option>
        </select>
        {#if template}
            <div class="flex flex-row lg:flex-col lg:items-center w-full justify-center pb-8 mt-8">
                <div class="dashboard-form-container">
                    <form
                        class="flex flex-col w-full mt-8"
                        on:submit|preventDefault={sendTrade}
                    >
                        <DashboardInput
                            required
                            name="ticker"
                            title="Ticker"
                            placeholder="What ticker you are trading"
                            defaultValue={inputData.ticker || ""}
                            on:change={handeInputChange}
                            bind:hasError={hasError}
                        />
                        <DashboardInput
                            name="price"
                            title="Price"
                            placeholder="What price you bought at"
                            required
                            on:change={handeInputChange}
                            defaultValue={inputData.price}
                            bind:hasError={hasError}
                        />
                        <DashboardInput
                            name="longshort"
                            title="Long or Short"
                            placeholder="Whether you are shorting or longing the stock"
                            required
                            type="select"
                            inputStyle="w-full"
                            data={{
                                options: [
                                    {
                                        value: "sto",
                                        text: "Sell to Open",
                                    },
                                ],
                            }}
                            on:change={handeInputChange}
                            defaultValue={{
                                value: "bto",
                                text: "Buy to Open",
                            }}
                            bind:hasError={hasError}
                        />
                        {#if alertType === "options"}
                            <DashboardInput
                                required
                                name="strike"
                                title="Strike"
                                placeholder="What is the strike price of the option"
                                defaultValue={inputData.strike}
                                on:change={handeInputChange}
                                bind:hasError={hasError}
                            />
                            <DashboardInput
                                name="callput"
                                title="Call or Put"
                                placeholder="Whether you are buying a Call or Put option"
                                required
                                type="select"
                                inputStyle="w-full"
                                data={{
                                    options: [
                                        {
                                            value: "put",
                                            text: "Put",
                                        },
                                    ],
                                }}
                                on:change={handeInputChange}
                                defaultValue={{
                                    value: "call",
                                    text: "Call",
                                }}
                                bind:hasError={hasError}
                            />
                            <DashboardInput
                                name="expiry"
                                title="Expiration"
                                placeholder="When does the contract expire"
                                on:change={handeInputChange}
                                defaultValue={inputData.expiry}
                                bind:hasError={hasError}
                            />
                        {/if}
                        <DashboardInput
                            name="comment"
                            title="Comment"
                            placeholder="Any comments you want to make"
                            on:change={handeInputChange}
                            defaultValue={inputData.comment}
                            bind:hasError={hasError}
                        />
                        <DashboardInput
                            name="imageUrl"
                            title="Image"
                            placeholder="Enter URL for image"
                            validation={{ url: true }}
                            defaultValue={discordImageUrl}
                            on:change={handleImageChange}
                            bind:hasError={hasError}
                        />
                        <button
                            type="submit"
                            class="primary-button bg-accent mt-4"
                            disabled={hasError || submitting}
                            aria-label="Send Trade"
                        >
                            Send Trade
                        </button>
                    </form>
                </div>
                <div class="dashboard-form-container lg:mt-8">
                    <DiscordChat messages={[
                        {
                            type: "embed",
                            data: {
                                description: trade,
                                color: inputData.longshort?.endsWith("c") ? "#ff4d4d" : inputData.longshort?.startsWith("t") ? "#3369ff" : "#4dff6a",
                                title: inputData.longshort?.endsWith("c") ? "Close" : inputData.longshort?.startsWith("t") ? "Trim" : "Open",
                            },
                            author: {
                                bot: true,
                            },
                        },
                    ]} />
                </div>
            </div>
        {:else}
            <p class="text-center my-4">Select the type of alert you want to open.</p>
        {/if}
    </div>
</Loading>