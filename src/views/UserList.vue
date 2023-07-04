<template>
  <PageContainer>
    <FilterContainer>
      <BaseInput />
    </FilterContainer>
    <ul class="user-list">
      <UserItem
        :userData="user"
        :key="index"
        v-for="(user, index) in getUsersPage(this.getCurrentUsersPage)"
      />
      <li v-if="getUsersTotalPage > 1" class="block"></li>
    </ul>
    <PaginationItem
      v-if="getUsersTotalPage > 1"
      :totalPage="getUsersTotalPage"
      :currentPage="getCurrentUsersPage"
      @prev-page="prevPage"
      @next-page="nextPage"
      @curr-page="currPage"
      class="user-list__pagination"
    />
    <StopperContainer v-if="getUsersLength === 0 && !getUsersRequestStatus">
      <BaseText>Нет ни одного пользователя</BaseText>
    </StopperContainer>
  </PageContainer>
</template>

<script>
import UserItem from "@/components/UserItem.vue";
import PaginationItem from "@/components/PaginationItem.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "UserList",
  components: {
    UserItem,
    PaginationItem,
  },
  computed: {
    ...mapGetters([
      "getUsersPage",
      "getUsersLength",
      "getUsersTotalPage",
      "getCurrentUsersPage",
      "getUsersRequestStatus",
    ]),
  },
  methods: {
    ...mapActions(["setCurrentUsersPage"]),
    prevPage() {
      const page = this.getCurrentUsersPage - 1;
      this.setCurrentUsersPage(page);
    },
    nextPage() {
      const page = this.getCurrentUsersPage + 1;
      this.setCurrentUsersPage(page);
    },
    currPage(data) {
      this.setCurrentUsersPage(data);
    },
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
