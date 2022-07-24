<script>
    import Page from "../../../components/blog/Page.svelte";
    import Title from "../../../components/blog/Title.svelte";
    import Paragraph from "../../../components/blog/Paragraph.svelte";
</script>
<Page
    thumbnailUrl="https://storage.googleapis.com/alertbot-images/examples/landing_page.png"
    category="About"
    title="About alertbot"
    tags={[ "Development" ]}
    date="24/07/2022"
    author={{
        name: "Atom",
        avatarUrl: "/images/logo.png",
    }}
>
    <Paragraph>This blog is still being written</Paragraph>
    <Title>What is alertbot?</Title>
</Page>