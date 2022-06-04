<template>
  <div>
    <b-row class="mx-0">
      <b-col class="px-4 mx-3 text-center">
        <h1>What Our<b> Students Saying</b></h1>
      </b-col>
    </b-row>
    <b-row class="mx-0">
      <b-col md="10" offset-md="1">
      <b-carousel
        id="carousel-reviews"
        :interval="10000"
        indicators
        background="white"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;"
      >
        <b-carousel-slide img-blank v-for="review in reviews" :key="review.id">
          <b-row class="review-item" align-v="center">
            <b-col sm="4">
              <b-avatar :src="review.image" size="12rem"></b-avatar>
            </b-col>
            <b-col sm="8">
              <div><h3>{{ review.person }}</h3></div>
              <p>{{ review.text }}</p>
            </b-col>
          </b-row>
        </b-carousel-slide>
      </b-carousel>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reviews: [
        {
          id: '1',
          person: 'Sophie Moore',
          image: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Free-Download.png',
          text: '"I have tried Laravel Mastery course and I am really satisfied with material and the way of explaining how framework components are working. There were a lot of examples and homeworks during course. Teacher are available online in case have some questions or misunderstanding! I have a good experience and will advice SkillsMaster to my friends. Thanks SkillsMaster! And hope new interesting courses soon will be available here"',
        },
        {
          id: '2',
          person: 'Jack Moore',
          image: 'https://e7.pngegg.com/pngimages/78/788/png-clipart-computer-icons-avatar-business-computer-software-user-avatar-child-face.png',
          text: '"On SkillsMaster firstly I tried Basic Javascript course. This course has a good balance of theory and practice examples and homeworks. On the platform students can communicate with each other, discuss and help to each other while learning! Teacher is also available for asking questions. My nex course will be Modern VueJS."',
        }
      ]
    }
  },
}
</script>

<style>
.review-item {
  height: 100%;
  color: black;
}

.carousel-item {
  min-height: 500px;
}

.carousel-caption {
  height: 100% !important;
}

.carousel-indicators > li {
  border-radius: 50%;
}

.carousel-indicators li {
  border-color: #B7B2B7FF;
  border-width: 0;
  border-style: none solid none solid;
  background-color: #B7B2B7FF;
  height: 20px;
  width: 20px;
  margin: 0 16px;
  opacity: 1;
  padding: 1px;
  position: relative;
}

.carousel-indicators li::after {
  bottom: -7px;
  content: none;
  left: -7px;
  padding: 1px;
  position: absolute;
  right: -7px;
  top: -7px;
}

.carousel-indicators li.active {
  background-color: #0AC43EFF;
  border-color: #0AC43EFF;
  border-style: none solid none solid;
}
</style>
