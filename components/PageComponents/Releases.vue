<template>
  <b-row class="mb-5 mt-2">
    <b-col md="10" offset-md="1">
      <Spinner v-if="showSpinner"/>
      <div v-else v-html="$md.render(content)"></div>
    </b-col>
  </b-row>
</template>

<script>
import Spinner from "~/components/PageComponents/Spinner";
import getMarkdownPageContentQuery from '~/apollo/queries/getMarkdownPageContentQuery';

export default {
  components: {Spinner},
  data() {
    return {
      showSpinner: true,
      contentType: 'releases-be',
      content: ''
    }
  },
  methods: {
    async getContent() {
      await this.$apollo.query({
        query: getMarkdownPageContentQuery,
        variables: {type: this.contentType}
      }).then((res) => {
        this.showSpinner = false;
        this.content = res.data.getMarkdownPageContent.content;
      }).catch(() => {
        this.showSpinner = false;
      })
    },
  },
  created() {
    this.getContent();
  }
}
</script>

