import constants from "../utils/constants";
import { makeRequest } from "./utils";

export const login = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    window.location.href = `${constants.api.url}/discord/login`;
};

export const logout = () => {
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

export const updateUserProfile = (profile: any) => {
    return makeRequest("/discord/user/profile", {
        method: "PUT",
        body: { profile },
    });
};

export const updateUserStats = (trade: {
    openPrice: number;
    closePrice: number;
}) => {
    return makeRequest("/discord/user/stats", {
        method: "PUT",
        body: { ...trade },
    });
};