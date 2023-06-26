<template>
  <PageContainer>
    <ul class="project-list">
      <ProjectItem
        :projectData="item"
        :key="index"
        v-for="(item, index) in projectData"
      />
    </ul>

    <ProjectStopper />
  </PageContainer>
</template>

<script>
import PageContainer from "@/components/UI/PageContainer.vue";
import ProjectItem from "@/components/ProjectItem.vue";
import ProjectStopper from "@/components/Stopper/ProjectStopper.vue";
export default {
  name: "ProjectList",
  components: {
    PageContainer,
    ProjectItem,
    ProjectStopper,
  },

  data() {
    return {
      projectData: [
        {
          title: "Название",
          number: "#1",
          created: "Иванов И.И. создал 1 час назад",
          changed: "Баранов В.В. изменил 1 минуту назад",
        },
        {
          title: "Название",
          number: "#1",
          created: "Иванов И.И. создал 1 час назад",
          changed: "Баранов В.В. изменил 1 минуту назад",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.project-list {
  height: 100%;
  @include flex-setting(column, _, _, 10px);
}
</style>
