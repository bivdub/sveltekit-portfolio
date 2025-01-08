<script lang="ts">
	import { page } from '$app/state';
	import { PrismicLink } from '@prismicio/svelte';
	import { asLink, type KeyTextField, type LinkField } from '@prismicio/client';

	interface Props {
		link: LinkField;
		label: KeyTextField;
		onLinkClick: (e: MouseEvent) => void;
		type: 'desktop' | 'mobile';
	}

	let { link, label, onLinkClick, type }: Props = $props();

	const path = asLink(link);

	let isActive = $derived(path && page.url.pathname.includes(path));
</script>

{#if type === 'desktop'}
	<PrismicLink
		class="group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-900"
		field={link}
		onclick={onLinkClick}
		aria-current={isActive ? 'page' : undefined}
	>
		<span
			class={`absolute inset-0 z-0 h-full rounded bg-emerald-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0 ${isActive ? 'translate-y-6' : 'translate-y-8'}`}
		>
		</span>
		<span class="relative">
			{label}
		</span>
	</PrismicLink>
{:else}
	<PrismicLink
		class="group relative block overflow-hidden rounded px-3 text-3xl font-bold text-slate-900"
		field={link}
		onclick={onLinkClick}
		aria-current={isActive ? 'page' : undefined}
	>
		<span
			class={`absolute inset-0 z-0 h-full rounded bg-emerald-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0 ${isActive ? 'translate-y-6' : 'translate-y-16'}`}
		>
		</span>
		<span class="relative">
			{label}
		</span>
	</PrismicLink>
{/if}
