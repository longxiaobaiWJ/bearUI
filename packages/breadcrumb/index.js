import buBreadcrumb from "./src/breadcrumb";

/* istanbul ignore next */
buBreadcrumb.install = function(Vue) {
  Vue.component(buBreadcrumb.name, buBreadcrumb);
};

export default buBreadcrumb;
