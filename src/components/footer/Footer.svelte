<script>
    import About from "./About.svelte";
    import Links from "./Links.svelte";
    import Socials from "./Socials.svelte";
</script>

<div class="footer mt-32 flex flex-row bg-dark-primary py-16 justify-evenly w-screen lg:hidden px-24">
    <About />
    <Links />
    <Socials />
</div>

<div class="footer mt-32 flex-col bg-dark-primary py-16 justify-evenly w-screen hidden lg:flex lg:items-center">
    <div class="flex flex-row w-full justify-between items-center px-24 mb-8 xs:flex xs:flex-col">
        <About />
        <Socials />
    </div>
    <Links />
</div>