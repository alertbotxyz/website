import constants from "../utils/constants";

export const makeRequest = async (endpoint: string, options?: {
    body?: any;
    headers?: any;
    method: "POST" | "GET" | "PUT" | "DELETE";
}) => {
    const method = options?.method || "GET";

    const res = await fetch(`${constants.api.url}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            "Cookie": document.cookie.split(";")[0],
            ...options?.headers,
        },
        credentials: "include",
        body: JSON.stringify(options?.body),
    });

    if (res.status === 401) window.location.href = `${constants.api.url}/discord/login`;

    return res;
};