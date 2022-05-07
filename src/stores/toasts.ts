import { writable } from "svelte/store";

export const toasts = writable([]);

export const removeToast = (id: string) => {
    toasts.update((toasts) => {
        return toasts.filter((toast) => toast.id !== id);
    });
};

export const addToast = (toast: {
    title: string;
    message: string;
    type: "error" | "success" | "info";
}) => {
    const id = Math.floor(Math.random() * 1000).toString()
    toasts.update((toasts) => [
        ...toasts,
        {
            ...toast,
            id,
        },
    ]);
    setTimeout(() => {
        removeToast(id);
    }, 6000);
};