<script>
    import { createEventDispatcher } from "svelte";
    import { fly, fade } from "svelte/transition";
    import ColorInput from "../../../components/dashboard/templates/ColorInput.svelte";
    import DoubleInput from "../../../components/dashboard/templates/DoubleInput.svelte";
    import SingleInput from "../../../components/dashboard/templates/SingleInput.svelte";
    import DiscordChat from "../../../components/discord/DiscordChat.svelte";
    import SuccessModal from "../../modals/SuccessModal.svelte";
    import { deleteTemplate, updateTemplate } from "../../../api/templates";
    import { addToast } from "../../../stores/toasts";
import Info from "../../Info.svelte";

    const dispatch = createEventDispatcher();
    
    export let defaultTemplate = undefined;
    export let title;
    export let type = "Create"
    export let submitting = false;

    $: success = false;
    $: updated = false;
    $: hasError = false;
    $: createParameterHasError = false;
    $: createParameterErrorMessage = "";
    $: successTitle = "";
    $: successMessage = "";
    $: newParamData = {
        name: "",
        withTitle: false,
        boldTitle: false,
    };

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
            if (template[name] === undefined) throw new Error("No such property");
            template[name] = value;
        };

        checkUpdate();
    };

    const handleCheckboxChange = (event, parameterName) => {
        const { name, checked } = event.detail || event.target;
        template.parameters[parameterName][name] = checked;

        checkUpdate();
    };

    const handleUpdateTemplate = () => {
        submitting = true;
        updateTemplate(originalTemplate, template).then(res => {
            if (res.ok) {
                successTitle = "Template updated";
                successMessage = "Your template has been updated successfully";
                success = true;
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
                    successTitle = "Template deleted";
                    successMessage = "Your template has been deleted successfully";
                    success = true;
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

    const handleDeleteParameter = parameterName => {
        if (confirm("Are you sure you want to delete this parameter?")) {
            // this is done to make sure the template is updated so svelte reacts to the change
            const deletedOrder = template.parameters[parameterName].order;
            let obj = template;
            delete obj.parameters[parameterName];
            Object.values(obj.parameters).forEach(param => {
                if (param.order > deletedOrder) {
                    obj.parameters[param.name].order = param.order - 1;
                };
            });
            template = obj;
            newParamData = {};

            checkUpdate();
        };
    };

    const testValidParameterName = parameterName => {
        if (
            Object.keys(template.parameters).find(t => t.toLowerCase() === parameterName.toLowerCase()) ||
            !parameterName
        ) {
            createParameterHasError = true;
            createParameterErrorMessage = !parameterName ? "Parameter name is required" : "A parameter with this name already exists";
            return false;
        } else {
            createParameterHasError = false;
            createParameterErrorMessage = "";
            return true;
        };
    };

    const handleCreateParameterChange = (e) => {
        const { name, value } = e.detail || e.target;

        if (name === "boldTitle" || name === "withTitle") {
            newParamData[name] = value === "on" ? true : false;

            if (newParamData.boldTitle && !newParamData.withTitle) {
                createParameterHasError = true;
                createParameterErrorMessage = "You must have a title if you want have it bold.";
            } else {
                createParameterHasError = false;
                createParameterErrorMessage = "";
            };
        } else {
            testValidParameterName(value);
            newParamData[name] = value;
        };
    };

    const handleCreateParameter = () => {
        newParamData.order = Object.keys(template.parameters).length + 1;
        
        if (!testValidParameterName(newParamData.name)) {
            addToast({
                type: "error",
                message: "There was an error creating the parameter",
                title: `A parameter with the name ${newParamData.name} already exists on this template.`,
            });
        } else {
            template.parameters[newParamData.name] = newParamData;
            newParamData = {
                name: "",
                withTitle: false,
                boldTitle: false,
            };
            createParameterHasError = false;
            createParameterErrorMessage = "";
            checkUpdate();
        };
    };

    const resetTemplate = () => {
        template = JSON.parse(JSON.stringify(originalTemplate ?? {}));
        updated = false
    };

    const handleSubmit = () => {
        dispatch("submit", template);
    };

    const dragStart = (event, i) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.dropEffect = 'move';
        const start = i;
        event.dataTransfer.setData('text/plain', start);
    };

    const drop = (event, target) => {
        event.dataTransfer.dropEffect = 'move'; 
        const start = parseInt(event.dataTransfer.getData("text/plain"));

        const newTracklist = Object.values(template.parameters);
        const newTemplateList = [];

        const moved = newTracklist.find(p => p.order === start);

        // the parameter moved up so
        newTracklist.forEach(param => {
            if (param.name === moved.name) {
                newTemplateList.push({
                    ...moved,
                    order: target,
                });
            } else if ((param.order > target && param.order > start) || (param.order < target && param.order < start)) {
                // doesn't move
                newTemplateList.push(param);
            } else if (param.order >= target) {
                // moved down
                newTemplateList.push({
                    ...param,
                    order: param.order + (target < start ? 1 : -1),
                });
            } else {
                // moved up
                newTemplateList.push({
                    ...param,
                    order: param.order + (target < start ? 1 : -1),
                });
            };
        });

        template = {
            ...template,
            parameters: Object.fromEntries(newTemplateList.sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0)).map(p => [p.name, p])),
        };

        checkUpdate();
    };

    const handleShareTemplate = () => {
        navigator.clipboard.writeText(JSON.stringify(template));
        addToast({
            type: "success",
            title: "Template data copied to clipboard",
            message: "Paste in this text when propmted to when importing a template",
        });
    };
</script>

<SuccessModal
    active={success}
    title={successTitle}
    message={successMessage}
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
/>

{#if updated && type === "edit"}
    <div 
        class="absolute w-full bottom-4 flex flex-row justify-center items-center z-50"
        in:fly={{ y: 200, duration: 300 }}
        out:fly={{ y: 50, duration: 300 }}
    >
        <div class="flex flex-row 2xs:flex-col justify-between items-center bg-very-dark-primary p-4 rounded-md w-8xx 2xs:w-5/6">
            <span class="text-center xs:text-sm">You have unsaved changes</span>
            <div class="flex flex-row xs:flex-col 2xs:mt-2">
                <button
                    class="bg-light-primary save-changes-button"
                    on:click={resetTemplate}
                >
                    Reset
                </button>
                <button
                    class="bg-accent save-changes-button"
                    type="submit"
                    disabled={hasError || submitting || !updated}
                    on:click={handleUpdateTemplate}
                >
                    Save Changes
                </button>
            </div>
        </div>
    </div>
{/if}

<div class="flex flex-col w-full items-center fade-in pb-8">
    <h1 class="text-center xs:text-2xl flex flex-row items-center">
        {#if type === "edit"}
            <Info text='No changes are saved until the "Save Changed" button is clicked'/>
        {/if}
        {title}
    </h1>
    <div class="flex flex-row lg:flex-col lg:items-center w-full justify-center">
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
                {#if type === "edit"}
                    <div class="pt-4 flex flex-col">
                        <div class="flex flex-col">
                            <h2>Parameters</h2>
                            {#if template.parameters && Object.values(template.parameters).length > 0}
                                {#each Object.values(template.parameters).sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0)) as parameter}
                                    <div 
                                        class="flex flex-row justify-between items-center bg-dark-primary w-4xx md:w-full p-2 rounded-sm border border-solid border-light-primary my-2"
                                        draggable={true}
                                        on:dragstart={event => dragStart(event, parameter.order)}
                                        on:drop|preventDefault={event => drop(event, parameter.order, parameter.name)}
                                        ondragover="return false"
                                    >
                                        <div
                                            class="flex flex-row items-center"
                                            in:fade={{ duration: 300, delay: parameter.order * 100 }}
                                        >
                                            <i
                                                class='bx bx-grid-vertical text-gray-400 font-bold flex items-center justify-center hover:cursor-pointer text-lg'
                                            ></i>
                                            <span
                                                data-tooltip={parameter.name}
                                                class="ml-2 w-32 2xs:text-xs 2xs:w-16 whitespace-nowrap hover:cursor-default"
                                            >
                                                {parameter.order}. {parameter.name}
                                            </span>
                                            <div class="checkbox-container">
                                                <span class="checkbox-label">With title</span>
                                                <input
                                                    type="checkbox"
                                                    name="withTitle"
                                                    class="ml-2 bg-light-primary"
                                                    checked={parameter.withTitle}
                                                    on:change={e => handleCheckboxChange(e, parameter.name)}
                                                />
                                            </div>
                                            <div class="checkbox-container">
                                                <span class="checkbox-label">Bold Title</span>
                                                <input
                                                    type="checkbox"
                                                    name="boldTitle"
                                                    class="ml-2 bg-light-primary"
                                                    checked={parameter.boldTitle}
                                                    on:change={e => handleCheckboxChange(e, parameter.name)}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            class="bg-inherit"
                                            on:click={handleDeleteParameter(parameter.name)}
                                        >
                                            <i class='bx bx-x text-gray-400 font-bold flex items-center justify-center hover:cursor-pointer text-lg'></i>
                                        </button>
                                    </div>
                                {/each}
                            {:else}
                                <span class="text-gray-400">No parameters found</span>
                            {/if}
                        </div>
                        <div class="flex flex-col">
                            <span class="font-bold text-xl">Create parameter</span>
                            <form
                                class="flex flex-col"
                                on:submit|preventDefault={handleCreateParameter}
                            >
                                <SingleInput
                                    name="name"
                                    title="Name" 
                                    placeholder="Name of the parameter"
                                    bind:hasError={createParameterHasError}
                                    required
                                    on:change={handleCreateParameterChange}
                                    error={createParameterErrorMessage}
                                    passesOwnValidation={createParameterHasError}
                                    defaultValue={newParamData.name}
                                />
                                <div class="flex flex-row">
                                    <div class="flex flex-row items-center">
                                        <Info text="Whether or not the title for the parameter should be bold"/>
                                        <span class="text-xl">With title</span>
                                        <input
                                            type="checkbox"
                                            name="withTitle"
                                            class="ml-2 bg-light-primary w-4 h-4"
                                            on:change={handleCreateParameterChange}
                                            checked={newParamData.withTitle}
                                        />
                                    </div>
                                    <div class="ml-8 flex flex-row items-center">
                                        <Info text="Whether or not there should be a title for the parameter"/>
                                        <span class="text-xl">Bold Title</span>
                                        <input
                                            type="checkbox"
                                            name="boldTitle"
                                            class="ml-2 bg-light-primary w-4 h-4"
                                            on:change={handleCreateParameterChange}
                                            checked={newParamData.boldTitle}
                                        />
                                    </div>
                                </div>
                                <button
                                    class="primary-button bg-accent mt-4"
                                    disabled={createParameterHasError || submitting}
                                    type="submit"
                                >
                                    Create Parameter
                                </button>
                            </form>
                        </div>
                    </div>
                {/if}
                {#if type === "create"}
                    <button
                        type="submit"
                        class="primary-button bg-accent mt-4"
                        disabled={hasError || submitting}
                    >
                        Create
                    </button>
                {/if}
                {#if type === "edit"}
                    <div class="flex flex-row w-full justify-between 2xs:flex-col">
                        <button
                            type="submit"
                            class="primary-button w-full mr-4 bg-red-400 mt-4 2xs:mr-0"
                            disabled={hasError || submitting}
                            on:click={handleDeleteTemplate}
                        >
                            Delete
                        </button>
                        <button
                            type="submit"
                            class="primary-button w-full ml-4 bg-gray-500 mt-4 2xs:ml-0"
                            on:click={handleShareTemplate}
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