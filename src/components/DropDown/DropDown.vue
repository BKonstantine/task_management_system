<template>
  <ul class="drop-down">
    <DropDownItem
      :key="index"
      v-for="(item, index) in items"
      :last="lastItem(index)"
    >
      {{ item }}
    </DropDownItem>
  </ul>
</template>

<script>
import DropDownItem from "./DropDownItem.vue";

export default {
  name: "DropDown",
  props: {
    items: {
      type: Array,
    },
    checkLastItem: {
      type: Boolean,
    },
  },
  components: {
    DropDownItem,
  },
  methods: {
    lastItem(index) {
      return this.checkLastItem ? this.items.length === index + 1 : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.drop-down {
  @include flex-setting(column);
  padding: 8px 0;
  background-color: $bgc-secondary-default;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 52px;
  right: 0;
  z-index: 1;
}
</style>
