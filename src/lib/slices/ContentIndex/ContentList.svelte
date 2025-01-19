<script lang="ts">
	import {
		asImageSrc,
		isFilled,
		type Content,
		type ImageField,
		type KeyTextField
	} from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';
	import type { Action } from 'svelte/action';
	import IcSharpArrowOutward from '~icons/ic/sharp-arrow-outward';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	interface Props {
		items: Content.ContentIndexSliceDefaultPrimaryProjectsItem[];
		fallbackImage: ImageField;
		linkText: KeyTextField;
	}

	let { items, fallbackImage, linkText }: Props = $props();

	let lastMousePosition = { x: 0, y: 0 };

	let currentIndex: number | undefined = $state();
	let contentImages = $state(
		items.map((item) => {
			const image = isFilled.image(item.preview) ? item.preview : fallbackImage;
			return asImageSrc(image, { fit: 'crop', width: 220, height: 320, exp: -10 });
		})
	);

	const onItemEnter: Action<HTMLElement, number> = (node, index) => {
		gsap.fromTo(
			node,
			{ opacity: 0, y: 20 },
			{
				opacity: 1,
				y: 0,
				duration: 1.3,
				ease: 'elastic.out(1, 0.3)',
				stagger: 0.2,
				scrollTrigger: {
					trigger: node,
					start: 'top bottom-=200px',
					end: 'bottom center',
					toggleActions: 'play none none none'
				}
			}
		);
		const imageUrl = contentImages[index];
		if (imageUrl) {
			const img = new Image();
			img.src = imageUrl;
		}

		return {
			destroy() {
				gsap.killTweensOf(node);
			}
		};
	};

	const handleMouseMove = (event: MouseEvent) => {
		const mousePosition = { x: event.clientX, y: event.clientY + window.scrollY };
		const speed = Math.sqrt(Math.pow(mousePosition.x - lastMousePosition.x, 2));

		const maxY = window.scrollY + window.innerHeight - 350;
		const maxX = window.innerWidth - 350;

		gsap.to('.hover-reveal', {
			x: gsap.utils.clamp(0, maxX, mousePosition.x - 110),
			y: gsap.utils.clamp(0, maxY, mousePosition.y - 160),
			rotation: speed * (mousePosition.x > lastMousePosition.x ? 1 : -1),
			duration: 1.3,
			ease: 'back.out(2)'
		});

		gsap.to('.hover-reveal', {
			opacity: currentIndex === undefined ? 0 : 1,
			visibility: 'visible',
			ease: 'power3.Out',
			duration: 1
		});

		lastMousePosition = mousePosition;
	};

	const onMouseEnter = (index: number) => {
		currentIndex = index;
	};

	const onMouseLeave = () => {
		currentIndex = undefined;
	};
</script>

<svelte:window onmousemove={handleMouseMove} />

<ul onmouseleave={onMouseLeave} class="borber-b-slate-100 grid border-b">
	{#each items as post, index (post.name + index)}
		<li class="content-list-item" onmouseenter={() => onMouseEnter(index)} use:onItemEnter={index}>
			<PrismicLink
				field={post.link}
				class="flex flex-col justify-between border-t border-t-slate-100 py-10 text-slate-200 md:flex-row"
			>
				<div class="flex flex-col">
					<span class="text-3xl font-bold"> {post.name}</span>
					<div class="flex gap-3 text-slate-300">
						{post.description}
					</div>
				</div>
				<span class="ml-auto flex items-center gap-2 pt-4 text-xl font-medium md:ml-0 md:pt-0">
					{linkText}
					<IcSharpArrowOutward />
				</span>
			</PrismicLink>
		</li>
	{/each}
</ul>

<!-- Hover element -->
<div
	class="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
	style={currentIndex === undefined ? '' : `background-image: url(${contentImages[currentIndex]})`}
></div>
