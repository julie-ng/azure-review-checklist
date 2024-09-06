<script setup>
  const { data: checklist, status, error, refresh, clear } = await useAsyncData(
    'landing-zone-checklist',
    () => $fetch('/api/data/checklist/landing-zone')
  )
  // const { data: checklist } = await useAsyncData('/data/checklists/alz_checklist.en.json')

  // console.log(checklist.value.items)
  const categories = {}
  const subcategories = []
  const items = {}

  const list = {}

  checklist.value.items.forEach(function(item) {
    const catKey = toLowerDashed(item.category)
    const subcatKey = toLowerDashed(item.subcategory)

    // Add to categories
    // if (!categories.hasOwnProperty(categoryKey)) {
    //   categories[categoryKey] = item.category
    // }


    // if (!subcategories.hasOwnProperty(subcategoryKey)) {
    //   subcategories[subcategoryKey] = item.subcategory
    // }

    if (!hasCategory (catKey)) {
      list[catKey] = {}
      categories[catKey] = item.category
    }

    if (!hasSubcategory (catKey, subcatKey)) {
      list[catKey][subcatKey] = []
      subcategories[subcatKey] = item.subcategory
    }

    list[catKey][subcatKey].push(item)

    // Add to items
    if (!items.hasOwnProperty(catKey)) {
      items[catKey] = []
    }


    items[catKey].push(item)
  })

  console.log('---')
  console.log(list)
  console.log('---')

  function hasCategory (key) {
    return list.hasOwnProperty(key)
  }

  function hasSubcategory (catKey, subcatKey) {
    return list.hasOwnProperty(catKey) && list[catKey].hasOwnProperty(subcatKey)
  }

  function anchorLink (id) {
    return `#${id}`
  }

  // const detailsEls = document.querySelectorAll('details')
  // detailsEls.forEach(el => { el.open = true })
  // console.log(detailsEls)
  const detailsEls = ref([])
</script>

<template>
  <div>
    <h1 class="is-size-2 has-text-weight-bold">Landing Zone Review</h1>
<!-- <pre><code>{{ list }}</code></pre> -->
    <div class="columns">
      <div class="column is-one-fifth">
        <nav class="category-nav">
          <ul>
            <li v-for="(cat, catKey) in list">
              <NuxtLink :to="anchorLink(catKey)" class="has-text-weight-bold">{{ categories[catKey] }}</NuxtLink>
              <!-- <ul>
                <li v-for="(subcat, subcatKey) in cat" class="ml-4">
                  {{ subcatKey }}
                </li>
              </ul> -->
            </li>
          </ul>
        </nav>
      </div>
      <div class="column">
        <section v-for="category in items" ref="detailsEls">
        <details>
          <summary>
            <h1 class="is-size-3 has-text-weight-bold">
              {{ category[0].category }}
            </h1>
          </summary>
          <article v-for="item in category">
            <p>{{ item.id }}</p>
             <h1 class="is-size-4">
               <NuxtLink :to="item.link" external>{{ item.text }}</NuxtLink>
             </h1>
            <p>WAF: {{ item.waf }}</p>
            <NuxtLink :to="item.training" external>Learn</NuxtLink>
            <hr>
          </article>
        </details>
        <hr>
      </section>
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
<!--
    <hr>
    <div>
      <details>
        <summary>
          <h1 class="is-size-4 has-text-weight-semibold">
            Raw Data
          </h1>
        </summary>
        <pre><code>
          {{ checklist }}
        </code></pre>
      </details>
    </div> -->
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

.category-nav {
  li {
    // list-style-type: disc;
    li {
      list-style-type: circle;
    }
  }
}

</style>