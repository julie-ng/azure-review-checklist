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
  <section class="my-5 px-5 py-4">
    <h1 :id="props.subcategoryKey" class="is-size-4 py-3 has-text-weight-bold has-msft-blue-color">{{ props.title }}</h1>
    <ChecklistHeaderRow />
    <article v-for="item in props.items"
      :key="item.guid"
      :data-id="item.id"
      :data-guid="item.guid"
      :data-severity="item.severity"
      :data-waf-pillar="item.waf"
    >
      <ChecklistItem
        :id="item.id"
        :pillar="item.waf"
        :text="item.text"
        :doc-link="item.link"
        :training-link="item.training">
      </ChecklistItem>
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