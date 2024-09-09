<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  pillar: {
    type: String,
    required: false,
    default: ''
  },
  text: {
    required: String,
    required: true
  }
})
</script>

<template>
  <div class="columns table-row ">
    <div class="column is-1 pt-5 pb-3">
      <p class="is-size-6">
        {{ props.id }}
      </p>
    </div>
    <div class="column is-1 pt-5 pb-3" style="width: 10%">
      <p class="is-size-6">
        {{ props.pillar }}
      </p>
    </div>
    <div class="column is-8 pt-5 pb-3">
      <p class="is-size-5">
        {{ props.text }}
      </p>
    </div>
    <div class="column pt-5 pb-3 is-2">
      <ChecklistItemDropdown/>
    </div>
  </div>
</template>

<style lang="scss">
.table-row {
  border-bottom: 1px solid var(--bulma-grey-lighter);

  // .column {
  //   border: 1px solid red;
  // }
}
</style>