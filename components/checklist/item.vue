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
  <div class="table-row py-2 is-size-6">
    <div class="columns mx-1">
      <div class="column is-1">
        {{ props.id }}
      </div>
      <div class="column is-1" style="width: 10%">
        {{ props.pillar }}
      </div>
      <div class="column is-7">
        {{ props.text }}
      </div>
      <div class="column is-2">
        <ChecklistItemDropdown/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.table-row {
  border-top: 1px solid #DEE6EA; //var(--bulma-grey-lighter);
  // &:last-child {
  //   border-bottom: none;
  // }

  // .column {
  //   border: 1px solid red;
  // }
}
</style>