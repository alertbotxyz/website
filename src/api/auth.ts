import constants from "../utils/constants";
import { makeRequest } from "./utils";

export const login = () => {
    window.location.href = `${constants.api.url}/discord/login`;
};

export const getUser = async () => {
    return makeRequest("/discord/user");
};