<script setup>
  import { useChecklistStoreV2 } from '~/stores/ChecklistStoreV2'
  const checklistStore = useChecklistStoreV2()
  function resetChecklistDB (event) {
    checklistStore.$reset()
  }

</script>
<template>
  <footer class="mt-6 footer has-text-centered">
    <div class="container is-size-7">
      <p class="has-text-grey">
        Based on <a href="https://github.com/Azure/review-checklists" target="_blank">github.com/Azure/review-checklists</a>
      </p>

      <h3 class="has-text-weight-semibold mt-3 mb-1">Debugging</h3>
      <p>
        <button class="button is-small is-light" @click="resetChecklistDB">
          Reset Checklist Database
        </button>
      </p>
    </div>
  </footer>
</template>