<template>
  <div class="select-button">
    <div class="select-button__select">
      <div :class="labelClass" @click="toggle">
        <span class="select-button__selected" v-if="selectedItem">
          {{ items.find((item) => item.value === selectedItem)?.label }}
        </span>
        <span class="select-button__placeholder" v-else>{{ placeholder }}</span>
        <SvgIcon id="#drop_down_1" class="select-button__icon" />
      </div>
      <ul
        class="select-button__options"
        v-show="isOpen"
        :style="{ zIndex: zIndex }"
      >
        <li
          v-for="(item, index) in items"
          :key="index"
          :class="optionClass(item.value === selectedItem)"
          @click="select(item)"
        >
          {{ item.label }}
        </li>
      </ul>
      <input type="hidden" :name="name" v-bind="$attrs" :value="selectedItem" />
    </div>
    <button
      type="button"
      class="select-button__button pointer"
      @click="$emit('filter-click')"
    >
      <SvgIcon id="#sort-up" />
    </button>
  </div>
</template>

<script>
export default {
  name: "SelectItem",
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
    value: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    zIndex: {
      type: Number,
    },
  },
  data() {
    return {
      isOpen: false,
      selectedItem: this.value,
    };
  },
  watch: {
    value(newValue) {
      this.selectedItem = newValue;
    },
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    select(item) {
      this.selectedItem = item.value;
      this.isOpen = false;
      this.$emit("input", this.selectedItem);
    },
  },
  computed: {
    labelClass() {
      return {
        "select-button__label": true,
        "select-button__label_active": this.isOpen,
        pointer: true,
      };
    },
    optionClass() {
      return (condition) => ({
        "select-button__option": true,
        "select-button__option_selected": condition,
        pointer: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.select-button {
  @include flex-setting(_, center);

  &__select {
    position: relative;
    width: 100%;
    @include font-setting(400, 14px, normal);
  }

  &__label {
    @include flex-setting(_, center, space-between, 8px);
    min-width: 172px;
    height: 42px;
    padding: 0 8px 0 12px;
    border: 1px solid $border-color-default;
    background-color: $bgc-secondary-default;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;

    &_active {
      border: 1px solid $border-color-active;
    }
  }

  &__placeholder {
    color: $font-color-placeholder;
  }

  &__selected {
    white-space: nowrap;
  }

  &__icon {
    flex: none;
    color: $font-color-disabled;
  }

  &__options {
    position: absolute;
    padding: 8px 0;
    width: 100%;
    z-index: 1;
    top: 44px;
    left: 0;
    max-height: 200px;
    overflow-y: auto;
    background-color: $bgc-secondary-default;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  }

  &__option {
    @include flex-setting(_, center);
    list-style: none;
    height: 35px;
    padding: 0 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      background-color: $bgc-secondary-hover;
    }
  }

  &__option_selected {
    background-color: $bgc-secondary-active;
  }

  &__button {
    @include flex-setting(_, center, center);
    flex: none;
    padding: 0;
    width: 42px;
    height: 42px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid $border-color-default;
    background-color: $bgc-secondary-default;

    &:hover {
      border: 1px solid $border-color-hover;
      background-color: $bgc-secondary-hover;
    }

    &:active {
      border: 1px solid $border-color-active;
      background-color: $bgc-secondary-active;
    }
  }
}
</style>
