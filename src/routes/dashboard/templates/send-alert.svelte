<script>
    import SingleInput from "../../../components/dashboard/templates/SingleInput.svelte";
    import DiscordChat from "../../../components/discord/DiscordChat.svelte";
    import { redirect } from "../../../utils/core";

    $: discordImage = "";
    $: template = {};
    $: templateName = "";

    // if (!template) redirect("/dashboard/templates/view");

    const handleInput = e => {
        const { name, value } = e.detail || e.target;
        if(!template.inputs || !template.inputs[name]) return;
        template.inputs[name].value = value;
    };
    const handleImageChange = e => {
        const { value } = e.detail;
        discordImage = value;
    };
    const handleTemplateSelect = e => templateName = e.target.value;

    const discordChatData = template && template.inputs ? {
        type: "embed",
        data: {
            title: template.title,
            description: template.inputs ? Object.values(template.inputs).map(templateInput => {
                if(templateInput.withTitle) {
                    let parameter;

                    parameter = templateInput.name + ":";
                    if (templateInput.boldTitle) {
                        parameter = `**${templateInput.name}:**`;
                    };

                    return `${parameter} ${templateInput.value}`;
                } else {
                    return templateInput.value;
                };
            }).join("\\n") : "",
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
        <option value="Entry">Entry</option>
        <option value="Exit">Exit</option>
    </select>
    {#if templateName && template}
        <div class="flex flex-row w-full justify-center">
            <div class="dashboard-form-container">
                <form class="flex flex-col w-full mt-8">
                    <SingleInput 
                        name="imageUrl"
                        title="Image"
                        placeholder="Enter URL for image"
                        on:change={handleImageChange}
                        url={true}
                    />
                    <br class="mt-8"/>
                    {#if template?.inputs}
                        {#each Object.values(template?.inputs) as input}
                            <SingleInput 
                                name={input.name}
                                title={input.name}
                                placeholder={"Enter " + input.name}
                                on:change={handleInput}
                            />
                        {/each}
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