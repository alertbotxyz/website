<script>
    import SingleInput from "../../../components/dashboard/templates/SingleInput.svelte";
    import DiscordChat from "../../../components/discord/DiscordChat.svelte";
    import Loading from "../../../components/Loading.svelte";
    import SuccessModal from "../../../components/modals/SuccessModal.svelte";
    import { getAllTemplates } from "../../../api/templates";
    import { sendAlert } from "../../../api/alert";
    import { addToast } from "../../../stores/toasts";
    
    export let templates = [];

    $: discordImage = "";
    $: template = {};
    $: inputs = {}; 
    $: templateName = "";
    $: loading = true;
    $: submitting = false;
    $: hasError = false;
    $: success = false;
    $: successMessage = "";

    $: parameterInputs = Object.values(template.parameters || {}).map(parameter => {
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
    }).join("\\n");

    getAllTemplates().then(res => {
        if (res.ok) {
            templates = res.data;
        } else {
            addToast({
                type: "error",
                message: res.error.message,
                title: "There was an error fetching the templates"
            });
        };
        loading = false;
    });

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
    const sendAlertHandle = () => {
        submitting = true;
        success = false;
        sendAlert({
            name: template.name,
            inputs,
        }).then(res => {
            if (res.ok && !res.data.errors) {
                success = true;
                successMessage = res.data.message;
            } else {
                addToast({
                    type: "error",
                    message: `${res.data.message}\n${res.data.errors.map(e => `Channel of Id ${e.channelId}: ${e.message}`).join("\n")}`,
                    title: "There was an error sending the alert",
                });
            };
            submitting = false;
        });
    };
    const resetInputs = () => {
        inputs = {};
        discordImage = "";
    };

    $: discordChatData = template && template.parameters ? {
        type: "embed",
        data: {
            title: template.title,
            description: `${template.description}\n${parameterInputs}`,
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

<SuccessModal
    active={success}
    title="Alert sent"
    message="Alert was sent successfully. {successMessage}."
    options={[
        {
            type: "button",
            text: "Send another alert",
            color: "bg-accent",
        },
    ]}
    on:close={resetInputs}
/>
<Loading {loading}>
    <div class="flex flex-col w-full items-center fade-in">
        <h1>Send Alert</h1>
        <select
            name="template"
            class="w-96 sm:w-5/6 lg:w-120 rounded-md p-3 border border-solid border-gray-600 mt-4 bg-transparent"
            on:change={handleTemplateSelect}
        >
            <option value="" selected disabled hidden>Choose a template to alert with</option>
            {#each templates as template}
                <option value={template.name}>{template.name}</option>
            {/each}
        </select>
        {#if templateName && template}
            <div class="flex flex-row lg:flex-col lg:items-center w-full justify-center pb-8">
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
                            bind:hasError={hasError}
                        />
                        <br class="mt-8"/>
                        {#if template?.parameters}
                            {#each Object.values(template?.parameters) as parameter}
                                <SingleInput 
                                    name={parameter.name}
                                    title={parameter.name}
                                    placeholder={"Enter " + parameter.name}
                                    on:change={handleInput}
                                    defaultValue={inputs[parameter.name] || ""}
                                />
                            {/each}
                            <button
                                type="submit"
                                class="primary-button bg-accent mt-4"
                                disabled={hasError || submitting}
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
            <p class="text-center my-4">No template selected.</p>
        {/if}
    </div>
</Loading>