<script>
    import Footer from "../../components/footer/Footer.svelte";
    import Navbar from "../../components/navigation/Navbar.svelte";
</script>

<div class="flex flex-col h-full">
    <Navbar>
        <slot />
        <Footer />
    </Navbar>
</div>