import Vue from "vue";
import Main from "./main.vue";
let MessageConstructor = Vue.extend(Main);

const shadowCreate = () => {
  const shadow = document.createElement("div");
  shadow.className = "v-shadow";
  shadow.style.zIndex = 2040;
  return shadow;
};

let nextZIndex = 2050;
let shadow = null,
  instance = null;
const QueueSave = {
  resolve: null,
  reject: null
};

const callbackWrapper = action => {
  if (QueueSave.callback) {
    QueueSave.callback(action, instance);
  } else {
    if ("confirm" === action) {
      if (instance.type === "prompt") {
        QueueSave.resolve({
          action: action,
          value: instance.isValidValue
        });
      } else {
        QueueSave.resolve(action);
      }
    } else {
      QueueSave.reject(instance);
    }
  }
};

const MessageBox = function(options) {
  if (Vue.prototype.$isServer) return;

  options = options || { type: "alert" };

  if (options.type === "prompt") {
    options.showInput = true;
  }

  QueueSave.callback = options.callback;
  options.callback = callbackWrapper;

  options.cancelButtonText = options.cancelButtonText || "取消";
  options.confirmButtonText = options.confirmButtonText || "确定";

  instance = new MessageConstructor({
    data: options
  });

  instance.close = () => {};

  instance.$mount();

  instance.$el.style.zIndex = nextZIndex;
  instance.visible = true;

  document.body.appendChild(instance.$el);
  if (shadow == null) {
    document.body.appendChild((shadow = shadowCreate()));
  }

  // document.addEventListener('mousewheel', e => {
  //   e.preventDefault()
  // }, { passive: false })
  // document.addEventListener('touchmove', e => {
  //   console.log(e);
  //   e.preventDefault()
  // },  { passive: false })

  return new Promise((resolve, reject) => {
    QueueSave.resolve = resolve;
    QueueSave.reject = reject;
  });
};

const merge = (message, title, options, type) => {
  title = typeof title === "string" ? title : "";
  message = typeof message === "string" ? message : "";
  options = options || {};

  return Object.assign(options, {
    message,
    title: title,
    type: type || "alert"
  });
};

MessageBox.alert = function(message, title, options) {
  return MessageBox(merge(message, title, options, "alert"));
};

MessageBox.prompt = function(message, title, options) {
  return MessageBox(merge(message, title, options, "prompt"));
};

MessageBox.confirm = function(message, title, options) {
  return MessageBox(merge(message, title, options, "confirm"));
};

MessageBox.close = () => {};

export default MessageBox;
