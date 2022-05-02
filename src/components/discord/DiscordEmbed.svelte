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
    class="discord-embed mt-2 border-solid border-l-4 border-r-0 border-y-0 p-4"
    style="border-left-color: {color ? color : "#009dff"}"
>
    <div class="flex flex-row">
        <div class="flex flex-col">
            {#if author && author.name}
                <span class="flex flex-row items-center mb-2">
                    {#if author.iconUrl}
                        <img
                            src={author.iconUrl} 
                            alt="authorIcon"
                            class="w-6 rounded-full mr-2"
                        />
                    {/if}
                    <span class="text-sm font-bold">{author.name}</span>
                </span>
            {/if}
            {#if title}
                <span class="text-md font-bold mb-2">{title}</span>
            {/if}
            <span class="flex flex-col text-sm">
                {#if description}
                    <span>
                        {#each description.replace("\n", "\\n").split("\\n") as line}
                            <!-- if it's surrounded by 2 stars on each side it should be bold -->
                            {#if (/\*\*(.*?)\*\*/.test(line))}
                                <span>
                                    <span class="font-black">{line.split("**")[1]}</span>
                                    <span>{line.split("**")[2]}</span>
                                </span>
                            {:else}
                                <span>{line}</span>
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
                    <span class="text-xs">{footer.text}</span>
                </span>
            {/if}
            {#if image}
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img
                    class="w-full mt-4 rounded-sm"
                    src={image}
                    alt="embed image"
                />
            {/if}
        </div>
        {#if thumbnail && thumbnail.url}
            <img
                src={thumbnail.url}
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