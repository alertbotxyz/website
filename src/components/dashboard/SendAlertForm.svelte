<script>
    import { sendAlert } from "../../api/alert";
    import { addToast } from "../../stores/toasts";
    import { parseTemplateParameters } from "../../utils/core";
    import DiscordChat from "../discord/DiscordChat.svelte";
    import DashboardInput from "../inputs/DashboardInput.svelte";
    import SuccessModal from "../modals/SuccessModal.svelte";

    export let template;
    export let inputs;

    $: submitting = false;
    $: hasError = false;
    $: success = false;
    $: successMessage = "";
    $: discordImageUrl = "";
    
    $: parameterInputs = parseTemplateParameters(template?.parameters, inputs);

    const sendAlertHandle = () => {
        submitting = true;
        success = false;
        
        sendAlert({
            name: template.name,
            inputs,
            imageUrl: discordImageUrl,
        }).then(res => {
            if (res.ok && !res.data.errors) {
                success = true;
                successMessage = res.data.message;
            } else {
                addToast({
                    type: "error",
                    message: res.data ? `${res.data.message}\n${res.data.errors ? res.data.errors.map(e => `Channel of Id ${e.channelId}: ${e.message}`).join("\n") : ""}` : "An unknown error occured.",
                    title: "There was an error sending the alert",
                });
            };

            if (res.data.warning) {
                addToast({
                    type: "warning",
                    message: res.data.warning,
                    title: "Warning",
                });
            };
            submitting = false;
        });
    };
    const handleImageChange = e => {
        const { value } = e.detail;
        discordImageUrl = value;
    };
    const handleInput = e => {
        const { name, value } = e.detail || e.target;
        inputs[name] = value;
    };
    const resetInputs = () => {
        inputs = Object.fromEntries(Object.keys(template.parameters).map(t => [ t, "", ]));
        discordImageUrl = "";
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
<div class="flex flex-row lg:flex-col lg:items-center w-full justify-center pb-8">
    <div class="dashboard-form-container">
        <form
            class="flex flex-col w-full mt-8"
            on:submit|preventDefault={sendAlertHandle}
        >
            <DashboardInput
                name="imageUrl"
                title="Image"
                placeholder="Enter URL for image"
                validation={{ url: true }}
                defaultValue={discordImageUrl}
                on:change={handleImageChange}
                bind:hasError={hasError}
            />
            <br class="mt-8"/>
            {#if template?.parameters}
                {#each Object.values(template?.parameters) as parameter}
                    <DashboardInput
                        name={parameter.name}
                        title={parameter.name}
                        placeholder={"Enter " + parameter.name}
                        defaultValue={inputs[parameter.name] || ""}
                        on:change={handleInput}
                    />
                {/each}
                <button
                    type="submit"
                    class="primary-button bg-accent mt-4"
                    disabled={hasError || submitting}
                    aria-label="Send alert"
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
        <DiscordChat messages={[ template && template.parameters ? {
                type: "embed",
                data: {
                    title: template.title,
                    description: `${template.description ? template.description + "\n" : ""}${parameterInputs}` ,
                    color: template.color,
                    footer: template.footer,
                    thumbnail: template.thumbnail,
                    author: template.author,
                    image: discordImageUrl,
                },
                author: {
                    bot: true,
                },
            } : {
                type: "text",
                data: {
                    content: "No template parameters.",
                },
            }
        ]} />
    </div>
</div>