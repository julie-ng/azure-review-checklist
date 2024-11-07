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
  <section class="my-5 px-5 py-4">
    <h1 :id="anchorIdFromPath(props.contentPath)" class="is-size-4 py-3 has-text-weight-bold has-msft-blue-color">{{ props.title }}</h1>
    <ChecklistHeaderRow />
    <!-- <p><code>{{ props.contentPath }}</code></p> -->

    <article v-for="item in items"
      :key="item._path"
      :data-id="item.id"
      :data-severity="item.severity"
      :data-waf-pillar="item.waf"
    >
      <ChecklistItemV2 :item="item"/>
    </article>
  </section>
</template>


<style lang="scss" scoped>
  section {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 12px rgba(0,0,0,0.08);
  }

  h1 {
    scroll-margin-top: 110px; // scroll to correct position for anchor links
  }
</style>