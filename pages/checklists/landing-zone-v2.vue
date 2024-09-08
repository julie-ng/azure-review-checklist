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
              <!-- <pre><code>{{ category }}</code></pre> -->
              <section v-for="(subcategory, subcatKey) in category" :key="subcatKey">
                <h1 class="is-size-4 py-3 has-text-weight-bold">{{ checklistStore.getSubcategoryTitle(subcatKey) }}</h1>
                <article v-for="item in subcategory"
                  :key="item.guid"
                  :data-id="item.id"
                  :data-guid="item.guid"
                  :data-severity="item.severity"
                  :data-waf-pillar="item.waf"
                >

                  <div class="columns table-row ">
                    <div class="column is-1 pt-5 pb-3">
                      <p class="is-size-6">
                        {{ item.id }}
                      </p>
                    </div>
                    <div class="column is-1 pt-5 pb-3" style="width: 10%">
                      <p class="is-size-6">
                        {{ item.waf }}
                      </p>
                    </div>
                    <div class="column is-8 pt-5 pb-3">
                      <p class="is-size-5">
                        {{ item.text }}
                      </p>
                    </div>
                    <div class="column pt-5 pb-3 is-2">
                      <ChecklistItemDropdown/>
                    </div>
                  </div>



                </article>
              </section>
            </section>
          </div>
        </div>
      </div>
      <!-- <h1 class="is-size-2 has-text-weight-bold">Landing Zone Review v2</h1> -->
      <!-- <hr> -->
<!--
      <h1 class="is-size-3 has-text-weight-bold">Categories</h1>
      <pre><code>{{ categories }}</code></pre>
      <hr>


      <h1 class="is-size-3 has-text-weight-bold">List</h1> -->

      <hr>
      <details>
        <summary>Raw JSON</summary>
        <pre><code>{{ list }}</code></pre>
      </details>

    </div>
  </ClientOnly>
  </div>
</template>

<style lang="scss">
.table-row {
  border-bottom: 1px solid var(--bulma-grey-lighter);
  .column {
    // border: 1px solid red;
  }
}
</style>