<template>
  <ul class="drop-down pointer">
    <DropDownItem
      :key="index"
      v-for="(item, index) in items"
      :isDisabled="item.disabled"
      :last="lastItem(index)"
      @click="onClick(item)"
    >
      {{ item.text }}
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
    onClick(item) {
      if (!item.disabled) {
        item.click();
      }
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
}
</style>
