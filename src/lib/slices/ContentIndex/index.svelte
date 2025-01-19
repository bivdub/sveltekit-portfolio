<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { isFilled, type Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import ContentList from './ContentList.svelte';

	interface Props {
		slice: Content.ContentIndexSlice;
	}

	let { slice }: Props = $props();
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<Heading size="xl" class="mb-8" gradient={true}>
		{slice.primary.header}
	</Heading>
	{#if isFilled.richText(slice.primary.description)}
		<div class="prose prose-xl prose-invert mb-10">
			<PrismicRichText field={slice.primary.description} />
		</div>
	{/if}
	<ContentList
		items={slice.primary.projects}
		fallbackImage={slice.primary.fallback_image}
		linkText={slice.primary.link_text}
	></ContentList>
</Bounded>
