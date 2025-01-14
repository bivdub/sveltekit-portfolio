<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Scene from './Scene.svelte';
	import { onMount } from 'svelte';
	import Name from './Name.svelte';

	interface Props {
		slice: Content.HeroSlice;
	}

	let { slice }: Props = $props();

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) {
			return;
		}
	});
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="px-4 md:px-6"
>
	<div class="mx-auto w-full max-w-7xl">
		<div class="min-height-[65vh] grid grid-cols-1 items-center">
			<div>
				<Name />
			</div>
		</div>
		<div class="mt-8 flex justify-center md:mt-12">
			<span
				class="block text-center text-2xl font-extrabold uppercase tracking-[.2em] text-slate-300 md:text-5xl"
			>
				{slice.primary.tag_line}
			</span>
		</div>
	</div>
</section>
