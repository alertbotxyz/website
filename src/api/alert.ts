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
    type: "open" | "close" | "trim";
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

export const getAllTrackedAlerts = (recentOnly?: boolean, userId?: string, dates?: {
    start: number;
    end: number;
}) => {
    return makeRequest("/alert/tracked/all", {
        method: "GET",
        query: {
            recentOnly,
            ...dates,
            userId,
        },
        headers: {
            "x-public-request": userId ? true : false,
        },
    });
};

export const sendRecap = (trades: any[], stats: any) => {
    return makeRequest("/alert/recap", {
        method: "POST",
        body: {
            trades,
            stats,
        },
    });
};