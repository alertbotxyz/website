<script>
    import DiscordEmbed from "./DiscordEmbed.svelte";

    export let messages;

    const defaultUser = {
        name: "Alertbot",
        iconUrl: "https://storage.googleapis.com/alertbot-images/logo.png",
    }
</script>

<div class="messages-container flex flex-col w-11/12 2xs:w-full p-4 xs:p-1 rounded-md ml-12 lg:ml-0">
    {#each messages as discordMessage}
        <div class="flex flex-row m-2">
            <img
                src={discordMessage.author?.iconUrl ?? defaultUser.iconUrl} 
                alt="avatar"
                class="w-10 h-10 xs:w-7 xs:h-7 rounded-full"
            />
            <div class="flex flex-col ml-4 xs:ml-2">
                <span class="flex flex-row 2xs:flex-col">
                    <span class="font-bold xs:text-xs">{discordMessage.author?.name ?? defaultUser.name}</span>
                    <span class="ml-2 2xs:m-0 mt-1 text-gray-500 text-xs xs:text-tiny">Today at 10:38am</span>
                </span>
                {#if discordMessage.type === "text"}
                    <span class="text-sm xs:text-xs 2xs:mt-1">{discordMessage.data.content}</span>
                {:else}
                    {discordMessage.data.content || ""}
                    <DiscordEmbed 
                        title={discordMessage.data.title}
                        description={discordMessage.data.description}
                        color={discordMessage.data.color ?? "#009dff"}
                        footer={discordMessage.data.footer}
                        thumbnail={discordMessage.data.thumbnail}
                        author={discordMessage.data.author}
                        image={discordMessage.data.image}
                        alert={discordMessage.alert}
                    />
                {/if}
            </div>
        </div>
    {/each}
</div>

<style lang="postcss">
    .messages-container {
        background-color: #32363f;
    }
</style>