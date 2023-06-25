<template>
  <div class="project-item">
    <div class="project-item__container">
      <p class="project-item__title">Название</p>
      <div class="project-item__footer">
        <span class="project-item__info project-item__info_color_primary">
          #1
        </span>
        <span class="project-item__info project-item__info_color_disabled">
          Иванов И.И. создал 1 час назад
        </span>
        <span class="project-item__info project-item__info_color_disabled">
          Баранов В.В. изменил 1 минуту назад
        </span>
      </div>
    </div>
    <div class="project-item__setting"></div>
  </div>
</template>

<script>
export default {
  name: "ProjectItem",
};
</script>

<style lang="scss" scoped>
.project-item {
  padding: 0 16px 8px 16px;
  height: 100%;
  max-height: 65px;
  box-sizing: border-box;
  display: flex;
  border-bottom: 1px solid $border-color-active;
  cursor: pointer;

  &__container {
    width: 100%;
    @include flex-settin(column, _, space-between);
  }

  &__title {
    margin: 0;
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
    @include flex-settin(_, _, _, 16px);
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
    position: relative;
  }
}
</style>
