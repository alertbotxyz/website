<script context="module">
    import { getAllTemplates } from "../../../api/templates";

    export const load = async () => {
        const res = await getAllTemplates();

        if (res.ok) {
            return {
                props: { templates: res.data },
            };
        } else {
            // TODO: Error toast
            console.log(res.message);
        };
    };
</script>

<script>
    import SingleInput from "../../../components/dashboard/templates/SingleInput.svelte";
    import DiscordChat from "../../../components/discord/DiscordChat.svelte";
    import { sendAlert } from "../../../api/alert";
    
    export let templates = [];

    $: discordImage = "";
    $: template = {};
    $: inputs = {}; 
    $: templateName = "";

    const handleInput = e => {
        const { name, value } = e.detail || e.target;
        inputs[name] = value;
    };
    const handleImageChange = e => {
        const { value } = e.detail;
        discordImage = value;
    };
    const handleTemplateSelect = e => {
        templateName = e.target.value;
        template = templates.find(t => t.name === templateName);

        if (template?.parameters) {
            inputs = Object.fromEntries(
                Object.values(template.parameters).map(t => [t.name, ""])
            );
        };
    };
    const sendAlertHandle = e => {
        // TODO: error modals
        sendAlert({
            name: template.name,
            inputs,
        }).then(data => {
            console.log(data);
        });
    };

    $: discordChatData = template && template.parameters ? {
        type: "embed",
        data: {
            title: template.title,
            description: Object.values(template.parameters).map(parameter => {
                const parameterInput = inputs[parameter.name] || "";
                if(parameter.withTitle) {
                    let parameterText = "";

                    parameterText = parameter.name + ":";
                    if (parameter.boldTitle) {
                        parameterText = `**${parameter.name}:**`;
                    };

                    return `${parameterText} ${parameterInput}`;
                } else {
                    return parameterInput;
                };
            }).join("\\n"),
            color: template.color,
            image: discordImage,
        }
    } : {
        type: "text",
        data: {
            content: "No template parameters."
        },
    };
</script>

<div class="flex flex-col w-full items-center fade-in">
    <h1>Send Alert</h1>
    <select
        name="template"
        class="w-96 rounded-md p-3 border border-solid border-gray-600 mt-4 bg-transparent"
        on:change={handleTemplateSelect}
    >
        <option value="" selected disabled hidden>Choose a template to alert with</option>
        {#each templates as template}
            <option value={template.name}>{template.name}</option>
        {/each}
    </select>
    {#if templateName && template}
        <div class="flex flex-row w-full justify-center">
            <div class="dashboard-form-container">
                <form
                    class="flex flex-col w-full mt-8"
                    on:submit|preventDefault={sendAlertHandle}
                >
                    <SingleInput 
                        name="imageUrl"
                        title="Image"
                        placeholder="Enter URL for image"
                        on:change={handleImageChange}
                        url={true}
                    />
                    <br class="mt-8"/>
                    {#if template?.parameters}
                        {#each Object.values(template?.parameters) as parameter}
                            <SingleInput 
                                name={parameter.name}
                                title={parameter.name}
                                placeholder={"Enter " + parameter.name}
                                on:change={handleInput}
                            />
                        {/each}
                        <button
                            type="submit"
                            class="primary-button mt-4 disabled:opacity-30"
                        >
                            Send Alert
                        </button>
                    {:else}
                        <p class="text-center">
                            No parameters found.
                            <a
                                href="/dashboard/templates/view?template={template.name}"
                                class="text-accent"
                            >
                                Edit Template
                            </a>
                        </p>
                    {/if}
                </form>
            </div>
            <div class="dashboard-form-container">
                <h1 class="text-transparent mb-2">Embed</h1>
                <DiscordChat
                    messages={[discordChatData]}
                />
            </div>
        </div>
    {:else}
        <p class="text-center mt-4">No template selected.</p>
    {/if}
</div>