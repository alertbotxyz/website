<script>    
    import { sendAlert } from "../../../api/alert";
    import { addToast } from "../../../stores/toasts";
    import SendAlertForm from "../../../components/dashboard/SendAlertForm.svelte";
    import DiscordChat from "../../../components/discord/DiscordChat.svelte";
    import DashboardInput from "../../../components/inputs/DashboardInput.svelte";
    import Loading from "../../../components/Loading.svelte";
    import { sendTrackedAlert } from "../../../utils/dashboard";

    const defaultTrade = "{{LONGSHORT}} - {{TICKER}} @ {{PRICE}}";

    $: loading = false;
    $: submitting = false;
    $: template = undefined;
    $: alertType = undefined;
    $: hasError = { has: false };
    $: trade = defaultTrade;
    $: inputData = {};
    $: format = "";
    $: discordImageUrl = "";

    const templates = [
        { name: "Stocks" },
        { name: "Options" },
        { name: "Crypto" },
    ];

    const handleTemplateSelect = e => {
        const templateName = e.target.value;
        template = undefined;
        template = templates.find(t => t.name === templateName);

        alertType = template.name.toLowerCase();
        trade = defaultTrade;
        hasError = { has: true };

        switch (alertType) {
            case "stocks":
                inputData = {
                    "longshort": "bto",
                    "ticker": "",
                    "price": "",
                };
                format = "{{LONGSHORT}} - {{TICKER}} @ {{PRICE}}";

                break;
            case "options":
                inputData = {
                    "longshort": "bto",
                    "ticker": "",
                    "strike": "",
                    "callput": "call",
                    "price": "",
                    "expiry": "",
                };
                format = "{{LONGSHORT}} - {{TICKER}} {{STRIKE}}{{CALLPUT_SHORT}} @ {{PRICE}} {{EXPIRATION}}";

                break;
            case "crypto":
                inputData = {
                    "longshort": "bto",
                    "ticker": "",
                    "price": "",
                    "leverage": 1,
                };
                format = "{{LONGSHORT}} - {{TICKER}} @ {{PRICE}} {{LEVERAGE}}x";

                break;
        };
        
        trade = format.replace("{{LONGSHORT}}", "BTO");
    };

    const handeInputChange = e => {
        inputData[e.detail.name] = e.detail.value;

        const price = inputData.price ? parseFloat(inputData.price * (inputData.leverage || 1)).toFixed(2) : "{{PRICE}}";

        trade = format.replace("{{LONGSHORT}}", inputData.longshort?.toUpperCase() || "BTO")
            .replace("{{TICKER}}", inputData.ticker?.toUpperCase())
            .replace("{{PRICE}}", price)
            .replace("{{STRIKE}}", inputData.strike)
            .replace("{{CALLPUT_SHORT}}", inputData.callput?.toUpperCase())
            .replace("{{CALLPUT_LONG}}", inputData.callput)
            .replace("{{EXPIRATION}}", inputData.expiry)
            .replace("{{LEVERAGE}}", inputData.leverage);

        if (inputData.comment) trade += `\n${inputData.comment}`;

        // switch (alertType) {
        //     case "stocks":
        //         trade = `${inputData.longshort?.toUpperCase() || "BTO"} - ${inputData.ticker?.toUpperCase() || "()"} @ ${parseFloat(inputData.price || 0).toFixed(2)}${inputData.comment ? "\n" + inputData.comment : ""}`;
        //         break;
        //     case "options":
        //         trade = `${inputData.longshort?.toUpperCase() || "BTO"} - ${inputData.ticker?.toUpperCase() || "()"} ${inputData.strike || ""}${inputData.strike ? inputData.callput?.toUpperCase().charAt(0) || "C" : inputData.callput || "Call"} @ ${parseFloat(inputData.price || 0).toFixed(2)} ${inputData.expiry || "Nearest Expiration"}${inputData.comment ? "\n" + inputData.comment : ""}`;
        //         break;
        //     case "crypto":
        //         trade = `${inputData.longshort?.toUpperCase() || "BTO"} - ${inputData.ticker?.toUpperCase() || "()"} @ ${parseFloat(inputData.price || 0).toFixed(2)} ${inputData.leverage || 1}x${inputData.comment ? "\n" + inputData.comment : ""}`;
        //         break;
        // };
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

    const handleError = e => {
        hasError = {
            ...hasError,
            [e.detail.name]: e.detail.hasError,
        };

        hasError.has = Object.values(hasError).find((value, index) => index > 0 && value);
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
                            name="imageUrl"
                            title="Image"
                            placeholder="Enter URL for image"
                            validation={{ url: true }}
                            defaultValue={discordImageUrl}
                            on:change={handleImageChange}
                            on:checkError={handleError}
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
                            on:checkError={handleError}
                        />
                        <DashboardInput
                            required
                            name="ticker"
                            title="Ticker"
                            placeholder="What ticker you are trading"
                            defaultValue={inputData.ticker || ""}
                            on:change={handeInputChange}
                            on:checkError={handleError}
                        />
                        <DashboardInput
                            name="price"
                            title="Price"
                            placeholder="What price you bought at"
                            required
                            on:change={handeInputChange}
                            defaultValue={inputData.price}
                            on:checkError={handleError}
                        />
                        {#if alertType === "options"}
                            <DashboardInput
                                required
                                name="strike"
                                title="Strike"
                                placeholder="What is the strike price of the option"
                                defaultValue={inputData.strike}
                                on:change={handeInputChange}
                                on:checkError={handleError}
                                type="number"
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
                                on:checkError={handleError}
                            />
                            <DashboardInput
                                name="expiry"
                                title="Expiration"
                                placeholder="When does the contract expire"
                                on:change={handeInputChange}
                                defaultValue={inputData.expiry}
                                on:checkError={handleError}
                            />
                        {/if}
                        {#if alertType === "crypto"}
                            <DashboardInput
                                name="leverage"
                                title="Leverage"
                                placeholder="What leverage you are using"
                                on:change={handeInputChange}
                                defaultValue={inputData.leverage || 1}
                                on:checkError={handleError}
                                type="number"
                                step="1"
                            />
                        {/if}
                        <DashboardInput
                            name="comment"
                            title="Comment"
                            placeholder="Any comments you want to make"
                            on:change={handeInputChange}
                            defaultValue={inputData.comment}
                            on:checkError={handleError}
                        />
                        <button
                            type="submit"
                            class="primary-button bg-accent mt-4"
                            disabled={hasError.has || submitting}
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