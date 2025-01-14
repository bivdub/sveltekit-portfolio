<script lang="ts">
	import { type ImageField } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte';
	import clsx from 'clsx';

	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { onMount } from 'svelte';
	gsap.registerPlugin(ScrollTrigger);

	interface Props {
		headshot: ImageField;
		classes?: string;
	}

	let component: HTMLElement;

	let { headshot, classes }: Props = $props();

	onMount(() => {
		gsap.fromTo(
			'.avatar',
			{
				opacity: 0,
				scale: 1.4
			},
			{
				opacity: 1,
				scale: 1,
				duration: 1.3,
				ease: 'power4.out',
				scrollTrigger: {
					trigger: '.avatar',
					start: 'top center',
					end: 'bottom center',
					toggleActions: 'play none none none'
				}
			}
		);

		window.onmousemove = (e) => {
			if (!component) return;
			const componentRect = (component as HTMLElement).getBoundingClientRect();
			const componentCenterX = componentRect.left + componentRect.width / 2;

			let componentPercent = {
				x: (e.clientX - componentCenterX) / componentRect.width / 2
			};

			gsap.timeline({ defaults: { duration: 0.5, overwite: 'auto', ease: 'power3.out' } }).to(
				'.avatar',
				{
					rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x)
				},
				0
			);
		};
	});
</script>

<div class={clsx('relative h-full w-full', classes)} bind:this={component}>
	<div class="avatar crt aspect-square overflow-hidden rounded-3xl border-2 border-lime-400">
		<PrismicImage
			class="avatar-image h-full w-full object-fill"
			field={headshot}
			imgixParams={{ q: 90 }}
		/>
	</div>
</div>

<style>
	.avatar {
		perspective: 500px;
		perspective-origin: 150% 150%;
	}
</style>
