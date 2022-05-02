import constants from "../utils/constants";
import { makeRequest } from "./utils";

export const login = () => {
    window.location.href = `${constants.api.url}/discord/login`;
};

export const getUser = async () => {
    try {
        const res = await makeRequest("/discord/user");

        if (res.status === 401) window.location.href = `${constants.api.url}/discord/login`;
        
        return {
            data: await res.json(),
            status: res.status,
        };
    } catch (error) {
        console.log(error);
    };
};