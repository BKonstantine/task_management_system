<template>
  <header class="header">
    <nav class="nav">
      <ul class="nav__list">
        <li class="nav__item" :key="index" v-for="(link, index) in links">
          <NavLink :to="link.to" :text="link.text" />
        </li>
        <div class="header__profile">
          <ButtonProfile
            @click="toggleDropDown"
            :active="dropDown || matchRoute"
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
import ButtonProfile from "./UI/ButtonProfile.vue";
import NavLink from "@/components/UI/NavLink.vue";
import DropDown from "@/components/DropDown/DropDown.vue";
export default {
  name: "NavBar",
  components: {
    NavLink,
    ButtonProfile,
    DropDown,
  },
  data() {
    return {
      links: [
        { to: "/projects", text: "Проекты" },
        { to: "/tasks", text: "Задачи" },
        { to: "/users", text: "Пользователи" },
      ],
      dropDownList: [
        { text: "Профиль", click: this.goToProfile },
        { text: "Выход", click: this.goToExit },
      ],
      dropDown: false,
    };
  },
  methods: {
    goToProfile() {
      if (this.$route.path !== "/profile") {
        this.$router.push("/profile");
      }
    },
    goToExit() {
      console.log("Выйти из профиля");
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
      return this.$route.path === "/profile";
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
