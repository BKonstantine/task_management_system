<template>
  <div class="pagination">
    <div class="buttons">
      <ButtonIcon :secondaryStyle="true" :disabled="currentPage === 1">
        <SvgIcon id="#drop_down_4" />
      </ButtonIcon>
      <ButtonItem
        :key="index"
        v-text="number"
        :secondaryStyle="number !== currentPage"
        v-for="(number, index) in numberList"
      />
      <ButtonIcon
        :secondaryStyle="true"
        :disabled="currentPage === numberList.length"
      >
        <SvgIcon id="#drop_down_2" />
      </ButtonIcon>
    </div>
    <div class="input"></div>
    <span class="counter"></span>
  </div>
</template>

<script>
import { generateNumbers } from "@/helpers/generate-numbers";
export default {
  name: "PaginationItem",
  props: {
    totalPage: {
      type: Number,
      require: true,
    },
    currentPage: {
      type: Number,
      require: true,
    },
  },
  computed: {
    numberList: function () {
      return generateNumbers(this.totalPage);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  position: absolute;
  bottom: 0;
  left: 24px;
  z-index: 1;
  padding: 20px;
  height: 82px;
  @include flex-setting(_, center, _, 32px);
}

.buttons {
  @include flex-setting(_, center, _, 8px);
}
</style>
