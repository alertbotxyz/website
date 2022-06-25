<script>
    import { createEventDispatcher } from "svelte";
    import { addToast } from "../../../stores/toasts";
    import { deleteTemplate, updateTemplate } from "../../../api/templates";
    import { parseTemplateParameters } from "../../../utils/core";
    import data from "../../../utils/data";
    import DiscordChat from "../../discord/DiscordChat.svelte";
    import DashboardInput from "../../inputs/DashboardInput.svelte";
    import Info from "../../Info.svelte";
    import SaveChangesPopup from "./SaveChangesPopup.svelte";
    import ParametersForm from "./ParametersForm.svelte";
    import SuccessModal from "../../modals/SuccessModal.svelte";

    export let type = "create";
    export let defaultTemplate = undefined;
    export let submitting = false;

    const dispatch = createEventDispatcher();

    $: template = defaultTemplate ?? {};
    $: hasError = false;
    $: updated = false;
    $: success = {
        successful: false,
        message: "",
        title: "",
    };

    let originalTemplate = JSON.parse(JSON.stringify(defaultTemplate ?? {}));
    const checkUpdate = () => updated = JSON.stringify(originalTemplate) !== JSON.stringify(template);

    const handleChange = e => {
        const { name, value } = e.detail || e.target;

        const nested = name.split(".");

        if (nested[1]) {
            let obj = null;

            nested.forEach(key => {
                if (obj === null) {
                    obj = {
                        [key]: template[key],
                    };
                } else {
                    obj[Object.keys(obj)[0]][key] = value;
                };
            });

            template[nested[0]] = obj[nested[0]];
        } else {
            template[name] = value;
        };

        checkUpdate();
    };

    const handleUpdateTemplate = () => {
        submitting = true;
        updateTemplate(originalTemplate, template).then(res => {
            if (res.ok) {
                success = {
                    successful: true,
                    message: "Your template has been updated successfully",
                    title: "Template updated",
                };
                updated = false;
            } else {
                addToast({
                    type: "error",
                    message: res.error.message,
                    title: "There was an error updating the template",
                });
            };
            submitting = false;
        });
    };

    const handleDeleteTemplate = () => {
        submitting = true;
        if (confirm("Are you sure you want to delete this template?")) {
            deleteTemplate(template.name).then(res => {
                if (res.ok) {
                    success.title = "Template deleted";
                    success.message = "Your template has been deleted successfully";
                    success.successful = true;
                    dispatch("templateDeleted", template);
                } else {
                    addToast({
                        type: "error",
                        message: res.error.message,
                        title: "There was an error deleting the template",
                    });
                };
                submitting = false;
            });
        };
    };

    const handleShareTemplate = () => {
        navigator.clipboard.writeText(JSON.stringify(template));
        addToast({
            type: "success",
            title: "Template data copied to clipboard",
            message: "Paste in this text when propmted to when importing a template",
        });
    };

    const handleSubmit = () => {
        dispatch("submit", template);
        template = {};
    };
</script>

{#if type === "edit"}
    <SaveChangesPopup
        disabled={hasError || submitting}
        {updated}
        on:cancelSaveChanges={() => {
            template = JSON.parse(JSON.stringify(originalTemplate));
            checkUpdate();
        }}
        on:confirmSaveChanges={handleUpdateTemplate}
    />
{/if}
<SuccessModal
    active={success.successful}
    title={success.title}
    message={success.message}
    options={[
        {
            type: "link",
            text: "View templates",
            color: "bg-dark-primary",
            url: "/dashboard/templates/view",
        },
        {
            type: "link",
            text: "Create a new template",
            color: "bg-accent",
            url: "/dashboard/templates/create",
        },
    ]}
    reload={true}
    on:close={() => {
        success.successful = false;
        success.message = "";
        success.title = "";
    }}
/>
<div class="flex flex-col w-full items-center fade-in pb-8">
    <h1 class="text-center xs:text-2xl flex flex-row items-center">
        {#if type === "edit"}
            <Info
                text='No changes are saved until the "Save Changed" button is clicked'
                right
            />
            <span>Edit Template: {template.name}</span>
        {:else}
            <span>Create Template</span>
        {/if}
    </h1>
    <div class="flex flex-row lg:flex-col lg:items-center w-full justify-center">
        <div class="dashboard-form-container mr-12 lg:mr-0">
            <form
                class="flex flex-col w-full mt-8"
                on:submit|preventDefault={handleSubmit}
            >
                <DashboardInput
                    required
                    name="name"
                    title="Name"
                    placeholder="Enter the template name"
                    defaultValue={template.name}
                    on:change={handleChange}
                    bind:hasError={hasError}
                />
                <DashboardInput
                    name="title"
                    title="Title"
                    placeholder="Some title for the embed"
                    defaultValue={template.title}
                    on:change={handleChange}
                    bind:hasError={hasError}
                />
                <DashboardInput
                    name="description"
                    title="Description"
                    placeholder="Some description for the embed"
                    defaultValue={template.description}
                    on:change={handleChange}
                    bind:hasError={hasError}
                    help="You can use \n to make a new line"
                />
                <DashboardInput
                    name="color"
                    title="Color"
                    placeholder="Hex color for the embed e.g #ff0000"
                    defaultValue={template.color ?? "#63ffd0"}
                    validation={{ color: true }}
                    on:change={handleChange}
                    bind:hasError={hasError}
                />
                <DashboardInput
                    title="Footer"
                    name="footer"
                    data={{
                        double: true,
                        left: {
                            name: "footer.text",
                            placeholder: "Some footer text",
                            defaultValue: template.footer?.text,
                            error: template.footer?.text === "" && template.footer?.iconUrl !== "" ? "Footer text is required" : "",
                        },
                        right: {
                            name: "footer.iconUrl",
                            placeholder: "Icon URL for the footer",
                            defaultValue: template.footer?.iconUrl,
                            validation: {
                                url: true,
                            },
                            error: template.footer?.text === "" && template.footer?.iconUrl !== "" ? "_empty" : "",
                        },
                    }}
                    on:change={handleChange}
                    bind:hasError={hasError}
                />
                <DashboardInput
                    name="thumbnail.url"
                    title="Thumbnail"
                    placeholder="URL for the thumbnail"
                    defaultValue={template.thumbnail?.url}
                    on:change={handleChange}
                    bind:hasError={hasError}
                />
                <DashboardInput
                    title="Author"
                    name="footer"
                    data={{
                        double: true,
                        left: {
                            name: "author.name",
                            placeholder: "Some author name",
                            defaultValue: template.author?.name,
                            error: template.author?.text === "" && template.author?.iconUrl !== "" ? "Author text is required" : "",
                        },
                        right: {
                            name: "author.iconUrl",
                            placeholder: "Icon URL for the author",
                            defaultValue: template.author?.iconUrl,
                            validation: {
                                url: true,
                            },
                            error: template.author?.text === "" && template.author?.iconUrl !== "" ? "_empty" : "",
                        },
                    }}
                    on:change={handleChange}
                    bind:hasError={hasError}
                />
            </form>
            {#if type === "create"}
                <button
                    type="submit"
                    class="primary-button w-full bg-accent mt-4"
                    disabled={hasError || submitting}
                    on:click={handleSubmit}
                    aria-label="Create template"
                >
                    Create
                </button>
            {:else if type === "edit"}
                <ParametersForm
                    parameters={template.parameters}
                    on:parameterChanged={e => {
                        template = {
                            ...template,
                            parameters: e.detail,
                        };
                        checkUpdate();
                    }}
                    {submitting}
                />
                <div class="flex flex-row w-full justify-between 2xs:flex-col">
                    <button
                        type="submit"
                        class="primary-button w-full mr-4 bg-red-400 mt-4 2xs:mr-0"
                        disabled={hasError || submitting}
                        on:click={handleDeleteTemplate}
                        aria-label="Delete template"
                    >
                        Delete
                    </button>
                    <button
                        type="submit"
                        class="primary-button w-full ml-4 bg-gray-500 mt-4 2xs:ml-0"
                        on:click={handleShareTemplate}
                        aria-label="Share template"
                    >
                        Share
                    </button>
                </div>
            {/if}
        </div>
        <div class="dashboard-form-container">
            <h1 class="text-transparent">Embed</h1>
            <DiscordChat
                messages={[
                    {
                        type: "text",
                        data: {
                            content: "I can't wait for the next alert!"
                        },
                        author: {
                            name: "oscarッ",
                            iconUrl: data.images.user_avatar,
                        }
                    },
                    {
                        type: "embed",
                        data: {
                            title: template.title,
                            description: 
                                template.description +
                                (template.description && template.parameters ? "\n" : "") +
                                (type === "edit" ? parseTemplateParameters(template?.parameters) : ""),
                            color: template.color,
                            footer: template.footer,
                            thumbnail: template.thumbnail,
                            author: template.author
                        },
                        author: {
                            bot: true,
                        },
                        alert: type === "create" ? true : false,
                    },
                    {
                        type: "text",
                        data: {
                            content: "What a great alert!"
                        },
                        author: {
                            name: "oscarッ",
                            iconUrl: data.images.user_avatar,
                        }
                    }
                ]}
            />
        </div>
    </div>
</div>