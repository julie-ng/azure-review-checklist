<script setup>
const props = defineProps({
  status: {
    type: String,
    required: false,
    default: 'Unknown'
  },
  timestamp: {
    type: String,
    required: false,
    default: 'Missing timestamp'
  }
})
</script>

<template>
  <table class="table is-bordered is-size-7">
    <tbody>
      <tr >
        <th>Status</th>
        <td>{{ props.status }}</td>
      </tr>
      <tr>
        <th>Last Updated?</th>
        <td>{{ props.timestamp }}</td>
      </tr>
    </tbody>
  </table>
</template>