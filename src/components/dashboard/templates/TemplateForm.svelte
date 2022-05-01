<script>
    import ColorInput from "../../../components/dashboard/templates/ColorInput.svelte";
    import DoubleInput from "../../../components/dashboard/templates/DoubleInput.svelte";
    import SingleInput from "../../../components/dashboard/templates/SingleInput.svelte";

    import DiscordChat from "../../../components/discord/DiscordChat.svelte";
    
    export let defaultTemplate = undefined;
    export let title;
    export let type = "Create"

    $: template = defaultTemplate ? defaultTemplate : {
        templateName: "",
        title: "",
        description: "",
        colour: "#63ffd0",
        footer: {
            text: "",
            iconUrl: "",
        },
        thumbnail: "",
        author: {
            text: "",
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

    const handleSubmit = () => {
        console.log(template);
    };
</script>

<div class="flex flex-col w-full items-center fade-in">
    <h1>{title}</h1>
    <div class="flex flex-row w-full justify-center">
        <div class="containers">
            <form
                class="flex flex-col w-full mt-8"
                on:submit|preventDefault={handleSubmit}
            >
                <SingleInput
                    name="templateName"
                    title="Name" 
                    placeholder="Enter the template name"
                    defaultValue={template.templateName}
                    required
                    on:change={handleChange}
                />
                <SingleInput
                    name="title"
                    title="Title" 
                    placeholder="Some title for the embed"
                    defaultValue={template.title}
                    on:change={handleChange}
                />
                <SingleInput
                    name="description"
                    title="Description" 
                    placeholder="Some description for the embed"
                    defaultValue={template.description}
                    on:change={handleChange}
                />
                <ColorInput 
                    name="colour"
                    title="Colour"
                    placeholder="Hex colour for the embed e.g #ff0000"
                    colour={template.colour ?? "#009dff"}
                    on:change={handleChange}
                />
                <DoubleInput 
                    title="Footer"
                    left={{
                        name: "footer.text",
                        placeholder: "Some footer text",
                        defaultValue: template.footer?.text,
                    }}
                    right={{
                        name: "footer.iconUrl",
                        placeholder: "Icon URL for the footer",
                        defaultValue: template.footer?.iconUrl,
                    }}
                    on:change={handleChange}
                />
                <SingleInput
                    name="thumbnail"
                    title="Thumbnail" 
                    placeholder="URL for the thumbnail" 
                    defaultValue={template.thumbnail}
                    on:change={handleChange}
                />
                <DoubleInput 
                    title="Author"
                    left={{
                        name: "author.text",
                        placeholder: "Some author name",
                        defaultValue: template.author?.text,
                    }}
                    right={{
                        name: "author.iconUrl",
                        placeholder: "Icon URL for the author",
                        defaultValue: template.author?.iconUrl,
                    }}
                    on:change={handleChange}
                />
                <button
                    type="submit"
                    class="primary-button mt-4"
                >
                    {type}
                </button>
            </form>
        </div>
        <div class="containers">
            <h1 class="text-transparent mb-12">Embed</h1>
            <DiscordChat 
                messages={[
                    {
                        type: "text",
                        author: {
                            name: "Jane Doe",
                            iconUrl: "https://i.imgur.com/wSTFkRM.png",
                        },
                        text: "Some discord text"
                    },
                    {
                        type: "embed",
                        author: {
                            name: "John Doe",
                            iconUrl: "https://i.imgur.com/wSTFkRM.png",
                        },
                        data: {
                            title: template.title,
                            description: template.description,
                            colour: template.colour,
                            footer: template.footer,
                            thumbnail: template.thumbnail,
                            author: template.author
                        }
                    },
                    {
                        type: "text",
                        author: {
                            name: "Jane Doe",
                            iconUrl: "https://i.imgur.com/wSTFkRM.png",
                        },
                        text: "Some discord text"
                    }
                ]}
            />
        </div>
    </div>
</div>

<style lang="postcss">
    .containers {
        width: 35%;
        @apply flex flex-col items-center;
    }
</style>