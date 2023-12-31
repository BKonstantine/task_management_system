<template>
  <header class="header">
    <nav class="nav">
      <ul class="nav__list">
        <li class="nav__item" :key="index" v-for="(link, index) in links">
          <NavLink :to="link.to" :text="link.text" />
        </li>
        <div class="header__profile" v-if="getCurrentUser">
          <ButtonProfile
            @click="toggleDropDown"
            :active="dropDown || matchRoute"
            :userAvatar="getCurrentUser"
          />
          <DropDown
            class="header__drop-down"
            v-show="dropDown"
            :items="dropDownList"
          />
        </div>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { deleteToken } from "@/helpers/access-token";
import DropDown from "@/components/DropDown/DropDown.vue";
export default {
  name: "NavBar",
  components: {
    DropDown,
  },
  data() {
    return {
      dropDownList: [
        { text: "Профиль", click: this.goToProfile, disabled: false },
        { text: "Выход", click: this.logout, disabled: false },
      ],
      dropDown: false,
    };
  },
  methods: {
    ...mapActions({
      fetchCurrentUser: "usersModule/fetchUsers",
      setAuth: "authModule/setAuth",
    }),
    goToProfile() {
      if (this.$route.path !== `/profile/${this.getCurrentUser._id}`) {
        this.$router.push({
          name: "Profile",
          params: { id: this.getCurrentUser._id },
        });
        this.fetchCurrentUser({
          filter: {
            _id: this.getCurrentUser._id,
          },
        });
      }
    },
    logout() {
      deleteToken();
      this.setAuth(false);
      this.$router.replace("/auth");
    },
    toggleDropDown() {
      this.dropDown = !this.dropDown;
    },
    hideDropDown() {
      this.dropDown = false;
    },
    hideAll(event) {
      const isButton = event.target.closest(".button-profile");
      if (!isButton) {
        this.hideDropDown();
      }
    },
  },
  computed: {
    matchRoute: function () {
      return this.$route.path.includes("/profile");
    },
    ...mapGetters({
      getCurrentUser: "currentUserModule/getCurrentUser",
    }),
    links() {
      return [
        { to: "/projects", text: "Проекты" },
        {
          to: { name: "Tasks", query: { id: this.getCurrentUser?._id } },
          text: "Задачи",
        },
        { to: "/users", text: "Пользователи" },
      ];
    },
  },
  mounted() {
    document.addEventListener("click", this.hideAll);
  },

  beforeDestroy() {
    document.removeEventListener("click", this.hideAll);
  },
};
</script>

<style lang="scss" scoped>
.header {
  padding: 24px;
  width: 100%;
  background-color: $bgc-primary-default;

  &__profile {
    position: relative;
  }

  &__drop-down {
    position: absolute;
    top: 44px;
    right: 0;
    z-index: 1;
  }
}

.nav {
  @include flex-setting(_, center, _, 24px);

  &__list {
    margin: 0;
    margin-left: auto;
    padding: 0;
    @include flex-setting(_, center, _, 24px);
  }

  &__item {
    list-style: none;
  }
}
</style>
