<script lang="ts">
	import { fade } from "svelte/transition";

let cookieCount = $state(0);

$effect(() => {
	const interval = setInterval(() => {
		cookieCount++;
		if (cookieCount > 20) {
			resetCookieCount();
		}
	}, 1000);

	return () => clearInterval(interval);
});

const incrementCookieCount = () => {
	cookieCount++;
};

const decrementCookieCount = () => {
	if (cookieCount > 0) {
		cookieCount--;
	}
};

const resetCookieCount = () => {
	cookieCount = 0;
};

const santaMood = {
	HAPPY: "😊",
	SAD: "😔",
	NEUTRAL: "😐",
	SICK: "🤮",
};

/**
 * Maps cookie count ranges to santa's mood states
 * @param {number} count - Current cookie count
 * @returns {string} Santa's mood state as emoji
 */
const getSantaMood = (count: number): string => {
    const moodRanges = [
        { range: [0, 5], mood: santaMood.SAD },
        { range: [6, 10], mood: santaMood.NEUTRAL },
        { range: [11, 15], mood: santaMood.HAPPY },
        { range: [16, 25], mood: santaMood.SICK },
    ];

    return moodRanges.find(({ range }) => count >= range[0] && count <= range[1])?.mood ?? santaMood.NEUTRAL;
};

const santaState = $derived(getSantaMood(cookieCount));
</script>

<div class="p-6 bg-gray-900 rounded-lg text-white min-h-[500px]">
    <div class="space-y-4">
        <p>Santa's current mood: <span class="text-4xl">{santaState}</span></p>
        <button class="bg-blue-500 text-white px-4 py-2 rounded-md" onclick={incrementCookieCount}>
            Increment
        </button>
        <button class="bg-red-500 text-white px-4 py-2 rounded-md" onclick={decrementCookieCount}>
            Decrement
        </button>
        <button class="bg-gray-500 text-white px-4 py-2 rounded-md" onclick={resetCookieCount}>
            Reset
        </button>
        <p class="max-w-sm">
            Cookie Count:
            {#each new Array(cookieCount) as _, i}
                {#if i % 5 === 0 && i !== 0}
                    {@render milk()}
                {:else}
                    {@render cookie()}
                {/if}
            {/each}
        </p>
    </div>
</div>

{#snippet cookie()}
    <span class="text-4xl" transition:fade>🍪</span>
{/snippet}

{#snippet milk()}
    <span class="text-4xl" transition:fade>🥛</span>
{/snippet}
