import { makeRequest } from './utils';

export const sendAlert = async ({
    name,
    inputs,
}: {
    name: string;
    inputs: {
        [key: string]: string;
    };
}) => {
    return makeRequest("/alert/send", {
        method: "POST",
        body: {
            templateName: name,
            inputs,
        },
    });
};