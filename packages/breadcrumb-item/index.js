import buBreadcrumbItem from "../breadcrumb/src/breadcrumb-item";

/* istanbul ignore next */
buBreadcrumbItem.install = function(Vue) {
  Vue.component(buBreadcrumbItem.name, buBreadcrumbItem);
};

export default buBreadcrumbItem;
