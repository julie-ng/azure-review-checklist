<script setup>
  import { useChecklistStore } from '~/stores/ChecklistStore'
  const checklistStore = useChecklistStore()

  const list = checklistStore.list
  const categories = checklistStore.categories
  const subcategories = checklistStore.subcategories
</script>

<template>
  <div class="conatiner">
    <h1 class="is-size-2 has-text-weight-bold">Landing Zone Review v2</h1>
    <hr>

    <h1 class="is-size-3 has-text-weight-bold">Categories</h1>
    <pre><code>{{ categories }}</code></pre>
    <hr>

    <h1 class="is-size-3 has-text-weight-bold">Subcategories</h1>
    <pre><code>{{ subcategories }}</code></pre>
    <hr>

    <h1 class="is-size-3 has-text-weight-bold">List</h1>
    <pre><code>{{ list }}</code></pre>

  </div>
</template>