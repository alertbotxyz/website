<script>
    import { now } from "svelte/internal";
    import { formatDate, isSameDate, isToday } from "../../utils/core";
    import data from "../../utils/data";
    import DiscordEmbed from "./DiscordEmbed.svelte";

    export let messages;

    const defaultUser = {
        name: "Alertbot",
        iconUrl: data.images.logo,
    };
</script>

<div class="messages-container flex flex-col w-11/12 2xs:w-full p-4 xs:p-1 rounded-md lg:ml-0">
    {#each messages as discordMessage, i}
        {@const prevMessage = messages[i - 1] || undefined}
        {@const messageDate = discordMessage.date || Date.now()}
        {@const prevMessageDate = prevMessage?.date || Date.now()}
        {@const prevIsSameAuthor = (prevMessage?.author?.id && discordMessage.author?.id) && prevMessage?.author?.id === discordMessage.author?.id}
        {@const prevIsSameDate = isSameDate(messageDate, prevMessageDate)}
        {#if !prevIsSameDate && prevMessage}
            <div class="flex flex-row items-center px-4">
                <hr class="w-full h-0 border-t-0 border-gray-600"/>
                <span class="min-w-fit mx-4 text-gray-500 text-sm">{formatDate(messageDate, "month d, yyyy")}</span>
                <hr class="w-full h-0 border-t-0 border-gray-600"/>
            </div>
        {/if}
        <a
            class="flex flex-row m-2 {discordMessage.link ? "" : "pointer-events-none"}"
            href={discordMessage.link ?? ""}
        >
            <img
                src={discordMessage.author?.iconUrl ?? defaultUser.iconUrl} 
                alt="avatar"
                class="w-10 h-10 xs:w-7 xs:h-7 rounded-full {(prevMessage && prevIsSameAuthor && prevIsSameDate) && "invisible"}"
            />
            <div class="flex flex-col ml-4 xs:ml-2 w-full">
                {#if !prevMessage || !prevIsSameAuthor || !prevIsSameDate}
                    <span class="flex flex-row 2xs:flex-col">
                        <div class="flex flex-row items-center">
                            <span class="font-bold xs:text-xs">{discordMessage.author?.name ?? defaultUser.name}</span>
                            {#if discordMessage.author?.bot}
                                <span class="font-bold rounded-sm ml-1.5 text-tiny bg-blurple flex items-center px-1 h-4 mt-0.5">BOT</span>
                            {/if}
                        </div>
                        <span class="ml-2 2xs:m-0 mt-1 text-gray-500 text-xs xs:text-tiny">
                            {
                                isToday(new Date(messageDate)) 
                                ? "Today" 
                                : formatDate(new Date(messageDate), "dd/MM/yyyy")
                            } at {formatDate(new Date(messageDate), "hh:mmapm")}
                        </span>
                    </span>
                {/if}
                {#if discordMessage.type === "text"}
                    <span class="text-sm xs:text-xs 2xs:mt-1">{discordMessage.data.content}</span>
                {:else}
                    {discordMessage.data.content || ""}
                    <DiscordEmbed 
                        title={discordMessage.data.title}
                        description={discordMessage.data.description}
                        color={discordMessage.data.color ?? "#63ffd0"}
                        footer={discordMessage.data.footer}
                        thumbnail={discordMessage.data.thumbnail}
                        author={discordMessage.data.author}
                        image={discordMessage.data.image}
                        alert={discordMessage.alert}
                    />
                {/if}
            </div>
        </a>
    {/each}
</div>

<style lang="postcss">
    .messages-container {
        background-color: #32363f;
    }
</style>