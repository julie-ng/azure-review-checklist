<script setup>
  const route = useRoute()
  const selectRef = ref(null)

  const { data: checklists } = await useAsyncData('checklist-nav', () => {
    return queryContent('/checklists')
      .where({
        _file: { $ne: 'guide/index.md' },
        _dir: { $eq: 'checklists'}, // fetch only 1 level
      })
      .only(['_path', 'title'])
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
      <select ref="selectRef" @change="onChange">
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