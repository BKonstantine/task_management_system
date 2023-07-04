<template>
  <PageContainer>
    <FilterContainer>
      <BaseInput />
    </FilterContainer>
    <ul class="user-list">
      <UserItem
        :userData="user"
        :key="index"
        v-for="(user, index) in getUsersList"
      />
      <li v-if="getUsersTotalPage > 1" class="block"></li>
    </ul>
    <PaginationItem
      v-if="getUsersTotalPage > 1"
      :totalPage="getUsersTotalPage"
      :currentPage="currentPage"
      @prev-page="prevPage"
      @next-page="nextPage"
      @curr-page="currPage"
      class="user-list__pagination"
    />
  </PageContainer>
</template>

<script>
import UserItem from "@/components/UserItem.vue";
import PaginationItem from "@/components/PaginationItem.vue";
import { mapGetters } from "vuex";
export default {
  name: "UserList",
  components: {
    UserItem,
    PaginationItem,
  },
  computed: {
    ...mapGetters(["getUsersList", "getUsersTotalPage"]),
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
