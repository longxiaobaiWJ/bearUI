import Vue from "vue";
import Main from "./main.vue";
let MessageConstructor = Vue.extend(Main);

const shadowContainer = () => {
	const shadow = document.createElement('div');
	shadow.className = 'v-shadow';
	shadow.style.zIndex = 2040;
	return shadow;
}

let nextZIndex = 2050;

const MessageBox = function(options) {
	if (Vue.prototype.$isServer) return;

  const instance = new MessageConstructor({
    data: options
	});
	
	instance.$mount();

	instance.$el.style.zIndex = nextZIndex;

	document.body.appendChild(instance.$el);
	document.body.appendChild(shadowContainer());

	return instance;
};

MessageBox.alert = function(options) {
	console.log(options);
};

MessageBox.prompt = function(options) {
	console.log(options);
};

MessageBox.confirm = function(options) {
	console.log(options);
};

MessageBox.close = () => {
	
}

export default MessageBox;
