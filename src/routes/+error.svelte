<script lang="ts">
  import { page } from "$app/stores";
  
  /**
   * Formats the error message to be more user-friendly
   * @param message - The raw error message
   * @returns A cleaned up error message
   */
  function formatErrorMessage(message: string): string {
    return message
      .replace(/^Error:\s*/i, "")
      .replace(/\b([A-Z])/g, " $1")
      .trim();
  }
</script>

<div class="container mx-auto min-h-[100dvh] flex flex-col items-center justify-center p-4">
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl w-full text-center">
    <h1 class="text-3xl font-bold text-red-600 mb-4">
      {$page.status}: {$page.error?.message || "An error occurred"}
    </h1>
    
    {#if $page.error?.message}
      <p class="text-gray-600 dark:text-gray-300 text-lg mb-8">
        {formatErrorMessage($page.error.message)}
      </p>
    {/if}
    
    <div class="flex gap-4 justify-center">
      <a 
        href="/" 
        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Return Home
      </a>
      <button 
        onclick={() => window.history.back()}
        class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
      >
        Go Back
      </button>
    </div>
  </div>
</div>
