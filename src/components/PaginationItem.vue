<template>
  <div class="pagination">
    <div class="buttons">
      <ButtonIcon :secondaryStyle="true">
        <SvgIcon id="#drop_down_4" />
      </ButtonIcon>
      <ButtonIcon :secondaryStyle="true">
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
    totalPage: Number,
    currentPage: Number,
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
