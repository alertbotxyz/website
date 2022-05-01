<script>
    export let title = undefined;
    export let description = undefined;
    export let colour = undefined;
    export let footer = undefined;
    export let thumbnail = undefined;
    export let author = undefined;
</script>
<div 
    class="discord-embed mt-2 border-solid border-l-4 border-r-0 border-y-0 p-4"
    style="border-left-color: {colour ? colour : "#009dff"}"
>
    <div class="flex flex-row">
        <div class="flex flex-col">
            {#if author && author.text}
                <span class="flex flex-row items-center mb-2">
                    {#if author.iconUrl}
                        <img
                            src={author.iconUrl} 
                            alt="authorIcon"
                            class="w-6 rounded-full mr-2"
                        />
                    {/if}
                    <span class="text-sm font-bold">{author.text}</span>
                </span>
            {/if}
            {#if title}
                <span class="text-md font-bold mb-2">{title}</span>
            {/if}
            <span class="flex flex-col text-sm">
                {#if description}
                    <span>{description}</span>
                {/if}
                <span>Alert goes here</span>
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
                    <span class="text-xs">{footer.text}</span>
                </span>
            {/if}
        </div>
        {#if thumbnail}
            <img
                src={thumbnail}
                alt="thumbnail"
                class="w-20 h-20 rounded-md ml-4"
            />
        {/if}
    </div>
</div>

<style lang="postcss">
    .discord-embed {
        background-color: #2a2d35;
        border-radius: 0.2rem;
    }
</style>