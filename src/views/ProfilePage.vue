<template>
  <PageContainer>
    <div v-if="!getRequestStatus" class="profile">
      <div class="profile__avatar">
        <UserAvatar :userAvatar="getCurrentUser" :large="true" />
      </div>
      <div class="profile__info">
        <div class="profile__header">
          <p class="profile__title">{{ getCurrentUser.name }}</p>
          <StatusText :color="userStatus.color">
            {{ userStatus.text }}
          </StatusText>
          <DropDownButton
            class="profile__setting"
            :dropDownList="dropDownList"
            :checkLastItem="true"
          />
        </div>
        <div class="profile__main">
          <span class="about">О себе:</span>
          <BaseText>
            {{ getCurrentUser.description }}
          </BaseText>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<script>
import DropDownButton from "@/components/DropDown/DropDownButton.vue";
import { mapGetters } from "vuex";
import { checkUserStatus } from "@/helpers/check-user-status";
export default {
  name: "ProfilePage",
  components: {
    DropDownButton,
  },
  data() {
    return {
      dropDownList: [
        { text: "Редактировать", click: this.changeProfileData },
        { text: "Изменить пароль", click: this.changeProfilePassword },
        { text: "Просмотр задач пользователя ", click: this.watchUserTask },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getCurrentUser: "currentUserModule/getCurrentUser",
      getRequestStatus: "currentUserModule/getRequestStatus",
    }),
    userStatus: function () {
      return checkUserStatus(this.getCurrentUser.status);
    },
  },
  methods: {
    changeProfileData() {
      console.log("changeProfileData");
    },
    changeProfilePassword() {
      console.log("changeProfilePassword");
    },
    watchUserTask() {
      console.log("watchUserTask");
    },
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
