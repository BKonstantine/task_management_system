<template>
  <PageContainer>
    <div v-if="!getCurrentUserRequestStatus" class="profile">
      <div class="profile__avatar">
        <UserAvatar :userAvatar="getCurrentUser" :large="true" />
      </div>
      <div class="profile__info">
        <div class="profile__header">
          <p class="profile__title">{{ getCurrentUser.name }}</p>
          <StatusText :color="userStatus.color">
            {{ userStatus.text }}
          </StatusText>
          <div class="profile__setting">
            <ButtonIcon
              @click="toggleDropDown"
              :secondary-style="true"
              :active="dropDown"
            >
              <SvgIcon id="#dots" />
            </ButtonIcon>
            <DropDown
              class="profile__drop-down"
              v-show="dropDown"
              :items="dropDownList"
            />
          </div>
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
import DropDown from "@/components/DropDown/DropDown.vue";
import { mapGetters } from "vuex";
import { checkUserStatus } from "@/helpers/check-user-status";
export default {
  name: "ProfilePage",
  components: {
    DropDown,
  },
  data() {
    return {
      dropDownList: [
        { text: "Редактировать", click: this.changeProfileData },
        { text: "Изменить пароль", click: this.changeProfilePassword },
        { text: "Просмотр задач пользователя ", click: this.watchUserTask },
      ],
      dropDown: false,
    };
  },
  computed: {
    ...mapGetters(["getCurrentUser", "getCurrentUserRequestStatus"]),
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
    toggleDropDown() {
      this.dropDown = !this.dropDown;
    },
    hideDropDown() {
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
    position: relative;
  }

  &__drop-down {
    width: max-content;
    position: absolute;
    top: 44px;
    right: 0;
    z-index: 1;
  }

  &__main {
    @include flex-setting(column, _, _, 8px);
  }
}

.about {
  @include font_setting(400, 14px, 19px, $font-color-disabled);
}
</style>
