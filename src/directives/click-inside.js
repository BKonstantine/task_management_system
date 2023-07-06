export default {
  bind: function (el, binding, vnode) {
    el.clickInsideEventHandler = function (event) {
      if (el.contains(event.target)) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickInsideEventHandler);
  },
  unbind: function (el) {
    document.body.removeEventListener("click", el.clickInsideEventHandler);
  },
};
