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
            <img
                src="/icons/twitter.svg" 
                alt="twitter"
                class="w-2/3"
            />
        </a>
        <a
            class="social"
            href={data.core.socials.github}
        >
            <img
                src="/icons/github.svg" 
                alt="github"
                class="w-2/3"
            />
        </a>
        <a
            class="social"
            href={data.core.socials.patreon}
        >
            <img
                src="/icons/patreon.svg" 
                alt="patreon"
                class="w-2/3"
            />
        </a>
        <a
            class="social"
            href={data.core.socials.discord}
        >
            <img
                src="/icons/discord.svg" 
                alt="discord"
                class="w-2/3"
            />
        </a>
    </div>
    <span class="mt-4 font-bold text-gray-400">© 2022 {data.core.name}</span>
</div>