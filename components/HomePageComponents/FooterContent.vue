<template>
  <b-row class="footer-content">
    <b-col md="10" offset-md="1" class="f-col-content">
      <b-row>
        <b-col>
          <b-row>
            <b-col sm="12" md="3" class="mt-lg-5 mt-sm-4">
              <b-img class="img-fluid" width="170" fluid src="~/assets/images/design/logo.png"></b-img>
            </b-col>
            <b-col sm="6" md="3" class="mt-lg-5 mt-sm-4 f-col">
              <nuxt-link class="text-white d-block pb-2" to="/about">About</nuxt-link>
              <nuxt-link class="text-white d-block pb-2" to="/contact-us">Contact Us</nuxt-link>
              <nuxt-link class="text-white d-block pb-2" to="/faq">FAQ</nuxt-link>
            </b-col>
            <b-col sm="6" md="3" class="mt-lg-5 mt-sm-4 f-col">
              <nuxt-link class="text-white d-block pb-2" to="/platform">Courses</nuxt-link>
              <nuxt-link class="text-white d-block pb-2" to="/platform">IT Talks</nuxt-link>
              <nuxt-link class="text-white d-block pb-2" to="/devs">For Developers</nuxt-link>
            </b-col>
            <b-col md="12" lg="3" class="mt-lg-5 mt-sm-4 text-white pl-0 f-col">
              <p class="h3 mb-2 ml-3 d-inline">
                <b-icon icon="github"></b-icon>
              </p>
              <p class="h3 mb-2 ml-3 d-inline">
                <b-icon icon="facebook"></b-icon>
              </p>
              <p class="h3 mb-2 ml-3 d-inline">
                <b-icon icon="instagram"></b-icon>
              </p>
              <p class="h3 mb-2 ml-3 d-inline">
                <b-icon icon="youtube"></b-icon>
              </p>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="12" sm="12" class="text-white text-center mb-4 mt-lg-5 f-col-leg">
          <LegalContent/>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import LegalContent from "~/components/PageComponents/Footer/LegalContent";

export default {
  components: {LegalContent},
}
</script>

<style scoped>
.footer-content {
  background-color: #0b495e;
}

.f-col-content {
  max-width: 900px;
  margin: auto;
}

.row {
  margin: 0;
}

@media (max-width: 570px) {
  .f-col-content, .f-col {
    margin-top: 5%;
  }
}

@media (max-width: 970px) {
  .f-col-leg {
    margin-top: 5%;
  }
}
</style>
