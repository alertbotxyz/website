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