import { makeRequest } from './utils';

export const getAllServers = async () => {
    return makeRequest("/servers/all")
};