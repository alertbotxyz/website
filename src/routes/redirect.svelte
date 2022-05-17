<script>
    import { params } from "@roxi/routify";
    $: params, console.log($params);
    const redirects = {
        "docs": "docs.alertbot.net",
        "support-server": "discord.com/alertbot",
        "bot-invite": "discord.com/invite/alertbot",
        "login": "http://localhost:50451/api/v1/discord/login",
        "social-twitter": "",
        "social-facebook": "",
        "social-youtube": "",
        "social-github": "",
    };

    if (redirects[$params.link]) {
        window.location.href = redirects[$params.link];
    } else {
        // 404 page
        window.location.href = "/";
    };
</script>