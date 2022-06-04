<template>
  <div>
    <h2>Platform page</h2>
  </div>
</template>

<script>
export default {
  layout: 'platform',
  middleware: ['maintenance','auth']
}
</script>
