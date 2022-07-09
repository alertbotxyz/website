<script>
    import { createEventDispatcher } from "svelte";
    import { params } from "@roxi/routify";
    import { getAllTemplates } from "../../../api/templates";
    import { addToast } from "../../../stores/toasts";
    import { userStore } from "../../../stores/user";
    import Loading from "../../../components/Loading.svelte";
    import CreateTemplate from "../../../components/dashboard/templates/CreateTemplate.svelte";

    export let templates = [];
    $: loading = true;
    
    getAllTemplates().then(res => {
        if (res.ok) {
            templates = res.data.map((template, i) => {
                return {
                    ...template,
                    disabled: i >= 3 && $userStore.subscription?.level === "free" || !user.subscription,
                };
            });
        } else {
            addToast({
                type: "error",
                message: res.error.message,
                title: "There was an error fetching the templates",
            });
        };
        loading = false;
    });

    const updateTemplatesArray = templateName => {
        templates = templates.filter(template => template.name !== templateName);
    };

    $: template = templates?.find(t => t.name === $params.template);
</script>

<Loading {loading}>
    <div class="flex flex-col items-center fade-in h-full">
        {#if template && template.name}
            <CreateTemplate
                defaultTemplate={template}
                type="edit"
                on:templateDeleted={evt => {
                    updateTemplatesArray(evt.detail.name);
                }}
                disabled={
                    templates.find(t => t.name === template.name).disabled
                }
            />
        {:else if !template && !templates[0]}
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
            <div class="rounded-md w-full flex flex-col items-center px-72 lg:px-0 lg:w-10/12">
                <h1 class="xs:text-2xl">Select Template</h1>
                <div class="template-container w-full">
                    {#each templates as templ}
                        <a
                            class="template flex flex-row items-center bg-light-primary py-6 px-4 w-full justify-between rounded-md my-4 {templ.disabled && "bg-dark-primary"}"
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
</Loading>

<style lang="postcss">
    .template span {
        transition: all 0.3s ease-in-out;
    }
    .template:hover span{
        @apply text-accent;
        transition: all 0.3s ease-in-out;
    }
</style>