<script lang="ts">
    import { page } from "$app/stores";
    
    let { children } = $props();
    const yearUrl = $derived($page.params.year);
    const years = $derived(Array.from({ length: 2 }, (_, i) => 2023 + i));
</script>

<div class="flex flex-col min-h-[100dvh]">
    <main>
        {@render children()}
    </main>
</div>