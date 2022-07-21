import { addToast } from "../stores/toasts";
import { sendAlert } from "../api/alert";
export const sendTrackedAlert = async({
    type,
    trade,
    inputData,
    discordImageUrl,
    alertId,
    alertType,
}: {
    type: "open" | "trim" | "close";
    trade: string;
    inputData: {
        longshort: "bto" | "sto",
        ticker: string;
        price: string;
        strike?: string;
        callput?: "call" | "put";
        expiry?: string;
    };
    discordImageUrl?: string;
    alertId?: string;
    alertType: "crypto" | "stocks" | "options";
}) => {
    const res = await sendAlert({
        name: `${type}_czxy`,
        inputs: { "Trade": trade },
        imageUrl: discordImageUrl || "",
        trackedData: {
            ...inputData,
            alertType,
        },
        alertId: alertId || "",
        type,
    });
    
    if (res.ok && !res.data.errors) {
        addToast({
            type: "success",
            message: res.data.message,
            title: "Success",
        });
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

    return res;
};