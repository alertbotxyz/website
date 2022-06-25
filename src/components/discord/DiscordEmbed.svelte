<script>
    import { isValidUrl } from "../../utils/validation";

    export let alert = false;
    export let title = undefined;
    export let description = undefined;
    export let color = undefined;
    export let footer = undefined;
    export let thumbnail = undefined;
    export let author = undefined;
    export let image = undefined;

    if (!isValidUrl(image)) image = undefined;
</script>
<div 
    class="discord-embed"
    style="border-left-color: {color ? color.includes("#") ? color : `#${parseInt(color).toString(16)}` : "#009dff"}"
>
    <div class="flex flex-col">
        <div class="flex flex-row w-full justify-between">
            <div class="flex flex-col w-full">
                {#if author && author.name}
                    <span class="flex flex-row items-center mb-2">
                        {#if author.iconUrl}
                            <img
                                src={author.iconUrl} 
                                alt="authorIcon"
                                class="w-6 rounded-full mr-2"
                            />
                        {/if}
                        <span class="text-sm font-bold break-words">{author.name}</span>
                    </span>
                {/if}
                {#if title}
                    <span class="text-md font-bold mb-2 break-words">{title}</span>
                {/if}
                <span class="flex flex-col text-sm">
                    {#if description && description.length > 0}
                        <span>
                            {#each description.replace(/\n|\\n/g, "\\n").split("\\n") as line}
                                <!-- if it's surrounded by 2 stars on each side it should be bold -->
                                {#if (/\*\*(.*?)\*\*/.test(line))}
                                    <span class="break-words">
                                        {#each line.split("**") as part, i}
                                            {#if i % 2 === 1}
                                                <span class="font-bold">{part}</span>
                                            {:else}
                                                <span>{part}</span>
                                            {/if}
                                        {/each}
                                    </span>
                                {:else}
                                    <span class="break-words">{line}</span>
                                {/if}
                                <br />
                            {/each}
                        </span>
                    {/if}
                    {#if alert}
                        <span>Alert goes here</span>
                    {/if}
                </span>
                {#if footer && footer.text}
                    <span class="flex flex-row items-center mt-2">
                        {#if footer.iconUrl}
                            <img
                                src={footer.iconUrl} 
                                alt="footerIcon"
                                class="w-5 rounded-full mr-2"
                            />
                        {/if}
                        <span class="text-xs break-words">{footer.text}</span>
                    </span>
                {/if}
            </div>
            {#if thumbnail && thumbnail.url}
                <img
                    src={thumbnail.url}
                    alt="thumbnail"
                    class="w-20 h-20 rounded-md ml-8"
                />
            {/if}
        </div>
        {#if image}
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img
                class="w-full mt-4 rounded-sm"
                src={image}
                alt="embed image"
            />
        {/if}
    </div>
</div>

<style lang="postcss">
    .discord-embed {
        @apply mt-2 border-solid border-l-4 border-r-0 border-y-0 p-4 h-fit w-fit inline-block;
        background-color: #2a2d35;
        border-radius: 0.2rem;
        max-width: 400px;
        min-width: 100px;
    }
</style>