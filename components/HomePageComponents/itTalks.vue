<template>
  <b-container>
    <b-row class="my-5">
      <b-col md="10" offset-md="1">
        <b-row>
          <b-col class="text-center">
            <h1><b>IT</b> Talks</h1>
            <p>Latest news & blog posts from SkillsMaster</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4" md="12" v-for="post in latestPosts" :key="post.id">
            <itTalksItem :post="post" />
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-center mt-3">
            <b-button class="btn-browse" to="/platform">Browse All</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import itTalksItem from "~/components/HomePageComponents/itTalksItem";

export default {
  components: {itTalksItem},
  data() {
    return {
      latestPosts:[
        {
          id: '1',
          title: 'Discover NuxtJS - VueJS framework',
          image:'https://www.copyright.gov/registration/images/literary-works.jpg'
      },
        {
          id: '2',
          title: 'Full text searching with Algolia',
          image:'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3xlbnwwfHwwfHw%3D&w=1000&q=80'
        },
        {
          id: '3',
          title: 'Asynchronous Laravel with Octane',
          image:'https://assets.entrepreneur.com/content/3x2/2000/20151120172744-procrastination-young-man-home-office-laptop-distracted-work-distant.jpeg'
        }
      ]
    }
  }
}
</script>

<style scoped>
.btn-browse {
  color: white;
}
</style>
