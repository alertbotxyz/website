import constants from "../utils/constants";
import { makeRequest } from "./utils";

export const login = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    window.location.href = `${constants.api.url}/discord/login`;
};

export const logout = () => {
    const getCookie = (name) => {
        return document.cookie.split(";").some(c => {
            return c.trim().startsWith(name + "=");
        });
    };

    const env = constants.env;

    const deleteCookie = (name, path, domain) => {
        if (getCookie(name)) {
            document.cookie = name + "=" +
                (path ? ";path=" + path : "") +
                (domain ? ";domain=" + domain : "") +
                `;expires=Thu, 01 Jan 1970 00:00:01 GMT;SameSite=None;secure=${env === "production"}`;
        };
    };

    deleteCookie("DISCORD_SESSION_ID", "/", window.location.hostname);
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