<template>
  <div class="flex flex-row align-items-center justify-content-center">
    <ProgressSpinner
        style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
        animationDuration=".5s" aria-label="Custom ProgressSpinner" />
  </div>
</template>
<script>
import ProgressSpinner from "primevue/progressspinner";

export default {
  components: {
    ProgressSpinner
  }
}
</script>