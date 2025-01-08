<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Scene from './Scene.svelte';

	interface Props {
		slice: Content.HeroSlice;
	}

	let { slice }: Props = $props();
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="px-4 md:px-6"
>
	<div class="mx-auto w-full max-w-7xl">
		<div class="grid min-height-[65vh] grid-cols-1 items-center md:grid-cols-2">
			<div
				class="realtive z-10 row-span-1 row-start-1 -my-10 aspect-[1/1.3] overflow-hidden md:col-span-1 md:col-start-2 md:mt-0"
			>
				<Scene />
			</div>
			<div class="col-start-1 md:row-start-1">
				<h1
					class="mb-2 md:mb-8 text-[clamp(3rem,20vmin,15rem)] font-extrabold leading-none tracking-tighter text-nowrap"
				>
					<span class="block text-emerald-300">
						{slice.primary.first_name}
					</span>
					<span class="block text-emerald-500 -mt-[.2em] pl-[48px] md:pl-[100px]"> Van </span>
					<span class="block text-emerald-700 -mt-[.2em] pl-[44px] md:pl-[92px]"> Winkle </span>
				</h1>
				<span
					class="block bg-gradient-to-tr from-emerald-500 via-cyan-700 to-emerald-500 bg-clip-text text-transparent text-2xl font-bold uppercase tracking-[.2em] md:text-4xl"
				>
					{slice.primary.tag_line}
				</span>
			</div>
		</div>
	</div>
</section>
