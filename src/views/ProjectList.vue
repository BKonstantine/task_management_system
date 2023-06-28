<template>
  <PageContainer>
    <ul v-if="loadSuccess" class="project-list">
      <ProjectItem
        :projectData="project"
        :key="index"
        :index="index"
        v-for="(project, index) in projectsList"
      />
    </ul>
    <StopperContainer v-if="false">
      <BaseText>Не создан ни один проект</BaseText>
      <ButtonItem text="Добавить" />
    </StopperContainer>
  </PageContainer>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProjectItem from "@/components/ProjectItem.vue";
export default {
  name: "ProjectList",
  components: {
    ProjectItem,
  },
  methods: {
    ...mapActions(["fetchProjects"]),
    logData(data) {
      console.log(data);
    },
  },
  computed: {
    ...mapState({
      projectsList: (state) => state.projectModule.projectsList,
      loadSuccess: (state) => state.projectModule.projectsDataSuccess,
    }),
  },
  beforeMount() {
    this.fetchProjects();
  },
  mounted() {
    document.addEventListener("click", () => this.logData(this.projectsList));
  },
};
</script>

<style lang="scss" scoped>
.project-list {
  height: 100%;
  @include flex-setting(column, _, _, 10px);
}
</style>
