<script>
    import { params } from "@roxi/routify";
    import constants from "../utils/constants";
    
    $: params;
    const redirects = {
        "docs": "/docs",
        "support-server": "https://discord.gg/WpQT3jzfum",
        "bot-invite": "https://discord.com/oauth2/authorize?client_id=965663863313936415&scope=bot%20applications.commands&permissions=8",
        "login": `${constants.api.url}/discord/login`,
        "social-twitter": "",
        "social-github": "https://github.com/atom-alertbot",
        "social-patreon": "",
        "social-discord": "https://discord.gg/WpQT3jzfum",
        "feedback": "",
        "contact": "",
        "about": "/info/blog?blog=About_alertbot",
    };

    if (redirects[$params.link]) {
        window.location.href = redirects[$params.link];
    } else {
        // 404 page
        window.location.href = "/";
    };
</script>