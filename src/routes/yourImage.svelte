<script>
	import { prepareAndRunStyle, drawCanvas } from '../runStyle';
	import { onMount } from 'svelte';

	let hasLoaded = false;
	let fileSelected = false;
	let selectedImg = '';
	let canvasSize = 135;
	let style = 'gogh'; //"candy" "rain"

	$: drawCanvas(selectedImg, 'contentCanvas', canvasSize, fileSelected);
	$: drawCanvas(style + '.jpg', 'styleCanvas', 200, hasLoaded);

	$: prepareAndRunStyle(selectedImg, 'resultCanvas', canvasSize, style, fileSelected);

	onMount(async () => {
		hasLoaded = true;
		document.querySelector('input[type="file"]').addEventListener('change', function () {
			if (this.files && this.files[0]) {
				selectedImg = URL.createObjectURL(this.files[0]);
				fileSelected = true;
			}
		});
	});
</script>

<main>
	<h2>Lets perform a style transfer on a pre-selected image</h2>
	<canvas id="styleCanvas" width={200} height={200} />
	<h3>Choose a style, size and your own content image and see the result:</h3>
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
	px in both dimensions. <br />
	Content image: <input type="file" />
	<br />
	The maximum possible size depends on your device. Large sizes might lead to problems.
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
