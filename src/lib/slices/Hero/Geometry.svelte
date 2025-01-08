<script lang="ts">
	import { T as Threlte, type ThrelteContext } from '@threlte/core';
	import { createTransition, Float, transitions } from '@threlte/extras';
	import * as THREE from 'three';
	import gsap from 'gsap';
	import resolveConfig from 'tailwindcss/resolveConfig';
	import tailwindConfig from '../../../../tailwind.config.js'; // Your Tailwind config file
	import { elasticOut } from 'svelte/easing';
	import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';

	const fullConfig = resolveConfig(tailwindConfig);
	const twColors = fullConfig.theme.colors;
	let visible = $state(false);

	transitions();

	interface Props {
		position?: [number, number, number];
		geometry?: THREE.BufferGeometry;
		rate?: number;
	}

	let {
		position = [0, 0, 0],
		geometry = new THREE.IcosahedronGeometry(3),
		rate = 0.5
	}: Props = $props();

	const materialParams = [
		{
			color: twColors.emerald['200'],
			roughness: 0.1,
			metalness: 0.5
		},
		{
			color: twColors.emerald['700'],
			roughness: 0.8
		},
		{
			color: twColors.cyan['300'],
			roughness: 0.6,
			metalness: 0.2
		},
		{
			color: twColors.cyan['800'],
			roughness: 0.3
		},
		{
			color: twColors.sky['300'],
			roughness: 0,
			metalness: 0.7
		},
		{
			color: twColors.red['300'],
			roughness: 0,
			metalness: 0.7
		}
	];

	function getRandomMaterial() {
		const randomInt = gsap.utils.random(1, 10, 1);
		if (randomInt === 1) {
			return new THREE.MeshNormalMaterial();
		}

		return new THREE.MeshStandardMaterial(gsap.utils.random(materialParams));
	}

	function handleClick(e: MouseEvent) {
		if ('object' in e && e.object instanceof THREE.Mesh) {
			gsap.to(e.object.rotation, {
				x: `+=${gsap.utils.random(0, 3)}`,
				y: `+=${gsap.utils.random(0, 3)}`,
				z: `+=${gsap.utils.random(0, 3)}`,
				duration: 1.2,
				ease: 'elastic.out(1, 0.3)',
				yoyo: true
			});
			e.object.material = getRandomMaterial();
		}
	}

	const bounce = createTransition((ref: any) => {
		return {
			tick: (t: number) => {
				if (t > 0) visible = true;

				ref.scale.set(t, t, t);
			},
			easing: elasticOut,
			duration: gsap.utils.random(800, 1200),
			delay: gsap.utils.random(0, 500)
		};
	});
</script>

<Threlte.Group position={position.map((p) => p * 2)}>
	<Float
		speed={5 * rate}
		rotationSpeed={5 * rate}
		rotationIntensity={6 * rate}
		floatIntensity={5 * rate}
	>
		<Threlte.Mesh
			{geometry}
			in={bounce}
			material={getRandomMaterial()}
			interactive
			onclick={handleClick}
		></Threlte.Mesh>
	</Float>
</Threlte.Group>
