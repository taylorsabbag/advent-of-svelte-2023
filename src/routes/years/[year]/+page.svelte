<script lang="ts">
    import { page } from "$app/stores";

    interface DayEntry {
        day: number;
        title: string;
        content: string;
    }

    const { data } = $props<{ data: { days: DayEntry[] } }>();
    const year = $derived($page.params.year);

    function formatTitle(title: string): string {
        return title
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
</script>
    
<section class="container p-4">
    <header>
        <h1 class="text-4xl font-bold mb-6 text-center">
            Advent of Svelte {year}
        </h1>
    </header>
    
    <div class="flex flex-col gap-2 justify-center items-center">
        {#each data.days as day}
            <details class="w-full">
                <summary 
                    class="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-center cursor-pointer flex items-center justify-between"
                >
                    <span>Day {day.day} - {formatTitle(day.title)}</span>
                    <a 
                        href={`/years/${year}/days/${day.day}/${day.title}`}
                        class="bg-white text-red-800 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors text-sm"
                        onclick={(e) => e.stopPropagation()}
                    >
                        View Solution
                    </a>
                </summary>
                
                <div class="p-4 mt-2 rounded-lg shadow-xl bg-white">
                    <div class="prose prose-sm max-w-none">
                        {@html day.content}
                    </div>
                </div>
            </details>
        {/each}
    </div>
</section>