<template>
  <PageContainer>
    <ul v-if="projectsLength > 0" class="project-list">
      <ProjectItem
        :projectData="project"
        :key="index"
        :index="index"
        v-for="(project, index) in projectsList"
      />
    </ul>
    <StopperContainer v-if="projectsLength === 0">
      <BaseText>Не создан ни один проект</BaseText>
      <ButtonItem text="Добавить" />
    </StopperContainer>
  </PageContainer>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import ProjectItem from "@/components/ProjectItem.vue";
export default {
  name: "ProjectList",
  components: {
    ProjectItem,
  },
  methods: {
    ...mapActions(["fetchProjects"]),
  },
  computed: {
    ...mapGetters(["getProjectsLength"]),
    ...mapState({
      projectsList: (state) => state.projectModule.projectsList,
      request: (state) => state.projectModule.projectsDataRequest,
    }),
    projectsLength: function () {
      return this.getProjectsLength;
    },
  },
  beforeMount() {
    this.fetchProjects();
  },
};
</script>

<style lang="scss" scoped>
.project-list {
  height: 100%;
  @include flex-setting(column, _, _, 10px);
}
</style>
