﻿
/* ------------------------------------------------------------------------------------------------ *\
	Native Extensions & Helpers
\* ------------------------------------------------------------------------------------------------ */

/*
	Browser Console Logging (cross-browser compatibility)

	The window.console is a global object that is often provided by major browsers that enables
	us to expose script information in the browser's console.

	In the event that the window.console is not available we initialise the object and its methods.
*/
if (!window.console) console = { };

console.log = console.log || function() { };
console.warn = console.warn || function() { };
console.error = console.error || function() { };
console.info = console.info || function() { };

/*
	String Trim (cross-browser compatibility)

	A String object extension method to remove trailing whitespace (or suggested characters) from 
	the current string value. This functionality is not available on all browsers, so here we ensure
	that it is always available.
*/
if (!String.prototype.trimStart)
{
	String.prototype.trimStart = function(replace)
	{
		return this.replace(new RegExp("^[" + (replace || "\\s") + "]+", "g"), "");
	};
}

if (!String.prototype.trimEnd)
{
	String.prototype.trimEnd = function(replace)
	{
		return this.replace(new RegExp("[" + (replace || "\\s") + "]+$", "g"), "");
	};
}

if (!String.prototype.trim)
{
	String.prototype.trim = function(replace)
	{
		return this.trimStart(replace).trimEnd(replace);
	};
}

/*
	Clear Input (cross-browser compatibility)

	IE 10 provides the user with an 'X' symbol when a text input box is in focus that can be 
	clicked on to clear its value. This extension adds the same functionality to inputs on
	IE versions less than 10 and other browsers for the specified CSS class.

	NOTE: This uses conditional compilation that is only supported by IE and requires the
	css class 'val-clear-input' to be defined.

	TODO: Surround the input box with Twitter Bootstrap <div class="input-append"> if required
*/


/*
	Global Error Handler

	Should handle any JavaScript error events that fire for any script following it.
*/
window.onerror = function(message, url, line)
{
	return true; // Suppress error messages
	
	console.log("window.onerror: " + line + " : " + message + "(" + url + ")");

	window.alert("window.onerror: " + message);
};











/* ------------------------------------------------------------------------------------------------ *\
	Twitter Bootstrap Extensions & Helpers
\* ------------------------------------------------------------------------------------------------ */

/*
	Twitter Bootstrap Carousel Override

	This overrides the cycle() method to allow us to create a Carousel that does not
	automatically cycle.
*/
$.fn.carousel.Constructor.prototype.cycle = function(e)
{
	if (!e) this.paused = false;
	if (this.interval) clearInterval(this.interval);
	if (this.interval > 0) // VALIDUS: Never cycle if interval is less than 0
		this.options.interval
			&& !this.paused
			&& (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
	return this;
};

/*
	Bootstrap Transition Effects

	Disabling this now causes all bootsrap transitions to immediately set elements to their 
	final state, rather than displaying an effect. Fancy animations have no place in a
	professional web application as they often appear to be tactless and are detrimental
	to the systems performance (in particular with older browsers, such as IE 8).
*/
$(function()
{
	$.support.transition = null;
});



/* ------------------------------------------------------------------------------------------------ *\
	jQuery Extensions & Helpers
\* ------------------------------------------------------------------------------------------------ */

/*
	jQuery Cross-Origin Resource Sharing

	Enabling this allows cross-domain ajax calls, which we always want turned on in our 
	application. There are too many problems with this setting anyway;
	http://bugs.jquery.com/search?q=cors&ticket=on
*/
$.support.cors = true;

/*
	jQuery Effects

	Disabling this now causes all animations methods to immediately set elements to their 
	final state, rather than displaying an effect. Fancy animations have no place in a
	professional web application as they often appear to be tactless and are detrimental
	to the systems performance (in particular with older browsers, such as IE 8).
*/
//$.fx.off = true; // TODO: Re-disable

/*
	jQuery Ajax Error Handler

	Register a generic handler to be called when Ajax requests complete with an error.
*/;
$(document).ajaxError(function(event, xhr, settings, exception)
{
	if (xhr.status > 400) // Handle all client (except 'Bad Request') & server error response codes
	{
		var contentType = xhr.getResponseHeader("Content-Type"),
		    errorModal = $(".val-error-modal:first"),
		    errorParagraph = $('<p class="alert alert-error" style="font-size:10px;"><b>'
			    + exception + ' to ' + settings.url + ':</b><br /></p>');

		if (contentType.indexOf("json") !== -1)
		{
			var jsonData = JSON.parse(xhr.responseText);

			if (jsonData && jsonData.Error)
			{
				$.each(jsonData.Error, function(errorIndex, errorValue)
				{
					if (errorValue && typeof errorValue === "object")
					{
						errorParagraph.append('<b>' + errorIndex + '</b><br />');

						var errorInnerParagraph = $('<p style="padding-left:10px;"></p>');

						$.each(jsonData.Error[errorIndex], function(errorInnerIndex, errorInnerValue)
						{
							errorInnerParagraph.append('<b>' + errorInnerIndex + '</b><br />' + errorInnerValue + '<br />');
						});

						errorParagraph.append(errorInnerParagraph);
					}
					else
					{
						errorParagraph.append('<b>' + errorIndex + '</b><br />' + errorValue + '<br />');
					}
				});
			}
			else
			{
				errorParagraph.append('<b>No Error message returned</b><br />');
			}
		}
		else if (contentType.indexOf("plain") !== -1)
		{
			errorParagraph.append('<b>' + xhr.responseText + '</b><br />');
		}
		else
		{
			toastr.error("An unexpected error has occurred, please contact service desk.");
		}

		var mailTo = "mailto:itservicedesk@global.local?subject=Console%20Error&body=" + encodeURIComponent(xhr.responseText);

		$(".modal-body", errorModal).append(errorParagraph);
		$(".modal-footer .btn:first", errorModal).attr("href", mailTo);

		errorModal.modal("show"); // TODO: What if a modal is already display ?
		errorModal.on("hidden", function()
		{
			$(".modal-body", errorModal).html("");
		});
	}
	else
	{
		toastr.error("A bad request error has occurred.");
	}
	
	console.log(arguments);
});

(function($, undefined)
{
	var ajaxRequests = {};

	$.ajaxLatest = function(url, options, element)
	{
		var elementRequests = element ? $(element).data("ajaxRequests") : null;
		
		$.extend(true, options || {}, { url: url });

		if (!element)
		{
			if (!ajaxRequests[url]) ajaxRequests[url] = [];
			else if (ajaxRequests[url].length > 0) ajaxRequests[url].pop().abort();
		}
		else
		{
			if (!elementRequests) elementRequests = $(element).data("ajaxRequests", {});

			if (!elementRequests[url]) elementRequests[url] = [];
			else if (elementRequests[url].length > 0) elementRequests[url].pop().abort();
		}
		
		var ajaxRequest = {
			onSuccess: options.success,
			onError: options.error,
			onDone: options.complete,
			success: function(data, status, xhr)
			{
				if (!/^abort|canceled$/i.test(status) &&
					ajaxRequest.onSuccess)
					ajaxRequest.onSuccess.apply(null, arguments);
			},
			error: function(xhr, status, error)
			{
				if (!/^abort|canceled$/i.test(status) &&
					ajaxRequest.onError)
					ajaxRequest.onError.apply(null, arguments);
			},
			complete: function(xhr, status)
			{
				if (!/^abort|canceled$/i.test(status) &&
					ajaxRequest.onDone)
					ajaxRequest.onDone.apply(null, arguments);
			}
		};

		if (!element) ajaxRequests[url].unshift($.ajax($.extend(true, {}, options, ajaxRequest))); 
		else elementRequests[url].unshift($.ajax($.extend(true, {}, options, ajaxRequest)));

		return !element ? ajaxRequests[url][0] : elementRequests[url][0];
	};
})(jQuery);

/*
	jQuery Extension Method

	Register new objects or functions and/or merge them together to provide new generic
	functionality.
*/
$.extend(
{
	/* 
		Random Guid Generator

		Very useful as this is a single page application and Id's are often required as a
		point of reference, but we cannot hard-code them due to the dynamic nature of our
		document object model.

			References;
				Guid Wiki - Version 4 (Random);
				http://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29
				
				Code Discussion;
				https://gist.github.com/jed/982883
	*/
	generateGuid: function()
	{
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c)
		{
			var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);

			return v.toString(16);
		});
	},
	/*
		Currency Formatter

		Will take a valid string, int or float value and returns a string value that has inserted
		commas to seperate thousandth digits and stripped out any decimal places.

			References;
				Thousandth seperator regular expression;
				http://jsfiddle.net/cuamurre/strur/
	*/
	formatCurrency: function(value)
	{
		value = parseFloat(value);

		return !isNaN(value)
			? value.toFixed(2).toString()
				.replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
				.replace(/(\.\d*$)/g, "")
			: "";
	}
	// TODO: See ConsoleApp.AjaxHelper
});




/* ------------------------------------------------------------------------------------------------ *\
	Knockout Extensions & Helpers
\* ------------------------------------------------------------------------------------------------ */

ko.isObservableArray = function(object)
{
	return ko.isObservable(object) && !(object.destroyAll === undefined);
};



/* ------------------------------------------------------------------------------------------------ *\
	Others
\* ------------------------------------------------------------------------------------------------ */

// TODO: Shouldn't this be "var ConsoleApp = ConsoleApp || {};"
var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

/* 
	TODO: ConsoleApp.AjaxHelper; remove or extend ?
	
	This helper currently provides no real value, but it possibly could if we investigate
	existing jQuery ajax helper methods such as load() and getJSON() and implement a similar, 
	but consistent approach (perhaps with a twist for our own benefit specific to the Console).

	See jquery-1.9.0.js line 7560 for more information.

	For example;
	$.extend(
	{
		// GET: JSON action result
		getJSON: function(url, data, onSuccess, onError, onComplete)
		{
			var response = $.get(url, data, onComplete, "json");

			// Initialise partial view ? (specific to the Console)
			// Default error handling ?
			// Toastr messages ?
			// Console logging ?
			// Re-attempt request on failure ?

			return response;
		},
		// GET: HTML action result
		getHTML: function(url, data, onSuccess, onError, onComplete)
		{
			var response = $.get(url, data, onComplete, "html");

			// etc ...
		},
		// GET: HTML action result and load into the element
		loadHTML: function(element, url, data, onSuccess, onError, onComplete)
		{
			var response = $(element).load(url, data, onComplete);

			// etc ...
		},
		// PUT: JSON request
		putJSON: function(url, data, onSuccess, onError, onComplete)
		{
			// etc ...
		},
		// POST: JSON request
		postJSON: function(url, data, onSuccess, onError, onComplete)
		{
			// etc ...
		}
		// etc ... etc ...
	});

	$.putJSON("/submission/_edit", { Id: 5, etc... });
*/
ConsoleApp.AjaxHelper = function(config)
{
	return $.ajax(
	{
		url: config.Url,
		global: false,
		type: config.VerbType,
		contentType: "application/json;charset=utf-8",
		data: config.Data,
		cache: false
	});
};

// TODO: Generic Kendo DataViz chart is a good idea, but this is not generic
// TODO: Generic Kendo DataViz sparkline would also be useful
function SetGraph(seriesList, categories)
{
	$("#divBrokerLossRatiosGraph").kendoChart(
	{
		title: { text: "Loss Ratio Per Month" },
		legend: { position: "bottom" },
		chartArea: { background: "" },
		seriesDefaults: { type: "line" },
        series: seriesList,
		valueAxis:
		{
			labels: { format: "{0}" },
			line: { visible: false },
            axisCrossingValue: -10
        },
		categoryAxis:
		{
            categories: categories, 
			majorGridLines: { visible: false }
        },
		tooltip:
		{
            visible: true,
            format: "{0}%",
            template: "#= series.name #: #= value #"
        }
    });
}

// TODO: Remove as it is not a useful function (a function for a hacked together solution)
ConsoleApp.ParseId = function(value)
{
	var values = value ? value.split(":") : [null];

	return values[0] ? $.trim(values[0]) : "";
};

ko.observableArray.fn.find = function(prop, data)
{
	return ko.utils.arrayFirst(this(), function(item)
	{
		return item[prop] === data[prop];
	});
};

//To make the observable numeric
//http://knockoutjs.com/documentation/extenders.html
ko.extenders.numeric = function(target, precision)
{
    // Create a writeable computed observable to intercept writes to our observable
	var result = ko.computed(
	{
		read: target, // Always return the original observables value
		write: function(newValue)
		{
			var current = target(),
			    roundingMultiplier = Math.pow(10, precision),
			    newValueAsNum = isNaN(newValue)
				    ? current : parseFloat(+newValue), // TODO: Parse first then isNaN (?)
			    valueToWrite = newValue == '' || newValueAsNum == ''
				    ? '' : Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;

			// Only write if it changed
			if (valueToWrite !== current)
			{
				target(valueToWrite);
			}
			// If the rounded value is the same, but a different value was written, force a notification for the current field
			else if (newValue !== current)
			{
				target.notifySubscribers(valueToWrite);
			}
		}
	});

    // Initialize with current value to make sure it is rounded appropriately
    result(target());

    return result;
};

ko.extenders.typeahead = function(target, object)
{
	var result = ko.computed(
	{
		read: target,
		write: function(value)
		{
			var current = target(),
			    roundingMultiplier = Math.pow(10, precision),
			    newValueAsNum = isNaN(newValue)
				    ? current : parseFloat(+newValue), // TODO: Parse first then isNaN (?)
			    valueToWrite = newValue == '' || newValueAsNum == ''
				    ? '' : Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;

			// Only write if it changed
			if (valueToWrite !== current)
			{
				target(valueToWrite);
			}
				// If the rounded value is the same, but a different value was written, force a notification for the current field
			else if (newValue !== current)
			{
				target.notifySubscribers(valueToWrite);
			}
		}
	});

	// Initialize with current value to make sure it is rounded appropriately
	result(target());

	return result;
};


$(".totop").hide();

$(function()
{
	$(window).scroll(function()
	{
		if ($(this).scrollTop() > 300)
		{
			$('.totop').slideDown();
		}
		else
		{
			$('.totop').slideUp();
		}
	});

	$('.totop a').click(function(e)
	{
		e.preventDefault();
		$('body,html').animate({ scrollTop: 0 }, 500);
	});

});

