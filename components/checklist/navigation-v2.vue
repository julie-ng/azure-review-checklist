<script setup>
const props = defineProps({
  schema: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <nav>
    <div class="categories mr-4">
      <details v-for="category in props.schema.categories" :id="category._path">
        <summary class="py-2 pr-2">
          <span>
            <NuxtLink
              :to="anchorLinkFromPath(category._path)"
              class="has-text-weight-semibold has-text-primary-ter is-size-7">
              {{ category.title }}
            </NuxtLink>
          </span>
        </summary>
        <ul class="subcategories mt-2 mb-4">
          <li v-for="subcategory in props.schema.subcategories[category._path]" :id="subcategory._path" class="mr-3 mb-2">
            <NuxtLink :to="anchorLink(subcategory._path)" class="is-size-7">
              {{ subcategory.title }}
            </NuxtLink>
          </li>
        </ul>
      </details>
    </div>
  </nav>
</template>