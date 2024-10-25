<script setup>
const props = defineProps({
  schema: {
    type: Object,
    required: false,
    default: null
  }
})
</script>

<template>
  <div>
    <ClientOnly>
      <p class="mt-0 mb-2 is-size-7 has-text-weight-semibold is-uppercase has-msft-cool-grey-color">
        Checklist
      </p>
      <ChecklistDropdown />

      <p class="mt-5 mb-2 is-size-7 has-text-weight-semibold is-uppercase has-msft-cool-grey-color">
        Categories
      </p>

      <ChecklistNavigation :schema="props.schema" />
    </ClientOnly>
  </div>
</template>
