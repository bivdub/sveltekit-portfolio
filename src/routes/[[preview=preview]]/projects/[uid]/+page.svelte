<script lang="ts">
	import ContentBody from '$lib/components/ContentBody.svelte';

	let { data } = $props();
</script>

<ContentBody page={data.page} />
