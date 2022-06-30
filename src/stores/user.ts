import { writable } from "svelte/store";
import { User } from "../types/user";

export const userStore = writable<User>({
    _id: "",
    avatar: "",
    discriminator: "",
    name: "",
    uid: "",
});

export const setUser = (user: User) => {
    userStore.set(user);
};