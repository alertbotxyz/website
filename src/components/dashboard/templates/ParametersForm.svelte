<script>
    import { createEventDispatcher } from "svelte";
    import { fade, fly } from "svelte/transition";
    import { flip } from "svelte/animate";
    import Info from "../../Info.svelte";
    import DashboardInput from "../../inputs/DashboardInput.svelte";

    const dispatch = createEventDispatcher();

    export let parameters = {};
    export let submitting = false;

    $: parametersArray = Object.values(parameters || {}).sort((a, b) => a.order > b.order ? 1 : (b.order > a.order ? -1 : 0));
    $: hasError = false;
    $: errorMessage = "";
    $: newParamData = {
        name: "",
        withTitle: true,
        boldTitle: true,
    };

    const dragStart = (event, i) => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.dropEffect = "move";
        const start = i;
        event.dataTransfer.setData("text/plain", start);
    };

    const drop = (event, target) => {
        event.dataTransfer.dropEffect = "move";
        const start = parseInt(event.dataTransfer.getData("text/plain"));

        const newTracklist = Object.values(parameters);
        const newTemplateList = [];

        const moved = newTracklist.find(p => p.order === start);

        // the parameter moved up so
        newTracklist.forEach(param => {
            if (param.name === moved.name) {
                newTemplateList.push({
                    ...moved,
                    order: target,
                });
            } else if (param.order > target && param.order > start || param.order < target && param.order < start) {
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

        parameters = Object.fromEntries(newTemplateList.sort((a, b) => a.order > b.order ? 1 : (b.order > a.order ? -1 : 0)).map(p => [ p.name, p ])),
        
        dispatch("parameterChanged", parameters);
    };

    const handleCheckboxChange = (event, parameterName) => {
        const { name, checked } = event.detail || event.target;
        parameters[parameterName][name] = checked;

        dispatch("parameterChanged", parameters);
    };

    const testValidParameterName = parameterName => {
        if (
            parametersArray.find(param => param.name.toLowerCase() === parameterName.toLowerCase()) ||
            !parameterName
        ) {
            hasError = true;
            errorMessage = !parameterName ? "Parameter name is required" : "A parameter with this name already exists";
            return false;
        } else {
            hasError = false;
            errorMessage = "";
            return true;
        };
    };

    const handleDeleteParameter = parameterName => {
        if (confirm("Are you sure you want to delete this parameter?")) {
            // this is done to make sure the template is updated so svelte reacts to the change
            const deletedOrder = parameters[parameterName].order;
            const obj = parameters;
            delete obj[parameterName];
            Object.values(obj).forEach(param => {
                if (param.order > deletedOrder) {
                    obj[param.name].order = param.order - 1;
                };
            });
            parameters = obj;

            dispatch("parameterChanged", parameters);
        };
    };

    const handleCreateParameterChange = (e) => {
        const { name, value } = e.detail || e.target;
        
        if (name === "boldTitle" || name === "withTitle") {
            newParamData[name] = !newParamData[name];

            if (newParamData.boldTitle && !newParamData.withTitle) {
                hasError = true;
                errorMessage = "You must have a title if you want have it bold.";
            } else if (!newParamData.name) {
                hasError = true;
                errorMessage = "This field is required";
            } else {
                hasError = false;
                errorMessage = "";
            };
        } else {
            testValidParameterName(value);
            newParamData[name] = value;
        };
    };

    const handleCreateParameter = () => {
        newParamData.order = parametersArray.length + 1;
        
        if (!testValidParameterName(newParamData.name)) {
            addToast({
                type: "error",
                message: "There was an error creating the parameter",
                title: `A parameter with the name ${newParamData.name} already exists on this template.`,
            });
        } else {
            parameters[newParamData.name] = newParamData;
            newParamData = {
                name: "",
                withTitle: false,
                boldTitle: false,
            };
            hasError = false;
            errorMessage = "";
            
            dispatch("parameterChanged", parameters);
        };
    };
</script>

<div class="pt-4 flex flex-col w-full">
    <div class="flex flex-col">
        <h2>Parameters</h2>
        {#if parameters && parametersArray.length > 0}
            {#each parametersArray as parameter, i (parameter.name)}
                <div 
                    class="flex flex-row justify-between items-center bg-dark-primary w-4xx md:w-full p-2 rounded-sm border border-solid border-light-primary my-2"
                    animate:flip
                    draggable={true}
                    on:dragstart={event => dragStart(event, parameter.order)}
                    on:drop|preventDefault={event => drop(event, parameter.order, parameter.name)}
                    ondragover="return false"
                >
                    <div
                        class="flex flex-row items-center"
                        transition:fade={{ duration: 300, delay: 300 }}
                    >
                        <img
                            src="/icons/grid-vertical.svg"
                            alt="vertical-grid"
                            class="hover:cursor-pointer text-lg"
                        />
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
                        aria-label="Delete parameter"
                    >
                        <img
                            src="/icons/x.svg"
                            alt="x"
                            class="hover:cursor-pointer text-lg mt-1"
                        />
                    </button>
                </div>
            {/each}
        {:else}
            <span class="text-gray-400">No parameters found</span>
        {/if}
    </div>
    <div
        class="flex flex-col"
        transition:fly={{ duration: 300 }}
    >
        <span class="font-bold text-xl">Create parameter</span>
        <form
            class="flex flex-col"
            on:submit|preventDefault={handleCreateParameter}
        >
            <DashboardInput
                required
                name="name"
                title="Name"
                placeholder="Name of the parameter"
                error={errorMessage}
                passesOwnValidation={hasError}
                bind:hasError={hasError}
                on:change={handleCreateParameterChange}
                defaultValue={newParamData.name}
            />
            <div class="flex flex-row">
                <div class="flex flex-row items-center">
                    <Info
                        text="Whether or not the title for the parameter should be bold" 
                        right
                    />
                    <span class="text-xl 2xs:text-sm xs:text-xs">With title</span>
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
                    <span class="text-xl 2xs:text-sm xs:text-xs">Bold Title</span>
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
                disabled={hasError || submitting}
                type="submit"
                aria-label="Create parameter"
            >
                Create Parameter
            </button>
        </form>
    </div>
</div>