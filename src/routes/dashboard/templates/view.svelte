<script>
    import { params } from "@roxi/routify";
    import TemplateForm from "../../../components/dashboard/templates/TemplateForm.svelte";

    const templates = [];
    $: template = {
        name: $params.template,
    }
</script>
<div class="flex flex-col items-center fade-in h-full">
    {#if template && template.name}
        <TemplateForm 
            title="Edit Template: {template.name}"
            defaultTemplate={{
                templateName: template.name,
                author: {
                    text: "Atom",
                    iconUrl: "https://cdn.discordapp.com/attachments/967845567612989462/970022421606322186/alertbot.png",
                }
            }}
            type="Edit"
        />
    {:else if !template || !templates[0]}
        <div class="w-full h-full flex items-center justify-center">
            <div class="border-2 border-gray-400 border-dashed rounded-md py-32 px-64 mb-24 flex flex-col items-center justify-center">
                <span class="font-bold">No Templates found</span>
                <span class="text-gray-400 mt-2">Get started with alerting by creating a template</span>
                <a
                    href="/dashboard/templates/create"
                    class="py-2 px-4 rounded-md bg-accent mt-8 font-bold"
                >
                    + Create Template
                </a>
            </div>
        </div>
    {:else}
        <div class="rounded-md w-full flex flex-col items-center px-72">
            <h1>Select Template</h1>
            <span class="mt-4">Select a template</span>
            <div class="template-container w-full">
                {#each templates as templ}
                    <a
                        class="template flex flex-row items-center bg-light-primary py-6 px-4 w-full justify-between rounded-md my-4 hover:text-red-500"
                        href="?template={templ.name}"
                    >
                        <span class="text-xl font-bold">{templ.name}</span>
                        <span class="text-xl font-bold text-gray-500">></span>
                    </a>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style lang="postcss">
    .template span {
        transition: all 0.3s ease-in-out;
    }
    .template:hover span{
        @apply text-accent;
        transition: all 0.3s ease-in-out;
    }
    .template-container .template:first-of-type{
        color: red;
    }
</style>