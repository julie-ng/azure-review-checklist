<script setup>
const props = defineProps({
  items: {
    type: Object,
    required: true
  },
  categories: { // TODO: move to pinia
    type: Object,
    required: true
  },
  subcategories: { // TODO: move to pinia
    type: Object,
    required: true
  }
})
</script>

<template>
  <nav class="mt-4">
    <div class="categories mr-4">
      <details v-for="(cat, catKey) in props.items" class="my-2">
        <summary>
          <NuxtLink :to="anchorLink(catKey)" class="has-text-weight-semibold is-size-7">{{ props.categories[catKey] }}</NuxtLink>
        </summary>
        <ul class="subcategories mt-1 mb-4">
          <li v-for="(subcat, subcatKey) in cat" class="ml-4 is-size-7">
            <NuxtLink :to="anchorLink(subcatKey)">{{ props.subcategories[subcatKey] }}</NuxtLink>
          </li>
        </ul>
      </details>
    </div>
  </nav>
</template>


<style lang="scss" scoped>
  nav {
    summary {
      line-height: 1.1em;
    }

    a:hover, a:active {
      text-decoration: underline;
    }

    a:not(.button):link, a:not(.button):visited {
      color: var(--bulma-text-color);
    }
  }

  details {
  summary {
    cursor: pointer;

    & > * {
      display: inline;
      margin-left: .25em;
    }
  }
}

</style>