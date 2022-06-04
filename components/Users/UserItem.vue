<template>
  <b-row class="u-item text-center" align-v="center">
    <b-col md="3" class="d-none d-md-block">
      <NuxtLink :to="{name:'users-id',params:{'id':user._id}}">
        <b-avatar size="5rem" class="app-avatar" :src="getUserAvatar(user)"></b-avatar>
      </NuxtLink>
    </b-col>
    <b-col md="9">
      <b-row>
        <b-col md="6" class="pl-5">
          <NuxtLink :to="{name:'users-id',params:{'id':user._id}}">
            <b-row>{{ user.name }} {{ user.lastname }}</b-row>
            <b-row class="text-black-50">{{ user.email }}</b-row>
          </NuxtLink>
          <b-row class="mt-2 text-black-50 info">Created {{ user.created_ago }}</b-row>
        </b-col>
<!--        <b-col md="6" class="d-none d-md-block text-right">-->
<!--          <nuxt-link to="#">Send message</nuxt-link>-->
<!--        </b-col>-->
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.u-item {
  position: relative;
  background-color: #c2c0c040;
  border-radius: 10px;
  height: 100px;
  margin: 5px 0 5px 0;
}

.u-item:hover {
  background-color: #c2c0c061;
}
</style>
