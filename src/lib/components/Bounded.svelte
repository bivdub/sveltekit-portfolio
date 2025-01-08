<script lang="ts">
	import { createSchedulerContext } from '@threlte/core';
	import clsx from 'clsx';

	let { children, tag = 'section', ...rest } = $props();
</script>

<svelte:element
	this={tag}
	{...rest}
	class={clsx(`px-4 py-10 md:px-6 md:py-14 lg:py-16`, rest.class)}
>
	<div class="mx-auto w-full max-w-7xl">
		{@render children?.()}
	</div></svelte:element
>
