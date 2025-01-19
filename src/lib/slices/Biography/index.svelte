<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import Avatar from './Avatar.svelte';
	interface Props {
		slice: Content.BiographySlice;
	}

	let { slice }: Props = $props();
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
		<Heading size="xl" class="col-start-1" gradient={true}>
			{slice.primary.heading}
		</Heading>
		<div class="prose prose-xl prose-slate prose-invert col-start-1">
			<PrismicRichText field={slice.primary.description} />
		</div>
		<Avatar
			classes="row-start-1 max-w-sm md:col-start-2 md:row-end-3"
			headshot={slice.primary.headshot}
		/>
	</div>
</Bounded>
