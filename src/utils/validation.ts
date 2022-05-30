export const isValidUrl = (url: string, required: boolean) => {
    if (required && !url) {
        return false;
    } else if (url) {
        return /https/.test(url);
    } else {
        return true;
    };
};
export const isValidColor = (color: string, required: boolean) => {
    if (required && !color) {
        return false;
    } else if (color) {
        return /^#[0-9a-fA-F]{6}?$/i.test(color);
    } else {
        return true;
    };
};

export const validationObject = {
    "url": {
        error: "Please enter a valid URL",
        isValid: isValidUrl,
    },
};