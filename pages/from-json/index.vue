<script setup>

  const { data: indexPage } = await useAsyncData('from-json-index', () => {
    return queryContent('/from-json')
      .where({_file: 'from-json/index.md'}).findOne()
  })

  const mdChecklists = indexPage.value.checklists

  // const { data: checklists } = await useAsyncData('from-json-categories-list', () => {
  //   return queryContent('/from-json').find()
  // })

  function linkPath(c) {
    return `/from-json/${c}`
  }

</script>

<template>
  <div class="content mt-6">
    <h1>From JSON</h1>
    <ul>
      <li v-for="c in mdChecklists" :id="c">
        <NuxtLink :to="linkPath(c)">{{ c }}</NuxtLink>
      </li>
    </ul>
    <h3>Code</h3>
    <pre><code>{{ indexPage }}</code></pre>
  </div>
</template>