<script setup>

const checklists = [
  {
    name: 'Landing Zone',
    key: 'landing-zone'
  },
  {
    name: 'Cost',
    key: 'cost'
  },
  {
    name: 'Multitenancy',
    key: 'multitenancy'
  },
]

</script>

<template>
  <div class="select">
    <select>
      <option>Cost</option>
      <option selected>Landing Zone Review</option>
      <option>Multitenancy</option>
    </select>
  </div>
</template>