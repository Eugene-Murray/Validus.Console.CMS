$(function () {

	var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

	ConsoleApp.vmTestMemoryObject = function() {
		self.prop1 = "some value";
		return self;
	};
});
