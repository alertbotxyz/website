<script>
    import Navbar from "../components/navigation/Navbar.svelte";
    import Footer from "../components/footer/Footer.svelte";
    import data from "../utils/data";
    import "../styles/index.css";
</script>

<div class="flex flex-col items-center">
    <Navbar>
        <div class="flex flex-col mb-16">
            <div class="flex flex-row lg:flex-col items-center w-full mt-48 lg:mt-24 justify-evenly px-96">
                <div class="mx-20 flex flex-col sm:mx-0 lg:items-center lg:text-center">
                    <h1 class="text-8xl sm:text-6xl text-gray-600 dark:text-white">Alertbot</h1>
                    <p class="text-2xl my-8 w-96 md:w-84 md:items-center text-gray-600 dark:text-gray-300">{data.core.about}</p>
                    <div class="flex flex-row sm:flex sm:flex-col">
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
                    src="https://storage.googleapis.com/alertbot-images/alertbot_create_template.png"
                    alt="alertbot-dashboard"
                    class="w-6xx lg:w-8xx md:w-6xx sm:w-4xx xs:w-3xx rounded-md mx-20 lg:my-20 md:my-16"
                />
            </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300"><path fill="#363C4E" fill-opacity="1" d="M0,128L60,144C120,160,240,192,360,186.7C480,181,600,139,720,133.3C840,128,960,160,1080,181.3C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        <div class="home w-screen flex flex-col items-center bg-light-primary">
            <div class="features flex flex-col items-center">
                <span class="text-accent lg:text-xl">ALERTBOT</span>
                <span class="text-5xl text-center lg:text-6xl md:text-5xl sm:text-4xl font-bold my-4">A better way to alert</span>
                <div class="grid grid-cols-2 grid-rows-2 my-4 lg:px-16 sm:px-2 sm:grid-cols-1">
                    {#each data.features as feature}
                        <div class="feature">
                            <i class="bx {feature.icon}"></i>
                            <div class="flex flex-col">
                                <span class="title">{feature.title}</span>
                                <p class="description">{feature.description}</p>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300"><path fill="#363C4E" fill-opacity="1" d="M0,256L60,245.3C120,235,240,213,360,192C480,171,600,149,720,160C840,171,960,213,1080,213.3C1200,213,1320,171,1380,149.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
        <div class="showcase mt-32 flex flex-col items-center px-64 xl:px-16">
            {#each data.features as feature, i}
                <div class="example {i % 2 !== 1 ? "flex-row" : "flex-row-reverse"} md:flex-col">
                    <div class="sm:max-w-xs">
                        <span class="font-bold text-5xl sm:text-3xl">{feature.title}</span>
                        <p class="mt-4 mb-8 text-gray-400">{feature.description}</p>
                        <a
                            href="{feature.action.url}"
                            class="bg-accent py-2 px-4 rounded-md"
                        >
                            {feature.action.text}
                        </a>
                    </div>
                    <img
                        src={feature.imageUrl}
                        alt="send-alert-example"
                        class="example-image md:mt-16 sm:max-w-xs"
                    />
                </div>
            {/each}
        </div>
        <!-- 
            CTA
        -->
    </Navbar>
</div>