<script setup>
  import { useChecklistStore } from '~/stores/ChecklistStore'

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
    <SiteHero title="Landing Zone Review (v2)" :sticky="true" />
    <ClientOnly>
    <div class="container">
      <div class="columns is-gapless">
        <div class="column is-2">
          <div class="mr-2 has-sticky-side-nav">
            <ReviewNavigation :items="list" :categories="categories" :subcategories="subcategories" />
          </div>
        </div>
        <div class="column">
          <div class="p-5">
            <section v-for="(category, catKey) in list" :key="catKey">
              <h1 class="is-size-3 py-3 px-5 has-text-weight-bold has-background-primary-95 has-text-primary has-sticky-category-heading" :id="catKey">
                {{ checklistStore.getCategoryTitle(catKey) }}
              </h1>
                <ChecklistSubcategory v-for="(subcategory, subcatKey) in category"
                  :key="subcatKey"
                  :subcategoryKey="subcatKey"
                  :items="subcategory"
                  :title="checklistStore.getSubcategoryTitle(subcatKey)">
                </ChecklistSubcategory>
            </section>
          </div>
        </div>
      </div>

      <!-- <hr>
      <details>
        <summary>Raw JSON</summary>
        <pre><code>{{ list }}</code></pre>
      </details> -->

    </div>
  </ClientOnly>
  </div>
</template>

<style lang="scss">
  body {
    // background: #f4f8fb;
    background: #fbfbfb;
  }

  .has-sticky-side-nav {
    position: sticky;
    top: 90px;
    max-height: 90vh; // because nav is longer than viewport
    overflow: scroll;
  }
</style>