<template>
  <PageContainer>
    <FilterContainer>
      <BaseInput />
      <ButtonItem class="button" :secondaryStyle="true">Добавить</ButtonItem>
    </FilterContainer>
    <ul v-if="getProjectsLength > 0" class="project-list">
      <ProjectItem
        :projectData="project"
        :key="index"
        :index="index"
        v-for="(project, index) in getProjectList"
      />
      <li v-if="getProjectsTotalPage > 1" class="block"></li>
    </ul>
    <PaginationItem
      v-if="getProjectsTotalPage > 1"
      :totalPage="getProjectsTotalPage"
      :currentPage="currentPage"
      @prev-page="prevPage"
      @next-page="nextPage"
      @curr-page="currPage"
      class="project-list__pagination"
    />
    <StopperContainer
      v-if="getProjectsLength === 0 && !getProjectRequestStatus"
    >
      <BaseText>Не создан ни один проект</BaseText>
      <ButtonItem text="Добавить" />
    </StopperContainer>
  </PageContainer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions(["fetchProjects"]),
    prevPage(data) {
      this.currentPage -= data;
      this.fetchProjects({ page: this.currentPage });
    },
    nextPage(data) {
      this.currentPage += data;
      this.fetchProjects({ page: this.currentPage });
    },
    currPage(data) {
      this.currentPage = data;
      this.fetchProjects({ page: this.currentPage });
    },
  },
  computed: {
    ...mapGetters([
      "getProjectsLength",
      "getProjectList",
      "getProjectsTotalPage",
      "getProjectRequestStatus",
    ]),
  },
  beforeMount() {
    this.fetchProjects();
  },
};
</script>

<style lang="scss" scoped>
.project-list {
  @include flex-setting(column, _, _, 10px);

  &__pagination {
    padding: 20px 44px;
    position: fixed;
    bottom: 0;
    left: 0px;
    z-index: 1;
  }
}

.block {
  height: 72px;
  list-style: none;
}

.button {
  margin-left: auto;
}
</style>
