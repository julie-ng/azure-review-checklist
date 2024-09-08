<script setup>
  useHead({
    title: 'Landing Zone Review'
  })

  const { data: checklist, status, error, refresh, clear } = await useAsyncData(
    'landing-zone-checklist',
    () => $fetch('/api/data/checklist/landing-zone')
  )
  // const { data: checklist } = await useAsyncData('/data/checklists/alz_checklist.en.json')

  // console.log(checklist.value.items)
  const categories = {}
  const subcategories = {}
  const list = {}

  checklist.value.items.forEach(function(item) {
    const catKey = toLowerDashed(item.category)
    const subcatKey = toLowerDashed(item.subcategory)

    if (!hasCategory (catKey)) {
      list[catKey] = {}
      categories[catKey] = item.category
    }

    if (!hasSubcategory (catKey, subcatKey)) {
      list[catKey][subcatKey] = []
      subcategories[subcatKey] = item.subcategory
    }

    list[catKey][subcatKey].push(item)
  })

  // console.log('---')
  // console.log(list)
  // console.log('---')

  function hasCategory (key) {
    return list.hasOwnProperty(key)
  }

  function hasSubcategory (catKey, subcatKey) {
    return list.hasOwnProperty(catKey) && list[catKey].hasOwnProperty(subcatKey)
  }
</script>

<template>
  <div>
  <SiteHero/>
  <div class="container">
    <div class="columns is-gapless">
      <div class="column is-one-quarter has-category-nav">
        <nav class="category-nav pt-5">
          <ul>
            <li v-for="(cat, catKey) in list">
              <NuxtLink :to="anchorLink(catKey)" class="has-text-weight-semibold">{{ categories[catKey] }}</NuxtLink>
              <ul class="mt-1 mb-4">
                <li v-for="(subcat, subcatKey) in cat" class="ml-4 is-size-6">
                  <NuxtLink :to="anchorLink(subcatKey)">{{ subcategories[subcatKey] }}</NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div class="column pt-6">
  <section v-for="(category, catKey) in list" ref="detailsEls">
          <div class="category-header py-4 px-6 mt-3 mb-4 has-text-primary is-sticky-heading">
            <h1 class="is-size-2 py-3 has-background-primary-90 has-text-weight-bold" :id="catKey">
              {{ categories[catKey] }}
            </h1>
          </div>
          <section v-for="(subcategory, subcatKey) in category" class="px-6">
            <h2 class="is-size-3 has-text-weight-bold has-scroll-margin-top-100" :id="subcatKey">
              {{ subcategories[subcatKey] }}
            </h2>
            <article v-for="item in subcategory" class="checklist-item box has-background-light2 my-5 py-5 px-5">
              <p class="is-size-6 has-text-grey-light">
                <span class="has-text-primary-333">{{ item.id }}</span>
                &nbsp;<span class="has-text-grey-lighter">|</span>&nbsp;
                {{ item.subcategory }}
                &nbsp;<span class="has-text-grey-lighter">|</span>&nbsp;
                Pillar: {{ item.waf }}
              </p>
              <h1 class="is-size-4 has-text-weight-normal mb-4">
                {{ item.text }}
              </h1>

              <div class="buttons">
                <NuxtLink :to="item.link" target="_blank" class="button is-small is-light is-primary">Documentation</NuxtLink>
                <NuxtLink :to="item.training" target="_blank" class="button is-small is-light is-info">MS Learn</NuxtLink>
              </div>
            </article>
          </section>

      </section>
      </div>
    </div>
  </div>





    <!-- {
  "category": "Azure Billing and Microsoft Entra ID Tenants",
  "subcategory": "Enterprise Agreement",
  "text": "Use of Enterprise Dev/Test Subscriptions to reduce costs for non-production workloads.",
  "waf": "Cost",
  "guid": "5cf9f485-2784-49b3-9824-75d9b8bdb57b",
  "id": "A03.05",
  "severity": "Low",
  "link": "https://learn.microsoft.com/azure/cloud-adoption-framework/ready/landing-zone/design-area/azure-billing-enterprise-agreement#design-considerations",
  "training": "https://learn.microsoft.com/azure/devtest/offer/how-to-manage-monitor-devtest"
}, -->
  </div>

</template>

<style lang="scss">

details {
  summary {
    cursor: pointer;

    & > * {
      display: inline;
      margin-left: .25em;
    }
  }
}
// .has-category-nav {
//   overflow: scroll;
// }

.category-nav {
  position: sticky;
  top: 0;
  max-height: 100vh;
  overflow: auto;
  border-right: 1px solid #ddd;

  li {
    li {
      list-style-type: circle;
    }
  }

  a:not(.button):link, a:not(.button):visited {
    color: var(--bulma-text-color);
  }
}

a:hover, a:active {
  text-decoration: underline;
}

.is-sticky-heading {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.category-header {
  background: rgba(255,255,255,0.95);
  h1 {
    border-left: 8px solid var(--bulma-primary);
    padding-left: 20px;
  }
}

.has-scroll-margin-top-100 {
  scroll-margin-top: 100px;
}
</style>