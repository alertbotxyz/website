import routify from '@roxi/routify/vite-plugin'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

export default defineConfig({
    clearScreen: false,
    plugins: [
        routify({ devHelper: false }),
        svelte(),
    ],
    server: { port: 1337 },
});
