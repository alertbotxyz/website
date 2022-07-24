<script>
    import { params } from "@roxi/routify";
    import data from "../../../utils/data.ts";
    import "../../../styles/blog.css";
</script>
<div class="w-12xx lg:w-11/12 flex flex-col pt-16 pb-32 min-h-screen">
    {#if data.blog.data.length > 0}
        {#each data.blog.data as blog}
            <div class="flex flex-row md:flex-col">
                <div class="flex flex-row md:justify-between xs:flex-col">
                    <div class="flex flex-col mr-8 xs:mb-2 xs:flex-row xs:mr-0">
                        <span>{blog.category}</span>
                        <span class="text-gray-400 xs:ml-2 xs:text-sm">{blog.date}</span>
                    </div>
                    <img
                        src={blog.thumbnail.url}
                        alt="blog-thumbnail"
                        class="rounded-md w-64 xs:w-11/12 h-36 border border-solid border-gray-800"
                    />
                </div>
                <div class="flex flex-col ml-8 md:mt-8 md:ml-0 xs:mt-4">
                    <span class="font-bold text-xl">{blog.title}</span>
                    <span class="my-4 text-gray-400">{blog.description}</span>
                    <a
                        href="/info/blog/{blog.title.replaceAll(" ", "_")}"
                        class="text-accent"
                    >
                        Read more →
                    </a>
                </div>
            </div>
        {/each}
        <hr class="w-full border-solid border-b-0 border-x-0 border-t-2 border-gray-600 my-8">
    {:else}
        <span>No blogs found</span>
    {/if}
</div>