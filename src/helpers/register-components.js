import Vue from "vue";

const requireComponent = require.context("@/components/UI", false, /\.vue$/);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  const componentName = fileName
    .split("/")
    .pop()
    .replace(/\.\w+$/, "");
  Vue.component(componentName, componentConfig.default || componentConfig);
});
