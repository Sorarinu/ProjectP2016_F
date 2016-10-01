/**
 * Make normal class property to be data attribute.
 */

var dataFactory = function (target: any, key: string)  {

	if (target['data'] && target['data'] instanceof Function) {
		throw 'vue-typed error: [' + target.constructor.name + ']: You can not use @data attribute while you have already data() function in your class.';
	}

	if (!target['data']) {
		target['data'] = {};
	}

	if (!target['data'][key]) {
		target['data'][key] = key;
	}

};


var decorator = function () : PropertyDecorator {
	return function(target: Object, key: string){
		return dataFactory(target, key);
	};
};


export = decorator;
