<script>
    import { getUser } from "../../api/auth";
    getUser();
    import Sidebar from "../../components/navigation/Sidebar.svelte";
</script>

<div class="flex flex-row max-h-screen">
    <Sidebar />
    <div class="w-full overscroll-y-scroll">
        <slot />
    </div>
</div>