<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col align-v md="12" style="background-color: cadetblue">
          <nuxt/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from "~/components/PageComponents/NavBar";
export default {
  components: {NavBar}
}
</script>
