<template>
  <div class="dropdown-button">
    <ButtonIcon
      @click="toggleDropDown"
      :secondary-style="true"
      :active="dropDown"
      v-click-outside.stop="hideDropDown"
    >
      <SvgIcon id="#dots" />
    </ButtonIcon>
    <DropDown
      class="dropdown-button__list"
      v-show="dropDown"
      v-click-inside.stop="hideDropDown"
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
    dropDownLister() {
      this.$emit("drop-down", this.dropDown);
    },

    toggleDropDown() {
      this.dropDown = !this.dropDown;
      this.dropDownLister();
    },
    hideDropDown() {
      this.dropDown = false;
      this.dropDownLister();
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
    z-index: 2;
  }
}
</style>
