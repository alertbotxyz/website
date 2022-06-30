import preprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";

export default {
  extensions: [ ".svelte" ],
  preprocess: [
    preprocess({
      postcss: true,
    }),
    mdsvex({ extension: "md" })
  ],
};