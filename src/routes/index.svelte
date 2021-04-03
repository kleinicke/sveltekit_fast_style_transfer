<main>
	<h1>Fast Neural Style Transfer using ONNX.js</h1>
	<h4>
		On this site you can run a fast style transfer locally in your browser with either
		<a href="/example">a preset image</a>
		or you can choose <a href="/yourImage">your own image</a>.<br /><br />
		Additionally all you need to do to run your own pytorch model in a browser using ONNX.js and svelte
		is explained <a href="/tutorial">in an tutorial</a>.
		<br /><br />
		This is a technology demonstration website and the style transfer does not give you the best possible
		performance. The model is adapted to work with ONNX.js. Therefore the style transfer is very detailed,
		but does only do a reasonable job.
	</h4>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4rem;
		font-weight: 100;
		line-height: 1.1;
		margin: 4rem auto;
		max-width: 14rem;
	}
	h4 {
		margin-right: 15%;
		margin-left: 15%;
	}

	@media (min-width: 480px) {
		h1 {
			max-width: none;
		}
	}
</style>
