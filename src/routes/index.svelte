<script>
    import { fade } from 'svelte/transition';
    import { getWithExpiry, setWithExpiry } from "../utils/localstorage";
    import data from "../utils/data";
    import Navbar from "../components/navigation/Navbar.svelte";
    import "../styles/index.css";

    $: betaAcknowledged = getWithExpiry("betaAcknowledged") == "true";

    const acknowledgeBeta = () => {
        setWithExpiry("betaAcknowledged", "true", 60000 * 60 * 24 * 7);
        betaAcknowledged = true;
    };
</script>

{#if !betaAcknowledged}
    <div
        class="beta"
        transition:fade
    >
        <div class="flex flex-col">
            <span class="text-xl font-bold md:text-base">Alerbot is in beta</span>
            <span class="text-gray-400 pr-4 md:text-sm">Alertbot is still in beta and as such issues are expected. If you find any bugs report them in the support server.</span>
        </div>
        <div class="flex flex-row md:mt-4 xs:flex-col">
            <a
                href="/redirect?link=support-server"
                class="bg-light-primary link"
            >
                Support Server
            </a>
            <span
                class="hover:cursor-pointer bg-accent link"
                on:click={acknowledgeBeta}
            >
                Accept
            </span>
        </div>
    </div>
{/if}

<div class="flex flex-col items-center">
    <Navbar>
        <div class="flex flex-col mb-16">
            <div class="flex flex-row lg:flex-col items-center w-full mt-48 lg:mt-24 justify-evenly px-96">
                <div class="mx-20 flex flex-col sm:mx-0 lg:items-center lg:text-center">
                    <h1 class="text-8xl sm:text-6xl text-gray-600 dark:text-white">Alertbot</h1>
                    <p class="text-2xl my-8 w-96 md:w-84 md:items-center text-gray-600 dark:text-gray-300 xs:px-8">{data.core.about}</p>
                    <div class="flex flex-row sm:flex sm:flex-col">
                        <a
                            href="/redirect?link=bot-invite"
                            class="button-links bg-gray-500 mr-4"
                        >
                            Invite
                        </a>
                        <a
                            href="#features"
                            class="button-links bg-indigo-500 ml-4"
                        >
                            Features
                        </a>
                    </div>
                </div>
                <img
                    src={data.images.create_template_example}
                    alt="alertbot-dashboard-example"
                    class="w-6xx lg:w-8xx md:w-6xx sm:w-4xx xs:w-3xx rounded-md mx-20 lg:my-20 md:my-16"
                />
            </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300"><path fill="#363C4E" fill-opacity="1" d="M0,128L60,144C120,160,240,192,360,186.7C480,181,600,139,720,133.3C840,128,960,160,1080,181.3C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        <div class="home w-screen flex flex-col items-center bg-light-primary">
            <div class="features flex flex-col items-center">
                <span class="text-accent lg:text-xl">ALERTBOT</span>
                <span class="text-5xl text-center lg:text-6xl md:text-5xl sm:text-4xl font-bold my-4 xs:text-3xl">A better way to alert</span>
                <div class="grid grid-cols-2 grid-rows-2 my-4 lg:px-16 sm:px-2 sm:grid-cols-1">
                    {#each data.features as feature}
                        <div class="feature">
                            <img
                                src="/icons/{feature.icon}.svg" 
                                alt="{feature.title} icon"
                                class="bg-accent rounded-md h-12 w-12 p-2 mr-4"
                            />
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
        <div
            class="showcase mt-32 flex flex-col items-center px-64 xl:px-16"
            id="features"
        >
            {#each data.features as feature, i}
                <div class="example {i % 2 !== 1 ? "flex-row" : "flex-row-reverse"} md:flex-col">
                    <div class="sm:max-w-xs xs:px-6">
                        <span class="font-bold text-5xl sm:text-3xl">{feature.title}</span>
                        <p class="mt-4 mb-8 text-gray-400 xs:text-sm">{feature.description}</p>
                        <a
                            href="{feature.action.url}"
                            class="bg-accent py-2 px-4 rounded-md"
                        >
                            {feature.action.text}
                        </a>
                    </div>
                    <img
                        src={feature.imageUrl}
                        alt="{feature.title} example"
                        class="example-image md:mt-16 sm:max-w-xs"
                    />
                </div>
            {/each}
        </div>
        <!-- <h1 class="text-6xl mt-32">Testimonials</h1>
        <div class="grid grid-cols-2 gap-8 gap-x-16 mb-48 mt-16 lg:gap-x-8 lg:gap-y-4 md:grid-cols-1 md:gap-y-8 2xs:px-4">
            <div class="flex flex-col">
                <div class="bg-light-primary px-6 pt-2 pb-4 rounded-md w-6xx flex flex-col lg:w-4xx md:w-5xx 2xs:w-full">
                    <span class="flex flex-row justify-end items-center w-full text-gray-400 font-bold text-4xl opacity-20 h-6 pt-4">"</span>
                    <span class="font-bold lg:text-sm">I've been using alertbot for 18 months. The quaility and speed at which I can get alerts out is unmatched to any alertbot I've ever used. This is how it makes me even more money</span>
                </div>
                <div class="flex flex-row items-center mt-4">
                    <img
                        src="/images/logo.png"
                        alt="avatar"
                        class="w-10 rounded-full"
                    />
                    <span class="text-accent font-bold ml-2">atom#6969</span>
                </div>
            </div>
        </div> -->
        <div class="flex flex-col items-center my-16 w-full bg-light-primary py-16">
            <div class="flex flex-col items-center w-9xx text-center lg:w-7xx md:w-5xx 2xs:w-full md:px-4">
                <span class="text-5xl font-bold md:text-4xl 2xs:w-full xs:text-2xl">Get alerts to your users <span class="text-accent">faster than ever</span></span>
                <span class="text-gray-400 text-xl mt-4 text-center w-7xx md:w-5xx md:text-base 2xs:w-full xs:text-sm">Alerting, made easy. Alertbot allows you to get alerts out to your users with maximum simplicity and minimum latency. Get started now.</span>
                <div class="flex flex-row mt-8 xs:flex-col">
                    <a
                        href="/premium"
                        class="bg-accent px-6 py-4 md:py-2 rounded-md text-xl font-bold mr-4 xs:mr-0 xs:mb-4"
                    >
                        Get Started
                    </a>
                    <a
                        href="/docs"
                        class="bg-dark-primary px-6 py-4 md:py-2 rounded-md text-xl font-bold ml-4 xs:ml-0"
                    >
                        Learn More
                    </a>
                </div>
            </div>
        </div>
    </Navbar>
</div>