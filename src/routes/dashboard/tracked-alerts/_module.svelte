<script>
    import Topbar from "../../../components/navigation/Topbar.svelte";
    export let context;
</script>

<Topbar
    links={[
        {
            name: "Open Trade",
            endpoint: "/open-trade"
        },
        {
            name: "Update Trade",
            endpoint: "/update-trade"
        },
        {
            name: "Trade Stats",
            endpoint: "/trade-stats"
        },
        {
            name: "Settings",
            endpoint: "/settings"
            // some template customisation
            // auto send summary
            // when summary is sent
            // colours for open, trim, close
        },
    ]}
    path="/tracked-alerts"
    {context}
>
    <slot />
</Topbar>