/* eslint-disable no-unused-vars */
import Vue  from "vue";
import Main from "./main.vue";
let MessageConstructor = Vue.extend(Main);

const StaticTypes = {
  success: 'success',
  warning: 'warning',
  info: 'info',
  error: 'error',
}
const defaultOffset = 20;
let instances = [];
let seed = 1;
let nextZIndex = 2000;

const isVNode =(instance, VNode) =>{
  return instance instanceof VNode;
}

/**
 * 计算偏移量
 * @param {Number} verticalOffset
 * @param {Object} $el
 */
const OffsetComputed = (verticalOffset, { $el }) => {
  return verticalOffset + $el.offsetHeight + 16;
};

const OffsetReduce = ({ verticalOffset }, offsetHeight) => {
  return verticalOffset - offsetHeight - 16;
};

const isFunctionValid = payload => {
  return typeof payload === "function";
};

const Message = function(options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  if (typeof options === "string") {
    options = {
      message: options
    };
  }

  let userOnClose = options.onClose;
  let id = "message_" + seed++;

  options.onClose = function() {
    Message.close(id, userOnClose);
  };

  const instance = new MessageConstructor({
    data: options
  });

  const VNode = instance.$createElement().constructor;
  instance.id = id;

  if (isVNode(instance.message, VNode)) {
    instance.$slots.default = [instance.message];
    instance.message = null; // 赋值顺序很重要
  }

  instance.$mount();

  let verticalOffset = options.offset || defaultOffset;
  verticalOffset = instances.reduce(OffsetComputed, verticalOffset);

  instance.verticalOffset = verticalOffset;
  instance.$el.style.zIndex = nextZIndex + seed;
  instance.visible = true;

  document.body.appendChild(instance.$el);

  instances.push(instance);

  return instance;
};

Object.keys(StaticTypes).forEach(type => {
  Message[type] = options => {
    if (typeof options === "string") {
      options = {
        message: options
      };
    }
    options.type = type;
    return Message(options);
  };
});

Message.close = (id, userOnClose) => {
  const findIndex = instances
    .findIndex(instance => instance.id === id);
  const instance = instances[findIndex];
  const offsetHeight = instance.$el.offsetHeight;
  instances.splice(findIndex, 1);
  for (const index of Object.keys(instances)) {
    if (index >= findIndex) {
      instances[index].verticalOffset = OffsetReduce(
        instances[index],
        offsetHeight
      );
    }
  }
  if (isFunctionValid(userOnClose)) {
    userOnClose(instance);
  }
};

Message.closeAll = function() {
  for (const instance of instances) {
    instances.close();
  }
};

export { isFunctionValid, StaticTypes, defaultOffset };

export default Message;
