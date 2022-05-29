<script>
    import data from "../../utils/data.ts";
    import "./footer.css";
</script>

<div class="footer-container 2xs:mt-12 2xs:items-center">
    <span class="link-title">Socials</span>
    <div class="flex flex-row">
        <a
            class="social"
            href={data.core.socials.twitter}
        >
            <i class='bx bxl-twitter' />
        </a>
        <a
            class="social"
            href={data.core.socials.github}
        >
            <i class='bx bxl-github' />
        </a>
        <a
            class="social"
            href={data.core.socials.patreon}
        >
            <i class='bx bxl-patreon' ></i>
        </a>
        <a
            class="social"
            href={data.core.socials.discord}
        >
            <i class='bx bxl-discord-alt'></i>
        </a>
    </div>
    <span class="mt-4 font-bold text-gray-400">© 2022 {data.core.name}</span>
</div>