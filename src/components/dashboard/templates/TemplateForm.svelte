<script>
    import { createEventDispatcher } from "svelte";
    import ColorInput from "../../../components/dashboard/templates/ColorInput.svelte";
    import DoubleInput from "../../../components/dashboard/templates/DoubleInput.svelte";
    import SingleInput from "../../../components/dashboard/templates/SingleInput.svelte";
    import DiscordChat from "../../../components/discord/DiscordChat.svelte";
    import SuccessModal from "../../SuccessModal.svelte";
    import { deleteTemplate } from "../../../api/templates";
    import { addToast } from "../../../stores/toasts";
    
    export let defaultTemplate = undefined;
    export let title;
    export let type = "Create"
    export let submitting = false;

    $: success = false;

    $: template = defaultTemplate ? defaultTemplate : {
        name: "",
        title: "",
        description: "",
        color: "#63ffd0",
        footer: {
            text: "",
            iconUrl: "",
        },
        thumbnail: {
            url: "",
        },
        author: {
            name: "",
            iconUrl: "",
        },
    };
    
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
            if (template[name] === undefined) throw new Error ("No such property");
            template[name] = value;
        };
    };

    const handleDeleteTemplate = () => {
        submitting = true;
        if (confirm("Are you sure you want to delete this template?")) {
            deleteTemplate(template.name).then(res => {
                if (res.ok) {
                    success = true;
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

    let hasError;

    const dispatch = createEventDispatcher();

    const handleSubmit = () => {
        dispatch("submit", template);
    };
</script>

<SuccessModal
    active={success}
    title="Template deleted"
    message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui totam animi voluptatem"
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
/>

<div class="flex flex-col w-full items-center fade-in">
    <h1>{title}</h1>
    <div class="flex flex-row w-full justify-center">
        <div class="dashboard-form-container">
            <form
                class="flex flex-col w-full mt-8"
                on:submit|preventDefault={handleSubmit}
            >
                <SingleInput
                    name="name"
                    title="Name" 
                    placeholder="Enter the template name"
                    defaultValue={template.name}
                    required
                    on:change={handleChange}
                    bind:hasError={hasError}
                />
                <SingleInput
                    name="title"
                    title="Title" 
                    placeholder="Some title for the embed"
                    defaultValue={template.title}
                    on:change={handleChange}
                    bind:hasError={hasError}
                />
                <SingleInput
                    name="description"
                    title="Description" 
                    placeholder="Some description for the embed"
                    defaultValue={template.description}
                    on:change={handleChange}
                    bind:hasError={hasError}
                />
                <ColorInput 
                    name="color"
                    title="Color"
                    placeholder="Hex color for the embed e.g #ff0000"
                    color={template.color ?? "#009dff"}
                    on:change={handleChange}
                    bind:hasError={hasError}
                />
                <DoubleInput 
                    title="Footer"
                    left={{
                        name: "footer.text",
                        placeholder: "Some footer text",
                        defaultValue: template.footer?.text,
                        error: template.footer?.text === "" && template.footer?.iconUrl !== "" ? "Footer text is required" : "",
                    }}
                    right={{
                        name: "footer.iconUrl",
                        placeholder: "Icon URL for the footer",
                        defaultValue: template.footer?.iconUrl,
                        url: true,
                    }}
                    on:change={handleChange}
                    bind:hasError={hasError}
                />
                <SingleInput
                    name="thumbnail.url"
                    title="Thumbnail" 
                    placeholder="URL for the thumbnail" 
                    defaultValue={template.thumbnail?.url}
                    on:change={handleChange}
                    bind:hasError={hasError}
                />
                <DoubleInput 
                    title="Author"
                    left={{
                        name: "author.name",
                        placeholder: "Some author name",
                        defaultValue: template.author?.name,
                        error: template.author?.text === "" && template.author?.iconUrl !== "" ? "Author text is required" : "",
                    }}
                    right={{
                        name: "author.iconUrl",
                        placeholder: "Icon URL for the author",
                        defaultValue: template.author?.iconUrl,
                        url: true,
                    }}
                    on:change={handleChange}
                    bind:hasError={hasError}
                />
                <button
                    type="submit"
                    class="primary-button bg-accent mt-4"
                    disabled={hasError || submitting}
                >
                    {type}
                </button>
                {#if defaultTemplate && defaultTemplate.name}
                    <div class="flex flex-row w-full justify-between">
                        <button
                            type="submit"
                            class="primary-button w-full mr-4 bg-red-400 mt-4"
                            disabled={hasError || submitting}
                            on:click={handleDeleteTemplate}
                        >
                            Delete
                        </button>
                        <button
                            type="submit"
                            class="primary-button w-full ml-4 bg-gray-500 mt-4"
                        >
                            Share
                        </button>
                    </div>
                {/if}
            </form>
        </div>
        <div class="dashboard-form-container">
            <h1 class="text-transparent mb-12">Embed</h1>
            <DiscordChat 
                messages={[
                    {
                        type: "text",
                        data: {
                            content: "I can't wait for the next alert!"
                        }
                    },
                    {
                        type: "embed",
                        data: {
                            title: template.title,
                            description: template.description,
                            color: template.color,
                            footer: template.footer,
                            thumbnail: template.thumbnail,
                            author: template.author
                        },
                        alert: true,
                    },
                    {
                        type: "text",
                        data: {
                            content: "What a great alert!"
                        }
                    }
                ]}
            />
        </div>
    </div>
</div>