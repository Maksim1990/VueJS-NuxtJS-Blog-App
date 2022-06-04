<template>
  <div>
    <NavBar color="transparent" is-home-page="true"/>
    <Home/>
  </div>
</template>

<script>
import NavBar from "~/components/PageComponents/NavBar";
import Home from "~/components/Home";

export default {
  components: {NavBar, Home}
}
</script>
