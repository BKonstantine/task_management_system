<template>
  <div class="select-item" v-click-outside="closeSelect">
    <div :class="labelClass" @click="toggle">
      <span class="select-item__selected" v-if="selectedItem">
        {{ items.find((item) => item.value === selectedItem)?.label }}
      </span>
      <span class="select-item__placeholder" v-else>{{ placeholder }}</span>
      <SvgIcon id="#drop_down_1" class="select-item__icon" />
    </div>
    <ul
      class="select-item__options"
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
    <input type="hidden" :name="name" :value="selectedItem" />
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
      default: "Выберите значение...",
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
    closeSelect() {
      this.isOpen = false;
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
        "select-item__label": true,
        "select-item__label_active": this.isOpen,
        pointer: true,
      };
    },
    optionClass() {
      return (condition) => ({
        "select-item__option": true,
        "select-item__option_selected": condition,
        pointer: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.select-item {
  position: relative;
  width: 100%;
  @include font-setting(400, 14px, normal);

  &__label {
    @include flex-setting(_, center, space-between, 8px);
    height: 42px;
    padding: 0 8px 0 12px;
    border: 1px solid $border-color-default;
    background-color: $bgc-secondary-default;
    border-radius: 4px;

    &_active {
      border: 1px solid $border-color-active;
    }
  }

  &__placeholder {
    color: $font-color-placeholder;
  }

  &__icon {
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
}
</style>
