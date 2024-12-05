<script lang="ts">
  import { goto } from "$app/navigation";

  $effect(() => {
    // Programmatically redirect to the years/2024 route
    void goto("/years/2024");
  });
</script>

<!-- Optional loading state while redirect occurs -->
<div>Redirecting...</div>
