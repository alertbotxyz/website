<script>
    import InputLabel from "../../../components/InputLabel.svelte";
    import Modal from "../../../components/Modal.svelte";
    import Loading from "../../../components/Loading.svelte";
    import { addServer, getAllServers } from "../../../api/servers";

    export let servers = [];

    $: active = false;
    $: loading = true;
    $: data = {
        guildId: "",
        channelId: "",
        mentionId: "",
    };

    getAllServers().then(res => {
        if (res.ok) {
            servers = res.data;
        } else {
            // TODO: Error toast
        };
        loading = false;
    });

    const handleModal = () => active = !active;

    const handleSubmit = e => {
        addServer("967845566505705543", "967896860335411240").then(res => {
            console.log(res);
        });
    };

    const handleChange = e => {
        const { name, value } = e.target;
        data[name] = value;
    };
</script>

<Loading {loading}>
    <Modal {active}>
        <div class="modal-content flex-col flex justify-between rounded-md bg-primary ">
            <h1 class="ml-8 mt-4">Add A Guild</h1>
            <div class="form w-full flex flex-row items-center justify-evenly">
                <div class="flex flex-col">
                    <InputLabel 
                        labelFor="guildId"
                        labelText="Guild Id"
                        required
                    />
                    <select
                        name="guildId"
                        on:change={handleChange}
                    >
                        <option value="" selected disabled hidden>Choose a guild</option>
                        {#each servers as server}
                            <option value="{server.guild.id}">{server.guild.name}</option>
                        {/each}
                    </select>
                </div>
                <div class="flex flex-col {!data.guildId && "hidden"}">
                    <InputLabel 
                        labelFor="channelId"
                        labelText="Channel Id"
                        required
                    />
                    <select
                        name="channelId"
                        on:change={handleChange}
                    >
                        <option value="" selected disabled hidden>Choose channel</option>
                    </select>
                </div>
                <div class="flex flex-col {!data.guildId && "hidden"}">
                    <InputLabel 
                        labelFor="mentionId"
                        labelText="Mention Id"
                    />
                    <select
                        name="mentionId"
                        on:change={handleChange}
                    >
                        <option value="" selected disabled hidden>Choose mention role</option>
                    </select>
                </div>
            </div>
            <div class="action bg-light-primary rounded-b-md flex flex-row justify-end items-center pr-8 py-4">
                <button 
                    class="bg-gray-500"
                    on:click={handleModal}
                >
                    Cancel
                </button>
                <button
                    class="bg-accent"
                    on:click={handleSubmit}    
                >
                    Create
                </button>
            </div>
        </div>
    </Modal>
    
    <div class="flex flex-col items-center">
        {#if servers && servers.length > 0}
            <h1>Alerting to {servers.length} servers</h1>
            <div class="my-4">
                <button 
                    class="bg-accent rounded-md py-2 px-8 border-none"
                    on:click={handleModal}
                >
                    Add Guild
                </button>
            </div>
            {#each servers as server}
                <div class="w-1/2 h-20 rounded-md bg-light-primary my-2 flex items-center justify-between px-3">
                    <div class="flex items-center justify-between   ">
                        <img 
                            class="w-12 rounded-full"
                            src={server.guild.icon ? `https://cdn.discordapp.com/icons/${server.guild.id}/${server.guild.icon}.webp?size=96` : "https://cdn.discordapp.com/embed/avatars/0.png"} 
                            alt="guildicon"
                        />
                        <p class="pl-4 text-gray-300 font-bold text-xl truncate">{server.guild.name || "Guild name"}</p>
                    </div>
                    <a
                        class="bg-gray-500 px-8 py-2 rounded-md flex items-center justify-center" 
                        href="/dashboard/{server.guild.id}/guild"
                    >
                        Delete
                    </a>
                </div>
            {/each}
        {:else}
            <div class="w-full h-full flex items-center justify-center">
                <div class="border-2 border-gray-400 border-dashed rounded-md py-32 px-64 mb-24 flex flex-col items-center justify-center">
                    <span class="font-bold">No servers found</span>
                    <span class="text-gray-400 mt-2">Get started with alerting by adding an alert server</span>
                    <button
                        class="py-2 px-4 rounded-md bg-accent mt-8 font-bold"
                        on:click={handleModal}
                    >
                        + Add Server
                    </button>
                </div>
            </div>
        {/if}
    </div>
</Loading>

<style lang="postcss">
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    .modal.active {
        @apply flex items-center justify-center;
        animation: 0.1s ease-in-out fadeIn;
    }
    .modal.inactive {
        animation: 0.1s ease-in-out fadeOut;
    }

    .modal-content {
        width: 800px;
        height: 300px;
    }
    .modal .action button {
        @apply rounded-md h-10 px-10 border-none mx-2;
    }

    .form select {
        @apply rounded-md bg-light-primary py-2 pl-2 pr-8 border border-solid border-gray-600;
    }
</style>