/* eslint-disable no-unused-vars */
import Vue from "vue";
import Main from "./main.vue";
let MessageConstructor = Vue.extend(Main);

const types = ["success", "warning", "info", "error"];
let instances = [];
let seed = 1;
let nextZIndex = 2000;

/**
 * 计算偏移量
 * @param {Number} verticalOffset
 * @param {Object} $el
 */
const OffsetComputed = (verticalOffset, { $el }) => {
  return verticalOffset + $el.offsetHeight + 16;
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
    // Message.close(id, userOnClose);
  };

  console.log(MessageConstructor);
  const instance = new MessageConstructor({
    data: options
  }).$mount();

  instance.id = id;

  let verticalOffset = options.offset || 20;
  verticalOffset = instances.reduce(OffsetComputed, verticalOffset);

	instance.verticalOffset = verticalOffset;
	instance.$el.style.zIndex = nextZIndex + seed;

  document.body.appendChild(instance.$el);

	instances.push(instance);

  return instance;
};

types.forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }
    options.type = type;
    return Message(options);
  };
});

Message.close = (id, userOnClose) => {

};

export default Message;
