<script>
    import Topbar from "../../../components/navigation/Topbar.svelte";
    export let context;
</script>

<Topbar
    links={[
        {
            name: "Create Template",
            endpoint: "/create"
        },
        {
            name: "View Templates",
            endpoint: "/view"
        },
        {
            name: "Send Alert",
            endpoint: "/send-alert"
        },
        {
            name: "Servers",
            endpoint: "/servers"
        }
    ]}
    path="/templates"
    {context}
>
    <slot />
</Topbar>