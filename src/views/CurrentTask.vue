<template>
  <PageContainer>
    <ButtonItem :secondaryStyle="true" @click="navigate">
      <SvgIcon id="#drop_down_4" />
      Вернуться к списку задач
    </ButtonItem>
    <div class="current-task">
      <div class="header">
        <div class="header__title">
          <BaseTitle type="h2">Код проекта</BaseTitle>
          <BaseTitle type="h2">#{{ taskData?.number }}</BaseTitle>
          <div class="header__setting">
            <ButtonIcon
              @click="toggleDropDown"
              :secondary-style="true"
              :active="dropDown"
            >
              <SvgIcon id="#dots" />
            </ButtonIcon>
            <DropDown
              class="header__drop-down"
              v-show="dropDown"
              :items="dropDownList"
              :checkLastItem="true"
            />
          </div>
        </div>
        <BaseTitle type="h2" class="header__task-name">
          Название задачи
        </BaseTitle>
        <div class="header__task-info">
          <StatusText v-if="taskStatus" :color="taskStatus.color">
            {{ taskStatus.text }}
          </StatusText>
          <span class="header__created header__created_color_disabled">
            Создана {{ createDate }}
          </span>
          <UserBadge v-if="userData" :userData="userData" />
        </div>
      </div>
      <div class="main"></div>
      <div class="sidebar"></div>
    </div>
  </PageContainer>
</template>

<script>
import { mapGetters } from "vuex";
import DropDown from "@/components/DropDown/DropDown.vue";
import { checkTaskStatus } from "@/helpers/check-task-status";
import { formatDate } from "@/helpers/format-time";
import { getCurrentTaskRequest } from "@/api/tasks";
export default {
  name: "CurrentTask",
  components: {
    DropDown,
  },
  data() {
    return {
      dropDownList: [
        { text: "Редактировать", click: this.editTask },
        { text: "Удалить", click: this.deleteTask },
      ],
      dropDown: false,
      taskData: null,
    };
  },
  computed: {
    ...mapGetters("usersModule", ["findUser"]),
    taskStatus() {
      return checkTaskStatus(this.taskData?.status);
    },
    userData: function () {
      return this.findUser(this.taskData?.author);
    },
    createDate: function () {
      return formatDate(this.taskData?.dateCreated);
    },
  },
  methods: {
    editTask() {
      console.log("Edit task");
    },
    deleteTask() {
      console.log("Delete task");
    },
    navigate() {
      this.$router.push({ name: "Tasks" });
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
  beforeMount() {
    getCurrentTaskRequest(this.$route.params.id).then((res) => {
      this.taskData = res;
    });
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
.current-task {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 300px;
  border-radius: 4px;
  border: 1px solid $border-color-default;
  grid-template-areas:
    "header sidebar"
    "main sidebar";

  .header {
    padding: 24px;
    height: max-content;
    grid-area: header;
    border-bottom: 1px solid $border-color-default;

    &__title {
      @include flex-setting(_, center, _, 16px);
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

    &__task-name {
      padding: 16px 0;
    }

    &__created {
      @include font-setting(400, 14px, 19px);

      &_color_disabled {
        color: $font-color-disabled;
      }
    }

    &__task-info {
      @include flex-setting(_, center, _, 16px);
    }
  }

  .main {
    padding: 24px;
    grid-area: main;
  }

  .sidebar {
    padding: 24px;
    grid-area: sidebar;
    border-left: 1px solid $border-color-default;
  }
}
</style>
