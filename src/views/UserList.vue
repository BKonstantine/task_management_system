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
        v-for="(user, index) in usersList"
      />
      <li v-if="totalPage > 1 && usersLength > 0" class="block"></li>
    </ul>
    <PaginationItem
      v-if="totalPage > 1 && usersLength > 0"
      :totalPage="totalPage"
      :currentPage="currentPage"
      @prev-page="prevPage"
      @next-page="nextPage"
      @curr-page="currPage"
      class="user-list__pagination"
    />
    <StopperContainer v-if="usersLength === 0 && !requestStatus">
      <BaseText v-if="!isFiltered">Нет ни одного пользователя</BaseText>
      <BaseText v-if="isFiltered">
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
  computed: {
    ...mapGetters({
      usersList: "usersModule/getUsersList",
      usersLength: "usersModule/getUsersLength",
      totalPage: "usersModule/getTotalPage",
      currentPage: "usersModule/getCurrentPage",
      requestStatus: "usersModule/getRequestStatus",
      getFilterValue: "usersModule/getFilterValue",
      isFiltered: "usersModule/getFiltered",
      userQuery: "usersModule/getUserQuery",
    }),

    filterValue: {
      get() {
        return this.getFilterValue;
      },
      set(value) {
        this.setFilterValue(value);
      },
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
      if (this.userQuery) {
        this.setCurrentPage(1);
      }
      this.fetchUsers({ ...this.userQuery, page: this.getCurrentPage });
    },
    prevPage() {
      const page = this.getCurrentPage - 1;
      this.setCurrentPage(page);
      this.fetchUsers({ ...this.userQuery, page: page });
    },
    nextPage() {
      const page = this.getCurrentPage + 1;
      this.setCurrentPage(page);
      this.fetchUsers({ ...this.userQuery, page: page });
    },
    currPage(data) {
      this.setCurrentPage(data);
      this.fetchUsers({ ...this.userQuery, page: data });
    },
  },
  beforeMount() {
    this.fetchUsers({ page: this.getCurrentPage });
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
