import { makeRequest } from "./utils";

export const sendAlert = ({
    name,
    inputs,
    imageUrl,
    trackedData,
    alertId,
    type,
}: {
    name: string;
    inputs: {
        [key: string]: string;
    };
    imageUrl: string;
    trackedData?: any;
    alertId: string;
    type: "close" | "trim";
}) => {
    return makeRequest("/alert/send", {
        method: "POST",
        body: {
            templateName: name,
            inputs,
            imageUrl,
            trackedData,
            alertId,
            type,
        },
    });
};

export const getAlertById = (alertId: string) => {
    return makeRequest("/alert", {
        method: "GET",
        query: { alertId },
    });
};

export const retryAlerts = (alertId: string, servers: any[]) => {
    return makeRequest("/alert/retry", {
        method: "PUT",
        body: {
            alertId,
            servers,
        },
    });
};

export const getAlertPage = (page: number) => {
    return makeRequest("/alert/page", {
        method: "GET",
        query: { page },
    });
};

export const getAllTrackedAlerts = (recentOnly?: boolean) => {
    return makeRequest("/alert/tracked/all", {
        method: "GET",
        query: { recentOnly },
    });
};