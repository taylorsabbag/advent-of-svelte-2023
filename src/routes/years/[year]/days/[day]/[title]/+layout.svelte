<script lang="ts">
    // biome-ignore lint/style/useConst: <explanation>
    let { children } = $props();
</script>

<div class="flex flex-col min-h-[100dvh]">
    <main>
        {@render children()}
    </main>
</div>