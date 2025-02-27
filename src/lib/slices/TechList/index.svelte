<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import type { Content } from '@prismicio/client';
	import IcSharpCircle from '~icons/ic/sharp-circle';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { onMount } from 'svelte';

	gsap.registerPlugin(ScrollTrigger);

	interface Props {
		slice: Content.TechListSlice;
	}

	let { slice }: Props = $props();

	let component: HTMLElement;

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			return;
		}

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: component,
				start: 'top bottom',
				end: 'bottom top',
				scrub: 4
			}
		});

		tl.fromTo(
			'.tech-row',
			{
				x: (index) => {
					return index % 2 === 0 ? gsap.utils.random(400, 200) : gsap.utils.random(-400, -200);
				}
			},
			{
				x: (index) => {
					return index % 2 === 0 ? gsap.utils.random(-400, -200) : gsap.utils.random(400, 200);
				},
				ease: 'power1.inOut'
			}
		);
	});
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="overflow-hidden"
	bind:this={component}
>
	<Bounded as="div">
		<Heading size="xl" class="mb-8" tag="h2" gradient={true}>
			{slice.primary.header}
		</Heading>
	</Bounded>

	{#each slice.primary.techlist as { color, name }}
		<div
			class="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
			aria-label={name || undefined}
		>
			{#each Array(15) as _, index}
				<span
					class="tech-item text-8xl font-extrabold uppercase tracking-tighter"
					style="color: {index === 7 && color ? color : 'inherit'} ">{name}</span
				>
				<span class="text-3xl">
					<IcSharpCircle />
				</span>
			{/each}
		</div>
	{/each}
</section>
