interface Subscription {
    level: "premium" | "free" | "extra";
    price: number;
    interval: "month" | "year" | "";
    expires: number;
};

export interface User {
    _id: string;
    avatar: string;
    botToken?: string;
    discriminator: string;
    name: string;
    uid: string;
    customerId?: string;
    subscription?: Subscription;
};

export interface AlertData {
    alertId: string;
    userId: string;
    date: number;
    servers: {
        id: string;
        successful: boolean;
        error: string;
        content: string;
    }[];
    embed: {
        title?: string;
        description: string;
        color?: string;
        footer?: {
            text: string;
            icon_url: string;
        };
        thumbnail?: {
            url: string;
        };
        author?: {
            name: string;
            icon_url: string;
        };
    };
};

export interface AlertPage {
    pageNumber: number;
    alertHistory: AlertData[];
};

export interface AccountUser {
    customerId?: string;
    subscription?: Subscription;
    billing: {
        date: number;
        expires: number;
        userId: string;
        subscriptionId: string;
        customerId: string;
        chargeId: string;
        invoiceId: string;
        amount: number;
        currency: string;
        interval?: string;
        invoiceUrl?: string | null;
        invoicePdf?: string | null;
    }[] | null;
    alerts: AlertPage[] | null;
    stats: {
        templates: number;
        servers: number;
        alerts: number;
    };
    portalUrl: string;
};