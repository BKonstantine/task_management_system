<template>
  <li class="user-item pointer">
    <div class="user-item__container">
      <UserAvatar :userAvatar="userData" />
      <BaseText>{{ userData.name }}</BaseText>
    </div>
    <DropDownButton
      :class="['user-item__setting', { 'user-item__setting_active': setting }]"
      :dropDownList="dropDownList"
      :checkLastItem="true"
      @drop-down="toggleSetting"
    />
  </li>
</template>

<script>
import DropDownButton from "@/components/DropDown/DropDownButton.vue";
export default {
  name: "UserItem",
  components: {
    DropDownButton,
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
    };
  },
  methods: {
    goToUser() {
      console.log("user");
    },
    deleteUser() {
      console.log("Delete user");
    },
    toggleSetting(data) {
      this.setting = data;
    },
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
    display: none;

    &_active {
      display: flex;
    }
  }

  &:hover &__setting {
    display: flex;
  }
}
</style>
