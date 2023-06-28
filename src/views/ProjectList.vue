<template>
  <PageContainer>
    <ul class="project-list">
      <ProjectItem
        :projectData="item"
        :key="index"
        v-for="(item, index) in projectData"
      />
    </ul>
    <StopperContainer>
      <BaseText>Не создан ни один проект</BaseText>
      <ButtonItem text="Добавить" />
    </StopperContainer>
  </PageContainer>
</template>

<script>
import ProjectItem from "@/components/ProjectItem.vue";
export default {
  name: "ProjectList",
  components: {
    ProjectItem,
  },
};
</script>

<style lang="scss" scoped>
.project-list {
  height: 100%;
  @include flex-setting(column, _, _, 10px);
}
</style>
