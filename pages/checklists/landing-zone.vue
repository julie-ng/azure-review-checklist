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


  function hasCategory (key) {
    return list.hasOwnProperty(key)
  }

  function hasSubcategory (catKey, subcatKey) {
    return list.hasOwnProperty(catKey) && list[catKey].hasOwnProperty(subcatKey)
  }
</script>

<template>
  <div>
    <SiteHero title="Landing Zone Review" />
    <div class="container">
      <div class="columns is-gapless">
        <div class="column is-2">
          <ReviewNavigation :items="list" :categories="categories" :subcategories="subcategories" />
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
            <article v-for="item in subcategory" :data-severity="item.severity" class="checklist-item box has-background-light2 my-5 py-5 px-5">
              <p class="is-size-6 has-text-grey-light">
                <span class="has-text-primary-333">{{ item.id }}</span>
                &nbsp;<span class="has-text-grey-lighter">|</span>&nbsp;
                {{ item.subcategory }}
                &nbsp;<span class="has-text-grey-lighter">|</span>&nbsp;
                {{ item.waf }} Pillar
                &nbsp;<span class="has-text-grey-lighter">|</span>&nbsp;
                {{ item.severity }} Severity
              </p>
              <h1 class="is-size-4 has-text-weight-semibold mb-4">
                {{ item.text }}
              </h1>

              <!-- <div class="buttons has-addons">
                <button class="button is-warning2">Not verified</button>
                <button class="button is-danger2">Open</button>
                <button class="button is-success2">Fulfilled</button>
                <button class="button is-info2">Not Required</button>
                <button class="button is-light is-selected">N/A</button>
              </div> -->

<!--
              <div class="tags">
                <span class="tag is-light">{{ item.waf }} Pillar</span>
                <span class="tag is-light">{{ item.severity }} Severity</span>
              </div>
               -->
              <div class="buttons">
                <NuxtLink :to="item.link" target="_blank" class="button is-small is-light is-primary">More Information</NuxtLink>
                <NuxtLink :to="item.training" target="_blank" class="button is-small is-light is-info">Training</NuxtLink>
              </div>
            </article>
          </section>

      </section>
      </div>
    </div>
  </div>





  </div>

</template>

<style lang="scss">

html {
  scroll-behavior: smooth;
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

// [data-severity="High"] {
//   border-right: 5px solid red;
// }

// [data-severity="Medium"] {
//   border-right: 5px solid orange;
// }

// [data-severity="Low"] {
//   border-right: 5px solid yellow;
// }

</style>