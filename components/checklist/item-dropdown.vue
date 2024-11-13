<script setup>
  const selectStyle = ref('')
  const selected = ref('')

  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  })

  const statuses = {
    'not-set': {
      text: '-',
      style: ''
    },
    fulfilled: {
      text: 'Fulfilled',
      style: 'has-background-success-85'
    },
    'not-required': {
      text: 'Not Required',
      style: 'has-background-success-95'
    },
    open: {
      text: 'Open',
      style: 'has-background-danger-95'
    },
    'not-verified': {
      text: 'Not Verified',
      style: 'has-background-warning-95'
    },
    'not-applicable': {
      text: 'Not Applicable',
      style: 'has-background-white-ter'
    }
  }

  function onChange (evt) {
    console.log('onChange()', evt.target.value)
    const key = evt.target.value
    selected.value = key
    selectStyle.value = statuses[key].style
  }
</script>

<template>
  <div>
    <select @change="onChange" :class="selectStyle" :id="props.id">
      <option v-for="(status, key) in statuses" :key="key" :value="key">
        {{ status.text }}
      </option>
    </select>
  </div>
</template>

<style lang="scss">
  select {
    width: 100%;
    // background-color: #f1f1f1;
    border-color: #dedede;
    padding: 4px 6px;
    // border-radius: 4px;
    font-size: 12px;
    color: #444;

    // &:focus {
    //   // outline: 2px dashed red;  /* replace the focus outline removed with 'outline: none' */
    //   // box-shadow: 2px 2px 0 rgba(0,0,0,0.5);
    // }
  }
</style>