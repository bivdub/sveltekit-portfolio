<script lang="ts">
	import clsx from 'clsx';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	interface Props {
		tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		size?: 'xxl' | 'xl' | 'lg' | 'md' | 'sm';
		class?: string;
		gradient?: boolean;
		children?: import('svelte').Snippet;
	}

	let ref: HTMLElement;

	onMount(() => {
		const b1 = 'linear-gradient(0deg, #42b883, #678abd, #8b5cf6, #628df7, #38bdf8, #3dbbbe';
		const b2 = 'linear-gradient( 0deg, #3dbbbe, #38bdf8, #628df7, #8b5cf6, #678abd, #42b883)';

		if (!gradient) {
			return;
		}

		if (ref instanceof HTMLElement) {
			gsap.fromTo(
				ref,
				{ backgroundImage: b1 },
				{
					ease: 'none',
					duration: 4,
					backgroundImage: b2,
					repeat: -1,
					yoyo: true,
					delay: gsap.utils.random(0, 2.5)
				}
			);

			return () => {
				gsap.killTweensOf(ref);
			};
		}
	});

	let {
		tag = 'h1',
		size = 'lg',
		class: className = '',
		gradient = false,
		children
	}: Props = $props();
</script>

<svelte:element
	this={tag}
	bind:this={ref}
	class={clsx(
		'font-bold leading-tight tracking-tight',
		size === 'xxl' && 'text-[clamp(3rem,20vmin,15rem)]',
		size === 'xl' && 'text-7xl md:text-9xl',
		size === 'lg' && 'text-6xl md:text-8xl',
		size === 'md' && 'text-5xl md:text-6xl',
		size === 'sm' && 'text-3xl md:text-4xl',
		gradient ? 'gradient-line text-transparent' : 'text-slate-300',
		className
	)}
>
	{@render children?.()}
</svelte:element>

<style>
	.gradient-line {
		background-clip: text;
		will-change: transform;
		text-decoration: none;

		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
