<script lang="ts">
	import GradientChaseLine from '$lib/components/GradientChaseLine.svelte';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	onMount(() => {
		const b1 = 'linear-gradient(0deg, #42b883, #678abd, #8b5cf6, #628df7, #38bdf8, #3dbbbe';
		const b2 = 'linear-gradient( 0deg, #3dbbbe, #38bdf8, #628df7, #8b5cf6, #678abd, #42b883)';

		gsap.fromTo(
			'.name-line',
			{ backgroundImage: b1 },
			{ ease: 'none', duration: 4, backgroundImage: b2, repeat: -1, yoyo: true }
		);
	});
</script>

<section class="position-relative pt-10 md:pt-20">
	<div class="">
		<h1
			class="name-line text-nowrap text-left text-[clamp(3rem,20vmin,15rem)] font-extrabold leading-none"
		>
			Brian
		</h1>
		<div class="name-border-1 m-0 p-0">
			<GradientChaseLine id="first-gradient" />
		</div>
	</div>
	<div class="md:pt-12">
		<h1
			class="name-line text-nowrap text-center text-[clamp(3rem,20vmin,15rem)] font-extrabold leading-none"
		>
			Van
		</h1>
		<div class="name-border-1 m-0 p-0">
			<GradientChaseLine id="second-gradient" />
		</div>
	</div>
	<div class="md:pt-12">
		<h1
			class="name-line text-nowrap text-right text-[clamp(3rem,20vmin,15rem)] font-extrabold leading-none"
		>
			Winkle
		</h1>
		<div class="name-border-1 m-0 p-0">
			<GradientChaseLine id="third-gradient" />
		</div>
	</div>
</section>

<style>
	.name-line {
		background-clip: text;
		will-change: transform;
		text-decoration: none;

		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.name-border-1 {
		width: 100%;
	}
</style>
