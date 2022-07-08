<script>
    import About from "./About.svelte";
    import Links from "./Links.svelte";
    import Socials from "./Socials.svelte";
</script>

<div class="footer flex flex-row py-16 justify-evenly w-screen lg:hidden px-24">
    <About />
    <Links />
    <Socials />
</div>

<div class="footer flex-col py-16 justify-evenly w-screen hidden lg:flex lg:items-center">
    <div class="flex flex-row w-full justify-between items-center px-24 mb-8 md:px-10 sm:px-4 2xs:flex 2xs:flex-col">
        <About />
        <Socials />
    </div>
    <Links />
</div>