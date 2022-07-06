<script>
    import Divider from "./Divider.svelte";
    import Header from "./Header.svelte";
    export let title;
</script>

<div class="my-4">
    <Header>{title}</Header>
    <Divider short />
</div>