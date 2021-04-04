// const sveltePreprocess = require('svelte-preprocess');
const node = require('@sveltejs/adapter-node')
const netlify = require(`@sveltejs/adapter-netlify`)
const pkg = require('./package.json')
const { mdsvex } = require(`mdsvex`)

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  extensions: [`.svelte`, '.svx'],
  preprocess: mdsvex(),
  kit: {
    // By default, `npm run build` will create a standard Node app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    // adapter: netlify(),
    adapter: node(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',

    vite: {
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {}),
      },
    },
  },
}
