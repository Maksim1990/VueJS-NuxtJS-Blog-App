<template>
  <b-container>
    <b-col md="10" offset-md="1">
      <Spinner v-if="showSpinner"/>
      <div v-else>
        <div v-html="$md.render(content)"></div>
      </div>
    </b-col>
  </b-container>
</template>

<script>
import Spinner from "~/components/PageComponents/Spinner";
import getMarkdownPageContentQuery from '~/apollo/queries/getMarkdownPageContentQuery';

export default {
  components: {Spinner},
  data() {
    return {
      showSpinner: true,
      contentType: 'contact-us',
      content: ''
    }
  },
  methods: {
    async getContent() {
      await this.$apollo.query({
        query: getMarkdownPageContentQuery,
        fetchPolicy: 'cache',
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

