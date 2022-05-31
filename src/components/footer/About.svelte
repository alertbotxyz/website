<script>
    import Logo from "../Logo.svelte";
    import data from "../../utils/data.ts";
    import "./footer.css";
</script>

<div class="footer-container xl:max-w-xs 2xs:items-center 2xs:text-center 2xs:w-max 2xs:pr-0 pr-4">
    <Logo />
    <p class="text-gray-400 my-4 2xs:text-sm xs:px-16">{data.core.about}</p>
    <a
        class="flex flex-row items-center"
        href="mailto:{data.core.contact.email}"
    >
        <img
            src="/icons/envelope.svg"
            alt="email-envelope"
            class="w-5"
        />
        <span class="ml-2 font-bold">{data.core.contact.email}</span>
    </a>
    <span class="mt-4 font-bold text-gray-400">{data.core.version}</span>
</div>