<script setup>
  // import { useChecklistStore } from '~/stores/ChecklistStore'
  // const checklistStore = useChecklistStore()

  const props = defineProps({
    title: {
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
  <div>
    <h1 class="is-size-4 py-3 has-text-weight-bold">{{ props.title }}</h1>
    <article v-for="item in props.items"
      :key="item.guid"
      :data-id="item.id"
      :data-guid="item.guid"
      :data-severity="item.severity"
      :data-waf-pillar="item.waf"
    >
      <ChecklistItem :id="item.id" :pillar="item.waf" :text="item.text" />
    </article>
  </div>
</template>