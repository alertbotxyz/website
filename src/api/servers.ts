import { makeRequest } from './utils';

export const getAllServers = async () => {
    return makeRequest("/servers/all")
};
export const addServer = async (guildId: string, channelId: string, mentionId: string) => {
    return makeRequest("/servers", {
        method: "POST",
        body: {
            guildId,
            channelId,
            mentionId,
        },
    });
};
export const deleteServer = async (channelId: string) => {
    return makeRequest("/servers", {
        method: "DELETE",
        query: { channelId },
    });
};
export const getGuildInfo = async (guildId: string) => {
    return makeRequest("/servers/info", {
        method: "GET",
        query: { guildId },
    });
};
export const getAllGuilds = async () => {
    return makeRequest("/servers/all-guilds");
};