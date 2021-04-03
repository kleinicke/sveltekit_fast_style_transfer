<script>
	import { prepareAndRunStyle, drawCanvas } from '$lib/runStyle.js'; //
	// import SvelteMarkdown from "svelte-markdown";
	import Nav from '$lib/Nav.svelte';
	import { onMount } from 'svelte';

	// import Tutorial from "./Tutorial.svelte";
	let initFinished = false;
	const initialSize = 135;
	let imageSize = initialSize; // options are 135, 270, 360 and 540
	let exampleSize = initialSize;

	const initialStyle = 'gogh'; //"candy" "rain"
	let style = initialStyle;
	let exampleStyle = initialStyle;

	$: drawCanvas('birds.jpg', 'fixedCanvas', exampleSize, initFinished);
	$: drawCanvas(exampleStyle + '.jpg', 'styleCanvas', 200, initFinished);

	$: prepareAndRunStyle('birds.jpg', 'fixedStyleCanvas', exampleSize, exampleStyle);

	onMount(async () => {
		initFinished = true;
	});
</script>

<Nav />
<main>
	<h2>Lets perform a style transfer on a pre-selected image</h2>
	<canvas id="styleCanvas" width={200} height={200} />
	<h3>You can change style and size:</h3>
	<label>
		Style:
		<input type="radio" bind:group={exampleStyle} value="gogh" />
		Van Gogh
		<input type="radio" bind:group={exampleStyle} value="candy" />
		Candy
		<input type="radio" bind:group={exampleStyle} value="rain" />
		Rain Princess
	</label>
	<br />
	Size:
	{#each [135, 200, 300, 350, 500] as value}
		<input type="radio" bind:group={exampleSize} {value} />&emsp;{value}&emsp;
	{/each}
	px in both dimensions.
	<br />
	The maximum possible size depends on your device. Large sizes might lead to problems.
	<br /><br />

	<canvas id="fixedCanvas" width={exampleSize} height={exampleSize} />
	<canvas id="fixedStyleCanvas" width={initialSize} height={exampleSize} />

	<h2>The complete style transfer is run locally on your computer.</h2>

	<h2>
		The code of this website is available <a
			href="https://github.com/kleinicke/fast_web_style_transfer">on GitHub</a
		>
		and a first version of the tutorial <a href="/tutorial">is available here.</a>
	</h2>
</main>

<!-- <Tutorial /> -->
<style>
	main {
		text-align: center;
	}
</style>
