<template>
  <div>
    <SiteHeader/>

      <slot />
    <SiteFooter/>
  </div>
</template>


<style lang="scss">
  html {
    scroll-behavior: smooth;
  }
</style>