<template>
  <div class="dropdown-button">
    <ButtonIcon
      @click="toggleDropDown"
      :secondary-style="true"
      :active="dropDown"
    >
      <SvgIcon id="#dots" />
    </ButtonIcon>
    <DropDown
      class="dropdown-button__list"
      v-show="dropDown"
      :items="dropDownList"
      :checkLastItem="checkLastItem"
    />
  </div>
</template>

<script>
import DropDown from "./DropDown.vue";
export default {
  name: "DropDownButton",
  components: {
    DropDown,
  },
  props: {
    dropDownList: { type: Array, required: true },
    checkLastItem: Boolean,
  },
  data() {
    return {
      dropDown: false,
    };
  },
  methods: {
    toggleDropDown() {
      this.dropDown = !this.dropDown;
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown-button {
  position: relative;

  &__list {
    width: max-content;
    position: absolute;
    top: 44px;
    right: 0;
    z-index: 1;
  }
}
</style>
