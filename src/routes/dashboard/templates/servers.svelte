<script>
    import InputLabel from "../../../components/InputLabel.svelte";
    import Loading from "../../../components/Loading.svelte";
    import { addServer, deleteServer, getAllGuilds, getAllServers, getGuildInfo } from "../../../api/servers";
    import { addToast } from "../../../stores/toasts";
import SingleInput from "../../../components/dashboard/templates/SingleInput.svelte";
import SelectInput from "../../../components/dashboard/templates/SelectInput.svelte";
import SuccessModal from "../../../components/SuccessModal.svelte";

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
    <div class="flex flex-col items-center">
        <h1>Alerting to {servers.length} servers</h1>
        <div class="flex flex-row my-8 items-end">
            <SelectInput
                name="guildId"
                title="Guild"
                placeholder="Choose a guild"
                required
                options={userGuilds.map(guild => ({
                        value: guild.id,
                        text: guild.name
                    })
                )}
                on:change={handleChange}
                bind:hasError={hasError}
            />
            {#if data.guildId}
                <Loading loading={fetchingGuild}>
                    <SelectInput
                        name="channelId"
                        title="Channel"
                        placeholder="Choose a channel"
                        required
                        options={guildInfo.channels.map(channel => ({
                                value: channel.id,
                                text: channel.name
                            })
                        )}
                        on:change={handleChange}
                        bind:hasError={hasError}
                    />
                    <SelectInput
                        name="mentionId"
                        title="Mention Role"
                        placeholder="Choose a role"
                        options={guildInfo.roles.map(role => ({
                                value: role.id,
                                text: role.name
                            })
                        )}
                        on:change={handleChange}
                        bind:hasError={hasError}
                    />
                    <button
                        class="bg-accent py-3 px-8 rounded-md"
                        on:click={handleSubmit}
                        disabled={hasError || submitting}
                    >
                        Add Server
                    </button>
                </Loading>
            {/if}
        </div>
        {#if servers && servers.length > 0}
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
                    <button
                        class="bg-gray-500 px-8 py-2 rounded-md flex items-center justify-center" 
                        on:click={handleDeleteServer(server.channel.id)}
                        disabled={submitting}
                    >
                        Delete
                    </button>
                </div>
            {/each}
        {/if}
    </div>
</Loading>