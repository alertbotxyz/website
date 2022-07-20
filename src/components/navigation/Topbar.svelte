<script>
    import { afterUrlChange } from "@roxi/routify";

    export let context;
    export let path
    export let links = [];

    const getEndpoint = route => route.allFragments[route.allFragments.length - 1].urlFragment;

    $: endpoint = getEndpoint(context.route);
    $afterUrlChange(({ route }) => endpoint = getEndpoint(route));

    $: console.log(endpoint);
</script>

<div class="flex flex-col pt-16 h-full">
    <div class="flex flex-col items-center w-full mb-16 border-x-0">
        <div class="flex flex-row justify-center w-10xx lg:w-11/12 md:flex-col">
            {#each links as link}
                <a
                    class="tab {endpoint === link.endpoint.replace("/", "") && "active"}"
                    href="/dashboard{path}{link.endpoint}"
                >
                    {link.name}
                </a>
            {/each}
        </div>
    </div>
    <slot />
</div>

<style lang="postcss">
    .tab {
        @apply border-b-2 border-x-0 border-t-0 border-solid border-gray-500 py-4 text-center font-bold w-full transition-all;
    }
    .tab.active {
        @apply border-accent text-accent;
    }
</style>