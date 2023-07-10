<template>
  <div id="app" class="app">
    <PageContainer v-show="authRequest" class="container">
      <BaseLoader />
    </PageContainer>
    <RouterView v-show="!authRequest" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapActions({
      fetchLogin: "authModule/fetchLogin",
      fetchCurrentUser: "currentUserModule/fetchCurrentUser",
    }),
  },
  computed: {
    ...mapGetters({
      authRequest: "authModule/getAuthRequest",
    }),
  },

  beforeMount() {
    this.fetchLogin();
    this.fetchCurrentUser();
  },
};
</script>

<style lang="scss">
.app {
  width: 1024px;
  height: 100%;
  @media screen and (min-width: 1024px) {
    width: 100%;
  }
}
.container {
  align-items: center;
  justify-content: center;
}
</style>
