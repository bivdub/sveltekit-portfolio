<script lang="ts">
	import GradientChaseLine from '$lib/components/GradientChaseLine.svelte';
	import Heading from '$lib/components/Heading.svelte';
</script>

<section class="position-relative pt-10 md:pt-20">
	<div class="">
		<Heading tag="h1" size="xxl" gradient={true} class="text-nowrap text-left">Brian</Heading>
		<div class="m-0 p-0">
			<GradientChaseLine id="first-gradient" />
		</div>
	</div>
	<div class="md:pt-12">
		<Heading tag="h1" size="xxl" gradient={true} class="text-center">Van</Heading>
		<div class="m-0 p-0">
			<GradientChaseLine id="second-gradient" />
		</div>
	</div>
	<div class="md:pt-12">
		<Heading tag="h1" size="xxl" gradient={true} class="text-right">Winkle</Heading>
		<div class="m-0 p-0">
			<GradientChaseLine id="third-gradient" />
		</div>
	</div>
</section>
