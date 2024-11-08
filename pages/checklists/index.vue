<script setup>
  const route = useRoute()

  const contentKey = route.path.split('/')[1]
  // console.log('contentKey', contentKey)

  // Tip: hard-coded 'checklists' removes backend 404s to /api/content
  const { data: content } = await useAsyncData(`checklists-content`, () => {
    return queryContent('checklists')
      .where({_file: `checklists/index.md`})
      .findOne()
  })

  const { data: checklists } = await useAsyncData(`checklists-lists`, () => {
    return queryContent(route.path)
      .without(['body'])
      .where({
        _partial: { $eq: false},
        metadata: { $exists: true }
      })
      .find()
  })

</script>

<template>
  <div class="content mt-6">
    <ContentDoc />
    <section>
      <article v-for="list in checklists" :key="list.path" class="my-5">
        <h3>
          <NuxtLink :to="list._path">{{ list.title }}</NuxtLink>
        </h3>
        <ChecklistMetadata :metadata="list.metadata" />
      </article>
    </section>

  </div>
</template>