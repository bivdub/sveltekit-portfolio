<script lang="ts">
	import { isFilled, type Content } from '@prismicio/client';
	import NavBarLink from './NavBarLink.svelte';
	import IcSharpMenu from '~icons/ic/sharp-menu';
	import IcSharpClose from '~icons/ic/sharp-close';

	interface Props {
		settings: Content.SettingsDocument;
	}

	let open = $state(false);

	function onLinkClick(e: MouseEvent) {
		open = false;
	}

	let { settings }: Props = $props();
</script>

<header class="relative top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4">
	<nav>
		<div
			class="md:m4 flex flex-col justify-between rounded-b-lg bg-slate-50 px-4 py-2 md:flex-row md:items-center md:rounded-xl"
		>
			<div class="flex w-full items-center justify-between">
				<a
					href="/"
					aria-label="Homepage"
					class="text-xl font-extrabold tracking-tighter text-slate-800"
				>
					{settings.data.name}
				</a>
				<button
					aria-expanded={open}
					aria-label="Open Menu"
					onclick={() => (open = true)}
					class="block p-2 text-2xl text-slate-800 md:hidden"
				>
					<IcSharpMenu />
				</button>
				<!-- Mobile Nav -->
				<ul
					class={`fixed inset-0 z-50 flex flex-col items-end gap-4 bg-slate-50 pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden ${open ? 'translate-x-0' : 'translate-x-[100%]'}`}
				>
					<li>
						<button
							aria-expanded={open}
							aria-label="Close Menu"
							onclick={() => (console.log('close'), (open = false))}
							class="clock fixed right-4 top-3 p-2 text-2xl text-slate-800 md:hidden"
						>
							<IcSharpClose />
						</button>
					</li>
					{#each settings.data.links as { label, link }}
						<li class="first:mt-8">
							<NavBarLink {link} {label} {onLinkClick} type="mobile"></NavBarLink>
						</li>
					{/each}
				</ul>
				<!-- Desktop Nav -->
				<ul class="relative z-50 hidden flex-row items-center gap-1 bg-transparent py-0 md:flex">
					{#each settings.data.links as { label, link }}
						<li>
							<NavBarLink {link} {label} {onLinkClick} type="desktop"></NavBarLink>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</nav>
</header>
