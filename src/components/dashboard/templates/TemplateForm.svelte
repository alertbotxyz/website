<script>
    import { createEventDispatcher } from "svelte";
    import ColorInput from "../../../components/dashboard/templates/ColorInput.svelte";
    import DoubleInput from "../../../components/dashboard/templates/DoubleInput.svelte";
    import SingleInput from "../../../components/dashboard/templates/SingleInput.svelte";

    import DiscordChat from "../../../components/discord/DiscordChat.svelte";
    
    export let defaultTemplate = undefined;
    export let title;
    export let type = "Create"

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

    let hasError;

    const dispatch = createEventDispatcher();

    const handleSubmit = () => {
        dispatch("submit", template);
    };
</script>

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
                    class="primary-button mt-4 disabled:opacity-30"
                    disabled={hasError}
                >
                    {type}
                </button>
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