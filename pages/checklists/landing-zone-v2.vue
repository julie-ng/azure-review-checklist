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
    <SiteHero title="Landing Zone Review (v2)" />
    <ClientOnly>
    <div class="container">
      <div class="columns is-gapless">
        <div class="column is-2">
          <div class="mr-2">
            <ReviewNavigation :items="list" :categories="categories" :subcategories="subcategories" />
          </div>
        </div>
        <div class="column">
          <div class="p-5">

            <section v-for="(category, catKey) in list" :key="catKey">
              <h1 class="is-size-3 py-3 has-text-weight-bold">{{ checklistStore.getCategoryTitle(catKey) }}</h1>
                <ChecklistSubcategory v-for="(subcategory, subcatKey) in category"
                  :key="subcatKey"
                  :items="subcategory"
                  :title="checklistStore.getSubcategoryTitle(subcatKey)">
                </ChecklistSubcategory>
            </section>
          </div>
        </div>
      </div>

      <hr>
      <details>
        <summary>Raw JSON</summary>
        <pre><code>{{ list }}</code></pre>
      </details>

    </div>
  </ClientOnly>
  </div>
</template>
