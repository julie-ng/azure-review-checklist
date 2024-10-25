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
        <NuxtLink to="/" class="navbar-item">
            <img src="/images/azure-logo-48px.svg">
          <span class="has-text-weight-bold has-msft-blue-color">
            Azure Review Checklists
          </span>
        </NuxtLink>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-end is-size-6">
        <div class="navbar-item">
          <NuxtLink to="/checklists/">
            Checklists
          </NuxtLink>
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