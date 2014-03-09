$(function()
{
	/*
		Knockout Bootstrap Typeahead Handler
	
		Description;
			This is a custom binding handler for the Twitter Bootstrap Typeahead component (designed for Bootstrap version 2).
	
		References;
			TODO
	
		Usage;
			<input type="text" data-bind="bootstrap-typeahead: { 
				url: 'Service Url', 
				data: Observable, 
				query: { other: Observable },
				dependents: { JsonProperty: Observable }, 
				options: {  uniqueField: 'Id', labelField: 'Label', valueField: 'Value' },
				onInvalid: OptionalFunction,
				onNotFound: OptionalFunction }" />
	*/
	var self = ko.bindingHandlers["bootstrap-typeahead"] = {
		init: function(element, valueAccessor, bindingsAccessor, viewModel, bindingContext)
		{
			var koAccessor = ko.utils.unwrapObservable(valueAccessor()),
			    id = koAccessor.id,
			    value = koAccessor.data,
			    dependents = koAccessor.dependents,
			    onInvalid = koAccessor.onInvalid,
			    onNoSelect = koAccessor.onNoSelect,
			    options = { },
			    query = { };

			/*
				TODO: Remove this hack for bug fix 1499/1500
				Additional insured name typeahead hack to clear out "0" from the input box value
				on initialisation of a new additional insured.
			*/
			if ($(element).attr("name") === "tempModel.InsuredId") $(element).val("");

			if (koAccessor.options)
			{
				for (var option in koAccessor.options)
				{
					options[option] = koAccessor.options[option];
				}
			}

			if (!options.source)
			{
				options.source = function(term, limit, process)
				{
					query.term = $(element).val();
					query.skip = 0;
					query.take = limit + 1;

					if (query.term)
					{
						$(element).addClass("val-loading-icon");

						if (koAccessor.query)
						{
							/*
								TODO: Add subscriptions to call the source function ?
							*/
							for (var parameter in koAccessor.query)
							{
								var queryValue = ko.isObservable(koAccessor.query[parameter]) ||
									typeof koAccessor.query[parameter] === "function"
									? koAccessor.query[parameter]()
									: koAccessor.query[parameter];

								if (queryValue && queryValue !== -1) {
								    query[parameter] = queryValue;
								} else {
								    delete query[parameter];
								}
							}
						}

						$.ajaxLatest(koAccessor.url,
						{
							data: query,
							dataType: "json",
							global: false,
							cache: options.cache || true,
							success: process,
							complete: function()
							{
								$(element).removeClass("val-loading-icon");
							}
						}, element);
					}
				};
			}

			if (!options.highlighter)
			{
				options.highlighter = function(item)
				{
					var label = "",
					    escapedQuery = this.query.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");

					for (var property in item) label += item[property] ? item[property].toString().trim() + " - " : " - ";

					if (label.length) label = label.replace(/\s-\s$/, "").trim();

					return label.replace(new RegExp("(" + escapedQuery + ")", "gi"), function($1, match)
					{
						return "<strong>" + match + "</strong>";
					});
				};
			}

			options.lookup = function(event)
			{
				var that = this;

				this.query = this.$element.val();

				if (!this.query) return this.shown ? this.hide() : this;

				this[!$.isArray(this.source) ? "lookupAsync" : "lookupLocal"](function(items)
				{
					if (!items.length) return that.unselect();

					var last = items.length === query.take ? items.pop() : null,
						html = that.render(items).show();

					if (last) html.$menu.append("<li><i>More results possible...</i></li>");

					return html;
				});

				return this;
			};

			options.updater = function(active, item)
			{
			if (active)
				{
					self.set(element, item, options, id, value, dependents);
				}
				else
				{
					if (typeof onInvalid === "function")
					{
					    onInvalid(element, options, id, value, dependents);
					    if ($(element).is("input"))
					        $(element).data('queryText', $(element).val());
					}
					else
					{
						self.set(null, null, null, id, value, dependents);
					}
				}

				$(element).change();
			};

			if ($(element).is("input"))
			{
				ko.utils.registerEventHandler(element, "change", function()
				{
					if (!$.trim($(element).val()))
					{
						self.set(null, null, null, id, value, dependents);
					}
					else if (typeof onNoSelect === "function")
					{
						onNoSelect(element, options, id, value, dependents);
					}
				});
			}

			options.exit = function () {

			    if (typeof onNoSelect === "function") return;

			    if ($(element).data('queryText') != $.trim($(element).val()) && $.trim($(element).val())) {

			        query.term = $(element).val();
			        query.skip = 0;
			        query.take = 2;

			        if (query.term) {
			            $(element).addClass("val-loading-icon");

			            if (koAccessor.query) {
			                /*
								TODO: Add subscriptions to call the source function ?
							*/
			                for (var parameter in koAccessor.query) {
			                    var queryValue = ko.isObservable(koAccessor.query[parameter]) ||
									typeof koAccessor.query[parameter] === "function"
									? koAccessor.query[parameter]()
									: koAccessor.query[parameter];

			                    if (queryValue && queryValue !== -1) {
			                        query[parameter] = queryValue;
			                    } else {
			                        delete query[parameter];
			                    }
			                }
			            }

			            $.ajaxLatest(koAccessor.url,
						{
						    data: query,
						    dataType: "json",
						    global: false,
						    cache: options.cache || true,
						    success:  function (items) {
						        $(element).removeClass("val-loading-icon");
						        if (items && items.length && items.length == 1) {
						            self.set(element, items[0], options, null, value, dependents);
						        } else {
						            if (typeof onInvalid === "function") {
						                onInvalid(element, options, id, value, dependents);
						                if ($(element).is("input"))
						                    $(element).data('queryText', $(element).val());
						            }
						            else {
						                self.set(element, null, null, id, value, dependents);
						                //if ($(element).is("input")) $(element).val(query.term); //todo:  This is  to retain the value typed by user
						                if ($(element).is("input")) $(element).trigger("change");//todo:  This is  to start validation
						            }
						        }
						    }
						}, element);
			        }
			    }
			};

		    $(element).typeahead(options);
		},
		update: function(element, valueAccessor, bindingsAccessor, viewModel, bindingContext) {

			var koAccessor = ko.utils.unwrapObservable(valueAccessor()),
			    id = koAccessor.id,
			    value = koAccessor.data,
			    dependents = koAccessor.dependents,
			    koID = ko.isObservable(id) ? id() || 0 : 0,
			    koValue = ko.isObservable(value) ? value() : null,
			    onNotFound = koAccessor.onNotFound,
			    options = { },
			    query = {};

			if (koAccessor.options)
			{
				for (var option in koAccessor.options)
				{
					options[option] = koAccessor.options[option];
				}
			}

			/*
				TODO: Remove this hack for bug fix 1503
				Insured name typeahead behaves differently
				
				&& !/"InsuredId"/gi.test($(element).attr("name")
			*/
			if (!koID && !/"InsuredId"/gi.test($(element).attr("name")))
			{
				koID = koValue && options.uniqueField === options.valueField
					? $(element).val() !== koValue ? koValue : 0
					: 0;
			}

			if (isNaN(koID) ? koID.length > 0 : koID > 0)
			{
				$(element).addClass("val-loading-icon");

				query[options.uniqueField] = koID;

				$.trafficCop(koAccessor.url,
				{
					data: query,
					dataType: "json",
					global: false,
					success: function(item)
					{
						self.set(element, item, options, null, value, dependents);
					},
					error: function(xhr, status, error)
					{
						if (xhr.status === 404 && typeof onNotFound === "function")
						{
							onNotFound(element, options, id, value, dependents);
						}
						else
						{
							self.set(element, null, null, null, value, dependents);
						}
					},
					complete: function()
					{
						$(element).removeClass("val-loading-icon");
					}
				});
			}
			else if (!ko.isObservable(id)
				&& options.uniqueField !== options.valueField
				&& options.labelField === options.valueField) {
				$(element).val(koValue);
			}
			else if (dependents !== null
				&& dependents !== undefined
				&& dependents.Name !== null
				&& dependents.Name !== undefined)
			{
				if (dependents.Name() !== ''
					&& dependents.Name() !== null
					&& dependents.Name() !== undefined)
				{
					var noInsuredSelectedValue = $.trim(dependents.Name()); 
					$(element).val(noInsuredSelectedValue.toUpperCase());
				}
			}
			//else if (!koValue && options.uniqueField === options.valueField)
			//{
			//	self.set(element, null, null, null, value, dependents);
			//}
			//else if (options.uniqueField !== options.valueField && options.labelField === options.valueField)
			//{
			//	$(element).val(koValue);
			//}
			//else if (!ko.isObservable(id)
			//	&& options.uniqueField !== options.valueField
			//	&& options.labelField === options.valueField)
			//{
			//	$(element).val(koValue);
			//}
		},
		set: function(element, item, options, id, value, dependents)
		{
		    if (element) $(element).val($.trim(item ? item[options.labelField] : ""));
		    if ($(element).is("input"))
		        $(element).data('queryText', $(element).val());

			if (ko.isObservable(id))
			{
				id(item ? item[options.uniqueField] : null);
			}
			else if (ko.isObservable(value))
			{
				value(item ? item[options.valueField] : null);
			}

			if (dependents)
			{
				for (var property in dependents)
				{
					var dependant = item && item[property]
						? item[property]
						: null;
					
					if (ko.isObservable(dependents[property]) || typeof dependents[property] === "function")
					{
						dependents[property](dependant);
					}
					else dependents[property] = dependant;
				}
			}
		}
	};
});