<script setup>
  const route = useRoute()
  const slug = route.params.slug[0]

  const { data: content } = await useAsyncData('content', () => queryContent(`/checklists/${slug}`).findOne())

  definePageMeta({
    layout: 'checklist'
  })

  useHead({
    title: content.value.title
  })
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