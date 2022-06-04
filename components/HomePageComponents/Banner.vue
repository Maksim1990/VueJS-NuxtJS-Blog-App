<template>
  <div class="banner">
    <b-jumbotron class="b-background vertical-center">
      <div class="container">
      <b-row class="text-center banner-row" align-v="center">
        <b-col md="6" sm="12" class="b-left">
          <h1 class="animate__animated animate__fadeInLeft">Become A <b>Laravel Master</b> Within One Month</h1>
          <h6>
            Technology Is Bringing A Massive Wave Of Evolution On Learning Things In Different Ways
          </h6>
          <b-button class="btn-browse mt-3" to="/platform">Start Now</b-button>
        </b-col>
        <b-col md="6" sm="12" class="b-right">
          <b-img
            class="animate__animated animate__fadeInUp"
            v-bind="mainProps"
            rounded
            alt="Rounded image"
            src="~/assets/images/design/rocket.png"
          ></b-img>
        </b-col>
      </b-row>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainProps: {width: 400, height: 400, class: 'm1 mb-2'}
    }
  }
}
</script>

<style scoped>

.b-background {
  border-radius: 0;
  min-height: 800px;
  margin-bottom: 5%;
  color: white;
  background-image: url('~@/assets/images/design/mainbanner.png');
  background-color: white;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.b-right {
  margin-left: -5%;
}

@media (max-width: 770px) {
  .b-left {
    margin-top: 15%;
  }

  .b-right {
    margin-bottom: 10%;
  }
}

@media (max-width: 400px) {
  .b-right > img{
    width: 100%;
    height: auto;
  }
}

.btn-browse {
  color: #089b7d;
  background-color: white;
}
</style>
