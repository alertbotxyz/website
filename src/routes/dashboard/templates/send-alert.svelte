<script>
    import DiscordChat from "../../../components/discord/DiscordChat.svelte";
    import Loading from "../../../components/Loading.svelte";
    import SuccessModal from "../../../components/modals/SuccessModal.svelte";
    import { getAllTemplates } from "../../../api/templates";
    import { sendAlert } from "../../../api/alert";
    import { addToast } from "../../../stores/toasts";
    import SendAlertForm from "../../../components/dashboard/SendAlertForm.svelte";
        
    export let templates = [];

    $: inputs = {};
    $: template = {};
    $: templateName = "";
    $: loading = true;

    getAllTemplates().then(res => {
        if (res.ok) {
            templates = res.data;
        } else {
            addToast({
                type: "error",
                message: res.error.message,
                title: "There was an error fetching the templates",
            });
        };
        loading = false;
    });

    const handleTemplateSelect = e => {
        templateName = e.target.value;
        template = templates.find(t => t.name === templateName);

        if (template?.parameters) {
            inputs = Object.fromEntries(
                Object.values(template.parameters).map(t => [ t.name, "", ])
            );
        };
    };
</script>

<Loading {loading}>
    <div class="flex flex-col w-full items-center fade-in">
        <h1>Send Alert</h1>
        <select
            name="template"
            class="w-96 sm:w-5/6 lg:w-120 rounded-md p-3 border border-solid border-gray-600 mt-4 bg-primary"
            on:change={handleTemplateSelect}
        >
            <option value="" selected disabled hidden>Choose a template to alert with</option>
            {#each templates as template}
                <option value={template.name}>{template.name}</option>
            {/each}
        </select>
        {#if templateName && template}
            <SendAlertForm
                {template}
                {inputs}
            />
        {:else}
            <p class="text-center my-4">No template selected.</p>
        {/if}
    </div>
</Loading>