<script>
    export let thumbnailUrl;
    export let category;
    export let title;
    export let tags;
    export let date;
    export let author;
</script>

<div class="w-12xx lg:w-11/12 flex flex-col pt-16 pb-32 min-h-screen">
    <img
        src={thumbnailUrl}
        alt="blog-thumbnail"
        class="h-84 md:h-auto w-7xx md:w-full rounded-md mb-4 border border-solid border-gray-800"
    />
    <span class="text-accent my-4">{category}</span>
    <span class="text-4xl font-bold">{title}</span>
    <div class="flex flex-row my-4">
        {#each tags as tag}
            <span class="bg-gray-800 text-xs rounded-full px-2 py-1 text-gray-400 font-bold mr-2">{tag}</span>
        {/each}
    </div>
    <div class="flex flex-row mb-12">
        <img
            src={author.avatarUrl}
            alt="author-avatar"
            class="w-10 h-10 mr-2 rounded-full"
        />
        <div class="flex flex-col">
            <span>{author.name}</span>
            <span class="text-gray-400">{date}</span>
        </div>
    </div>
    <slot />
</div>