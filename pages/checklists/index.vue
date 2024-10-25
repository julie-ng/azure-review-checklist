<script setup>
  const { data: content } = await useAsyncData('checklist-index', () => {
    return queryContent('/checklists')
      .where({
        _path: '/checklists',
        _file: { $contains: 'index.md' }
      })
      .findOne()
  })

  const { data: checklists } = await useAsyncData('checklist-nav', () => {
    return queryContent('/checklists')
      .where({
        _file: { $ne: 'guide/index.md' },
        _dir: { $eq: 'checklists'}, // fetch only 1 level
      })
      .only(['_path', 'title', 'description'])
      .find()
  })
</script>

<template>
  <div>
    <section class="content">
      <ContentRenderer :value="content">
        <h1>{{ content.title }}</h1>
        <ContentRendererMarkdown :value="content" />
      </ContentRenderer>
    </section>

    <section>
      <div class="grid">
        <article v-for="list in checklists" :key="list._path" class="cell">
          <div class="card">
            <div class="card-content">
              <div class="content">
                <h1 class="is-size-4">
                  <NuxtLink :to="list._path">{{ list.title }}</NuxtLink>
                </h1>
                <p>{{ list.description }}</p>
                <p>
                  <NuxtLink :to="list._path" class="button is-primary is-outlined">Review checklist &rarr;</NuxtLink>
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>