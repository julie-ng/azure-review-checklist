<script setup>
  import { useChecklistStoreV2 } from '~/stores/ChecklistStoreV2'
  const checklistStore = useChecklistStoreV2()
  const route = useRoute()
  const slug = route.params.slug[0]

  const { data: content } = await useAsyncData('content', () => queryContent(`/checklists/${slug}`).findOne())

  definePageMeta({
    layout: 'checklist'
  })

  useHead({
    title: content.value.title
  })

  // console.log('checklist source', content.value.checklist.source)

  const checklistKey = slug
  const jsonFile =  content.value.checklist.source
  await checklistStore.init({
    key: checklistKey,
    source: jsonFile
  })
  const schema = checklistStore.getSchema(checklistKey)
  const list = schema.schema
</script>


<template>
  <div>
    <div class="content">
      <div class="intro mt-1 mb-4">
        <ContentRenderer :value="content">
          <h1>{{ content.title }}</h1>
          <ContentRendererMarkdown :value="content" />
          <h1>Checklist Items</h1>
        </ContentRenderer>
      </div>

      <ClientOnly>
      <section v-for="(category, catKey) in list" :key="catKey">
        <!-- <pre><code>{{ category.title }}</code></pre> -->
        <h1 class="is-size-4 py-3 px-5 has-text-weight-semibold has-text-white has-sticky-category-heading" >
          {{ category.title }}
        </h1>
        <ChecklistSubcategory v-for="(subcategory, subcatKey) in category.subcategories"
          :key="subcatKey"
          :subcategoryKey="subcatKey"
          :items="subcategory.items"
          :title="subcategory.title">
        </ChecklistSubcategory>
      </section>
      </ClientOnly>

      <hr>

      <details>
        <summary>
          <h1>Schema</h1>
        </summary>
        <ClientOnly> <!-- Theory: hydration mismatch is because of JSON spacing -->
          <pre><code>{{ schema.schema }}</code></pre>
        </ClientOnly>
      </details>
    </div>
  </div>
</template>

<style lang="scss">
  body {
    // background: #f4f8fb;
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