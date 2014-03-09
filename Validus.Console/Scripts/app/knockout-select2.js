ko.bindingHandlers["select2"] =
{
	"init": function(element, valueAccessor, bindingsAccessor, viewModel)
	{
		$(element).select2(valueAccessor());

		ko.utils.domNodeDisposal.addDisposeCallback(element, function()
		{
			$(element).select2("destroy");
		});
	},
	"update": function(element, valueAccessor, bindingsAccessor, viewModel)
	{
		var value = valueAccessor(),
            bindings = bindingsAccessor(),
            disable = ko.utils.unwrapObservable(bindings.disable) || false,
            enable = ko.utils.unwrapObservable(bindings.enable) || true,
			selectedOption = ko.utils.unwrapObservable(bindings.selectedOptions),
            selectedValue = ko.utils.unwrapObservable(bindings.value);

		if (bindings.enable || bindings.disable)
			$(element).select2(enable && !disable ? "enable" : "disable");

		$(element).trigger("change");
	}
};