<template>
  <PageContainer>
    <FilterContainer>
      <SearchInput v-model="filterValue" @click="setClear" />
      <ButtonIcon :secondaryStyle="true" @click="getUsersWithFilter">
        <SvgIcon id="#sort-up" />
      </ButtonIcon>
    </FilterContainer>
    <ul class="user-list">
      <UserItem
        :userData="user"
        :key="index"
        v-for="(user, index) in getUsersList"
      />
      <li v-if="getTotalPage > 1 && getUsersLength > 0" class="block"></li>
    </ul>
    <PaginationItem
      v-if="getTotalPage > 1 && getUsersLength > 0"
      :totalPage="getTotalPage"
      :currentPage="getCurrentPage"
      @prev-page="prevPage"
      @next-page="nextPage"
      @curr-page="currPage"
      class="user-list__pagination"
    />
    <StopperContainer v-if="getUsersLength === 0 && !getRequestStatus">
      <BaseText v-if="!useFilter">Нет ни одного пользователя</BaseText>
      <BaseText v-if="useFilter">
        Ни один пользователь не соответствует результатам поиска
      </BaseText>
    </StopperContainer>
  </PageContainer>
</template>

<script>
import UserItem from "@/components/UserItem.vue";
import SearchInput from "@/components/Form/SearchInput.vue";
import PaginationItem from "@/components/PaginationItem.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "UserList",
  components: {
    UserItem,
    PaginationItem,
    SearchInput,
  },
  data() {
    return {
      useFilter: false,
    };
  },
  computed: {
    ...mapGetters({
      getUsersList: "usersModule/getUsersList",
      getUsersLength: "usersModule/getUsersLength",
      getTotalPage: "usersModule/getTotalPage",
      getCurrentPage: "usersModule/getCurrentPage",
      getRequestStatus: "usersModule/getRequestStatus",
      getFilterValue: "usersModule/getFilterValue",
    }),

    filterValue: {
      get() {
        return this.getFilterValue;
      },
      set(value) {
        this.setFilterValue(value);
      },
    },

    userQuery() {
      const query = {};
      if (this.filterValue) {
        query.filter = { name: this.filterValue };
      }
      return query;
    },
  },
  methods: {
    ...mapActions({
      fetchUsers: "usersModule/fetchUsers",
      setCurrentPage: "usersModule/setCurrentPage",
      setFilterValue: "usersModule/setFilterValue",
      setClear: "usersModule/setClear",
    }),
    getUsersWithFilter() {
      this.fetchUsers({ ...this.userQuery, page: this.getCurrentPage });
      if ("filter" in this.userQuery) {
        this.useFilter = true;
      }
    },
    prevPage() {
      const page = this.getCurrentPage - 1;
      this.setCurrentPage(page);
      this.fetchUsers({ ...this.userQuery, page: page });
      if ("filter" in this.userQuery) {
        this.useFilter = true;
      }
    },
    nextPage() {
      const page = this.getCurrentPage + 1;
      this.setCurrentPage(page);
      this.fetchUsers({ ...this.userQuery, page: page });
      if ("filter" in this.userQuery) {
        this.useFilter = true;
      }
    },
    currPage(data) {
      this.setCurrentPage(data);
      this.fetchUsers({ ...this.userQuery, page: data });
      if ("filter" in this.userQuery) {
        this.useFilter = true;
      }
    },
  },
  beforeMount() {
    this.fetchUsers({ page: this.getCurrentPage });
  },
  beforeRouteEnter(to, from, next) {
    const isAuth = localStorage.getItem("isAuth");
    if (isAuth === "false") {
      next("/auth");
    } else {
      next();
    }
  },
};
</script>

<style lang="scss" scoped>
.user-list {
  @include flex-setting(column);

  &__pagination {
    padding: 20px 44px;
    position: fixed;
    bottom: 0;
    left: 0px;
    z-index: 1;
  }
}

.block {
  height: 83px;
  list-style: none;
}
</style>
