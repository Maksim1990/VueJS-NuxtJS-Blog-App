<template>
  <b-jumbotron class="b-coming vertical-center p-0 m-0">
    <div class="container">
      <b-row class="text-center" align-v="center">
        <b-col>
          <h1 class="animate__animated animate__zoomIn coming-text display-4"><b>Coming Soon!</b></h1>
          <p>
            The platform is currently in active development and soon we will be happy to release our new and updated
            learning platform. With convenient and comprehensive deign and bunch of new options that will make
            learning process easier and more interesting!
          </p>
          <b-button class="btn-browse animate__animated animate__zoomIn mt-3" to="/">Back To Homepage</b-button>
        </b-col>
      </b-row>
      <b-row v-if="show">
        <b-col sm="4" offset-sm="4" class="text-center mt-5" align-v="bottom">
          <div>
            <p style="font-size: 12px;">If you want to be the first who receive the notification about SkillsMaster new
              platform release then please
              subscribe to these updates!</p>
            <b-form @submit="onSubmit">
              <b-form-group
                id="input-group-1"
                label-for="input-1"
                class="info-text"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  id="input-1"
                  v-model="email"
                  type="email"
                  placeholder="Enter email"
                  required
                ></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="success">Subscribe</b-button>
            </b-form>
          </div>
        </b-col>
      </b-row>
      <b-row v-else class="text-center mt-3">
        <b-col>
          <h6>
           Congratulations! You have successfully subscribed for SkillsMaster's notifications! Don't worry we won't spam you
            <b-icon icon="emoji-smile"></b-icon>!
          </h6>
        </b-col>

      </b-row>
    </div>
  </b-jumbotron>
</template>
<script>
export default {
  data() {
    return {
      email: null,
      show: true
    }
  },
  methods: {
    onSubmit() {
      this.show = false;
    }
  }
}
</script>
<style>
.text-muted {
  color: #dfd8d8 !important;
}

.coming-text {
  font-size: 5vh;
}

@media (min-width: 770px) {
  .coming-text {
    font-size: 10vh;
  }
}

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
