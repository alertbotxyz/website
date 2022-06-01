import constants from "../utils/constants";

export const makeRequest = async (endpoint: string, options?: {
    body?: any;
    headers?: any;
    query?: any;
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
    let url = `${constants.api.url}${endpoint}`;

    if (options?.query) url += "?" + new URLSearchParams(options.query);

    try {
        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
            credentials: "include",
            body: JSON.stringify(options?.body),
        });
    
        if (res.status === 401) window.location.href = `${constants.api.url}/discord/login`;

        let json;

        try {   
            json = await res.json();
        } catch (err) {
            console.log(err);
        };
    
        return {
            status: res.status,
            ok: res.ok,
            data: json,
            error: {
                message: json?.message || json?.error?.message,
            },
        };
    } catch (err: any) {
        return {
            status: 400,
            ok: false,
            error: {
                message: err.message,
            },
        };
    };
};