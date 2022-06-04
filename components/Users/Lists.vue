<template>
  <b-row>
<!--    <b-col md="2">-->
<!--      <p>Filter column</p>-->
<!--    </b-col>-->
    <b-col md="10" offset-md="2">
      <b-container>
        <b-row>
          <b-col>
            <h5 class="pt-2">Users ({{ total }})</h5>
          </b-col>
          <b-col>
            <b-form-input v-model="search" type="text" @keyup="triggerSearchUsers"
                          placeholder="Search ..."></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col style="overflow-y: auto;" :style="{height: wHeight + 'px'}">
            <UserItem v-for="user in users" :key="user._id" :user="user"></UserItem>
            <Observer @intersect="triggerLoadUsers"/>
            <Spinner v-if="showSpinner"/>
          </b-col>
        </b-row>
        <PageResizer @pageResize="resizePage"/>
      </b-container>
    </b-col>
  </b-row>
</template>
<script>
import UserItem from "~/components/Users/UserItem";
import Observer from "~/components/PageComponents/Observer";
import Spinner from "~/components/PageComponents/Spinner";
import PageResizer from "~/components/PageComponents/PageResizer";
import userList from '~/apollo/queries/users';
import usersSearch from '~/apollo/queries/usersSearch';

export default {
  components: {
    UserItem, PageResizer, Observer, Spinner
  },
  data() {
    return {
      users: [],
      hPercentage: 80,
      page: 1,
      pageSize: 20,
      orderType: "DESC",
      showSpinner: true,
      total: 0,
      search: '',
      searchMinLength: 3, //Min length of string when searching should be triggered
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
    triggerLoadUsers() {
      if (this.search === '') {
        this.loadUsers()
      } else {
        if (this.page !== null) {
          this.searchUsers(this.search, this.page)
        }
      }
    },
    triggerSearchUsers() {
      this.page = 1;

      if (this.search.length >= this.searchMinLength) {
        this.users = [];
        this.searchUsers(this.search, this.page);
      }

      if (this.search === '') {
        this.users = [];
        this.loadUsers();
      }
    },
    async loadUsers() {
      //If page equal to NULL then reached full list of users from DB
      if (this.page !== null) {
        await this.loadUserList(this.page)
      }
    },
    async searchUsers(search, page) {
      this.showSpinner = true;
      await this.$apollo.query({
        query: usersSearch,
        fetchPolicy: 'no-cache',
        variables: {
          search: search,
          first: this.pageSize,
          page: page,
        },
      }).then((res) => {
        let users = res.data.userSearch.data;
        this.total = res.data.userSearch.paginatorInfo.total;
        this.page = (users.length === 0) ? null : res.data.userSearch.paginatorInfo.currentPage + 1;
        if (res.data.userSearch.paginatorInfo.currentPage === 1) {
          this.users = [];
        }
        this.users = [...this.users, ...users];
        this.showSpinner = false;
      }).catch(() => {
        this.showSpinner = false;
      });
    },
    async loadUserList(page) {
      this.showSpinner = true;
      await this.$apollo.query({
        query: userList,
        variables: {
          input: {
            orderBy: [{
              column: 'created_at',
              order: this.orderType
            }],
            enabled: 'all',
            params: {
              isExcludeAuthUser: false,
              useCache: true
            }
          },
          first: this.pageSize,
          page: page,
        },
      }).then((res) => {
        let users = res.data.users.data;
        this.page = (users.length === 0) ? null : this.page + 1;
        this.users = [...this.users, ...users];
        this.showSpinner = false;
        this.total = res.data.users.paginatorInfo.total;
      }).catch(() => {
        this.showSpinner = false;
      });
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
