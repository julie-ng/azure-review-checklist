<script setup>
  const route = useRoute()
  const selectRef = ref(null)

  const { data: checklists } = await useAsyncData(`checklists-nav`, () => {
    return queryContent('checklists')
      .without(['body'])
      .where({
        _partial: { $eq: false},
        metadata: { $exists: true }
      })
      .find()
  })

  function isSelected(path) {
    return path === route.path
  }

  function onChange (event) {
    event.preventDefault()
    navigateTo(event.target.value)
  }
</script>

<template>
  <div>
    <div class="select">
      <select name="checklist-select" ref="selectRef" @change="onChange">
        <option v-for="list in checklists"
          :key="list._path"
          :value="list._path"
          :selected="isSelected(list._path)">
          {{ list.title }}
        </option>
      </select>
    </div>
  </div>
</template>