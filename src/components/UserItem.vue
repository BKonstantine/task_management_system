<template>
  <li class="user-item pointer">
    <div class="user-item__container">
      <UserAvatar :userAvatar="userData" />
      <RouterLink
        :to="{
          name: 'CurrentUser',
          params: { id: this.userData._id },
        }"
        class="user-item__name pointer"
      >
        <BaseText>{{ userData.name }}</BaseText>
      </RouterLink>
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
import { mapGetters } from "vuex";
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
      setting: false,
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "currentUserModule/getCurrentUser",
    }),
    dropDownList: function () {
      return [
        {
          text: "Редактировать",
          click: this.editUser,
          disabled: this.checkRole(),
        },
        {
          text: "Удалить",
          click: this.deleteUser,
          disabled: this.checkRole(),
        },
      ];
    },
  },
  methods: {
    editUser() {
      console.log("editUser");
    },
    checkRole() {
      return !this.currentUser?.roles.includes("ADMIN");
    },
    deleteUser() {
      console.log("deleteUser");
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

  &__name {
    text-decoration: none;
  }

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
