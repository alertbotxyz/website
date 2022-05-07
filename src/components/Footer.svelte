<script>
    import Logo from "../components/Logo.svelte";
</script>

<div class="footer mt-32 flex flex-row bg-dark-primary py-16 justify-evenly w-screen">
    <div class="footer-container max-w-xs">
        <Logo />
        <p class="text-gray-400 my-4">Alertbot helps you simplify alerts. Some more extra very long text</p>
        <a
            class="flex flex-row items-center"
            href="mailto:oscarfal2006@gmail.com"
        >
            <i class='bx bx-envelope text-accent' ></i>
            <span class="ml-2 font-bold">contact@alertbot.net</span>
        </a>
    </div>
    <div class="footer-container">
        <span class="link-title">Alertbot</span>
        <a
            class="link"
            href="/redirect?link=bot-invite"
        >
            Invite alertbot
        </a>
        <a
            class="link"
            href="/redirect?link=docs"
        >
            Documentation
        </a>
        <a
            class="link"
            href="/redirect?link=social-github"
        >
            Source code
        </a>
    </div>
    <div class="footer-container">
        <span class="link-title">Company</span>
        <a
            class="link"
            href="/info/about"
        >
            About
        </a>
        <a
            class="link"
            href="/info/blog"
        >
            Blog
        </a>
        <a
            class="link"
            href="/info/changelog"
        >
            Changelog
        </a>
    </div>
    <div class="footer-container">
        <span class="link-title">Support</span>
        <a
            class="link"
            href="/"
        >
            Feedback
        </a>
        <a
            class="link"
            href="/"
        >
            Contact
        </a>
        <a
            class="link"
            href="/redirect?link=support-server"
        >
            Discord server
        </a>
        <a
            class="link"
            href="/"
        >
            Reviews
        </a>
    </div>
    <div class="footer-container">
        <span class="link-title">Legal</span>
        <a
            class="link"
            href="/legal/privacy"
        >
            Privacy Policy
        </a>
        <a
            class="link"
            href="/legal/terms"
        >
            Terms and conditions
        </a>
        <a
            class="link"
            href="/legal/cookies"
        >
            Cookie policy
        </a>
    </div>
    <div class="footer-container">
        <span class="link-title">Socials</span>
        <div class="flex flex-row">
            <a
                class="social"
                href="https://twitter.com/alertbot"
            >
                <i class='bx bxl-twitter' />
            </a>
            <a
                class="social"
                href="https://github.com/alertbot"
            >
                <i class='bx bxl-github' />
            </a>
            <a
                class="social"
                href="https://youtube.com/alertbot"
            >
                <i class='bx bxl-youtube' />
            </a>
            <a
                class="social"
                href="https://facebook.com/alertbot"
            >
                <i class='bx bxl-facebook-circle' />
            </a>
        </div>
        <span class="mt-4 font-bold text-gray-400">© 2022 Alertbot</span>
    </div>
</div>

<style lang="postcss">
    .footer .footer-container {
        @apply flex flex-col;
    }
    .footer .footer-container .link-title {
        @apply text-xl font-bold mb-4;
    }
    .footer .footer-container .link {
        @apply text-gray-400 my-2;
    }
    .footer .footer-container .social {
        @apply flex items-center justify-center h-8 w-8 mr-2 rounded-full border border-solid border-gray-600;
    }
</style>