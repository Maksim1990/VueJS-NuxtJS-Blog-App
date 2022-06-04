<template>
  <div class="px-3 mt-3">
    <Spinner v-if="showSpinner"/>
    <b-form v-else @submit="onSubmit">
      <b-alert :show="error.type!==null" variant="danger">
        {{ error.message }}
      </b-alert>
      <b-form-group id="input-group-1">
        <b-form-input
          id="input-1"
          v-model="form.title"
          label="Title:"
          type="text"
          :placeholder="this.title === ''? 'Title ':this.title"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2">
        <b-form-input
          id="input-2"
          v-model="form.short_description"
          label="Short description:"
          type="text"
          :placeholder="this.short_description === ''? 'Short description ':this.short_description"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3">
        <b-form-textarea
          id="input-3"
          required
          v-model="form.description"
          :placeholder="this.description === ''? 'Description ':this.description"
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>
      <b-button size="sm" v-if="isCreateForm" type="submit" variant="primary">Create</b-button>
      <b-button size="sm" v-else type="submit" variant="warning">Update</b-button>
    </b-form>
  </div>
</template>

<script>
import createPost from '~/apollo/mutations/posts/createPost';
import updatePost from '~/apollo/mutations/posts/updatePost';
import Spinner from "~/components/PageComponents/Spinner";

export default {
  data() {
    return {
      showSpinner: false,
      form: {
        title: null,
        description: null,
        short_description: null,
        type: 'normal',
      },
      error: {
        message: null,
        type: null,
      }
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: 'create'
    },
    short_description: {
      type: String,
      default: ''
    },
  },
  components: {Spinner},
  computed:{
    isCreateForm(){
      return this.action === 'create';
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.showSpinner = true;

      if(this.isCreateForm){
        this.createPost(this.form)
      }else{
        this.updatePost(this.form)
      }
    },
    async updatePost(form) {
      let varObject = {
        id: this.$route.params.id,
        title: form.title,
        type: form.type,
        short_description: form.short_description,
        description: form.description,
      };
      await this.$apollo.mutate({
        mutation: updatePost,
        variables: varObject
      }).then((dataPost) => {
        this.showSpinner = false;
        if(dataPost.data.updatePost !== undefined){
          this.$nuxt.$emit('postUpdated', {postId: this.$route.params.id});
          this.$router.push({name: 'blog-id', params: {id: this.$route.params.id}});
        }
      }).catch((error) => {
        // Error
        this.showSpinner = false;
        error = this.errorMessageFormatter(error)
        this.error.message = error.message
        this.error.type = error.extensions.reason
      })
    },
    async createPost(form) {
      let varObject = {
        title: form.title,
        type: form.type,
        short_description: form.short_description,
        description: form.description,
      };
      await this.$apollo.mutate({
        mutation: createPost,
        variables: varObject
      }).then((dataPost) => {
        this.showSpinner = false;
        if(dataPost.data.createPost !== undefined){
          this.$nuxt.$emit('newPostAdded', true);
        }
      }).catch((error) => {
        // Error
        this.showSpinner = false;
        error = this.errorMessageFormatter(error)
        this.error.message = error.message
        this.error.type = error.extensions.reason
      })
    },
  },
  created() {
    this.form.title = this.title;
    this.form.description = this.description;
    this.form.short_description = this.short_description;
  }
}
</script>
