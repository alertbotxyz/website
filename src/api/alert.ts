import { makeRequest } from './utils';

export const sendAlert = async ({
    name,
    inputs,
    imageUrl,
}: {
    name: string;
    inputs: {
        [key: string]: string;
    };
    imageUrl: string;
}) => {
    return makeRequest("/alert/send", {
        method: "POST",
        body: {
            templateName: name,
            inputs,
            imageUrl,
        },
    });
};

export const getAlertById = async (alertId: string) => {
    return makeRequest("/alert", {
        method: "GET",
        query: { alertId },
    });
};

export const retryAlerts = async (alertId: string, servers: any[]) => {
    return makeRequest("/alert/retry", {
        method: "PUT",
        body: {
            alertId,
            servers,
        },
    });
};