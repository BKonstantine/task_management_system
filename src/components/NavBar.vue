<template>
  <header class="header">
    <nav class="nav">
      <ul class="nav__list">
        <li class="nav__item" :key="index" v-for="(link, index) in links">
          <NavLink :to="link.to" :text="link.text" />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import NavLink from "@/components/UI/NavLink.vue";
export default {
  name: "NavBar",
  components: {
    NavLink,
  },
  data() {
    return {
      links: [
        { to: "/projects", text: "Проекты" },
        { to: "/tasks", text: "Задачи" },
        { to: "/users", text: "Пользователи" },
      ],
    };
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
