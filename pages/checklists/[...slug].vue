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
  const checklistFoo = await checklistStore.load({
    key: checklistKey,
    source: jsonFile
  })

  // checklistStore.load('multitenancy')


  // const list = checklistStore.list
  // const categories = checklistStore.categories
  // const subcategories = checklistStore.subcategories


  // import { useChecklistStore } from '~/stores/ChecklistStore'

// export default defineNuxtPlugin(async (app) => {
//   log.frontend(`[🔌 Plugin] initialize checklist store`)

//   const checklistStore = useChecklistStore(app.$pinia)
//   await checklistStore.init()
// })
</script>


<template>
  <div>
    <div class="content">
      <ContentRenderer :value="content">
        <h1>{{ content.title }}</h1>
        <ContentRendererMarkdown :value="content" />
      </ContentRenderer>
    </div>
  </div>
</template>