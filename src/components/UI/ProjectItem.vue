<template>
  <div
    class="project-item pointer"
    @mouseenter="showSettings"
    @mouseleave="hideSettings"
  >
    <div class="project-item__container">
      <p class="project-item__title">{{ projectData.title }}</p>
      <div class="project-item__footer">
        <span class="project-item__info project-item__info_color_primary">
          {{ projectData.number }}
        </span>
        <span class="project-item__info project-item__info_color_disabled">
          {{ projectData.created }}
        </span>
        <span class="project-item__info project-item__info_color_disabled">
          {{ projectData.changed }}
        </span>
      </div>
    </div>
    <div v-show="setting" class="project-item__setting">
      <ButtonIcon :onClick="toggleDropDown" :secondary-style="true">
        <SvgIcon id="#dots" />
      </ButtonIcon>
      <DropDown v-show="dropDown" :items="dropDownList" :checkLastItem="true" />
    </div>
  </div>
</template>

<script>
import ButtonIcon from "./ButtonIcon.vue";
import SvgIcon from "./SvgIcon.vue";
import DropDown from "@/components/DropDown/DropDown.vue";
export default {
  name: "ProjectItem",
  components: {
    ButtonIcon,
    SvgIcon,
    DropDown,
  },
  data() {
    return {
      dropDownList: ["Редактировать", "Удалить"],
      setting: false,
      dropDown: false,
    };
  },
  methods: {
    showSettings() {
      this.setting = true;
    },
    hideSettings() {
      this.setting = false;
    },
    toggleDropDown() {
      this.dropDown = !this.dropDown;
    },
  },
  props: {
    projectData: {
      title: {
        type: String,
      },
      number: {
        type: String,
      },
      created: {
        type: String,
      },
      changed: {
        type: String,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.project-item {
  padding: 0 16px 8px 16px;
  height: 100%;
  max-height: 65px;
  box-sizing: border-box;
  display: flex;
  border-bottom: 1px solid $border-color-active;

  &__container {
    width: 100%;
    @include flex-setting(column, _, space-between);
  }

  &__title {
    margin: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: $font-color-primary;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__footer {
    @include flex-setting(_, _, _, 16px);
  }

  &__info {
    @include font-setting(400, 14px, 19px);
  }

  &__info_color_disabled {
    color: $font-color-disabled;
  }

  &__footer &__info:last-child {
    margin-left: auto;
  }

  &__setting {
    margin-left: 16px;
    position: relative;
    @include flex-setting(column, _, center, 2px);
  }

  /* &__button {
    margin-left: 16px;
  } */
}
</style>
