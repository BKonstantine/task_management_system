<template>
  <PageContainer>
    <div v-if="checkedUser" class="profile">
      <div class="profile__avatar">
        <UserAvatar :userAvatar="checkedUser" :large="true" />
      </div>
      <div class="profile__info">
        <div class="profile__header">
          <p class="profile__title">{{ checkedUser.name }}</p>
          <StatusText :color="userStatus.color">
            {{ userStatus.text }}
          </StatusText>
          <DropDownButton
            class="profile__setting"
            :dropDownList="dropDownList"
          />
        </div>
        <div class="profile__main">
          <span class="about">О себе:</span>
          <BaseText>
            {{ checkedUser.description }}
          </BaseText>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<script>
import DropDownButton from "@/components/DropDown/DropDownButton.vue";
import { mapGetters, mapActions } from "vuex";
import { checkUserStatus } from "@/helpers/check-user-status";
import { checkUserAccess } from "@/helpers/check-user-access";
export default {
  name: "ProfilePage",
  components: {
    DropDownButton,
  },
  computed: {
    ...mapGetters({
      currentUser: "currentUserModule/getCurrentUser",
      getUsersList: "usersModule/getUsersList",
      getRequestStatus: "usersModule/getRequestStatus",
    }),
    checkedUser() {
      return this.getUsersList[0];
    },
    userStatus: function () {
      return checkUserStatus(this.checkedUser.status);
    },
    dropDownList: function () {
      return [
        {
          text: "Редактировать",
          click: this.changeProfileData,
          disabled: checkUserAccess(this.checkedUser?._id, this.currentUser),
        },
        {
          text: "Изменить пароль",
          click: this.changeProfilePassword,
          disabled: checkUserAccess(this.checkedUser?._id, this.currentUser),
        },
        {
          text: "Просмотр задач пользователя",
          click: this.watchUserTask,
          disabled: false,
        },
      ];
    },
  },
  methods: {
    ...mapActions({
      fetchCurrentUser: "usersModule/fetchUsers",
    }),
    changeProfileData() {
      console.log("changeProfileData");
    },
    changeProfilePassword() {
      console.log("changeProfilePassword");
    },
    watchUserTask() {
      this.$router.push({
        name: "Tasks",
        params: { author: this.checkedUser._id },
        query: { from: "profile" },
      });
    },
  },

  beforeMount() {
    this.fetchCurrentUser({
      filter: {
        _id: this.$route.params.id,
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.profile {
  @include flex-setting(_, _, _, 24px);

  &__avatar {
    padding: 12px 10px;
  }

  &__title {
    @include font_setting(600, 24px, 33px);
  }

  &__info {
    width: 100%;
    padding-top: 8px;
    @include flex-setting(column, _, _, 24px);
  }

  &__header {
    width: 100%;
    @include flex-setting(_, center, _, 24px);
  }

  &__setting {
    margin-left: auto;
  }

  &__main {
    @include flex-setting(column, _, _, 8px);
  }
}

.about {
  @include font_setting(400, 14px, 19px, $font-color-disabled);
}
</style>
