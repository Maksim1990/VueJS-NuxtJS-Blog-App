<template>
  <b-container>
    <b-col md="10" offset-md="1">
      <h2>FAQ</h2>
      <Spinner v-if="showSpinner"/>
      <Accordion v-else :items="questions" />
    </b-col>
  </b-container>
</template>

<script>
import Spinner from "~/components/PageComponents/Spinner";
import Accordion from "~/components/PageComponents/Accordion";
import getFaqQuestionsQuery from '~/apollo/queries/getFaqQuestionsQuery';

export default {
  components: {Spinner,Accordion},
  data() {
    return {
      showSpinner: true,
      questions: []
    }
  },
  methods: {
    async getFaqQuestions() {
      await this.$apollo.query({
        query: getFaqQuestionsQuery,
        fetchPolicy: 'cache',
      }).then((res) => {
        this.showSpinner = false;
        this.questions = res.data.getFaqQuestions.content;
      }).catch(() => {
        this.showSpinner = false;
      })
    },
  },
  created() {
    this.getFaqQuestions();
  }
}
</script>

