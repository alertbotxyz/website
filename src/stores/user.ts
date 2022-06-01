import { writable } from "svelte/store";

export const userStore = writable({});

export const setUser = (user: {
    _id: string;
    avatar: string;
    botToken: string;
    discriminator: string;
    name: string;
    uid: string;
}) => {
    userStore.set(user);
};