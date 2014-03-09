
/*
	Knockout Auto-Numeric Binding Handler

	Description;
		This is a custom binding handler for the customised auto-numeric component extension for currency text inputs.

	References;
		http://www.decorplanit.com/plugin/
	
	Usage;
		<input type="text" data-bind="auto-numeric: { data: Observable, options: { vMin: 0, vMax: 100 } } " />
*/
ko.bindingHandlers["auto-numeric"] = {
	"init": function(element, valueAccessor, bindingsAccessor, viewModel, bindingContext)
	{
		var koAccessor = ko.utils.unwrapObservable(valueAccessor()),
			defaultOptions = {
				vMin: 0,
				vMax: 9999999999999,
				mDec: 5,
				noDecimals: true
			},
			inputOptions = { };

		if (koAccessor.options) $.extend(inputOptions, defaultOptions, koAccessor.options);
		else $.extend(inputOptions, defaultOptions, { });
		
		for (var property in inputOptions)
		{
			if (ko.isObservable(inputOptions[property]) || typeof inputOptions[property] === "function")
			{
				inputOptions[property] = inputOptions[property]() || "";
			}
		}

		if (inputOptions.aSign && inputOptions.pSign)
		{
			inputOptions.aSign = /s/i.test(inputOptions.pSign) ? " " + inputOptions.aSign : inputOptions.aSign + " ";
		}

		$(element).autoNumeric("init", inputOptions);

		if ($(element).is("input[type='text']"))
		{				
			ko.utils.registerEventHandler(element, bindingsAccessor().valueUpdate || "change", function()
			{
				koAccessor.data($(element).autoNumeric("get"));
			});
		}

		if (koAccessor.dependentObservables)
		{
			function DependentSubscription(dependent)
			{
				koAccessor.dependentObservables[dependent].subscribe(function(value)
				{
					if ($(element).data("autoNumeric"))
					{
						var previousMin = koAccessor.options && koAccessor.options.vMin ? koAccessor.options.vMin : null,
						    previousMax = koAccessor.options && koAccessor.options.vMax ? koAccessor.options.vMax : null;

						koAccessor = ko.utils.unwrapObservable(valueAccessor());

						var newMin = koAccessor.options && koAccessor.options.vMin ? koAccessor.options.vMin : null,
						    newMax = koAccessor.options && koAccessor.options.vMax ? koAccessor.options.vMax : null;

						if (koAccessor.options) $.extend(inputOptions, defaultOptions, koAccessor.options);
						else $.extend(inputOptions, defaultOptions, { });

						for (var property in inputOptions)
						{
							if (ko.isObservable(inputOptions[property]) || typeof inputOptions[property] === "function")
							{
								inputOptions[property] = inputOptions[property]() || "";
							}
						}

						if (inputOptions.aSign && inputOptions.pSign)
						{
							inputOptions.aSign = inputOptions.aSign !== -1
								? /s/i.test(inputOptions.pSign) ? " " + inputOptions.aSign : inputOptions.aSign + " "
								: inputOptions.aSign = "";
						}

						if (previousMin !== newMin || previousMax !== newMax)
						{
							var currentValue = parseInt(koAccessor.data());

							if (!isNaN(currentValue) && (currentValue < newMin || currentValue > newMax))
								koAccessor.data("");
						}

						$(element).autoNumeric("update", inputOptions);
					}
				});
			}

			for (var dependentIter in koAccessor.dependentObservables)
			{
				DependentSubscription(dependentIter);
			}
		}
	},
	"update": function(element, valueAccessor, bindingsAccessor, viewModel, bindingContext)
	{
		var koAccessor = ko.utils.unwrapObservable(valueAccessor());

		//if (!/\./.test($(element).val())) // Note: not required now. Only necessary when valueUpdate on key up - now the update is on change... 
		{
			$(element).autoNumeric("set", koAccessor.data() || "");
		}
	}
};