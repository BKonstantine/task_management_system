<template>
  <PageContainer>
    <ul class="task-list">
      <TaskItem
        :taskData="item"
        :key="index"
        ref="TaskItem"
        v-for="(item, index) in taskData"
      />
    </ul>
    <TaskStopper />
  </PageContainer>
</template>

<script>
import PageContainer from "@/components/UI/PageContainer.vue";
import TaskStopper from "@/components/Stopper/TaskStopper.vue";
import TaskItem from "@/components/UI/TaskItem.vue";
export default {
  name: "TaskList",
  components: {
    PageContainer,
    TaskStopper,
    TaskItem,
  },
  methods: {
    hideAll(event) {
      const isButton = event.target.closest("button");
      const list = this.$refs.TaskItem;
      if (!isButton) {
        list.forEach((item) => {
          item.hideDropDown();
        });
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.hideAll);
  },

  beforeDestroy() {
    document.removeEventListener("click", this.hideAll);
  },
  data() {
    return {
      taskData: [
        {
          title: "Название",
          number: "#1",
          status: "Черновик",
          created: "Иванов И.И. создал 1 час назад",
          changed: "Баранов В.В. изменил 1 минуту назад",
        },
        {
          title: "Название",
          number: "#1",
          status: "Черновик",
          created: "Иванов И.И. создал 1 час назад",
          changed: "Баранов В.В. изменил 1 минуту назад",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.task-list {
  height: 100%;
  @include flex-setting(column, _, _, 10px);
}
</style>
