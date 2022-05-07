import { makeRequest } from './utils';

export const getAllServers = async () => {
    return makeRequest("/servers/all")
};
export const addServer = async (guildId: string, channelId: string) => {
    return makeRequest("/servers", {
        method: "POST",
        body: {
            guildId,
            channelId,
        },
    });
};