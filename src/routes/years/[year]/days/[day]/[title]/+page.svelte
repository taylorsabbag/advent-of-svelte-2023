<script lang="ts">
import { page } from "$app/stores";
import { getSolution } from "$lib/solutions";
import { solutions } from "$lib/solutions";

interface DayEntry {
	day: number;
	title: string;
	content: string;
}

const { data } = $props<{ data: { days: DayEntry[] } }>();
const { year, day, title } = $derived($page.params);

const Solution = $derived(getSolution(year, Number(day)));

function formatTitle(title: string): string {
	return title
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

const nextDayLink = $derived(() => {
	const nextDay = Number(day) + 1;
	if (nextDay > 24) return null;

	if (!data?.days) return null;

	const nextDayData = data.days.find((d: DayEntry) => d.day === nextDay);
	if (!nextDayData) return null;

	if (!solutions[year]?.[nextDay]) return null;

	return `/years/${year}/days/${nextDay}/${nextDayData.title}`;
});
</script>

<article class="container mx-auto py-12 px-4">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">
            Day {day} - {formatTitle(title)}
        </h1>
        <div class="flex justify-center items-center gap-4">
            <a 
            href={`/years/${year}`} 
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
            Back to Calendar
        </a>
        {#if nextDayLink()}
        <a 
        href={nextDayLink()}
        class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
        Next Day
    </a>
    {/if}
        </div>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        {#if Solution}
            <Solution {year} day={Number(day)} />
        {:else}
            <p class="text-red-600">Solution not found for Day {day} of {year}</p>
        {/if}
    </div>

</article> 