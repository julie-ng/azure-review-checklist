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
      <details v-for="category in props.schema.categories" :key="category._path">
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
          <li v-for="subcategory in props.schema.subcategories.sortOrder[category._path]" :key="subcategory._path" class="mr-3 mb-2">
            <NuxtLink :to="anchorLinkFromPath(subcategory._path)" class="is-size-7">
              {{ subcategory.title }}
            </NuxtLink>
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
     ul {
      border-left: 1px solid #ddd;
      margin-left: 1.5rem;
      padding-left: 1rem;
     }

    summary {
      cursor: pointer;
      list-style: none;
      &::-webkit-details-marker {
        display: none;
      }

      & > span {
        display: block;
        padding-left: 1.5em;
        // border: 1px solid blue;
      }

      &::before {
        float: left;
        font-size: 1.5em;
        margin-right: 0.5em;
        content: '›';
        font-weight: 500;
        // rotate: -270deg;
        // border: 1px solid blue;
        text-align: center;

        // width: 50px;
      }
    }
  }

  details[open] > summary {
    &::before {
      transform: rotate(-270deg);
      margin-left: 4px;
    }
  }

  details:first-child {
    summary {
      padding-top: 0 !important;
    }
  }
</style>
