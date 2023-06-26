<template>
  <button v-on="$listeners" :class="buttonClasses" type="button">
    <UserAvatar alt="Бузунов Константин Андреевич" /><SvgIcon
      id="#drop_down_1"
      class="button-profile__icon"
    />
  </button>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClasses: function () {
      return {
        "button-profile": true,
        pointer: true,
        "button-profile_active": this.active,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.button-profile {
  padding: 0 16px;
  @include flex-setting(_, center, _, 8px);
  min-height: 42px;
  background-color: $bgc-primary-default;
  border: 1px solid $bgc-primary-default;
  border-radius: 4px;

  &:hover {
    border: 1px solid $bgc-secondary-default;
  }

  &:active {
    background-color: $bgc-secondary-default;
    border: 1px solid $bgc-secondary-default;
  }

  &_active {
    background-color: $bgc-secondary-default;
    border: 1px solid $bgc-secondary-default;
  }

  &_active &__icon {
    color: $bgc-secondary-active;
  }

  &__icon {
    color: $bgc-secondary-default;
  }

  &:active &__icon {
    color: $bgc-secondary-active;
  }
}
</style>
