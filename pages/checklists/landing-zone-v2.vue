<script setup>
  import { useChecklistStore } from '~/stores/ChecklistStore'

  definePageMeta({
    layout: 'checklist'
  })

  useHead({
    title: 'Landing Zone Review (v2)'
  })

  const checklistStore = useChecklistStore()
  const list = checklistStore.list
  const categories = checklistStore.categories
  const subcategories = checklistStore.subcategories
</script>

<template>
  <div>
    <ClientOnly>
      <section v-for="(category, catKey) in list" :key="catKey">
        <h1 class="is-size-4 py-3 px-5 has-text-weight-semibold has-text-white has-sticky-category-heading" :id="catKey">
          {{ checklistStore.getCategoryTitle(catKey) }}
        </h1>
          <ChecklistSubcategory v-for="(subcategory, subcatKey) in category"
            :key="subcatKey"
            :subcategoryKey="subcatKey"
            :items="subcategory"
            :title="checklistStore.getSubcategoryTitle(subcatKey)">
          </ChecklistSubcategory>
      </section>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
  body {
    background: #f4f8fb;
    // background: var(--msft-off-white); //#f4f3f5; //#f4faff; //#fbfbfb;
  }

  .has-sticky-side-nav {
    position: sticky;
    top: 70px;
    max-height: 90vh; // because nav is longer than viewport
    overflow: scroll;
  }

  .has-sticky-category-heading {
    position: sticky;
    top: 53px;

    background-color: var(--msft-blue);
    border-left: 6px solid var(--msft-light-blue);
    z-index: 10; // over checkboxes
  }

  .has-msft-blue-color {
    color: var(--msft-blue);
  }
</style>