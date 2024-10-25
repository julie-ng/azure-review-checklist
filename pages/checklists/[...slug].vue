<script setup>
  import { useChecklistStoreV2 } from '~/stores/ChecklistStoreV2'
  const checklistStore = useChecklistStoreV2()
  const route = useRoute()
  const slug = route.params.slug[0]

  const { data: content } = await useAsyncData('content', () => queryContent(`/checklists/${slug}`).findOne())
  if (!content.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found'
    })
  }

  definePageMeta({
    layout: false
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
    <SiteHeader :is-fixed="true" />
    <div class="container">
      <div class="columns is-gapless">
        <div class="column is-2">
          <div class="mr-2 has-sticky-side-nav">
            <SidebarNavigation :schema="list" />
          </div>
        </div>
        <div class="column" role="main">
          <main class="content px-2 pt-2">
            <ContentRenderer :value="content">
              <h1>{{ content.title }}</h1>
              <ChecklistMetadata
                :status="schema.metadata.state"
                :timestamp="schema.metadata.timestamp"/>
              <ContentRendererMarkdown :value="content" />
              <h1>Checklist Items</h1>
            </ContentRenderer>

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
          </main>
        </div>
      </div>
    </div>

    <SiteFooter />
  </div>
</template>

<style lang="scss">
  // body {
  //   background: #f4f8fb;
  //   background: var(--msft-off-white); //#f4f3f5; //#f4faff; //#fbfbfb;
  // }

  [role="main"] {
    min-height: 600px;
  }

  // offset fixed header navigation
  .has-sticky-side-nav, // TODO: double check component code
  [role="main"] {
    position: relative;
    top: 58px;
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