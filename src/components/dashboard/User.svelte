<script>
    import data from "../../utils/data";
    import Loading from "../Loading.svelte";
    
    export let loggedIn = false;
    export let user = undefined;
</script>

{#if loggedIn && user}
    <Loading loading={!user.name}>
        <a
            class="flex flex-row items-center"
            href="/dashboard/account"
        >
            <img
                src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.uid}/${user.avatar}.png?size=96` : data.images.logo} 
                alt="avatar"
                class="w-10 rounded-md ml-6 tiny:ml-0"
            />
            <span class="ml-2 font-bold">{user.name}#{user.discriminator}</span>
        </a>
    </Loading>
{:else}
    <a
        href="/redirect?link=login"
        class="bg-indigo-500 text-sm px-8 py-2 ml-2 rounded-md border-none font-bold"
    >
        Sign In to your account
    </a>
{/if}