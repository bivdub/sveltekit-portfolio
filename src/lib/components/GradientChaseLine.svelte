<script lang="ts">
	import { HTML } from '@threlte/extras';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';

	interface Props {
		id: string;
	}

	const colors = ['#42b883', '#678abd', '#8b5cf6', '#628df7', '#38bdf8', '#3dbbbe'];

	let color1 = $state(colors[0]);
	let color2 = $state(colors[5]);

	let svgRef: HTMLElement;

	let { id }: Props = $props();

	$effect(() => {
		onMount(() => {
			if (svgRef instanceof HTMLElement) {
				color1 = colors[Math.floor(Math.random() * colors.length)];
				color2 = colors[Math.floor(Math.random() * colors.length)];

				console.log(svgRef.getElementsByClassName('gradient'));

				gsap.to(svgRef.getElementsByClassName('gradient')[0], {
					attr: { x1: '100%', x2: '120%' },
					repeat: -1,
					duration: 2.5,
					ease: 'power4.inOut',
					onRepeat: () => {
						color1 = colors[Math.floor(Math.random() * colors.length)];
						color2 = colors[Math.floor(Math.random() * colors.length)];
					},
					delay: gsap.utils.random(0, 1.5),
					repeatDelay: gsap.utils.random(0, 1),
					reversed: gsap.utils.random(0, 10, 1) < 3 ? true : false
				});

				return () => {
					gsap.killTweensOf(svgRef);
				};
			}
		});
	});
</script>

<div bind:this={svgRef}>
	<svg fill="none" viewBox="0 0 500 1">
		<path
			d="M 0,1 Q 250,1 500,1"
			stroke="gray"
			stroke-width="1"
			stroke-opacity="0.2"
			stroke-linecap="round"
		></path>
		<path
			d="M 0,1 Q 250,1 500,1"
			stroke-width="1"
			stroke={`url(#${id})`}
			stroke-opacity="1"
			stroke-linecap="round"
		></path>
		<defs>
			<linearGradient
				{id}
				class="gradient"
				gradientUnits="userSpaceOnUse"
				x1="-20%"
				x2="0%"
				y1="0%"
				y2="0%"
			>
				<stop offset="0%" stop-color={color1} stop-opacity="0"></stop>
				<stop offset="30%" stop-color={color2}></stop>
				<stop offset="70%" stop-color={color2}></stop>
				<stop offset="100%" stop-color={color1} stop-opacity="0"></stop>
			</linearGradient>
		</defs>
	</svg>
</div>
