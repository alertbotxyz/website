import constants from "../utils/constants";
import { makeRequest } from "./utils";

export const login = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    window.location.href = `${constants.api.url}/discord/login`;
};

export const logout = () => {
    if (document.cookie.includes("DISCORD_SESSION_ID")) {
        document.cookie = "DISCORD_SESSION_ID=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    };
    window.location.pathname = "/";

    return makeRequest("/discord/logout");
};

export const getUser = () => {
    return makeRequest("/discord/user");
};

export const getBotUser = () => {
    return makeRequest("/discord/bot");
};

export const getUserAccountData = () => {
    return makeRequest("/discord/user-account");
};

export const updateBotToken = (botToken: string) => {
    return makeRequest("/discord/user", {
        method: "PUT",
        body: { botToken },
    });
};