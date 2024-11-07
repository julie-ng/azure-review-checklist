<script setup>
const props = defineProps({
  contentPath: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const asyncCacheKey = props.contentPath.replace('/', '-')
const { data: items } = await useAsyncData(asyncCacheKey, () => {
  return queryContent(props.contentPath)
    .where({ _partial: { $eq: true }})
    .without(['body'])
    .find()
})


</script>

<template>
  <section>
    <p class="has-text-weight-bold has-msft-blue-color">{{ props.title }}</p>
    <p><code>{{ props.contentPath }}</code></p>

    <ul>
      <li v-for="i in items" :id="i._path">
        WAF: {{ i.waf }} <br>
        Severity: {{ i.severity }} <br>
        {{ i.text }} <br>

      </li>
    </ul>

    <!-- <details>
      <summary>
        <p><code>{{ props.contentPath }}</code></p>
      </summary>
      <pre><code>{{ items }}</code></pre>
    </details> -->
  </section>
</template>