/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { makeRequest } from "./utils";

export const createTemplate = (templateData: {
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

export const getAllTemplates = () => {
    return makeRequest("/templates/all");
};

export const updateTemplate = (oldTemplate, newTemplate) => {
    return makeRequest("/templates", {
        method: "PUT",
        body: {
            oldTemplate,
            newTemplate,
        },
    });
};

export const deleteTemplate = (templateName: string) => {
    return makeRequest("/templates", {
        method: "DELETE",
        query: { name: templateName },
    });
};

export const importTemplate = (templateId: string) => {
    return makeRequest("/templates/id", {
        method: "GET",
        query: { templateId },
    });
};