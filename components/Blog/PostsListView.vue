<template>
  <b-container>
    <b-row>
      <b-col>
        <h5 class="pt-2">Posts ({{ total }})</h5>
      </b-col>
      <b-col>
        <b-form-input v-if="total > 0" v-model="search" type="text" @keyup="triggerPostSearch"
                      placeholder="Search ..."></b-form-input>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="showPosts" style="overflow-y: auto;" :style="{height: wHeight + 'px'}">
        <PostItem v-if="total > 0" v-for="post in posts" :key="post.id" :post="post"></PostItem>
        <Observer @intersect="triggerLoadPosts"/>
        <Spinner v-if="showSpinner"/>
      </b-col>
    </b-row>
    <b-row class="px-2" v-if="!showPosts">
      <b-col>
        <h5 class="mt-3">No posts found</h5>
      </b-col>
    </b-row>
    <PageResizer @pageResize="resizePage"/>
  </b-container>
</template>

<script>
import postsQuery from '~/apollo/queries/posts';
import postsSearchQuery from '~/apollo/queries/postsSearch';
import PostItem from "~/components/Blog/PostItem";
import Spinner from "~/components/PageComponents/Spinner";
import Observer from "~/components/PageComponents/Observer";
import PageResizer from "~/components/PageComponents/PageResizer";

export default {
  components: {
    PostItem, PageResizer, Observer, Spinner
  },
  data() {
    return {
      value: '',
      total: 0,
      search: '',
      searchMinLength: 3, //Min length of string when searching should be triggered
      posts: [],
      hPercentage: 80, //For breadcrumb set to 75
      page: 1,
      pageSize: 20,
      orderType: "DESC",
      showSpinner: true,
      showPosts: true,
    }
  },
  computed: {
    wHeight: {
      get: function () {
        if (this.windowHeight !== null) {
          return this.windowHeight;
        }

        if (process.client) {
          this.windowHeight = window.innerHeight;
          return window.innerHeight;
        }

        return 1000; // Default value
      },
      // setter
      set: function (newWindowHeight) {
        this.windowHeight = newWindowHeight;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (process.client) {
        window.addEventListener('resize', this.onResize);
      }
    })
  },
  methods: {
    triggerLoadPosts() {
      if (this.search === '') {
        this.fetchPosts(this.page)
      } else {
        if (this.page !== null) {
          this.searchPosts(this.search, this.page)
        }
      }
    },
    triggerPostSearch() {
      this.page = 1;
      if (this.search.length >= this.searchMinLength) {
        this.posts = [];
        this.searchPosts(this.search, this.page);
      }

      if (this.search === '') {
        this.posts = [];
        this.fetchPosts(this.page);
      }
    },
    async searchPosts(search, page) {
      this.showSpinner = true;
      await this.$apollo.query({
        query: postsSearchQuery,
        fetchPolicy: 'no-cache',
        variables: {
          search: search,
          first: this.pageSize,
          page: page,
        },
      }).then((res) => {
        let posts = res.data.postSearch.data;
        this.total = res.data.postSearch.paginatorInfo.total;
        this.page = (posts.length === 0) ? null : res.data.postSearch.paginatorInfo.currentPage + 1;
        if (res.data.postSearch.paginatorInfo.currentPage === 1) {
          this.posts = [];
        }
        this.posts = [...this.posts, ...posts];
        this.showSpinner = false;
      }).catch(() => {
        this.showSpinner = false;
      });
    },
    async fetchPosts(page) {
      this.showSpinner = true;
      await this.$apollo.query({
        query: postsQuery,
        fetchPolicy: 'no-cache',
        variables: {
          input: {
            orderBy: [{
              column: 'created_at',
              order: this.orderType
            }],
            params: {
              type: 'all',
              onlyBookmarks: false,
              category_id: null,
              useCache: true
            }
          },
          first: this.pageSize,
          page: page,
        },
      }).then((res) => {
        let posts = res.data.posts.data;
        this.total = res.data.posts.paginatorInfo.total;
        this.showPosts = this.total > 0;
        this.page = (posts.length === 0) ? null : this.page + 1;
        this.posts = [...this.posts, ...posts];
        this.showSpinner = false;
      }).catch((error) => {
        this.showSpinner = false;
        console.log(error);
      })
    },
    resizePage(pageHeight) {
      this.wHeight = this.heightPercentage(pageHeight, this.hPercentage)
    }
  },
  created() {
    if (process.client) {
      this.wHeight = this.heightPercentage(window.innerHeight, this.hPercentage);
    }
  }
}
</script>
