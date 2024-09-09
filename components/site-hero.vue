<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: false
  },
  style: {
    type: String,
    required: false,
    default: 'is-primary'
  },
  sticky: {
    type: Boolean,
    required: false,
    default: false
  }
})

const heroClasses = () => `hero is-small ${props.style}`

</script>

<template>
  <section :class="heroClasses()">
    <div class="hero-body">
    <div class="container py-3">
        <p class="title has-text-weight-semibold">{{ props.title }}</p>
        <p v-if="props.subtitle" class="subtitle">{{ props.subtitle }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  position: sticky;
  top: 0;
  max-height: 100vh;
  z-index: 100;
  // overflow: scroll;
}
</style>