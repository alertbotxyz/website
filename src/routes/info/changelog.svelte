<script>
    import data from "../../utils/data";
</script>

<div class="w-screen flex flex-col items-center pt-16">
    {#if data.changelog.data.length > 0}
        {#each data.changelog.data as changelog}
            <div class="w-7xx md:w-11/12 bg-dark-primary flex flex-col rounded-md mb-8">
                <div class="flex flex-row items-center justify-between p-4 bg-light-primary rounded-t-md tiny:flex-col tiny:p-3">
                    <div class="flex flex-row items-center">
                        <span class="py-1 px-2 bg-gray-600 font-bold rounded-md text-sm">v{changelog.version}</span>
                        <span class="font-bold text-xl ml-2">Update</span>
                    </div>
                    <span class="text-gray-400 font-bold tiny:mt-2">{changelog.date}</span>
                </div>
                <div class="flex flex-col p-4">
                    <span class="my-4 font-bold text-sm text-gray-400">{changelog.description}</span>
                    {#each changelog.updates as update}
                        <div class="flex flex-col">
                            <span class="text-xl font-bold mb-2">{update.title}</span>
                            {#each update.changes as change}
                                <div class="flex flex-row md:flex-col mb-2">
                                    <div class="flex flex-row items-center 2xs:flex-col 2xs:items-start">
                                        <div class="flex flex-row mb-1">
                                            {#each change.types as type}
                                                <span class="{type} font-bold px-2 py-1 my-1 mr-2 text-xs rounded-md">{type}</span>
                                            {/each}
                                        </div>
                                        {#if change.link}
                                            <a
                                                class="text-accent"
                                                href={change.link.url}
                                            >
                                                {change.link.text}
                                            </a>
                                        {/if}
                                    </div>
                                    <span class="mt-1">{change.description}</span>
                                </div>
                            {/each}
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    {:else}
        <span>No changelog data found</span>
    {/if}
</div>

<style lang="postcss">
    .Added {
        @apply bg-green-400 text-green-900;
    }
    .Improved {
        @apply bg-blue-400 text-blue-900;
    }
    .Removed {
        @apply bg-red-400 text-red-900;
    }
    .Fixed {
        @apply bg-orange-400 text-orange-900;
    }
    .Updated {
        @apply bg-gray-400 text-gray-900;
    }
</style>