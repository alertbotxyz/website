export const isValidUrl = (url: string) => {
    return /https/.test(url);
};

export const validationObject = {
    "url": {
        error: "Please enter a valid URL",
        isValid: isValidUrl,
    },
};