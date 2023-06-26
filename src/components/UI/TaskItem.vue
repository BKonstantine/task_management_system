<template>
  <li class="task-item pointer">
    <div class="task-item__container">
      <div class="task-item__header">
        <p class="task-item__title">
          {{ taskData.title }}
        </p>
        <UserAvatar alt="Бузунов Константин Андреевич" />
      </div>
      <div class="task-item__footer">
        <span class="task-item__info task-item__info_color_primary">
          {{ taskData.number }}
        </span>
        <span class="task-item__info task-item__info_color_disabled">
          {{ taskData.created }}
        </span>
        <span class="task-item__info task-item_type_status">
          {{ taskData.status }}
        </span>
        <span class="task-item__info task-item__info_color_disabled">
          {{ taskData.changed }}
        </span>
      </div>
    </div>
    <div
      :class="['task-item__setting', { 'task-item__setting_active': setting }]"
    >
      <ButtonIcon
        :onClick="toggleDropDown"
        :secondary-style="true"
        :active="dropDown"
      >
        <SvgIcon id="#dots" />
      </ButtonIcon>
      <DropDown
        class="task-item__drop-down"
        v-show="dropDown"
        :items="dropDownList"
        :checkLastItem="true"
      />
    </div>
  </li>
</template>

<script>
import ButtonIcon from "./ButtonIcon.vue";
import SvgIcon from "./SvgIcon.vue";
import DropDown from "@/components/DropDown/DropDown.vue";
import UserAvatar from "./UserAvatar.vue";
export default {
  name: "TaskItem",
  components: {
    ButtonIcon,
    SvgIcon,
    DropDown,
    UserAvatar,
  },

  data() {
    return {
      dropDownList: ["Редактировать", "Удалить"],
      setting: false,
      dropDown: false,
    };
  },

  methods: {
    toggleDropDown() {
      this.setting = !this.setting;
      this.dropDown = !this.dropDown;
    },
    hideDropDown() {
      this.setting = false;
      this.dropDown = false;
    },
    hideAll(event) {
      const isButton = event.target.closest("button");
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
    taskData: {
      title: {
        type: String,
      },
      number: {
        type: String,
      },
      status: {
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
.task-item {
  list-style: none;
  padding: 0 16px 8px 16px;
  height: 100%;
  max-height: 69px;
  box-sizing: border-box;
  display: flex;
  border-bottom: 1px solid $border-color-active;

  &__container {
    width: 100%;
    @include flex-setting(column, _, space-between);
  }

  &__header {
    @include flex-setting(_, center, space-between);
  }

  &__title {
    margin: 0;
    max-height: 38px;
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

  &_type_status {
    padding: 0 8px;
    background: $border-color-bronze;
    color: $font-color-secondary;
    border-radius: 4px;
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
