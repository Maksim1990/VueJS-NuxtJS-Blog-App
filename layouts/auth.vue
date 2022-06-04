<template>
  <b-jumbotron class="b-coming p-0 m-0">
    <NavBar color="#0b495e"/>
    <div>
      <div class="container">
        <nuxt/>
      </div>
    </div>
  </b-jumbotron>
</template>
<script>
import NavBar from "~/components/PageComponents/NavBar";

export default {
  components: {NavBar}
}
</script>
<style scoped>
.b-coming {
  height: 100vh;
  color: white;
  background-image: url('~@/assets/images/design/comingsoon-bg.png');
  background-color: white;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.btn-browse {
  color: #089b7d;
  background-color: white;
}
</style>
