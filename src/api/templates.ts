import { makeRequest } from "./utils";

export const createTemplate = async (templateData: {
    name: string;
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
}) => {
    return makeRequest("/templates", {
        method: "POST",
        body: templateData,
    });
};

export const getAllTemplates = async () => {
    return makeRequest("/templates/all");
};

export const updateTemplate = async (oldTemplate, newTemplate) => {
    return makeRequest("/templates", {
        method: "PUT",
        body: {
            oldTemplate,
            newTemplate,
        },
    });
};

export const deleteTemplate = async (templateName: string) => {
    return makeRequest(`/templates`, {
        method: "DELETE",
        query: { name: templateName },
    });
};