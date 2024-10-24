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

<div>
  <div class="select">
  <select>
    <option>Cost</option>
    <option selected>Landing Zone Review</option>
    <option>Multitenancy</option>
  </select>
</div>
</div>

  <!-- <div class="dropdown is-hoverable">
  <div class="dropdown-trigger">
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
      <span>Current</span>
      ›
      &rsaquo;
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
      <a v-for="item in checklists" :href="item.key" class="dropdown-item">{{ item.name }}</a>
       <a href="#" class="dropdown-item"> Dropdown item </a>
      <a class="dropdown-item"> Other dropdown item </a>
      <a href="#" class="dropdown-item is-active"> Active dropdown item </a>
      <a href="#" class="dropdown-item"> Other dropdown item </a>
      <hr class="dropdown-divider" />
      <a href="#" class="dropdown-item"> With a divider </a>
    </div>
  </div>
</div> -->
</template>