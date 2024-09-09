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

              <section v-for="(subcategory, subcatKey) in category" :key="subcatKey">
                <h1 class="is-size-4 py-3 has-text-weight-bold">{{ checklistStore.getSubcategoryTitle(subcatKey) }}</h1>
                <article v-for="item in subcategory"
                  :key="item.guid"
                  :data-id="item.id"
                  :data-guid="item.guid"
                  :data-severity="item.severity"
                  :data-waf-pillar="item.waf"
                >
                  <ChecklistItem :id="item.id" :pillar="item.waf" :text="item.text" />
                </article>
              </section>
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
