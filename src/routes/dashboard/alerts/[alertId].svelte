<script>
    import { params } from "@roxi/routify";
    import { addToast } from "../../../stores/toasts";
    import { getAlertById, retryAlerts } from "../../../api/alert";
    import { formatDate } from "../../../utils/core";
    import DiscordEmbed from "../../../components/discord/DiscordEmbed.svelte";
    import Info from "../../../components/Info.svelte";
    import Loading from "../../../components/Loading.svelte";

    $: alertId = $params.alertId;
    $: alert = undefined;
    $: canStillRetry = false;

    $: fetched = false;
    $: loading = true;
    $: submitting = false;

    $: if (alertId && !fetched) getAlertById(alertId).then(res => {
        fetched = true;
        
        if (res.ok) {
            alert = res.data;
        } else {
            addToast({
                title: "There was an error fetching the alert",
                type: "error",
                message: res.error.message
            });
        };

        const ms = Date.now() - alert.date
        const minutes = Math.floor(ms / 1000 / 60);
        
        if (minutes < 15) canStillRetry = true;

        loading = false;
    });

    const retryServers = (servers) => {
        submitting = true;
        retryAlerts(alertId, servers).then(res => {
            if (res.ok && !res.data.errors) {
                addToast({
                    title: "Success",
                    type: "success",
                    message: "Alert sent successfully"
                });

                alert = {
                    ...alert,
                    servers: res.data.servers,
                };
            } else {
                addToast({
                    title: "There was an error retrying the alert",
                    type: "error",
                    message: res.data ? `${res.data.message}\n${res.data.errors.map(e => `Channel of Id ${e.channelId}: ${e.message}`).join("\n")}` : "An unknown error occured."
                });
            };
            submitting = false;
        });
    };

</script>

<Loading {loading}>
    {#if alert}
        <div class="flex flex-col px-24 mt-24 sm:px-4">
            <span class="font-bold">
                <span class="text-xl">Alert</span>
                <span class="text-sm text-gray-400">{formatDate(alert.date, "dd/MM/yyyy hh:mm:ss")}</span>
            </span>
            <DiscordEmbed
                title={alert.embed.title}
                description={alert.embed.description}
                author={alert.embed.author}
                footer={alert.embed.footer}
                color={alert.embed.color}
                thumbnail={alert.embed.thumbnail}
                image={alert.embed.image}
            />
            <div class="flex flex-row mt-8">
                <Info
                    text="How many servers the alert sent sucessfully to"
                    style="mt-1"
                    right
                />
                <span class="font-bold text-xl">Outcome</span>
            </div>
            <div class="mt-2">
                <div class="flex flex-row">
                    <Info
                        text="You can only retry alerts up to 15 minutes after they were sent."
                        right
                    />
                    <span class="font-bold text-sm text-gray-400">Sent to {alert.servers.filter(server => server.successful).length} out of {alert.servers.length} servers. </span>
                </div>
                <div class="mt-1">
                    {#each alert.servers as server, i}
                        <div class="flex flex-row">
                            <span>{i + 1}.</span>
                            <div class="flex flex-row 2xs:flex-col">
                                <span class="font-bold ml-2 {server.successful ? "text-green-400" : "text-error"}">
                                   {server.id} {!server.successful ? `- ${server.error}` : ""}
                                </span>
                                {#if !server.successful}
                                    <button
                                        class="ml-2 rounded-md w-16 text-center font-bold bg-accent border border-solid border-white"
                                        disabled={!canStillRetry || submitting}
                                        on:click={retryServers([server])}
                                    >
                                        Retry
                                    </button>
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
                <button
                    class="rounded-md w-32 h-8 mt-4 text-center font-bold bg-accent border border-solid border-white"
                    disabled={!canStillRetry || !alert.servers.filter(server => !server.successful).length  || submitting}
                    on:click={retryServers(alert.servers.filter(server => !server.successful))}
                >
                    Retry All
                </button>
            </div>
        </div>
    {:else}
        <div class="w-full h-full flex items-center justify-center">
            <span class="text-md">
                Alert not found.
                <a
                    href="/dashboard/account#alert-history"
                    class="primary-link"
                >
                    View alert history.
                </a>
            </span>
        </div>
    {/if}
</Loading>