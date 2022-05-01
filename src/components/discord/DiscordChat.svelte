<script>
    import DiscordEmbed from "./DiscordEmbed.svelte";

    export let messages;
</script>

<div class="messages-container flex flex-col p-4 rounded-md">
    {#each messages as discordMessage}
        <div class="flex flex-row m-2">
            <img
                src={discordMessage.author.iconUrl} 
                alt="avatar"
                class="w-10 h-10 rounded-full"
            />
            <div class="flex flex-col ml-4">
                <span class="flex flex-row">
                    <span class="font-bold">{discordMessage.author.name}</span>
                    <span class="ml-2 mt-1 text-gray-500 text-xs">Today at 10:38am</span>
                </span>
                {#if discordMessage.type === "text"}
                    <span class="text-sm">{discordMessage.text}</span>
                {:else}
                    <DiscordEmbed 
                        title={discordMessage.data.title}
                        description={discordMessage.data.description}
                        colour={discordMessage.data.colour ?? "#009dff"}
                        footer={discordMessage.data.footer}
                        thumbnail={discordMessage.data.thumbnail}
                        author={discordMessage.data.author}
                    />
                {/if}
            </div>
        </div>
    {/each}
</div>

<style lang="postcss">
    .messages-container {
        background-color: #32363f;
        min-width: 400px;
    }
</style>