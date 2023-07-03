<template>
  <PageContainer>
    <FilterContainer>
      <BaseInput />
    </FilterContainer>
    <ul>
      <UserItem
        :userData="user"
        :key="index"
        v-for="(user, index) in getUsersList"
      />
    </ul>
  </PageContainer>
</template>

<script>
import UserItem from "@/components/UserItem.vue";
import { mapGetters } from "vuex";
export default {
  name: "UserList",
  components: {
    UserItem,
  },
  computed: {
    ...mapGetters(["getUsersList"]),
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

<style lang="scss" scoped></style>
