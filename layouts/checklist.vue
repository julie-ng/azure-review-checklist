<script setup>
</script>

<template>
  <div>
    <SiteHeader :is-fixed="true" />

    <div class="container">
      <div class="columns is-gapless">
        <div class="column is-2">
          <div class="mr-2 has-sticky-side-nav">
            <SidebarNavigation />
          </div>
        </div>
        <div class="column" role="main">
          <main class="px-2 pt-2">
            <slot />
          </main>
        </div>
      </div>
    </div>

    <SiteFooter />
  </div>
</template>

<style lang="scss">
[role="main"] {
  min-height: 600px;
}

// offset fixed header navigation
.has-sticky-side-nav, // TODO: double check component code
[role="main"] {
  position: relative;
  top: 58px;
}
</style>