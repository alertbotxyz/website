<script>
    import Page from "../../../components/blog/Page.svelte";
    import Title from "../../../components/blog/Title.svelte";
    import Paragraph from "../../../components/blog/Paragraph.svelte";
    import Link from "../../../components/blog/Link.svelte";
    import Image from "../../../components/blog/Image.svelte";
</script>
<Page
    thumbnailUrl=""
    category="About"
    title="A quickstart guide for alertbot"
    tags={[ "Guide" ]}
    date="24/07/2022"
    author={{
        name: "Atom",
        avatarUrl: "/images/logo.png",
    }}
>
    <Title>What is alertbot?</Title>
    <Paragraph>Alertbot allows you to create templates to send customisable alerts.</Paragraph>
    <Title>Get started</Title>
    <Paragraph>To get started visit the dashboard at <Link href="/dashboard">https://alert-bot.xyz/dashboard</Link> where you will be redirected to login with discord.</Paragraph>
    <Paragraph>Before you can start sending alerts you have to create a bot application done in the <Link href="https://discord.com/developers/applications">Discord Developer dashboard</Link>.</Paragraph>
    <Image src="https://storage.googleapis.com/alertbot-images/blogs/discord-developer-dashboard.jpg" />
    <Paragraph>Next visit the "bot" tab, reset your bot token and copy it (make sure not to share it with anyone else).</Paragraph>
    <Paragraph>Then navigate to your <Link href="/dashboard/account">account page</Link> on the alertbot dashboard, paste in the bot token and press save. Once you have saved it a box showing your bot's details should show up to the right.</Paragraph>
    <Image src="https://storage.googleapis.com/alertbot-images/blogs/account-bot-token-filled.jpg" />
    <Title>Templates</Title>
    <Paragraph>Alertbot allows you to create templates to enable alerting with maximum customisability. You can fully edit what your alert embed looks like and you can add parameters to the template.</Paragraph>
    <Paragraph>To create a template visit the <Link href="/dashboard/templates/create">templates page</Link> on the alertbot dashboard. Fill in your template details, the changes will reflect in the embed to the right.</Paragraph>
    <Image src="https://storage.googleapis.com/alertbot-images/blogs/create-template.jpg" />
    <Paragraph>You can also create parameters for your embeds, to do so, go to view your template, scroll down to the parameters section and create as many as you need for your template.</Paragraph>
    <Image src="https://storage.googleapis.com/alertbot-images/blogs/create-parameter.jpg" />
    <Title>Servers</Title>
    <Paragraph>Once you have created all the templates you need you can add servers to alert to. When you are ready to send an alert, with one click you can send it to all servers.</Paragraph>
    <Paragraph>To add servers visit the <Link href="/dashboard/templates/servers">servers page</Link> on the alertbot dashboard.</Paragraph>
    <Paragraph>Note: Both you and your bot must have permissions to view and alert to a channel to send alerts to it.</Paragraph>
    <Image src="https://storage.googleapis.com/alertbot-images/blogs/add-server.jpg" />
    <Paragraph>Select a guild, a channel a server group and optionally a role which will be mentioned every time you send an alert.</Paragraph>
    <Image src="https://storage.googleapis.com/alertbot-images/blogs/add-server-filled.jpg" />
    <Paragraph>You will see a list of servers in each server group where you can visit the discord channel. You can also delete a server if you no longer want to alert to it.</Paragraph>
    <Title>Alerts</Title>
    <Paragraph>Now that you have create a template and added servers you can start sending alerts.</Paragraph>
    <Paragraph>To send an alert visit the <Link href="/dashboard/templates/send-alert">alerts page</Link> on the alertbot dashboard and select a template to alert with.</Paragraph>
    <Paragraph>You will be presented with the parameters you set earlier which you should fill in. Along with this you can provide an image url to show on the embed. As you type your changes will reflect in the preview embed on the right.</Paragraph>
    <Image src="https://storage.googleapis.com/alertbot-images/blogs/send-alert.jpg" />
    <Paragraph>The alert will send to all servers you added earlier.</Paragraph>
    <Image src="https://storage.googleapis.com/alertbot-images/blogs/alert-discord.jpg" />
    <Paragraph>Your alerts are saved meaning you can view and reflect upon your past alerts.</Paragraph>
    <Image src="https://storage.googleapis.com/alertbot-images/blogs/alert-history.jpg" />
    <Paragraph>You can click on the alert to view it's details and you can even retry sending to any servers which had errors sending.</Paragraph>
    <Image src="https://storage.googleapis.com/alertbot-images/blogs/alert-details.jpg" />
    <Title>Tracked Alerts</Title>
    <Paragraph>Tracked alerts are alerts for which are tracked allowing you to evaluate your alerts and see how they are performing. At the end of the week you can send a recap of your alerts to your servers.</Paragraph>
    <Paragraph>To send a tracked alert vist the <Link href="/dashboard/tracked-alerts/open-trade">tracked alerts page</Link> on the alertbot dashboard.</Paragraph>
    <Paragraph>You can select from stocks, options or cryptocurrency with more coming soon. You can send a buy to open (long) or sell to open (short) alert.</Paragraph>
    <Paragraph>You should fill in the ticker and the price and optionally a comment about the alert.</Paragraph>
    <Image src="https://storage.googleapis.com/alertbot-images/blogs/open-tracked-alert.jpg" />
    <Paragraph>The alert will send to all servers you added earlier.</Paragraph>
    <Image src="https://storage.googleapis.com/alertbot-images/blogs/open-tracked-alert-discord.jpg" />
    <Paragraph>You can send trim alerts when your are closing part of your trade.</Paragraph>
    <Image src="https://storage.googleapis.com/alertbot-images/blogs/trim-tracked-alert.jpg" />
    <Paragraph>Finally you can send a close alert when you are closing your trade.</Paragraph>
    <Image src="https://storage.googleapis.com/alertbot-images/blogs/close-tracked-alert.jpg" />
    <Paragraph>You can view your recent alerts and your trade stats in the <Link href="/dashboard/tracked-alerts/trade-stats">trade stats page</Link>.</Paragraph>
    <Image src="https://storage.googleapis.com/alertbot-images/blogs/tracked-alert-stats.jpg" />
    <Paragraph>At the end of the week you can send a recap of the alerts you sent in the past week.</Paragraph>
    <Image src="https://storage.googleapis.com/alertbot-images/blogs/tracked-alert-recap-discord.jpg" />
    <Title>Conclusion</Title>
    <Paragraph>That is a basic guide for alertbot. If you have any more questions join the support server or visit the documentation.</Paragraph>
    <Paragraph>If you notice any mistakes in this guide be sure to contact it so we can fix it asap.</Paragraph>
</Page>