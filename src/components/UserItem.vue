<template>
  <li class="user-item pointer">
    <div class="user-item__container">
      <UserAvatar :userAvatar="userData" />
      <BaseText>{{ userData.name }}</BaseText>
    </div>
    <div
      :class="['user-item__setting', { 'user-item__setting_active': setting }]"
    >
      <ButtonIcon
        @click="toggleDropDown"
        :secondary-style="true"
        :active="dropDown"
      >
        <SvgIcon id="#dots" />
      </ButtonIcon>
      <DropDown
        class="user-item__drop-down"
        v-show="dropDown"
        :items="dropDownList"
        :checkLastItem="true"
      />
    </div>
  </li>
</template>

<script>
import DropDown from "@/components/DropDown/DropDown.vue";
export default {
  name: "UserItem",
  components: {
    DropDown,
  },
  props: {
    userData: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      dropDownList: [
        { text: "Редактировать", click: this.goToUser },
        { text: "Удалить", click: this.deleteUser },
      ],
      setting: false,
      dropDown: false,
    };
  },
  methods: {
    goToUser() {
      console.log("user");
    },
    deleteUser() {
      console.log("Delete user");
    },
    toggleDropDown() {
      this.setting = !this.setting;
      this.dropDown = !this.dropDown;
    },
    hideDropDown() {
      this.setting = false;
      this.dropDown = false;
    },
    hideAll(event) {
      const isButton = event.target.closest(".button");
      if (!isButton) {
        this.hideDropDown();
      }
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
.user-item {
  list-style: none;
  padding: 0 16px;
  height: 60px;
  @include flex-setting(_, center, space-between);
  border-bottom: 1px solid $border-color-active;

  &__container {
    @include flex-setting(_, center, _, 8px);
  }

  &__setting {
    @include flex-setting(column, _, center, 2px);
    display: none;
    position: relative;

    &_active {
      display: flex;
    }
  }

  &:hover &__setting {
    display: flex;
  }

  &__drop-down {
    position: absolute;
    top: 44px;
    right: 0;
    z-index: 2;
  }
}
</style>
