<template>
  <div class="m-item" style="height: 15%;">
    <b-form-textarea
      id="textarea"
      class="m-input"
      placeholder="Enter something..."
      rows="3"
      max-rows="6"
    ></b-form-textarea>
  </div>
</template>

<style scoped>
.m-item {
  background-color: #c8cfcf;
  padding: 1px;
  position: sticky;
  bottom: 0;
}
.m-input{
  height: 100% !important;
}
</style>
