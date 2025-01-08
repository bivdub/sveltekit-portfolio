<script>
	import { SliceSimulator } from '@slicemachine/adapter-sveltekit/simulator';
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
</script>

<SliceSimulator  background="#2e2e2e">
	{#snippet children({ slices })}
		<SliceZone {slices} {components} />
	{/snippet}
</SliceSimulator>
