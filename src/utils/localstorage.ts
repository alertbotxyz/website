const setWithExpiry = (key: string, value: any, ttl: number) => {
    const now = new Date();

    const item = {
        value,
        expiry: now.getTime() + ttl,
    };

    localStorage.setItem(key, JSON.stringify(item));
};

const getWithExpiry = (key: string): any => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    };

    return item.value;
};

export {
    setWithExpiry,
    getWithExpiry,
};