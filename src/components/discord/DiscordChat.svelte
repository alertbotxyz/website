<script>
    import DiscordEmbed from "./DiscordEmbed.svelte";

    export let messages;

    const defaultUser = {
        name: "Alertbot",
        iconUrl: "https://cdn.discordapp.com/attachments/967845567612989462/970022421606322186/alertbot.png",
    }
</script>

<div class="messages-container flex flex-col p-4 rounded-md pr-8 ml-12">
    {#each messages as discordMessage}
        <div class="flex flex-row m-2">
            <img
                src={discordMessage.author?.iconUrl ?? defaultUser.iconUrl} 
                alt="avatar"
                class="w-10 h-10 rounded-full"
            />
            <div class="flex flex-col ml-4">
                <span class="flex flex-row">
                    <span class="font-bold">{discordMessage.author?.name ?? defaultUser.name}</span>
                    <span class="ml-2 mt-1 text-gray-500 text-xs">Today at 10:38am</span>
                </span>
                {#if discordMessage.type === "text"}
                    <span class="text-sm">{discordMessage.data.content}</span>
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
        width: 90%;
    }
</style>