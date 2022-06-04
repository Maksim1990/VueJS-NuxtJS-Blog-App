<template>
  <b-row no-gutters>
    <b-col md="12" class="mb-3">
      <b-button variant="outline-secondary" size="sm" :to="{name:'blog'}">Back to All posts</b-button>
    </b-col>
    <b-col md="12">
      <b-alert :show="error.type!==null" variant="danger">
        {{ error.message }}
      </b-alert>
    </b-col>
    <b-col md="12" class="mb-5">
      <Spinner v-if="showSpinner"/>
      <div v-else>
        <div class="mt-2" v-if="postData !==null">
          <b-row>
            <b-col md="8">
              <b-card-text class="mb-2 text-black-50">Created {{ postData.created_ago }} by
                <NuxtLink :to="`/users/${postData.user._id}`">{{ username }}</NuxtLink>
              </b-card-text>
            </b-col>
            <b-col md="3" class="text-right">
              <b-button size="sm" v-if="isUserCanSeeItem(currentUser, postData.user)" variant="warning"
                        :to="{name:'blog-id-edit',params:{'id':$route.params.id}}">Edit
              </b-button>
              <b-button size="sm" class="mr-3" v-if="isUserCanSeeItem(currentUser, postData.user)" variant="outline-danger"
                        @click="deletePost($route.params.id)">Delete
              </b-button>
              <span class="mr-2" v-if="currentUser !== null">
                   <b-icon scale="2" @click="toggleLike()" variant="danger"
                           :icon="postData.isLikedByAuthUser?'heart-fill':'heart'"></b-icon>
              </span>
              <span class="text-black-50" v-b-tooltip.hover :title="likesTooltip"><b>{{
                  likes
                }} like{{ getPluralEnding(likes) }}</b></span>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-center"><h1>{{ postData.title }}</h1></b-col>
          </b-row>
          <b-row class="mb-3">
            <b-card-img height="500" :src="postData.image_link" alt="Image" class="rounded-0 post-image"></b-card-img>
          </b-row>
          <p v-html="postData.description"></p>
        </div>
      </div>
    </b-col>
    <ScrollUpButton :bottom="30"/>
  </b-row>
</template>

<script>
import ScrollUpButton from "~/components/PageComponents/ScrollUpButton";
import LikesView from "~/components/Blog/Likes/LikesView";
import postItemQuery from '~/apollo/queries/postItem';
import likePost from '~/apollo/mutations/posts/likePost';
import unlikePost from '~/apollo/mutations/posts/unlikePost';
import deletePost from '~/apollo/mutations/posts/deletePost';
import Spinner from "~/components/PageComponents/Spinner";

export default {
  data() {
    return {
      postData: null,
      currentUser: null,
      showSpinner: true,
      likes: 0,
      error: {
        message: null,
        type: null,
      }
    }
  },
  components: {Spinner, ScrollUpButton, LikesView},
  async fetch() {
    this.showSpinner = true;
    await this.$apollo.query({
      query: postItemQuery,
      fetchPolicy: 'no-cache',
      variables: {
        id: this.$route.params.id,
        user_id_open_post: this.currentUser !== null ? this.currentUser._id : null,
      },
    }).then((res) => {
      this.postData = res.data.post;
      this.likes = this.postData.likes.length
      this.showSpinner = false;
    }).catch((error) => {
      this.showSpinner = false;
      console.log(error)
    });
  },
  methods: {
    async toggleLike() {
      this.postData.isLikedByAuthUser = !this.postData.isLikedByAuthUser;

      if (this.postData.isLikedByAuthUser) this.likes += 1;
      if (!this.postData.isLikedByAuthUser) this.likes -= 1;
      await this.$apollo.mutate({
        mutation: this.postData.isLikedByAuthUser ? likePost : unlikePost,
        variables: {
          post_id: this.postData._id
        }
      }).catch(() => {
        if (this.postData.isLikedByAuthUser) this.likes -= 1;
        if (!this.postData.isLikedByAuthUser) this.likes += 1;
      })
    },
    async deletePost(postId) {
      this.showSpinner = true;
      await this.$apollo.mutate({
        mutation: deletePost,
        variables: {
          id: postId
        }
      }).then((dataPost) => {
        this.showSpinner = false;
        if (dataPost.data.deletePost !== undefined) {
          this.$nuxt.$emit('postDeleted', {postId: postId});
          this.$router.push({name: 'blog'});
        }
      }).catch((error) => {
        // Error
        this.showSpinner = false;
        error = this.errorMessageFormatter(error)
        this.error.message = error.message
        this.error.type = error.extensions.reason
      })
    }
  },
  computed: {
    username() {
      let username = this.postData.user.name;
      if (this.postData.user.lastname !== null) {
        username = username + ' ' + this.postData.user.lastname;
      }
      return username;
    },
    likesTooltip() {
      return (this.currentUser !== null && this.postData.likes.length > 0) ? this.postData.likes.reduce(function (users, currentLike) {
        return users + ' ' + currentLike.user.name
      }, '') : 'Please login in order to like this post';
    }
  },
  async created() {
    this.currentUser = this.getUserFromStore();
  }
}
</script>
<style>
@media (max-width: 800px) {
  .d-cn {
    overflow-y: inherit !important;
  }

  .post-image {
    width: 100%;
    height: auto;
  }
}
</style>
