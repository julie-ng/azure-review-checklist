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
    type: String,
    required: true
  },
  docLink: {
    type: String,
    required: false,
    default: 'default'
  },
  trainingLink: {
    type: String,
    required: false,
    default: 'training'
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
      <div class="column is-2">
        <NuxtLink :to="props.docLink" target="_blank" class="mr-3" title="Link to Documentation">
          <img src="/images/iconmonstr-info-6.svg" alt="Documentation" class="icon">
        </NuxtLink>
        <NuxtLink :to="props.trainingLink" target="_blank" title="Link to Training">
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