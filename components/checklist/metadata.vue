<script setup>
defineProps({
  metadata: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <table class="table is-bordered is-size-7">
    <tbody>
      <tr >
        <th>Status</th>
        <td>{{ metadata.state }}</td>
      </tr>
      <tr>
        <th>Last Updated?</th>
        <td>{{ metadata.timestamp }}</td>
      </tr>
      <tr>
        <th>WAF</th>
        <td>{{ metadata.waf }}</td>
      </tr>
    </tbody>
  </table>
</template>