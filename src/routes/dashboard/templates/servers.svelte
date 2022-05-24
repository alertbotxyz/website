<script>
    import { addServer, deleteServer, getAllGuilds, getAllServers, getGuildInfo } from "../../../api/servers";
    import { addToast } from "../../../stores/toasts";
    import InputLabel from "../../../components/InputLabel.svelte";
    import Loading from "../../../components/Loading.svelte";
    import SingleInput from "../../../components/dashboard/templates/SingleInput.svelte";
    import SelectInput from "../../../components/dashboard/templates/SelectInput.svelte";
    import SuccessModal from "../../../components/modals/SuccessModal.svelte";
    import "../../../styles/templates.css";


    export let servers = [];

    $: active = false;
    $: loading = true;
    $: submitting = false;
    $: fetchingGuild = false;
    $: deleteSuccess = false;
    $: addSuccess = false;
    $: hasError = false;

    $: userGuilds = [];
    $: guildInfo = undefined;
    $: guildInfoCache = [];
    $: data = {
        guildId: "",
        channelId: "",
        mentionId: "",
    };

    const fetchGuild = () => {
        fetchingGuild = true;

        if (guildInfoCache.find(g => g.id === data.guildId)) {
            fetchingGuild = false;
            guildInfo = guildInfoCache.find(g => g.id === data.guildId);
        } else {
            getGuildInfo(data.guildId).then(res => {
                if (!res.ok || res.data.error) {
                    addToast({
                        type: "error",
                        message: res.error.message,
                        title: "There was an error fetching guild info"
                    });
                } else {
                    guildInfo = res.data;
                    guildInfoCache.push(guildInfo);
                };
                fetchingGuild = false;
            });
        };
    };

    getAllGuilds().then(res => {
        if (!res.ok || res.data.error) {
            addToast({
                type: "error",
                message: res.error.message,
                title: "There was an error fetching guilds"
            });
        } else {
            userGuilds = res.data;
        };
    });

    const getServers = () => {
        loading = true;
        getAllServers().then(res => {
            if (res.ok) {
                servers = res.data;
                data.guildId = "";
            } else {
                addToast({
                    type: "error",
                    message: res.error.message,
                    title: "There was an error fetching the templates"
                });
                servers = [];
            };
            loading = false;
        });
    };
    getServers();

    const handleModal = () => active = !active;

    const handleSubmit = () => {
        submitting = true;

        const {
            guildId,
            channelId,
            mentionId,
        } = data;

        addServer(guildId, channelId, mentionId).then(res => {
            if (res.ok) {
                addSuccess = true;
                // get servers when modal is closed
            } else {
                addToast({
                    type: "error",
                    message: res.error.message,
                    title: "There was an error adding the server"
                });
            };
            handleModal();
            submitting = false;
        });
    };

    const handleDeleteServer = channelId => {
        submitting = true;
        deleteServer(channelId).then(res => {
            if (res.ok) {
                deleteSuccess = true;
            } else {
                addToast({
                    type: "error",
                    message: res.error.message,
                    title: "There was an error deleting the server"
                });
            };
            getServers();
            submitting = false;
        });
    };

    const handleChange = e => {
        const { name, value } = e.target || e.detail;
        data[name] = value;
        if (name === "guildId") {
            fetchGuild();
        };
    };
</script>
<SuccessModal
    active={addSuccess || deleteSuccess}
    title={addSuccess ? "Server added" : "Server deleted"}
    message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui totam animi voluptatem"
    options={[
        {
            type: "button",
            text: `${addSuccess ? "Add " : "Delete "}another server`,
            color: "bg-accent",
        },
    ]}
    on:close={() => {
        addSuccess = false;
        deleteSuccess = false;

        getServers();
    }}
/>
<Loading {loading}>
    <div class="flex flex-col items-center pb-8">
        <h1 class="text-center xs:text-2xl">Alerting to {servers.length} servers</h1>
        <div class="flex flex-row lg:flex-col my-8 items-end pl-8 justify-center lg:w-5/6">
            <SelectInput
                name="guildId"
                title="Guild"
                placeholder="Choose a guild"
                required
                fullWidth
                options={userGuilds.map(guild => ({
                        value: guild.id,
                        text: guild.name
                    })
                )}
                on:change={handleChange}
                bind:hasError={hasError}
                extraClass={"lg:mb-4"}
            />
            {#if data.guildId}
                <Loading loading={fetchingGuild}>
                    <SelectInput
                        name="channelId"
                        title="Channel"
                        placeholder="Choose a channel"
                        required
                        fullWidth
                        options={guildInfo.channels.map(channel => ({
                                value: channel.id,
                                text: channel.name
                            })
                        )}
                        on:change={handleChange}
                        bind:hasError={hasError}
                        extraClass={"lg:mb-4"}
                    />
                    <SelectInput
                        name="mentionId"
                        title="Mention Role"
                        placeholder="Choose a role"
                        fullWidth
                        options={guildInfo.roles.map(role => ({
                                value: role.id,
                                text: role.name
                            })
                        )}
                        on:change={handleChange}
                        bind:hasError={hasError}
                        extraClass={"lg:mb-4"}
                    />
                    <button
                        class="bg-accent py-3 px-8 rounded-md lg:mt-8 lg:w-full lg:mr-4"
                        on:click={handleSubmit}
                        disabled={hasError || submitting}
                    >
                        Add Server
                    </button>
                </Loading>
            {/if}
        </div>
        {#if servers && servers.length > 0}
            <div class="grid grid-cols-1 w-full place-items-center sm:grid-cols-2 xs:grid-cols-1">
                {#each servers as server}
                    <div class="w-1/2 lg:w-5/6 h-20 md:h-auto md:py-4 rounded-md bg-light-primary my-2 flex md:flex-col items-center justify-between px-3 sm:px-0">
                        <div class="flex flex-row items-center md:justify-between md:w-full md:px-8 sm:px-2 sm:flex-col">
                            <div class="flex flex-row sm:flex-col items-center sm:mb-4 xs:flex-row">
                                <img 
                                    class="w-12 rounded-full"
                                    src={server.guild.icon ? `https://cdn.discordapp.com/icons/${server.guild.id}/${server.guild.icon}.webp?size=96` : "https://cdn.discordapp.com/embed/avatars/0.png"} 
                                    alt="guildicon"
                                />
                                <span
                                    class="pl-2 text-gray-300 font-bold text-xl w-48 sm:w-full sm:text-center sm:mt-2 hover:cursor-default"
                                    data-tooltip="Guild id: {server.guild.id}" 
                                >
                                    {server.guild.name || "Guild name"}
                                </span>
                            </div>
                            <div class="flex flex-col ml-4 2xs:ml-0 2xs:w-full 2xs:items-center">
                                <span class="server-guild-info mb-1">
                                    In channel 
                                    <span
                                        class="text"
                                        data-tooltip="Channel id: {server.channel.id}"
                                    >
                                        #{server.channel.name}
                                    </span>
                                </span>
                                {#if server.role?.name}
                                    <span class="server-guild-info">
                                        With role 
                                        <span 
                                            class="text"
                                            data-tooltip="Role id: {server.role?.id}"
                                        >
                                            @{server.role?.name}
                                        </span>
                                    </span>
                                {:else}
                                    <span class="server-guild-info">
                                        With no 
                                        <span class="text-inherit font-bold ml-1 2xs:ml-0 hover:cursor-default xs:ml-1">mention role</span>
                                    </span>
                                {/if}
                            </div>
                        </div>
                        <button
                            class="bg-gray-500 px-8 py-2 md:mt-4 rounded-md flex items-center justify-center" 
                            on:click={handleDeleteServer(server.channel.id)}
                            disabled={submitting}
                        >
                            Delete
                        </button>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</Loading>