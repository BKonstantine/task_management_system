<template>
  <li class="project-item pointer">
    <div class="project-item__container">
      <RouterLink
        :to="{
          name: 'Tasks',
          params: { projectId: this.projectData._id },
          query: { from: 'projects' },
        }"
        class="project-item__title pointer"
      >
        <p>
          {{ projectData.name }}
        </p>
      </RouterLink>
      <div class="project-item__footer">
        <span class="project-item__info project-item__info_color_primary">
          {{ number }}#{{ projectData.code }}
        </span>
        <span class="project-item__info project-item__info_color_disabled">
          {{ createUser }}
        </span>
        <span class="project-item__info project-item__info_color_disabled">
          {{ editUser }}
        </span>
      </div>
    </div>
    <DropDownButton
      :class="[
        'project-item__setting',
        { 'project-item__setting_active': setting },
      ]"
      :dropDownList="dropDownList"
      :checkLastItem="true"
      @drop-down="toggleSetting"
    />
    <EditProject
      :projectData="projectData"
      v-if="editModal"
      @close="toggleEditProject"
    />
    <DeleteProject
      :projectData="projectData"
      v-if="deleteModal"
      @close="toggleDeleteProject"
    />
  </li>
</template>

<script>
import { mapGetters } from "vuex";
import { checkUserAccess } from "@/helpers/check-user-access";
import { textInfo } from "@/helpers/text-info";
import EditProject from "@/components/Modal/EditProject.vue";
import DeleteProject from "@/components/Modal/DeleteProject.vue";
import DropDownButton from "@/components/DropDown/DropDownButton.vue";
export default {
  name: "ProjectItem",
  components: {
    DropDownButton,
    EditProject,
    DeleteProject,
  },
  props: {
    projectData: Object,
    index: Number,
  },
  data() {
    return {
      setting: false,
      editModal: false,
      deleteModal: false,
    };
  },
  computed: {
    ...mapGetters({
      findUser: "usersModule/findUser",
      currentUser: "currentUserModule/getCurrentUser",
    }),
    number: function () {
      return this.index + 1;
    },
    createUser: function () {
      const user = this.findUser(this.projectData.author)?.name;
      return textInfo(user, "создал(а)", this.projectData.dateCreated);
    },
    editUser: function () {
      const user = this.findUser(this.projectData.authorEdited)?.name;
      return textInfo(user, "изменил(а)", this.projectData.dateEdited);
    },
    dropDownList: function () {
      return [
        {
          text: "Редактировать",
          click: this.toggleEditProject,
          disabled: checkUserAccess(this.projectData?.author, this.currentUser),
        },
        {
          text: "Удалить",
          click: this.toggleDeleteProject,
          disabled: checkUserAccess(this.projectData?.author, this.currentUser),
        },
      ];
    },
  },
  methods: {
    toggleEditProject() {
      this.editModal = !this.editModal;
    },
    toggleDeleteProject() {
      this.deleteModal = !this.deleteModal;
    },
    toggleSetting(data) {
      this.setting = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.project-item {
  list-style: none;
  padding: 0 16px 8px 16px;
  height: 65px;
  box-sizing: border-box;
  display: flex;
  border-bottom: 1px solid $border-color-active;

  &__container {
    width: 100%;
    @include flex-setting(column);
  }

  &__title {
    margin: 0;
    height: 37px;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: $font-color-primary;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
  }

  &__footer {
    @include flex-setting(_, _, _, 16px);
  }

  &__info {
    @include font-setting(400, 14px, 19px);
  }

  &__info_color_disabled {
    color: $font-color-disabled;
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
