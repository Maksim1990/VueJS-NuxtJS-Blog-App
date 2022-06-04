<template>
  <div>
    <b-btn class="btn" and style="border-width: inherit;background-color:transparent" v-b-modal.modal>
      <b-img fluid :src="image.url" :alt="image.name"></b-img>
    </b-btn>
    <b-modal ok-only id="modal" :title="image.name">
      <b-img fluid :src="image.url" :alt="image.name"></b-img>
      <template #modal-footer="{ ok }">
        <b-button size="sm" @click="ok()">Close</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ['image']
}
</script>

<style scoped>
/deep/ .modal-dialog {
  width: 100%;
  max-width: 100%;
}
</style>
