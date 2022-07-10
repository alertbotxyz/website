<script>
    import { createEventDispatcher } from "svelte";
    import User from "../dashboard/User.svelte";

    export let user;
    export let loggedIn = false;
    export let active = false;
    export let linksOnly = false;

    const dispatch = createEventDispatcher();

    const close = () => {
        dispatch("closeSidebar", {});
    };

    $: i = 0;

    window.addEventListener("click", e => {
        i += 1;
        if (i % 2 === 0) return;
        if (active && e.target.classList.contains("bg-opacity-70") && e.target.classList.contains("bg-black")) {
            close();
        };
    });
</script>

<div class="sidebar-container z-50 bg-dark-primary h-screen flex flex-col justify-between {!active && "xl:hidden"}">
    {#if !linksOnly}
        <a
            class="logo-container flex flex-row items-center pl-6 h-20"
            href="/"
        >
            <img
                src="/favicon.png"
                alt="alertbot"
                class="w-8 rounded-md"
            />
            <div class="pl-2 font-bold text-2xl">Alertbot</div>
        </a>
    {/if}
    <div class="nav-links-container h-full flex flex-col px-4 pt-4">
        <a
            class="nav-link"
            href="/"
        >
            <img
                src="/icons/home.svg" 
                alt="home"
            />
            <span class="text">Home</span>
        </a>
        <a
            class="nav-link"
            href="/dashboard/templates/view"
            on:click={close}
        >
            <img
                src="/icons/template.svg" 
                alt="templates"
            />
            <span class="text">Templates</span>
        </a>
        <a
            class="nav-link"
            href="/dashboard/templates/send-alert"
            on:click={close}
        >
            <img
                src="/icons/bell.svg" 
                alt="alert"
            />
            <span class="text">Alert</span>
        </a>
        <a
            class="nav-link"
            href="/dashboard/account"
            on:click={close}
        >
            <img
                src="/icons/user.svg" 
                alt="account"
            />
            <span class="text">Account</span>
        </a>
        <a
            class="nav-link"
            href="/premium"
        >  
            <img
                src="/icons/premium.svg" 
                alt="premium"
            />
            <span class="text">Premium</span>
        </a>
        <a
            class="nav-link"
            href="/redirect?link=bot-invite"
        >
            <img
                src="/icons/invite.svg" 
                alt="invite"
            />
            <span class="text">Invite</span>
        </a>
    </div>
    {#if !linksOnly}
        <a
            class="account-container flex flex-row items-center h-20"
            href="/dashboard/account"
        >
            <User
                {user}
                {loggedIn}
            />
        </a>
    {/if}
</div>

<style lang="postcss">
    .sidebar-container {
        min-width: 260px;
    }
    .logo-container {
        @apply bg-light-primary;
    }
    .account-container {
        @apply bg-light-primary;
    }
    .nav-links-container img {
        width: 20px;
    }
    .nav-link:hover {
        @apply bg-light-primary;
        color: white;
    }
    .nav-link {
        @apply flex flex-row items-center mb-2 transition-all rounded-md py-2 px-4;
    }
    .nav-link .text {
        @apply pl-2 text-lg font-bold text-gray-200;
    }
</style>