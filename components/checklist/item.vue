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
      <div class="column is-1" style="width: 5%">
        <label class="checkbox">
          <input type="checkbox">
        </label>
      </div>
      <div class="column is-1">
        {{ props.id }}
      </div>
      <div class="column is-1" style="width: 10%">
        {{ props.pillar }}
      </div>
      <div class="column is-6">
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
  border-top: 1px solid var(--msft-warm-light-grey); // #DEE6EA;
}
</style>