<script lang="ts">
	import Heading from '$lib/components/Heading.svelte';
	import Bounded from '$lib/components/Bounded.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';

	interface Props {
		slice: Content.ExperienceSlice;
	}

	let { slice }: Props = $props();
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<Heading tag="h2" size="lg">
		{slice.primary.header}
	</Heading>

	{#each slice.primary.item as item}
		<div class="ml-6 mt-8 max-w-prose md:ml-12 md:mt-16">
			<Heading tag="h3" size="sm">
				{item.header}
			</Heading>
			<p class="tracking-light mt-1 flex w-fit items-center text-2xl font-semibold text-slate-400">
				<span>{item.time}</span>
				{' '}
				<span class="text-3xl font-extralight">/</span>
				{' '}
				<span>{item.org}</span>
			</p>
			<div class="prose prose-lg prose-invert mt-4">
				<PrismicRichText field={item.description} />
			</div>
		</div>
	{/each}
</Bounded>
