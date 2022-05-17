<script>
    export let user;
</script>

<div class="sidebar-container bg-dark-primary h-screen flex flex-col justify-between">
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
        >
            <img
                src="/icons/template.svg" 
                alt="home"
            />
            <span class="text">Templates</span>
        </a>
        <a
            class="nav-link"
            href="/dashboard/templates/send-alert"
        >
            <img
                src="/icons/bell.svg" 
                alt="home"
            />
            <span class="text">Alert</span>
        </a>
        <a
            class="nav-link"
            href="/dashboard/account"
        >
            <img
                src="/icons/user.svg" 
                alt="home"
            />
            <span class="text">Account</span>
        </a>
        <a
            class="nav-link"
            href="/premium"
        >  
            <img
                src="/icons/premium.svg" 
                alt="home"
            />
            <span class="text">Premium</span>
        </a>
        <a
            class="nav-link"
            href="/"
        >
            <img
                src="/icons/invite.svg" 
                alt="home"
            />
            <span class="text">Invite</span>
        </a>
    </div>
    <a
        class="account-container flex flex-row items-center h-20"
        href="/dashboard/account"
    >
        {#if user}
            <img
                src={
                    user.avatar ? `https://cdn.discordapp.com/avatars/${user.uid}/${user.avatar}.png?size=96` : 
                    "https://storage.googleapis.com/alertbot-images/discord_default_avatar.png"
                } 
                alt="avatar"
                class="w-10 rounded-md ml-6"
            />
            <span class="ml-2 font-bold">{user.name}#{user.discriminator}</span>
        {:else}
            <a
                href="/redirect?link=login"
                class="bg-indigo-500 text-sm px-8 py-2 ml-2 rounded-md border-none font-bold"
            >
                Sign In to your account
            </a>
        {/if}
    </a>
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