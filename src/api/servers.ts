import { makeRequest } from "./utils";

export const getAllServers = () => {
    return makeRequest("/servers/all");
};

export const addServer = (guildId: string, channelId: string, mentionId: string) => {
    return makeRequest("/servers", {
        method: "POST",
        body: {
            guildId,
            channelId,
            mentionId,
        },
    });
};

export const deleteServer = (channelId: string) => {
    return makeRequest("/servers", {
        method: "DELETE",
        query: { channelId },
    });
};

export const getGuildInfo = (guildId: string) => {
    return makeRequest("/servers/info", {
        method: "GET",
        query: { guildId },
    });
};

export const getAllGuilds = () => {
    return makeRequest("/servers/all-guilds");
};

export const getAllGroups = () => {
    return makeRequest("/servers/group/all");
};

export const createGroup = (group) => {
    return makeRequest("/servers/group", {
        method: "POST",
        body: group,
    });
};

export const deleteGroup = (name: string) => {
    return makeRequest("/servers/group", {
        method: "DELETE",
        body: { groupName: name },
    });
};