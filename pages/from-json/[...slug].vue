<script setup>
  // import { useChecklistStoreV3 } from '~/stores/ChecklistStoreV3'
  // const checklistStoreV3 = useChecklistStoreV3()
  const route = useRoute()
  const slug = route.params.slug[0]
  const checklistKey = route.params.slug[0]

  /**
   * Fetch categories and subcategories
   */
  const { data: categories } = await useAsyncData(`${slug}-from-json-categories`, () => {
    return queryContent(`/from-json/${slug}`)
      .where({ _partial: { $eq: false }})
      .without(['body'])
      .find()
  })
  console.log('categories', categories.value)

  const schema = {
    categories: {},
    subcategories: {}
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
      // console.log('category key would be', categoryKey)

      if (!Object.hasOwn(schema.subcategories, categoryKey)) {
        schema.subcategories[categoryKey] = []
      }

      schema.subcategories[categoryKey].push(c)
      // schema.subcategories[c._path] = c // not sure we need this, but keeping for now.
    }
  })
  // console.log('schema', schema)

  /**
   * Fetch Checklist Items
   */

  // async function fetchItems(subcategoryPath) {
  //   const asyncCacheKey = subcategoryPath.replace('/', '-')
  //   console.log('asyncCacheKey', asyncCacheKey)

  //   const { data: items } = await useAsyncData(asyncCacheKey, () => {
  //    return queryContent(subcategoryPath)
  //      .where({ _partial: { $eq: true }})
  //      .without(['body'])
  //      .find()
  //   })

  //   console.log('items', items.value)

  //   return items
  // }


</script>

<template>
  <div class="content mt-6">
    <h1>Slug</h1>
    <pre><code>{{ slug }}</code></pre>

    <ChecklistNavigationV2 :schema="schema" />

    <!-- <h1>List</h1>
    <pre><code>{{ list }}</code></pre> -->

    <h1>Categories & Subcategories</h1>
    <ul>
      <li v-for="c in schema.categories" :id="c._path">
        <h3>
          {{ c.title }}
          <!-- <code class="is-size-7">{{ c._path }}</code> -->
        </h3>
        <ul>
          <li v-for="s in schema.subcategories[c._path]">
            <!-- {{ s.title }} -->
            <!-- <code>{{ s._path }}</code> -->
             <ChecklistSubcategoryV2 :title="s.title" :content-path="s._path" />

          </li>
        </ul>
      </li>
    </ul>


    <details>
      <summary>Raw Data
      </summary>
      <pre><code>{{ categories }}</code></pre>
    </details>

    <!--
    <details>
      <summary>
        <h1>Checklist Items</h1>
      </summary>
      <pre><code>{{ checklistItems }}</code></pre>
    </details> -->
  </div>
</template>

<style lang="scss">
summary {
  h1 {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>