<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

// console.log(props.item)

// function checked (evt) {
//   const checklistItemId = evt.target.dataset.checklistItemId
//   const checklistItemGuid = evt.target.dataset.checklistItemGuid
//   const isChecked = evt.target.checked
//   const debugCheckedMsg =  (isChecked) ? 'selected' : 'deselected'
//   // console.log(`Checkbox ${checklistItemId} - ${debugCheckedMsg}`)

//   const HARDCODED_CHECKLIST_KEY = 'landing-zone'
//   const item = checklistStore.getItemByGuid(HARDCODED_CHECKLIST_KEY, checklistItemGuid)

//   if (item) {
//     console.groupCollapsed(`Found Item ${checklistItemGuid}`)
//     console.table(item)
//     console.groupEnd()
//   }
// }
</script>

<template>
  <div class="table-row py-2 is-size-6">
    <div class="columns mx-1">
      <div class="column is-1" style="width: 5%">
        <label class="checkbox">
          <input type="checkbox" @input="checked"
            :id="formIdFromItem(props.item, 'checkbox')"
            :data-checklist-item-guid="props.item.guid"
            :data-checklist-item-id="props.item.id">
        </label>
      </div>
      <div class="column is-1">
        {{ props.item.id }}
      </div>
      <div class="column is-1" style="width: 10%">
        {{ props.item.waf }}
      </div>
      <div class="column is-6">
        {{ props.item.text }}
      </div>
      <div class="column is-2">
        <ChecklistItemDropdown :id="formIdFromItem(item, 'reason') "/>
      </div>
      <div class="column is-2">
        <NuxtLink :to="props.item.link" target="_blank" class="mr-3" title="Link to Documentation">
          <img src="/images/iconmonstr-info-6.svg" alt="Documentation" class="icon">
        </NuxtLink>
        <NuxtLink :to="props.item.training" target="_blank" title="Link to Training">
          <img src="/images/iconmonstr-school-21.svg" alt="Training" class="icon">
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.table-row {
  border-top: 1px solid var(--msft-warm-light-grey); // #DEE6EA;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.icon {
  display: inline-block;
  vertical-align: middle;
  max-width: 16px;
  max-height: 16px;
  opacity: 0.4;

  &:hover {
    opacity: 1;
    transition: opacity 0.6s;
  }
}
</style>