<script lang="ts">
	import { isFilled, type Content } from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';
	import GithubIcon from '~icons/fa-brands/github';
	import LinkedinIcon from '~icons/fa-brands/linkedin';
	import Bounded from './Bounded.svelte';

	interface Props {
		settings: Content.SettingsDocument;
	}

	let { settings }: Props = $props();
</script>

<Bounded as="footer" class="text-slate-600">
	<div
		class="container mx-auto mt-20 flex flex-col items-center justify-between gap-6 py-8 sm:flex-row"
	>
		<div
			class="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start"
		>
			<a
				href="/"
				class="transition-color text-xl font-extrabold tracking-tighter text-slate-100 duration-150 hover:text-emerald-400"
			>
				{settings.data.name}
			</a>
			<span
				class="hidden text-5xl font-extralight leading-[0] text-slate-400 sm:inline"
				aria-hidden="true">/</span
			>
			<p class="text-sm text-slate-300">
				© {new Date().getFullYear()}
				{settings.data.name}
			</p>
		</div>
		<!-- <nav class="navigation" aria-label="Footer navigation">
			<ul class="flex items-center gap-1">
				{#each settings.data.links as { link, label }, index}
					<li>
						<PrismicLink
							field={link}
							class="block px-3 py-1 text-base font-bold text-slate-100 transition-colors duration-150 hover:text-yellow-400"
						>
							{label}
						</PrismicLink>
					</li>
					{#if index < settings.data.links.length - 1}
						<span class="text-4xl font-thin leading-[0] text-slate-400" aria-hidden="true">
							/
						</span>
					{/if}
				{/each}
			</ul>
		</nav> -->
		<div class="socials flex items-center gap-4 sm:justify-end">
			{#if isFilled.link(settings.data.github_link)}
				<PrismicLink
					field={settings.data.github_link}
					class="transform p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-emerald-500"
					aria-label={settings.data.name + ' on GitHub'}
				>
					<GithubIcon class="h-6 w-6" />
				</PrismicLink>
			{/if}
			{#if isFilled.link(settings.data.linkedin_link)}
				<PrismicLink
					field={settings.data.linkedin_link}
					class="transform p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-emerald-500"
					aria-label={settings.data.name + ' on LinkedIn'}
				>
					<LinkedinIcon class="h-6 w-6" />
				</PrismicLink>
			{/if}
		</div>
	</div>
</Bounded>
