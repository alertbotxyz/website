<script>
    import Docs from "../components/docs/Docs.svelte";
    import Attribute from "../components/docs/main/Attribute.svelte";
    import Bold from "../components/docs/main/Bold.svelte";
    import Divider from "../components/docs/main/Divider.svelte";
    import Header from "../components/docs/main/Header.svelte";
    import Image from "../components/docs/main/Image.svelte";
    import Link from "../components/docs/main/Link.svelte";
    import Paragraph from "../components/docs/main/Paragraph.svelte";
    import Section from "../components/docs/main/Section.svelte";
    import SectionExample from "../components/docs/main/SectionExample.svelte";
    import SectionText from "../components/docs/main/SectionText.svelte";
    import SectionTitle from "../components/docs/main/SectionTitle.svelte";
    import SubSection from "../components/docs/main/SubSection.svelte";

    const navbar = [
        {
            "title": "General",
            "type": "section",
        },
        {
            "title": "Overview",
            "link": "overview",
            "type": "subsection",
        },
        {
            "title": "Templates",
            "type": "section",
        },
        {
            "title": "Create",
            "link": "templates-create",
            "type": "subsection",
        },
        {
            "title": "Update",
            "link": "templates-update",
            "type": "subsection",
        },
        {
            "title": "Parameters",
            "link": "templates-parameters",
            "type": "subsection",
        },
        {
            "title": "Share",
            "link": "templates-share",
            "type": "subsection",
        },
        {
            "title": "Delete",
            "link": "templates-delete",
            "type": "subsection",
        },
        {
            "title": "Servers",
            "type": "section",
        },
        {
            "title": "Add",
            "link": "servers-add",
            "type": "subsection",
        },
        {
            "title": "Remove",
            "link": "servers-remove",
            "type": "subsection",
        },
        {
            "title": "Alerts",
            "type": "section",
        },
        {
            "title": "Send",
            "link": "alerts-send",
            "type": "subsection",
        },
        {
            "title": "History",
            "link": "alerts-history",
            "type": "subsection",
        },
        {
            "title": "Retry",
            "link": "alerts-retry",
            "type": "subsection",
        },
        {
            "title": "Bot",
            "type": "section",
        },
        {
            "title": "Send alerts",
            "link": "bot-send-alerts",
            "type": "subsection",
        },
        {
            "title": "Prices",
            "link": "bot-prices",
            "type": "subsection",
        },
        {
            "title": "Charts",
            "link": "bot-charts",
            "type": "subsection",
        },
        {
            "title": "News",
            "link": "bot-news",
            "type": "subsection",
        },
        {
            "title": "Whales",
            "link": "bot-whales",
            "type": "subsection",
        },
        {
            "title": "Premium",
            "type": "section",
        },
        {
            "title": "Benefits",
            "link": "premium-benefits",
            "type": "subsection",
        },
        {
            "title": "Manage",
            "link": "premium-manage",
            "type": "subsection",
        },
    ];
    const link = "https://www.alert-bot.xyz";

</script>

<Docs {navbar}>
    <Section title="Alertbot Documentation">
        <SubSection last>
            <SectionText>
                <Paragraph>Alertbot allows you to create templates to enable alerting with maximum customisability. You can fully edit what your alert embed looks like and you can add parameters to the template.</Paragraph>
                <Paragraph>Once you have created all the templates you need you can add servers to alert to. When you see a market opportunity enter values for your preset parameters and send the alert to all servers in one click.</Paragraph>
                <Paragraph>Alertbot saves your alerts so you can view them a reflect back upon past alerts.</Paragraph>
            </SectionText>
            <SectionExample>
                <Header>GET STARTED</Header>
                <Paragraph>Visit the <Link href={link}>alertbot</Link> website to get started</Paragraph>
                <Header>USEFUL LINKS</Header>
                <Paragraph>Join the <Link href="{link}/redirect?link=support-server">support server</Link> to get help with Alertbot and chat with the community</Paragraph>
                <Paragraph>View the <Link href="{link}/legal/terms">terms of service</Link> and <Link href="{link}/legal/privacy">privacy policy</Link></Paragraph>
                <Paragraph>Read the <Link href="{link}/info/blog">blog</Link> or submit a <Link href="{link}/info/review">review</Link></Paragraph>
            </SectionExample>
        </SubSection>
    </Section>
    <Section title="Templates">
        <SubSection>
            <SectionText>
                <Paragraph>Templates allow you to have a preset format to send your alerts with. You are limited to 3 templates with the free plan but you can have unlimited with <Link href="{link}/premiuim">premium</Link>.</Paragraph>
                <Paragraph>You can create, update and delete templates; and add, re-order and remove parameters within your template.</Paragraph>
                <Paragraph>If you are a premium user, you can share and import other peoples templates.</Paragraph>
                <Header>Pre-made templates</Header>
                <Paragraph>Here is a list of pre-made templates you can use. Copy the id and paste it in the import section on the create template page.</Paragraph>
                <Paragraph><Bold>Entry:</Bold> tmp_premade_entry</Paragraph>
                <Paragraph><Bold>Update:</Bold> tmp_premade_comment</Paragraph>
                <Paragraph><Bold>Comment:</Bold> temp_premade_update</Paragraph>
                <Paragraph><Bold>Exit:</Bold> tmp_premade_exit</Paragraph>
            </SectionText>
            <SectionExample>
                <Paragraph>Example of create template</Paragraph>
                <Image src="https://storage.googleapis.com/alertbot-images/documentation_examples/example-create-template.png"/>
            </SectionExample>
        </SubSection>
        <SubSection last>
            <SectionText>
                <SectionTitle id="templates-create">Create</SectionTitle>
                <Paragraph>Visit the <Link href={link}>alertbot</Link> website and navigate to the dashboard. You will be greeted with the templates page where you can either select or create a template.</Paragraph>
                <span class="h-4"></span>
                <Header>Inputs</Header>
                <Divider short />
                <span class="h-4"></span>
                <Attribute
                    name="Name"
                    type="string"
                    required
                >
                    <Paragraph>Name of the template. This has to be unique.</Paragraph>
                </Attribute>
                <Attribute
                    name="Title"
                    type="string"
                >
                    <Paragraph>Title for the embed of the template.</Paragraph>
                </Attribute>
                <Attribute
                    name="Description"
                    type="string"
                >
                    <Paragraph>Description for the embed of the template.</Paragraph>
                </Attribute>
                <Attribute
                    name="Color"
                    type="color"
                >
                    <Paragraph>Color for the embed of the template. e.g #ff0000 is red.</Paragraph>
                </Attribute>
                <Attribute
                    name="Footer"
                    type="string"
                >
                    <Paragraph>Footer text for the embed of the template. Optionally an icon URL for the footer.</Paragraph>
                </Attribute>
                <Attribute
                    name="Thumbnail"
                    type="url"
                >
                    <Paragraph>URL for the thubmnail for the embed of the template.</Paragraph>
                </Attribute>
                <Attribute
                    name="Author"
                    type="string"
                    last
                >
                    <Paragraph>Author name for the embed of the template. Optionally an icon URL for the author.</Paragraph>
                </Attribute>
            </SectionText>
            <SectionExample>
                <Image src="https://storage.googleapis.com/alertbot-images/documentation_examples/example-create-template.png"/>
                <Divider />
                <Paragraph>Example of filled in template form</Paragraph>
                <Image src="https://storage.googleapis.com/alertbot-images/documentation_examples/example-create-template-filled.png"/>
            </SectionExample>
        </SubSection>
    </Section>
</Docs>