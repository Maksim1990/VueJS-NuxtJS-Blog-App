<template>
  <b-jumbotron class="b-background vertical-center">
    <div class="container">
      <b-row class="text-center courses-row" align-v="center">
        <b-col sm="10" offset-sm="1">
          <h1><b>Explore</b> Top Courses</h1>
          <b-row>
            <CoursesInfoItem text="HTML & CSS" :img="require('~/assets/images/design/course1.png')"/>
            <CoursesInfoItem text="Laravel Framework" :img="require('~/assets/images/design/course2.png')"/>
          </b-row>
          <b-row>
            <CoursesInfoItem text="Dig Deeper Into JavScript" :img="require('~/assets/images/design/course3.png')"/>
            <CoursesInfoItem text="Web Applications Testing" :img="require('~/assets/images/design/course4.png')"/>
          </b-row>
          <b-row>
            <b-col class="text-center mt-5">
              <b-button class="btn-browse" to="/platform">Browse All</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
  </b-jumbotron>
</template>
<script>
import CoursesInfoItem from "~/components/HomePageComponents/CoursesInfoItem";

export default {
  components: {CoursesInfoItem},
}
</script>
<style scoped>
.btn-browse {
  color: #089b7d;
  background-color: white;
}
.b-background {
  color: white;
  min-height: 1400px;
  margin-top: 5%;
  border-radius: 0;
  background-image: url('~@/assets/images/design/coursebg.png');
  background-color: white;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.courses-row {
  padding-top: 25px;
}

@media (max-width: 770px) {
  .courses-row {
    padding-top: 0;
  }

  .b-background {
    margin-top: 10%;
    background-image: url('~@/assets/images/design/coursebg-no-wave.png');
  }
}
</style>
