<script lang="ts">
    // TODO: Add pagination
    
    interface Child {
        name: string;
        tally: number;
    }

    let data = $state<Child[]>([]);
    $effect(() => {
        const getChildrenData = async () => {
            const response = await fetch(
                "https://advent.sveltesociety.dev/data/2023/day-one.json",
            );
            data = await response.json();
        };

        void getChildrenData();
    });

    let search = $state("");
    let filteredData = $derived(
        data.filter(
            (item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) &&
                (filter === "naughty" ? isNaughty(item.tally) : true) &&
                (filter === "nice" ? !isNaughty(item.tally) : true),
        ),
    );

    let filter = $state("all");

    let sortOn = $state({
        current: "name",
        name: {
            direction: "asc",
        },
        tally: {
            direction: "asc",
        },
    });
    let sortedData = $derived(
        [...filteredData].sort((a, b) => {
            if (sortOn.current === "name") {
                return sortOn.name.direction === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            }
            if (sortOn.current === "tally") {
                return sortOn.tally.direction === "asc"
                    ? a.tally - b.tally
                    : b.tally - a.tally;
            }
            return 0;
        }),
    );

    const isNaughty = (tally: number) => {
        return tally < 1;
    };

    const changeTally = (name: string, change: number) => {
        const item = data.find((item) => item.name === name);
        if (item) {
            item.tally += change;
        }
    };
</script>

<div class="min-h-screen p-8 bg-gradient-to-br from-gray-900 to-gray-800">
    <div class="max-w-4xl mx-auto space-y-6 bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm shadow-xl">
        <!-- Search Section -->
        <div class="space-y-2">
            <label class="text-gray-300 text-sm font-medium">Search Children</label>
            <div class="relative">
                <input 
                    type="text" 
                    class="w-full bg-gray-700/50 text-white p-3 rounded-lg pl-10 
                           border border-gray-600 focus:border-blue-500 focus:ring-2 
                           focus:ring-blue-500 focus:outline-none transition-all"
                    placeholder="Enter child's name..."
                    bind:value={search} 
                    oninput={(e) => search = (e.target as HTMLInputElement).value} 
                />
                <svg 
                    class="absolute left-3 top-3.5 h-5 w-5 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>

        <!-- Filter Options -->
        <div class="flex flex-wrap gap-6 items-center p-4 bg-gray-700/30 rounded-lg">
            <h3 class="text-gray-300 font-medium">Filter By:</h3>
            <div class="flex gap-6">
                {#each ["all", "naughty", "nice"] as option}
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="radio" 
                            value={option} 
                            name="filter" 
                            bind:group={filter}
                            class="hidden" 
                        />
                        <div class="relative flex items-center justify-center w-4 h-4 border-2 
                                  border-gray-400 rounded-full">
                            {#if filter === option}
                                <div class="absolute w-2 h-2 bg-blue-500 rounded-full"></div>
                            {/if}
                        </div>
                        <span class="text-gray-300 capitalize">
                            {option}
                        </span>
                    </label>
                {/each}
            </div>
        </div>

        <!-- Table Header -->
        <div class="grid grid-cols-[1fr_100px_100px_200px] gap-4 items-center 
                    bg-gray-700/50 p-4 rounded-lg font-medium text-sm text-gray-300">
            <button 
                class="flex items-center gap-2 rounded-md px-2 hover:bg-gray-600/50 transition-colors
                       {sortOn.current === 'name' ? 'bg-gray-600/50' : ''}"
                onclick={() => {
                    sortOn.current = "name";
                    sortOn.name.direction = sortOn.name.direction === "asc" ? "desc" : "asc";
                }}
            >
                <span>Name</span>
                <span class="text-blue-400">
                    {sortOn.name.direction === "asc" ? "▲" : "▼"}
                </span>
            </button>
            <span class="p-2">Status</span>
            <button 
                class="flex items-center gap-2 rounded-md px-2 hover:bg-gray-600/50 transition-colors
                       {sortOn.current === 'tally' ? 'bg-gray-600/50' : ''}"
                onclick={() => {
                    sortOn.current = "tally";
                    sortOn.tally.direction = sortOn.tally.direction === "asc" ? "desc" : "asc";
                }}
            >
                <span>Tally</span>
                <span class="text-blue-400">
                    {sortOn.tally.direction === "asc" ? "▲" : "▼"}
                </span>
            </button>
            <span class="p-2">Actions</span>
        </div>

        <!-- Table Body -->
        <div class="space-y-2">
            {#each sortedData as {name, tally}}
                {@render child(name, tally)}
            {/each}
        </div>
    </div>
</div>

{#snippet child(name: string, tally: number)}
    <div class="grid grid-cols-[1fr_100px_100px_200px] gap-4 items-center 
                bg-gray-700/20 p-4 rounded-lg hover:bg-gray-700/40 
                transition-all duration-200 group">
        <span class="font-medium text-white">{name}</span>
        <span class={`px-2 py-1 rounded-full text-xs font-medium inline-block text-center
                     ${isNaughty(tally) 
                       ? "bg-red-500/20 text-red-300" 
                       : "bg-green-500/20 text-green-300"}`}>
            {isNaughty(tally) ? "Naughty" : "Nice"}
        </span>
        <div class="font-mono text-gray-300">{tally}</div>
        <div class="flex gap-2">
            <button 
                class="px-3 py-1.5 bg-blue-600/80 rounded-md hover:bg-blue-500 
                       transition-colors text-white text-sm font-medium"
                onclick={() => changeTally(name, 1)}
            >
                ▲
            </button>
            <button 
                class="px-3 py-1.5 bg-blue-600/80 rounded-md hover:bg-blue-500 
                       transition-colors text-white text-sm font-medium"
                onclick={() => changeTally(name, -1)}
            >
                ▼
            </button>
        </div>
    </div>
{/snippet}