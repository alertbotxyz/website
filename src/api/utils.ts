import constants from "../utils/constants";

export const makeRequest = async (endpoint: string, options?: {
    body?: any;
    headers?: any;
    method: "POST" | "GET" | "PUT" | "DELETE";
}): Promise<{
    status: number;
    ok: boolean;
    error?: {
        message: string;
    };
    data?: any;
}> => {
    const method = options?.method || "GET";

    

    try {
        const res = await fetch(`${constants.api.url}${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
            credentials: "include",
            body: JSON.stringify(options?.body),
        });
    
        if (res.status === 401) window.location.href = `${constants.api.url}/discord/login`;
    
        const json = await res.json();
    
        return {
            status: res.status,
            ok: res.ok,
            data: json,
            error: {
                message: json.message,
            },
        };
    } catch (err) {
        return {
            status: 400,
            ok: false,
            error: {
                message: err.message,
            },
        };
    };
};