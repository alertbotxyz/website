<script>
    import { getAllTrackedAlerts, sendAlert } from "../../../api/alert";
    import Loading from "../../../components/Loading.svelte";
    import { addToast } from "../../../stores/toasts";
    import data from "../../../utils/data";

    $: loading = false;
    $: openTradesLoading = true;
    $: active = -1;

    $: submitting = false;
    
    $: trimData = {
        price: undefined,
    };

    $: disabled = !trimData.price;
    $: openTrades = [];

    getAllTrackedAlerts(true).then(res => {
        if (res.ok) {
            openTrades = res.data
                .filter(alert => alert.trackedData && !alert.trackedData?.closedData?.price)
                .map(alert => {
                    return {
                        ...alert,
                        type: alert.trackedData?.alertType,
                    };
                });
        };
        openTradesLoading = false;
    });

    const sendTrade = (type, alertId, ticker, startingPrice, longshort) => {
        submitting = true;

        if (!trimData.price) {
            return addToast({
                type: "error",
                title: "Missing inputs",
                message: "Please fill in trim price and percent",
            });
        };

        let trade = "";

        let change = (trimData.price - startingPrice) / startingPrice * 100;
        if (longshort === "sto") change = (startingPrice - trimData.price) / trimData.price * 100;

        if (type === "trim") {
            trade = `Trim ${ticker} @ ${parseFloat(trimData.price).toFixed(2)} ${change >= 0 ? "up" : "down"} ${change.toFixed(2)}%`;
        } else {
            if (trimData.price.toLowerCase() === "be") {
                trade = `Stopped out @ BE on ${ticker} runners`;
            } else {
                trade = `${longshort === "bto" ? "STC" : "BTC"} ${ticker} ${parseFloat(startingPrice).toFixed(2)} -> ${parseFloat(trimData.price).toFixed(2)} ${change >= 0 ? "up" : "down"} ${change.toFixed(2)}%`;
            };
        };

        const tradeData = {
            date: Date.now(),
            price: parseInt(trimData.price),
        };

        sendAlert({
            name: `${type}_czxy`,
            inputs: { "Trade": trade },
            trackedData: tradeData,
            type,
            alertId
        }).then(res => {
            if (res.ok && !res.data.errors) {
                addToast({
                    type: "success",
                    message: res.data.message,
                    title: "Success",
                });

                trimData.price = undefined;

                const indexOfTrade = openTrades.findIndex(trade => trade.alertId === alertId);
                const tradeInArray = openTrades[indexOfTrade];

                if (type === "trim") {
                    openTrades[indexOfTrade] = {
                        ...tradeInArray,
                        trackedData: {
                            ...tradeInArray.trackedData,
                            trims: [
                                ...tradeInArray.trackedData?.trims || [],
                                tradeData,
                            ],
                        },
                    };
                } else {
                    openTrades = openTrades.filter(trade => trade.alertId !== alertId);
                    window.location.reload(); 
                };
            } else {
                addToast({
                    type: "error",
                    message: res.data ? `${res.data.message}\n${res.data.errors ? res.data.errors.map(e => `Channel of Id ${e.channelId}: ${e.message}`).join("\n") : ""}` : "An unknown error occured.",
                    title: "There was an error sending the alert",
                });
            };

            if (res.data.warning) {
                addToast({
                    type: "warning",
                    message: res.data.warning,
                    title: "Warning",
                });
            };
            submitting = false;
        });
    };

    const handleTrimInput = e => {
        const { name, value } = e.target;
        trimData[name] = value;

        disabled = !trimData.price;
    };
</script>

<Loading {loading}>
    <div class="flex flex-col w-full items-center fade-in">
        <h1 class="text-center">Update a Trade</h1>
        <div class="flex flex-col mt-8 items-center w-full">
            <Loading loading={openTradesLoading}>
                {#if openTrades?.length > 0}
                    {#each openTrades as trade, i}
                        <div class="my-2 rounded-md p-4 bg-light-primary flex flex-col {i === active && "min-h-fit"} w-4xx 2xs:w-5/6">
                            <div class="flex flex-row 2xs:flex-col">
                                <div class="flex flex-row">
                                    <span class="font-bold w-12 {trade.trackedData.longshort.startsWith("b") ? "text-green-400" : "text-red-400"}">{trade.trackedData.longshort.toUpperCase()}</span>
                                    <span class="font-bold ml-4 w-12">{trade.trackedData.ticker}</span>
                                    <span class="font-bold pl-4 w-28 flex flex-row justify-center">
                                        {#if trade.type === "options"}
                                            <span>{trade.trackedData.strike}{trade.trackedData.callput.charAt(0)}</span>
                                            <span class="ml-2">{trade.trackedData.expires || "Nearest"}</span>
                                        {/if}
                                    </span>
                                </div>
                                <div class="flex flex-row ml-4 2xs:ml-0 2xs:mt-4 2xs:w-full">
                                    <span class="mr-4">@</span>
                                    <span class="font-bold w-16">{trade.trackedData.price.toFixed(2)}</span>
                                    <span
                                        class="ml-4 justify-end"
                                        on:click={() => i === active ? active = -1 : active = i}
                                    >
                                        <img
                                            src="/icons/down-arrow.svg"
                                            alt="arrow"
                                            class="w-5 hover:cursor-pointer"
                                        />
                                    </span>
                                </div>
                            </div>
                            {#if i === active}
                                <div class="flex flex-col justify-between h-full">
                                    {#if trade.trackedData.trims?.length > 0}
                                        {#each trade.trackedData.trims as trim}
                                            <span class="font-bold my-2">Trim {trade.trackedData.ticker} @ {trim.price.toFixed(2)} {trim.price > trade.trackedData.price ? "up" : "down"} {((trim.price - trade.trackedData.price) / trade.trackedData.price * 100).toFixed(2)}%</span>
                                        {/each}
                                    {/if}
                                    <div class="w-full flex flex-row h-8 mt-4">
                                        <input
                                            type="text"
                                            class="border border-solid bg-inherit rounded-md border-dark-primary w-32 px-2 py-2 mr-2 xs:w-1/3"
                                            placeholder="Price"
                                            name="price"
                                            on:input={handleTrimInput}
                                            value={trimData.price || 0}
                                        />
                                        <!-- <input
                                            type="text"
                                            class="border border-solid bg-inherit rounded-md border-dark-primary w-32 px-2 py-2 mx-2"
                                            placeholder="Percent"
                                            name="percent"
                                            on:input={handleTrimInput}
                                        /> -->
                                        <div class="flex flex-row">
                                            <button
                                                class="bg-blue-400 h-8 w-16 rounded-md font-bold"
                                                on:click={() => sendTrade("trim", trade.alertId, trade.trackedData.ticker, trade.trackedData.price)}
                                                disabled={disabled || submitting}
                                            >
                                                Trim
                                            </button>
                                            <button
                                                class="bg-red-400 h-8 w-16 ml-2 rounded-md font-bold"
                                                on:click={() => sendTrade("close", trade.alertId, trade.trackedData.ticker, trade.trackedData.price, trade.trackedData.longshort)}
                                                disabled={disabled || submitting}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            {/if}
                        </div>
                    {/each}
                {:else}
                    <span>No open trades found</span>
                {/if}
            </Loading>
        </div>
    </div>
</Loading>