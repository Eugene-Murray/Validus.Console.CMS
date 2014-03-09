var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

ConsoleApp.Filter = function(p, f, v, PropertyOptions) {
	var self = this;
	this.Prop = ko.observable(p);
	this.Fn = ko.observable(f);
	this.Val = ko.observable(v);
	this.Fns = ko.computed(function()
	{
		if (self.Prop() !== "" && self.Prop() !== undefined)
		{
			for (var i = 0; i < PropertyOptions.length; i++)
			{
				if (PropertyOptions[i].val === self.Prop())
					return PropertyOptions[i].fns;
			}
		}
	});
};