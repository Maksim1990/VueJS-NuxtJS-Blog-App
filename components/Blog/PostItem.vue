<template>
  <b-card no-body class="overflow-hidden mb-3">
    <b-row no-gutters>
      <b-col md="3" class="vertical-center">
        <NuxtLink :to="`/blog/${post._id}`">
          <b-card-img height="170" :src="post.image_link" alt="Image" class="rounded"></b-card-img>
        </NuxtLink>
      </b-col>
      <b-col md="9">
        <b-card-body>
          <NuxtLink :to="`/blog/${post._id}`">
            <h4>{{ post.title }}</h4>
          </NuxtLink>
          <NuxtLink :to="`/blog/${post._id}`">
            <b-card-text class="text-black-50">{{ post.short_description }}</b-card-text>
          </NuxtLink>
          <b-row class="pt-2 text-black-50">
            <b-col md="9">
              <b-card-text class="info">Created {{ post.created_ago }} by
                <NuxtLink :to="`/users/${post.user._id}`">{{ username }}</NuxtLink>
              </b-card-text>
            </b-col>
            <b-col md="3">
              <span><b>{{post.likes.length}} like{{ getPluralEnding(post.likes.length) }}</b></span>
            </b-col>
          </b-row>

        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    username() {
      let username = this.post.user.name;
      if (this.post.user.lastname !== null) {
        username = username + ' ' + this.post.user.lastname;
      }
      return username;
    }
  }
}
</script>
