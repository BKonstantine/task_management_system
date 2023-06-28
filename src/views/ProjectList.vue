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
    <PaginationItem
      :totalPage="totalPage"
      :currentPage="currentPage"
      @prev-page="prevPage"
      @next-page="nextPage"
      @curr-page="currPage"
    />
    <StopperContainer v-if="projectsLength === 0 && !request">
      <BaseText>Не создан ни один проект</BaseText>
      <ButtonItem text="Добавить" />
    </StopperContainer>
  </PageContainer>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import ProjectItem from "@/components/ProjectItem.vue";
import PaginationItem from "@/components/PaginationItem.vue";
export default {
  name: "ProjectList",
  components: {
    ProjectItem,
    PaginationItem,
  },
  data() {
    return {
      totalPage: 10,
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions(["fetchProjects"]),
    prevPage(data) {
      this.currentPage -= data;
    },
    nextPage(data) {
      this.currentPage += data;
    },
    currPage(data) {
      this.currentPage = data;
    },
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
