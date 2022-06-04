<template>
  <div>
    <Spinner v-if="showSpinner"/>
    <div v-else>
      <b-button variant="outline-secondary" size="sm" class="mb-3" :to="{name:'blog-id',params:{'id':postData._id}}">Back to post</b-button>
      <PostForm
        :title="postData.title"
        :description="postData.description"
        :short_description="postData.short_description"
        action="update"
      />
    </div>
  </div>

</template>

<script>
import postItemQuery from '~/apollo/queries/postItem';
import Spinner from "~/components/PageComponents/Spinner";
import PostForm from "~/components/Blog/PostForm";

export default {
  components: {PostForm, Spinner},
  data() {
    return {
      postData: null,
      currentUser: null,
      showSpinner: true,
    }
  },
  async fetch() {
    this.showSpinner = true;
    await this.$apollo.query({
      query: postItemQuery,
      fetchPolicy: 'no-cache',
      variables: {
        id: this.$route.params.id,
      },
    }).then((res) => {
      this.postData = res.data.post;
      this.showSpinner = false;
    }).catch((error) => {
      this.showSpinner = false;
      console.log(error)
    })
  },
}
</script>
