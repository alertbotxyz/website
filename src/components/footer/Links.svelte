<script>
    import data from "../../utils/data";
    import "./footer.css";
</script>

<div class="flex flex-row w-full justify-around items-start 2xs:grid grid-cols-2 tiny:grid-cols-1 grid-rows-2 place-items-center">
    <div class="footer-container link-container tiny:items-center">
        <span class="link-title">Alertbot</span>
        <a
            class="link"
            href="/redirect?link=bot-invite"
        >
            Invite alertbot
        </a>
        <a
            class="link"
            href="/redirect?link=support-server"
        >
            Support server
        </a>
        <a
            class="link"
            href="/redirect?link=social-github"
        >
            Source code
        </a>
        <a
            class="link"
            href="/premium"
        >
            Premium
        </a>
    </div>
    <div class="footer-container link-container tiny:items-center">
        <span class="link-title">Company</span>
        <a
            class="link"
            href="/redirect?link=about"
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
    <div class="footer-container link-container tiny:items-center">
        <span class="link-title">Support</span>
        <a
            class="link"
            href="mailto:{data.core.contact.email}"
        >
            Contact
        </a>
        <a
            class="link"
            href="mailto:{data.core.contact.feedback}"
        >
            Feedback
        </a>
        <a
            class="link"
            href="/redirect?link=support-server"
        >
            Discord server
        </a>
        <a
            class="link"
            href="/info/reviews"
        >
            Reviews
        </a>
    </div>
    <div class="footer-container link-container tiny:items-center">
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
            Terms of service
        </a>
        <a
            class="link"
            href="/legal/cookies"
        >
            Cookie policy
        </a>
        <a
            class="link"
            href="/legal/refunds"
        >
            Refund Policy
        </a>
    </div>
</div>