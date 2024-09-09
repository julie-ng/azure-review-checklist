<script setup>
  // import { useChecklistStore } from '~/stores/ChecklistStore'
  // const checklistStore = useChecklistStore()

  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    subcategoryKey: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  })
</script>

<template>
  <section class="my-4 px-5 py-4">
    <h1 :id="props.subcategoryKey" class="is-size-4 py-3 has-text-weight-bold">{{ props.title }}</h1>
    <ChecklistHeaderRow />
    <article v-for="item in props.items"
      :key="item.guid"
      :data-id="item.id"
      :data-guid="item.guid"
      :data-severity="item.severity"
      :data-waf-pillar="item.waf"
    >
      <ChecklistItem :id="item.id" :pillar="item.waf" :text="item.text" />
    </article>
  </section>
</template>


<style lang="scss" scoped>
  section {
    background: #fff;
    // border-radius: 6px;
    box-shadow: 0px 0px 6px rgba(0,0,0,0.05);
    // border: 1px solid red;
  }
</style>