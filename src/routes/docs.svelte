<script>
    import Docs from "../components/docs/Docs.svelte";
    import Attribute from "../components/docs/main/Attribute.svelte";
import AttributesHeader from "../components/docs/main/AttributesHeader.svelte";
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
            "title": "Errors",
            "link": "alerts-errors",
            "type": "subsection",
        },
        {
            "title": "History",
            "link": "alerts-history",
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
                <Paragraph>Templates allow you to have a preset format to send your alerts with. You are limited to 3 templates with the free plan but you can have unlimited with <Link href="{link}/info/premiuim">premium</Link>.</Paragraph>
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
        <SubSection>
            <SectionText>
                <SectionTitle id="templates-create">Create</SectionTitle>
                <Paragraph>Visit the <Link href={link}>alertbot</Link> website and navigate to the dashboard. You will be greeted with the templates page where you can either select or create a template.</Paragraph>
                <AttributesHeader title="Inputs" />
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
        <SubSection>
            <SectionText>
                <SectionTitle id="templates-update">Update</SectionTitle>
                <Paragraph>To update a template visit the templates page and select a template. From there you will see a similar form to the one you did when creating a template. Editing any data of the template (including parameters) will result in a box popping up from the bottom prompting you to save changes. No changes will be saved until the “save changes” button pressed. To reset your template back to default press the “reset” button.</Paragraph>
            </SectionText>
            <SectionExample>
                <Paragraph>Example of update template</Paragraph>
                <!-- <Image src=""/> -->
            </SectionExample>
        </SubSection>
        <SubSection>
            <SectionText>
                <SectionTitle id="templates-parameters">Parameters</SectionTitle>
                <Paragraph>You can add parameters to your template which you fill in when alerting. This is useful for different bits of data you want to have on your alert such as Ticker or Entry price. You can choose whether to have a bold title or no title at all for each parameter.</Paragraph>
                <Paragraph>When adding, re-ordering or removing any parameter it counts as a change to the template, so a box will pop up from the bottom. No parameter changes will be saved until you press the “save changes” button.</Paragraph>
                <AttributesHeader title="Inputs" />
                <Attribute
                    name="Name"
                    type="string"
                    required
                >
                    <Paragraph>Name of the parameter.</Paragraph>
                </Attribute>
                <Attribute
                    name="With title"
                    type="boolean"
                >
                    <Paragraph>Whether you want there to be a title for the input.</Paragraph>
                </Attribute>
                <Attribute
                    name="Bold title"
                    type="boolean"
                    last
                >
                    <Paragraph>Whether you want the title to be bold.</Paragraph>
                </Attribute>
            </SectionText>
            <SectionExample>
                <Paragraph>Example of parameters</Paragraph>
                <!-- <Image src=""/> -->
            </SectionExample>
        </SubSection>
        <SubSection>
            <SectionText>
                <SectionTitle id="templates-share">Share</SectionTitle>
                <Paragraph>Alertbot allows you to share and import other peoples templates.</Paragraph>
                <Header>Share</Header>
                <Paragraph>To share your template visit the templates page, select a template and press the “share” button. This will copy it's id to your clipboard.</Paragraph>
                <Header>Import</Header>
                <Paragraph>To import a template visit the create template page and paste in your copied template id into the import section.</Paragraph>
            </SectionText>
            <SectionExample>
                <Paragraph>Example of share template</Paragraph>
                <!-- <Image src=""/> -->
            </SectionExample>
        </SubSection>
        <SubSection last>
            <SectionText>
                <SectionTitle id="templates-delete">Delete</SectionTitle>
                <Paragraph>To delete a template simply visit the templates page, select a template, press the “delete” button and confirm.</Paragraph>
            </SectionText>
            <SectionExample>
                <Paragraph>Example of delete template</Paragraph>
                <!-- <Image src=""/> -->
            </SectionExample>
        </SubSection>
    </Section>
    <Section title="Servers">
        <SubSection>
            <SectionText>
                <Paragraph>You can add your bot to any server so you can send alerts to multiple servers at once. You are limited to 5 servers with the free plan and 100 servers with the premium. Upgrading to extra (coming soon) will allow you to alert to unlimited servers at once.</Paragraph>
            </SectionText>
        </SubSection>
        <SubSection>
            <SectionText>
                <SectionTitle id="servers-add">Add</SectionTitle>
                <Paragraph>To add a server go to the servers tab and select a guild, the alert channel and optionally a mention role (this role will be pinged every time you send an alert).</Paragraph>
                <Paragraph>To add a server your both your bot and you must have permissions to view the channel and send messages to it. You can alert to multiple different channels in the same guild but you cannot alert to the same channel.</Paragraph>
                <Paragraph>When you add a channel the bot will send a message in the channel confirming the addition. You can see a list in the servers tab. Hover over (or press if you’re on mobile) the name of the guild, channel or mention role to view it’s id.</Paragraph>
            </SectionText>
            <SectionExample>
                <Paragraph>Example of add server</Paragraph>
                <!-- <Image src=""/> -->
            </SectionExample>
        </SubSection>
        <SubSection last>
            <SectionText>
                <SectionTitle id="servers-remove">Remove</SectionTitle>
                <Paragraph>To remove a channel go to the servers tab, press the “delete” button on the server you want to delete and confirm.</Paragraph>
            </SectionText>
            <SectionExample>
                <Paragraph>Example of delete server</Paragraph>
                <!-- <Image src=""/> -->
            </SectionExample>
        </SubSection>
    </Section>
    <Section title="Alerts">
        <SubSection>
            <SectionText>
                <SectionTitle id="alerts-send">Send</SectionTitle>
                <Paragraph>To send an alert go to the send alert tab and select a template to alert with. You can fill in your parameters and you can see a preview of your alert on the right side. You can also paste a URL for an image to display on the embed.</Paragraph>
                <Paragraph>Once you are ready to send press the “send alert” button. You will have to wait a few seconds before you get a confirmation message showing how many servers it successfully sent to.</Paragraph>
            </SectionText>
            <SectionExample>
                <Paragraph>Example of send alert</Paragraph>
                <Paragraph>Example of send filled</Paragraph>
                <!-- <Image src=""/> -->
            </SectionExample>
        </SubSection>
        <SubSection>
            <SectionText>
                <SectionTitle id="alerts-errors">Errors</SectionTitle>
                <Paragraph>If there are any errors sending an alert a pop up come from the side of the screen listing what servers had errors and what the errors are. In the case of errors you have 15 minutes to retry send the alert.</Paragraph>
                <Paragraph>To retry an alert, visit your account page and navigate to the alert history. You will see a list of alerts and the most recent one should be first. Pressing on the alert will show you extra data about the alert such as date and shows you a preview of the alert embed. You will also see a list of servers the alert sent to and whether they were successful or not. If not the error message will display along with a “retry” button which you can press to retry the alert to the specific server. You can also press the “retry all” button to retry all failed servers.</Paragraph>
            </SectionText>
            <SectionExample>
                <Paragraph>Example of error message</Paragraph>
                <Paragraph>Example of retry alert</Paragraph>
                <!-- <Image src=""/> -->
            </SectionExample>
        </SubSection>
        <SubSection last>
            <SectionText>
                <SectionTitle id="alerts-history">History</SectionTitle>
                <Paragraph>To view your alert history visit your account page and scroll down to the “alert history” section. You will see some stats like templates created, servers added and alerts sent. You will also see a list of your 20 most recent alerts. You can go to the bottom to view more alerts if you have sent more than 20.</Paragraph>
                <Paragraph>You can click on each alert to get more information about the alert like exact date and a list of servers sent to along with any errors.</Paragraph>
            </SectionText>
            <SectionExample>
                <Paragraph>Example of alert history</Paragraph>
                <Paragraph>Example of in-depth alert</Paragraph>
                <!-- <Image src=""/> -->
            </SectionExample>
        </SubSection>
    </Section>
    <!-- <Section title="Bot">
        <SubSection>
            <SectionText>
                <Paragraph>Bot coming soon...</Paragraph>
            </SectionText>
            <SectionExample>
                <Paragraph>Bot examples coming soon...</Paragraph>
            </SectionExample>
        </SubSection>
    </Section> -->
    <Section title="Premium">
        <SubSection>
            <SectionText>
                <Paragraph>Alertbot is free to use but it offers paid subscriptions of premium at $9.99/month for alerters who send alerts to many servers and extra (coming soon) at $19.99/month. Get started with <Link href="{link}/info/premium">premium</Link> now!</Paragraph>
            </SectionText>
        </SubSection>
        <SubSection>
            <SectionText>
                <SectionTitle id="premium-benefits">Benefits</SectionTitle>
                <Header>Premium</Header>
                <Paragraph>Alertbot premium offers many benefits and is useful for alerts who send alerts to many severs. It costs $9.99/month.</Paragraph>
                <Paragraph><Bold>Monthly Alerts</Bold> - Without premium you can only send up to 100 alerts in a month but with premium this goes up to unlimited.</Paragraph>
                <Paragraph><Bold>View alert history</Bold> - Alertbot premium allows you to view your alert history and therefore retry alerts.</Paragraph>
                <Paragraph><Bold>Templates</Bold> - Alertbot premium allows you to create unlimited templates as opposed to 3.</Paragraph>
                <Paragraph><Bold>Import/Export</Bold> - Alertbot premium allows you to import and share your templates.</Paragraph>
                <Paragraph><Bold>Server Limit</Bold> - Alertbot premium allows you to add 100 servers as opposed to 5 and that becomes unlimited with extra.</Paragraph>
                <Paragraph><Bold>Exclusive discord role</Bold> - Buying alertbot premium allows you to get an exclusive “premium” role on the Alertbot [support server]().</Paragraph>
                <Paragraph><Bold>Prority support</Bold> - Alertbot premium members are offered priority support.</Paragraph>
                <Header>Extra</Header>
                <Paragraph>Coming soon...</Paragraph>
            </SectionText>
            <SectionExample>
                <Paragraph>Pricing table image</Paragraph>
                <!-- <Image src=""/> -->
            </SectionExample>
        </SubSection>
        <SubSection last>
            <SectionText>
                <SectionTitle id="premium-manage">Manage</SectionTitle>
                <Paragraph>To manage your alertbot subscription (view, upgrade or cancel), visit your account page.</Paragraph>
            </SectionText>
            <SectionExample>
                <Paragraph>Account subscription manage</Paragraph>
                <!-- <Image src=""/> -->
            </SectionExample>
        </SubSection>
    </Section>
</Docs>