<script>
    import Navbar from "../components/navigation/Navbar.svelte";
    import Footer from "../components/Footer.svelte";
</script>

<div class="flex flex-col items-center">
    <Navbar />
    <div class="flex flex-col mb-16">
        <div class="flex flex-row items-center w-full mt-48 justify-evenly px-96">
            <div class="mx-20">
                <h1 class="text-8xl">Alertbot</h1>
                <p class="text-2xl my-8 w-96 text-gray-300">Create presets and templates for seemless alerting.</p>
                <div class="flex flex-row">
                    <a
                        href="/"
                        class="button-links bg-gray-500 mr-4"
                    >
                        Invite
                    </a>
                    <a
                        href="/"
                        class="button-links bg-indigo-500 ml-4"
                    >
                        Features
                    </a>
                </div>
            </div>
            <img
                src="https://cdn.discordapp.com/attachments/972228240636772412/972236997320142908/dashboard-create-template.png"
                alt="alertbot-dashboard"
                class="example-image rounded-md mx-20 border border-solid border-dark-primary"
            />
        </div>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300"><path fill="#363C4E" fill-opacity="1" d="M0,128L60,144C120,160,240,192,360,186.7C480,181,600,139,720,133.3C840,128,960,160,1080,181.3C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
    <div class="w-screen flex flex-col items-center bg-light-primary">
        <div class="features flex flex-col items-center">
            <span class="text-accent">ALERTBOT</span>
            <span class="text-5xl font-bold my-4">A better way to alert</span>
            <div class="grid grid-cols-2 grid-rows-2 my-4">
                <div class="feature">
                    <i class='bx bxs-dashboard icon'></i>
                    <div class="flex flex-col">
                        <span class="title">Create templates</span>
                        <p class="description">Alertbot allows you to create templates to enable seemless . Alertbot allows you to create templates to enable seemless structured alerts.</p>
                    </div>
                </div>
                <div class="feature">
                    <i class='bx bxs-dashboard icon'></i>
                    <div class="flex flex-col">
                        <span class="title">Create templates</span>
                        <p class="description">Alertbot allows you to create templates to enable seemless . Alertbot allows you to create templates to enable seemless structured alerts.</p>
                    </div>
                </div>
                <div class="feature">
                    <i class='bx bxs-dashboard icon'></i>
                    <div class="flex flex-col">
                        <span class="title">Create templates</span>
                        <p class="description">Alertbot allows you to create templates to enable seemless . Alertbot allows you to create templates to enable seemless structured alerts.</p>
                    </div>
                </div>
                <div class="feature">
                    <i class='bx bxs-dashboard icon'></i>
                    <div class="flex flex-col">
                        <span class="title">Create templates</span>
                        <p class="description">Alertbot allows you to create templates to enable seemless . Alertbot allows you to create templates to enable seemless structured alerts.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300"><path fill="#363C4E" fill-opacity="1" d="M0,256L60,245.3C120,235,240,213,360,192C480,171,600,149,720,160C840,171,960,213,1080,213.3C1200,213,1320,171,1380,149.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
    <div class="showcase mt-32 flex flex-col items-center">
        <div class="example flex-row">
            <div>
                <span class="font-bold text-5xl">Templates</span>
                <p class="mt-4 mb-8 text-gray-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores nihil accusamus perspiciatis deserunt, laboriosam hic facere asperiores delectus, ipsam facilis est totam nostrum illum quidem harum culpa! Consectetur, aut ea.</p>
                <a
                    href="/dashboard/tempates/send-alert"
                    class="bg-accent py-2 px-4 rounded-md"
                >
                    Create a template
                </a>
            </div>
            <img
                src="https://cdn.discordapp.com/attachments/972228240636772412/972420568836104222/send-alert.png"
                alt="send-alert-example"
                class="example-image"
            />
        </div>
        <div class="example flex-row-reverse">
            <div>
                <span class="font-bold text-5xl">Alerts</span>
                <p class="mt-4 mb-8 text-gray-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores nihil accusamus perspiciatis deserunt, laboriosam hic facere asperiores delectus, ipsam facilis est totam nostrum illum quidem harum culpa! Consectetur, aut ea.</p>
                <a
                    href="/dashboard/tempates/send-alert"
                    class="bg-accent py-2 px-4 rounded-md"
                >
                    Send an alert
                </a>
            </div>
            <img
                src="https://cdn.discordapp.com/attachments/972228240636772412/972420568836104222/send-alert.png"
                alt="send-alert-example"
                class="example-image"
            />
        </div>
        <div class="example flex-row">
            <div>
                <span class="font-bold text-5xl">Servers</span>
                <p class="mt-4 mb-8 text-gray-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores nihil accusamus perspiciatis deserunt, laboriosam hic facere asperiores delectus, ipsam facilis est totam nostrum illum quidem harum culpa! Consectetur, aut ea.</p>
                <a
                    href="/dashboard/tempates/send-alert"
                    class="bg-accent py-2 px-4 rounded-md"
                >
                    Add a server
                </a>
            </div>
            <img
                src="https://cdn.discordapp.com/attachments/972228240636772412/972420568836104222/send-alert.png"
                alt="send-alert-example"
                class="example-image"
            />
        </div>
        <div class="example flex-row-reverse">
            <div>
                <span class="font-bold text-5xl">Discord Bot</span>
                <p class="mt-4 mb-8 text-gray-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores nihil accusamus perspiciatis deserunt, laboriosam hic facere asperiores delectus, ipsam facilis est totam nostrum illum quidem harum culpa! Consectetur, aut ea.</p>
                <a
                    href="/dashboard/tempates/send-alert"
                    class="bg-accent py-2 px-4 rounded-md"
                >
                    Invite alertbot
                </a>
            </div>
            <img
                src="https://cdn.discordapp.com/attachments/972228240636772412/972420568836104222/send-alert.png"
                alt="send-alert-example"
                class="example-image"
            />
        </div>
        <!--
            Showcase:
    
            Alert - Send alert in dashboard and alert sent in channel
            Templates - Create templates dashboard
            Server groups - List of servers dashboard
            Bot - Send alerts from bot discord, see financial data discord
        -->
    </div>
    <!-- 
        CTA
    -->
    <Footer />
</div>

<style lang="postcss">
    .button-links {
        @apply rounded-md flex items-center justify-center text-white text-xl py-3 w-48;
    }
    .example-image {
        width: 600px;
    }
    .features {
        max-width: 1400px;
    }
    .features .feature {
        @apply flex flex-row mt-16 mx-4;
    }
    .features .feature .icon {
        @apply bg-accent rounded-md h-12 px-3 flex items-center justify-center mr-4 text-2xl;
    }
    .features .feature .title {
        @apply mb-2 text-2xl font-bold;
    }
    .features .feature .description {
        @apply text-gray-400 text-lg;
    }
    .showcase .example {
        @apply flex items-center justify-evenly px-64 mb-24;
    }
    .showcase .example-image {
        width: 500px;
        @apply mx-24;
    }
</style>