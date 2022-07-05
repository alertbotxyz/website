<script>
    import Logo from "../../Logo.svelte";
import Section from "../main/Section.svelte";
    import SidebarSection from "./SidebarSection.svelte";
    import SidebarSubsection from "./SidebarSubsection.svelte";

    export let navbar;
    $: menu = false;

    const handleMenu = () => {
        menu = !menu;
        document.querySelector("body").classList.toggle("overflow-hidden");
        document.querySelector("html").classList.toggle("overflow-hidden");
    };

    let sections = [];
    navbar.forEach(nav => {
        if (nav.type === "section") {
            sections.push({
                ...nav,
                subsections: []
            });
        } else {
            sections[sections.length - 1].subsections.push(nav);
        };
    });
</script>

<nav class="sidebar">
    <div class="w-full ml-8 mb-4">
        <Logo />
    </div>
    {#each navbar as navbarObject}
        <div class="links {menu && "active"}">
            {#if navbarObject.type === "section"}
                <SidebarSection title={navbarObject.title} />
            {:else if navbarObject.type === "subsection"}
                <SidebarSubsection
                    title={navbarObject.title}
                    link={navbarObject.link}
                />
            {/if}
        </div>
    {/each}
    <select
        class="bg-transparent border-none w-48 rounded-md h-10 p-2 mr-4 hidden lg:flex"
        name="link"
        on:input={data => {
            window.location.hash = data.target.value;
        }}
    >
        {#each sections as sectionObject}
            <optgroup label={sectionObject.title}>
                {#each sectionObject.subsections as subsectionObject}
                    <option value={subsectionObject.link}>{subsectionObject.title}</option>
                {/each}
            </optgroup>
        {/each}
    </select>
</nav>