<template>
  <div :style="{height: wHeight + 'px'}">
    <NavBar color="#0b495e"/>
    <b-container class="d-cn">
      <b-row style="padding-top: 1em;">
        <b-col md="12" style="overflow-y: auto;" :style="{height: (wHeight-150) + 'px'}">
          <nuxt/>
        </b-col>
      </b-row>
    </b-container>
    <Footer/>
    <PageResizer @pageResize="resizePage"/>
  </div>
</template>

<script>
import NavBar from "~/components/PageComponents/NavBar";
import Footer from "~/components/PageComponents/Footer";
import PageResizer from "~/components/PageComponents/PageResizer";

export default {
  components: {Footer, NavBar, PageResizer},
  name: "default",
  data() {
    return {
      txt: '',
      wHeight: null,
    }
  },
  methods: {
    resizePage(pageSize) {
      this.wHeight = pageSize
    }
  },
  created() {
    if (process.client) {
      this.wHeight = window.innerHeight;
    }
  }
}
</script>
