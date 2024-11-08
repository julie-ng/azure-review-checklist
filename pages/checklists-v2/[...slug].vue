<script setup>
  const route = useRoute()
  const slug = route.params.slug[0]
  const checklistKey = route.params.slug[0]

  definePageMeta({
    layout: false
  })

  /**
   * Fetch Markdown Content
   */
  const { data: content } = await useAsyncData(`${slug}-content`, () => queryContent(`/checklists/${slug}`).findOne())
  if (!content.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found'
    })
  }

  /**
   * Fetch Categories and Subcategories
   */
  const { data: categories } = await useAsyncData(`${slug}-from-json-categories`, () => {
    return queryContent(`/from-json/${slug}`)
      .where({ _partial: { $eq: false }})
      .without(['body'])
      .find()
  })
  // console.log('categories', categories.value)

  const schema = {
    categories: {},
    subcategories: {
      sortOrder: {},
      lookup: {}
    }
  }

  categories.value.forEach((c) => {
    const parts         = c._path.split('/')
    const isCategory    = parts.length === 4
    const isSubcategory = parts.length === 5

    if (isCategory) {
      // console.log('isCategory', c._path)
      schema.categories[c._path] = c
    }

    if (isSubcategory) {
      // console.log('isSubcategory', c._path)
      parts.pop()
      const categoryKey = parts.join('/')

      if (!Object.hasOwn(schema.subcategories.sortOrder, categoryKey)) {
        schema.subcategories.sortOrder[categoryKey] = []
      }
      schema.subcategories.sortOrder[categoryKey].push(c)
      schema.subcategories.lookup[c._path] = c  // need so that we don't have to search array above.
    }
  })

  // console.log('Subcategories')
  // console.log(schema.subcategories)
</script>

<template>
  <div>
    <SiteHeader :is-fixed="true" />
    <div class="container">
      <div class="columns is-gapless">
        <div class="column is-2">
          <div class="mr-2 has-sticky-side-nav">
            <!-- <p class="mt-0 mb-2 is-size-7 has-text-weight-semibold is-uppercase has-msft-cool-grey-color">
              Checklist
            </p>
            <ChecklistDropdown /> -->

            <p class="mt-5 mb-2 is-size-7 has-text-weight-semibold is-uppercase has-msft-cool-grey-color">
              Categories
            </p>
            <ChecklistNavigationV2 :schema="schema" />

          </div>
        </div>
        <div class="column" role="main">
          <main class="content px-2 pt-2">
            <ContentRenderer :value="content">
              <h1>{{ content.title }}</h1>
              <!-- <ChecklistMetadata
                :status="schema.metadata.state"
                :timestamp="schema.metadata.timestamp"/> -->
              <ContentRendererMarkdown :value="content" />
              <h1>Checklist Items</h1>
            </ContentRenderer>

            <section v-for="category in schema.categories" :key="category._path">
              <h1 class="is-size-4 py-3 px-5 has-text-weight-semibold has-text-white has-sticky-category-heading"
              :id="anchorIdFromPath(category._path)">
                {{ category.title }}
              </h1>
              <ChecklistSubcategoryV2 v-for="s in schema.subcategories.sortOrder[category._path]"
                :key="s._path"
                :title="s.title"
                :content-path="s._path">
              </ChecklistSubcategoryV2>
            </section>
          </main>
        </div>
      </div>
    </div>

    <SiteFooter />
  </div>
</template>

<style lang="scss">
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