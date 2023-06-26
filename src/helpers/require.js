import Vue from "vue";

const req = require.context("@/assets/icons", false, /\.svg$/);
const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext);
};
requireAll(req);

// получаем контекст для папки UI
const requireComponent = require.context(
  // относительный путь до папки компонентов
  "@/components/UI",
  // обрабатывать ли подпапки
  false,
  // расширение файлов компонентов
  /\.vue$/
);

// для каждого найденного компонента
requireComponent.keys().forEach((fileName) => {
  // получаем конфигурацию компонента
  const componentConfig = requireComponent(fileName);
  // получаем название компонента из названия файла
  const componentName = fileName
    .split("/")
    .pop()
    .replace(/\.\w+$/, "");

  // глобально регистрируем компонент
  Vue.component(componentName, componentConfig.default || componentConfig);
});
