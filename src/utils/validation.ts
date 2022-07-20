export const isValidUrl = (url: string, required: boolean) => {
    if (required && !url) {
        return false;
    } else if (url) {
        return /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/gm.test(url);
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