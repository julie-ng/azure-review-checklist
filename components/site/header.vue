<script setup>
const props = defineProps({
  isFixed: {
    type: Boolean,
    required: false,
    default: false
  }
})

function navbarClasses () {
  return props.isFixed
    ? 'navbar is-fixed-top'
    : 'navbar'
}

</script>

<template>
  <nav :class="navbarClasses()" role="navigation" aria-label="main navigation">
    <div class="container is-size-5">
      <div class="navbar-brand">
        <span class="navbar-item pr-1">
          <img src="/images/azure-logo-48px.svg">
        </span>
        <span class="navbar-item px-1 has-text-weight-bold has-msft-blue-color">
          Azure Review Checklists
        </span>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-end is-size-6">
        <div class="navbar-item">
          Checklists
        </div>
        <div class="navbar-item">
          About
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
.navbar {
  // background: none;
  border-bottom: 1px solid var(--msft-warm-light-grey);
}
</style>