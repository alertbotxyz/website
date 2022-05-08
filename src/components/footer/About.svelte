<script>
    import Logo from "../Logo.svelte";
    import "./footer.css";
</script>

<div class="footer-container xl:max-w-xs xs:items-center xs:text-center xs:w-max">
    <Logo />
    <p class="text-gray-400 my-4">Alertbot helps you simplify alerts. Some more extra very long text</p>
    <a
        class="flex flex-row items-center"
        href="mailto:oscarfal2006@gmail.com"
    >
        <i class='bx bx-envelope text-accent' ></i>
        <span class="ml-2 font-bold">contact@alertbot.net</span>
    </a>
</div>