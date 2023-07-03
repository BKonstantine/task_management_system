<template>
  <PageContainer>
    <FilterContainer>
      <BaseInput />
    </FilterContainer>
    <ul>
      <UserItem
        :userData="user"
        :key="index"
        v-for="(user, index) in usersList"
      />
    </ul>
  </PageContainer>
</template>

<script>
import UserItem from "@/components/UserItem.vue";
import { mapState } from "vuex";
export default {
  name: "UserList",
  components: {
    UserItem,
  },
  computed: {
    ...mapState({
      usersList: (state) => state.usersModule.usersList,
    }),
  },
};
</script>

<style lang="scss" scoped></style>
