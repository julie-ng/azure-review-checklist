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
  <div class="is-sticky">
    <nav>
      <ul>
        <li v-for="(cat, catKey) in props.items">
          <NuxtLink :to="anchorLink(catKey)" class="has-text-weight-semibold is-size-7">{{ props.categories[catKey] }}</NuxtLink>
          <ul class="mt-1 mb-4">
            <li v-for="(subcat, subcatKey) in cat" class="ml-4 is-size-7">
              <NuxtLink :to="anchorLink(subcatKey)">{{ props.subcategories[subcatKey] }}</NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <!-- <pre><code>{{ props.items }}</code></pre> -->
  </div>
</template>


<style lang="scss">
  .is-sticky {
    position: sticky; /* only works if <nav> is the root element of this component*/
      top: 0;
      max-height: 100vh;
      overflow: scroll;
      border-right: 1px solid #ddd;
  }

  nav {
    li {
      li {
        list-style-type: circle;
      }
    }

    a:not(.button):link, a:not(.button):visited {
      color: var(--bulma-text-color);
    }
  }
</style>