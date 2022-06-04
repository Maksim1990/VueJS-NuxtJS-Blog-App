<template>
  <b-row>
    <b-col md="2" class="mx-3 mb-1">
      <b-button variant="outline-success" size="sm" v-if="isUserCanSeeItem(currentUser)" type="submit" @click="addPost">{{ this.text }}
      </b-button>
    </b-col>
    <b-col md="10">
      <component :is="dynamicComponent"></component>
    </b-col>
  </b-row>
</template>

<script>

import PostsListView from "~/components/Blog/PostsListView";
import PostForm from "~/components/Blog/PostForm";

export default {
  components: {
    PostsListView, PostForm
  },
  data() {
    return {
      default: {
        listComponent: 'PostsListView',
        formComponent: 'PostForm',
        isShowForm: false,
        text: 'Add post',
      },
      text: 'Add post',
      dynamicComponent: 'PostsListView',
      currentUser: null
    }
  },
  methods: {
    toggleIsShowForm() {
      this.default.isShowForm = !this.default.isShowForm;
      this.text = (this.default.isShowForm ? 'All posts' : this.default.text);
    },
    addPost() {
      this.toggleIsShowForm();
      this.dynamicComponent = this.default.isShowForm ? this.default.formComponent : this.default.listComponent;
    }
  },
  async created() {
    this.currentUser = this.getUserFromStore();

    this.$nuxt.$on('newPostAdded', (postAdded) => {
      if (postAdded) {
        this.toggleIsShowForm();
        this.dynamicComponent = this.default.listComponent;
      }
    })
  }
}
</script>
