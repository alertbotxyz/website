import constants from "../utils/constants";
import { makeRequest } from "./utils";

export const login = () => {
    window.location.href = `${constants.api.url}/discord/login`;
};

export const getUser = async () => {
    return makeRequest("/discord/user");
};

export const getBotUser = async () => {
    return makeRequest("/discord/bot");
};

export const getUserAccountData = async () => {
    return makeRequest("/discord/user-account");
};

export const updateBotToken = async (botToken: string) => {
    return makeRequest("/discord/user", {
        method: "PUT",
        body: { botToken },
    });
};