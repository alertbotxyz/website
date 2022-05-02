import constants from "../utils/constants"
import { makeRequest } from "./utils";

export const createTemplate = async (templateData: {
    templateName: string;
    title?: string;
    description?: string;
    color?: string;
    footer?: {
        text: string;
        iconUrl?: string;
    };
    thumbnail: string;
    author?: {
        text: string;
        iconUrl?: string;
    };
}): Promise<{
    status: number;
    error?: {
        message: string;
    };
    data?: any;
}> => {

    
    try {
        const res = await makeRequest("/templates", {
            method: "POST",
            body: {
                ...templateData,
                name: templateData.templateName,
                templateName: undefined,
            },
        });

        return {
            status: res.status,
            data: await res.json(),
        };
    } catch (error) {
        return {
            status: 400,
            error: {
                message: error.message,
            },
        }
    };
};