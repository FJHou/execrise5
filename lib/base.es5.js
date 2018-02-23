
function Base() {
	this.events = {}
}
Base.extend = function (proto, static) {
  // Base类
  var Super = this;
  // Sub继承Base的属性和方法
	var Sub = function() {
		Super.call(this);
	}
	
  var Temp = function(){}
  // Temp的prototype指向Base的prototype
  // 这样temp的实例就有了on trigger方法
  Temp.prototype = Super.prototype;
  // Sub的prototype继承了Temp的原型和属性
	Sub.prototype = new Temp();
	merge(Sub.prototype, proto);
	merge(Sub, Super, static); // 将Super merge到Sub中，可以extend多次

	return Sub;
}
function merge(target) {
	var args = [].slice.call(arguments, 1);
	args.forEach(function(arg){
		for (var prop in arg) {
			if (arg.hasOwnProperty(prop)) { // 判断不是原型链上的属性
				target[prop] = arg[prop];
			}
		}
	})
}
Base.prototype.on = function(event, fn) {
	(this.events[event] = this.events[event] || [])
            .push(fn)
}
Base.prototype.trigger = function(event) {
	var args = [].slice.call(arguments, 1);
	var self = this;
	(this.events[event] || [])
		.forEach(function(fn){
			fn.apply(self, args); // 监听函数的this指向自己
		})
}

module.exports = Base