using System;

namespace Validus.Core.MVC
{
	[AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
	public class HtmlPropertiesAttribute : Attribute
	{
		public string @id { get; set; }
		public string @class { get; set; }
		public string @data_bind { get; set; }
	}

	[AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
	public class SpanHtmlPropertiesAttribute : HtmlPropertiesAttribute
	{ }

	[AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
	public class LabelHtmlPropertiesAttribute : HtmlPropertiesAttribute
	{ }

	[AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
	public class InputHtmlPropertiesAttribute : HtmlPropertiesAttribute
	{
		public bool @disabled { get; set; }
		public bool @readonly { get; set; }
	}

	[AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
	public class AbbrHtmlPropertiesAttribute : HtmlPropertiesAttribute
	{
		public string @title { get; set; }
	}
}