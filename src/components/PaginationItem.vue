<template>
  <div class="pagination">
    <div class="buttons">
      <ButtonIcon
        :secondaryStyle="true"
        :disabled="currentPage === 1"
        @click="prevPage"
      >
        <SvgIcon id="#drop_down_4" />
      </ButtonIcon>
      <ButtonItem
        :key="index"
        :small="true"
        :text="number"
        :secondaryStyle="number !== currentPage"
        v-for="(number, index) in numberList"
        @click="currPage(number)"
      />
      <ButtonIcon
        :secondaryStyle="true"
        :disabled="currentPage === totalPage"
        @click="nextPage"
      >
        <SvgIcon id="#drop_down_2" />
      </ButtonIcon>
    </div>
    <div class="input"></div>
    <span class="counter"></span>
  </div>
</template>

<script>
import { getPagingRange } from "@/helpers/get-paging-range";
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
  methods: {
    prevPage() {
      this.$emit("prev-page", 1);
    },
    nextPage() {
      this.$emit("next-page", 1);
    },
    currPage(data) {
      this.$emit("curr-page", data);
    },
  },
  computed: {
    numberList() {
      return getPagingRange(this.currentPage, { total: this.totalPage });
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  padding: 20px;
  width: 100%;
  height: 82px;
  background-color: $bgc-secondary-default;
  @include flex-setting(_, center, _, 32px);
}

.buttons {
  @include flex-setting(_, center, _, 8px);
}
</style>
