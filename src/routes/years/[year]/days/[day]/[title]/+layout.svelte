<script lang="ts">
    // biome-ignore lint/style/useConst: <explanation>
    let { children } = $props();
</script>

<div class="flex flex-col">
    <main>
        {@render children()}
    </main>
</div>