<script>
	import { prepareAndRunStyle, drawCanvas } from '../runStyle'; //
	import { onMount } from 'svelte';

	// import('/modules/my-module.js')
	// .then((module) => {
	// 	// Do something with the module.
	// });

	let hasLoaded = false;
	let canvasSize = 135;
	let style = 'gogh'; //"candy" "rain"
	let contentImage = 'birds';
	// $: if (typeof window !== 'undefined') {
	$: drawCanvas(contentImage + '.jpg', 'contentCanvas', canvasSize, hasLoaded);
	$: drawCanvas(style + '.jpg', 'styleCanvas', 200, hasLoaded);

	$: prepareAndRunStyle(contentImage + '.jpg', 'resultCanvas', canvasSize, style, hasLoaded);
	// }
	onMount(() => {
		hasLoaded = true;
	});
</script>

<main>
	<h2>Lets perform a style transfer on a pre-selected image</h2>
	<canvas id="styleCanvas" width={200} height={200} />
	<h3>You can change style and size:</h3>
	<label>
		Style:
		<input type="radio" bind:group={style} value="gogh" />
		Van Gogh
		<input type="radio" bind:group={style} value="candy" />
		Candy
		<input type="radio" bind:group={style} value="rain" />
		Rain Princess
	</label>
	<br />
	Size:
	{#each [135, 200, 300, 350, 500] as value}
		<input type="radio" bind:group={canvasSize} {value} />&emsp;{value}&emsp;
	{/each}
	px in both dimensions.
	<br />
	The maximum possible size depends on your device. Large sizes might lead to problems.
	<br />
	Content image:
	<label>
		Style:
		<input type="radio" bind:group={contentImage} value="birds" />
		Birds
		<input type="radio" bind:group={contentImage} value="neckar" />
		Neckar
		<input type="radio" bind:group={contentImage} value="castle" />
		Castle
	</label>
	<br /><br />

	<canvas id="contentCanvas" width={canvasSize} height={canvasSize} />
	<canvas id="resultCanvas" width={canvasSize} height={canvasSize} />

	<h2>The complete style transfer is run locally on your computer.</h2>

	<h2>
		The code of this website is available <a
			href="https://github.com/kleinicke/fast_web_style_transfer">on GitHub</a
		>
		and a first version of the tutorial <a href="/tutorial">is available here.</a>
	</h2>
</main>

<style>
	main {
		text-align: center;
	}
</style>
