<template>
  <b-container>
    <b-row>
      <b-col md="12">
        <b-row>
          <b-col lg="5" md="12" class="px-5 mt-lg-5">
            <h2 class="mb-3">What Will You Learn?</h2>
            <p>
              At SkillsMaster we have prepared structured and easy to understand materials that will help you to learn modern and widespread profession
              as Web Developer. Our materials are grouped in courses based on topics and categories and start with a completely beginning of web development
              till professional master.
            </p>
          </b-col>
          <b-col lg="7" md="12" class="mt-lg-5">
            <b-row class="text-center ml-1 mr-1">
              <StatInfoItem
                text="100+"
                text-sub="Course"
                :img="require('~/assets/images/design/lesson.png')"
              />
              <StatInfoItem
                text="500+"
                text-sub="Hours Of Learning"
                :img="require('~/assets/images/design/clock.png')"
                animation="no"
              />
              <StatInfoItem
                text="1,000"
                text-sub="People World Wide"
                :img="require('~/assets/images/design/working.png')"
                animation="animate__fadeInRight"
              />
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import StatInfoItem from "~/components/HomePageComponents/StatInfoItem";
export default {
  components: {StatInfoItem}
}
</script>
