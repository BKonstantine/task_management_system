<template>
  <li class="project-item pointer">
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
    <div
      :class="[
        'project-item__setting',
        { 'project-item__setting_active': setting },
      ]"
    >
      <ButtonIcon
        @click="toggleDropDown"
        :secondary-style="true"
        :active="dropDown"
      >
        <SvgIcon id="#dots" />
      </ButtonIcon>
      <DropDown
        class="project-item__drop-down"
        v-show="dropDown"
        :items="dropDownList"
        :checkLastItem="true"
      />
    </div>
  </li>
</template>

<script>
import ButtonIcon from "@/components/UI/ButtonIcon.vue";
import SvgIcon from "@/components/UI/SvgIcon.vue";
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
      dropDownList: [
        { text: "Редактировать", click: this.goToProject },
        { text: "Удалить", click: this.deleteProject },
      ],
      setting: false,
      dropDown: false,
    };
  },
  methods: {
    goToProject() {
      console.log("Project");
    },
    deleteProject() {
      console.log("Delete project");
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
  list-style: none;
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
    top: 52px;
    right: 0;
    z-index: 1;
  }
}
</style>
