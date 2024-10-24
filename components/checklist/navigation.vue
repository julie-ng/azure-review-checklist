<script setup>
  import { useChecklistStore } from '~/stores/ChecklistStore'

  const checklistStore = useChecklistStore()
  const items = checklistStore.list
  const categories = checklistStore.categories
  const subcategories = checklistStore.subcategories
</script>

<template>
  <nav>
    <div class="categories mr-4">
      <details v-for="(cat, catKey) in items">
        <summary class="py-2 pr-2">
          <span>
            <NuxtLink :to="anchorLink(catKey)" class="has-text-weight-semibold has-text-primary-ter is-size-7">{{ categories[catKey] }}</NuxtLink>
          </span>
        </summary>
        <ul class="subcategories mt-2 mb-4">
          <li v-for="(subcat, subcatKey) in cat" class="mr-3 mb-2 is-size-7">
            <NuxtLink :to="anchorLink(subcatKey)">{{ subcategories[subcatKey] }}</NuxtLink>
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

  // details {
  // summary {
  //   cursor: pointer;

  //   & > * {
  //     display: inline;
  //     // margin-left: .25em;
  //   }
  // }

  details {
    //  border-bottom: 1px solid #e0e0e0; //var(--msft-cool-grey);

    //  &:last-child {
    //   border-bottom: none;
    //  }

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
    // list-style-type: '- ';
    // OR

    &::before {
      // display: inline-block;
      // float: right;
      // content: '–';
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