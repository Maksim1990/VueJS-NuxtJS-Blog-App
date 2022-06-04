<template>
  <b-row class="mb-5 mt-2">
    <b-col md="10" offset-md="1">
      <Spinner v-if="showSpinner"/>
      <div v-else>
        <h1>For Developers</h1>
        <div class="mb-3">
          Current Backend version <b>{{ backendVersion }}</b>
          <nuxt-link to="/releases">(Releases)</nuxt-link>
        </div>
        <div class="mb-3">
          Current Frontend version <b>{{ frontVersion }}</b>
          <nuxt-link to="/releases">(Releases)</nuxt-link>
        </div>
        <nuxt-link to="/about" class="d-block">About application</nuxt-link>

        <div class="mt-4">
          <h3>API Documentation</h3>
        </div>
        <a href="https://dashboard.skillsmaster-api.ml/api" target="_blank" class="d-block">Backend (Dashboard API) GraphQL API</a>
        <a href="https://platform.skillsmaster-api.ml/api/documentation" target="_blank" class="d-block">Backend (Platform API) Rest (Swagger) API</a>
        <div class="mt-4">
          <h3>Application tech stack deacription</h3>
        </div>
        <div class="mt-3" v-html="$md.render(devStack)"></div>
        <div class="mt-3">
          <h3>Application tech stack scheme</h3>
          <ImageModal :image="techStackImage" />
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import Spinner from "~/components/PageComponents/Spinner";
import ImageModal from "~/components/PageComponents/ImageModal";
import getMarkdownPageContentQuery from '~/apollo/queries/getMarkdownPageContentQuery';
import getVersionQuery from '~/apollo/queries/getVersionQuery';
import getImageQuery from '~/apollo/queries/getImageQuery';

export default {
  components: {Spinner,ImageModal},
  data() {
    return {
      showSpinner: true,
      contentType: 'dev-stack',
      techStackImage: {
        name: 'skillsmaster-tech-scheme',
        url: null,
      },
      devStack: '',
      backendVersion: '',
    }
  },
  computed: {
    frontVersion: function () {
      return process.env.NUXT_ENV_APP_VERSION;
    }
  },
  methods: {
    async getDevStack() {
      await this.$apollo.query({
        query: getMarkdownPageContentQuery,
        variables: {type: this.contentType}
      }).then((res) => {
        this.showSpinner = false;
        this.devStack = res.data.getMarkdownPageContent.content;
      }).catch(() => {
        this.showSpinner = false;
      })
    },
    async getBackendVersion() {
      this.showSpinner = true;
      await this.$apollo.query({
        query: getVersionQuery,
        fetchPolicy: 'no-cache',
      }).then((res) => {
        this.showSpinner = false;
        this.backendVersion = res.data.getVersion.version;
      }).catch((e) => {
        console.log(e);
        this.showSpinner = false;
      })
    },
    async getImage() {
      this.showSpinner = true;
      await this.$apollo.query({
        query: getImageQuery,
        fetchPolicy: 'cache',
        variables: {imageName: this.techStackImage.name}
      }).then((res) => {
        this.showSpinner = false;
        this.techStackImage.url = res.data.getImage.content;
      }).catch(() => {
        this.showSpinner = false;
      })
    },
  },
  created() {
    this.getDevStack();
    this.getBackendVersion();
    this.getImage();
  }
}
</script>

