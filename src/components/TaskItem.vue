<template>
  <li v-if="userData" class="task-item">
    <RouterLink
      :to="{
        name: 'CurrentTask',
        params: { id: this.taskData._id },
      }"
      class="task-item__container pointer"
    >
      <div class="task-item__header">
        <p class="task-item__title">
          {{ taskData.name }}
        </p>
        <UserAvatar :userAvatar="userData" />
      </div>
      <div class="task-item__footer">
        <span class="task-item__info task-item__info_color_primary">
          {{ number }}#{{ taskData.number }}
        </span>
        <span class="task-item__info task-item__info_color_disabled">
          {{ createUser }}
        </span>
        <StatusText :color="taskStatus.color">
          {{ taskStatus.text }}
        </StatusText>
        <span class="task-item__info task-item__info_color_disabled">
          {{ editUser }}
        </span>
      </div>
    </RouterLink>
    <DropDownButton
      :class="['task-item__setting', { 'task-item__setting_active': setting }]"
      :dropDownList="dropDownList"
      :checkLastItem="true"
      @drop-down="toggleSetting"
    />
  </li>
</template>

<script>
import { mapGetters } from "vuex";
import DropDownButton from "@/components/DropDown/DropDownButton.vue";
import { checkTaskStatus } from "@/helpers/check-task-status";
import { textInfo } from "@/helpers/text-info";
export default {
  name: "TaskItem",
  components: {
    DropDownButton,
  },
  props: {
    taskData: Object,
    index: Number,
  },

  data() {
    return {
      dropDownList: [
        { text: "Редактировать", click: this.editTask },
        { text: "Удалить", click: this.deleteTask },
      ],
      setting: false,
    };
  },

  computed: {
    ...mapGetters("usersModule", ["findUser"]),
    number: function () {
      return this.index + 1;
    },
    taskStatus: function () {
      return checkTaskStatus(this.taskData.status);
    },
    userData: function () {
      return this.findUser(this.taskData.author);
    },
    createUser: function () {
      const user = this.findUser(this.taskData.author)?.name;
      return textInfo(user, "создал(а)", this.taskData.dateCreated);
    },
    editUser: function () {
      const user = this.findUser(this.taskData.authorEdited)?.name;
      return textInfo(user, "изменил(а)", this.taskData.dateEdited);
    },
  },

  methods: {
    goToTask() {
      this.$router.push({
        name: "CurrentTask",
        params: { id: this.taskData._id },
      });
    },
    editTask() {
      this.$router.push({
        name: "EditTask",
        params: { id: this.taskData._id },
      });
    },
    deleteTask() {
      console.log("Delete task");
    },
    toggleSetting(data) {
      this.setting = data;
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
    text-decoration: none;
    @include flex-setting(column);
  }

  &__header {
    @include flex-setting(_, center, space-between);
  }

  &__title {
    margin: 0;
    height: 41px;
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

    &_color_disabled {
      color: $font-color-disabled;
    }
  }

  &__footer &__info:last-child {
    margin-left: auto;
  }

  &__setting {
    margin-left: 16px;
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
