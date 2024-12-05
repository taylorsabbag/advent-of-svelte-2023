<script lang="ts">
	import "../app.css";
	import { page } from "$app/stores";

	let { children } = $props();
	const yearUrl = $derived($page.params.year);
	const years = Array.from({ length: 2 }, (_, i) => 2023 + i);
</script>

<div class="min-h-screen flex flex-col">
	<header class="w-full bg-red-600 text-white">
		<div class="container mx-auto p-4 flex justify-between items-center">
			<a href="/" class="text-2xl font-bold">Advent of Svelte</a>
			<nav class="space-x-4">
				{#each years as year}
					<a href={`/years/${year}`} class={`p-2 rounded-md ${year === Number(yearUrl) ? 'font-bold bg-red-800' : ''}`}>
						{year}
					</a>
				{/each}
			</nav>
		</div>
	</header>
	<main class="w-full py-12">
		{@render children()}
	</main>
	<footer class="w-full mt-auto">
		<div class="container mx-auto p-4">
			<p class="text-xl font-bold">Advent of Svelte</p>
			<hr class="my-8 border-gray-600" />
			<p class="text-gray-400 text-sm">This set of challenges is based on the <a class="text-blue-500 underline hover:no-underline" href="https://advent.sveltesociety.dev/2023">Advent of Svelte (2023)</a> website.</p>
		</div>
	</footer>
</div>