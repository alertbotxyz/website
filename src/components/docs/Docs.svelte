<script>
    import Sidebar from "./navbar/Sidebar.svelte";
    import "./docs.css";

    export let navbar;
</script>
<div class="docs-container">
    <Sidebar {navbar}/>
    <div class="docs">
        <slot />
    </div>
</div>