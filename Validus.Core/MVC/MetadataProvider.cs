using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Validus.Core.MVC
{
	public class MetadataProvider : DataAnnotationsModelMetadataProvider
	{
		protected override ModelMetadata CreateMetadata(IEnumerable<Attribute> attributes,
														Type containerType,
														Func<object> modelAccessor,
														Type modelType,
														string propertyName)
		{
			attributes = attributes as IList<Attribute> ?? attributes.ToList();

			var metadata = base.CreateMetadata(attributes, containerType, modelAccessor, modelType, propertyName);

			foreach (var propertyCollection in new HtmlPropertiesAttribute[] 
			{
				attributes.OfType<SpanHtmlPropertiesAttribute>().FirstOrDefault(),
				attributes.OfType<InputHtmlPropertiesAttribute>().FirstOrDefault(),
				attributes.OfType<LabelHtmlPropertiesAttribute>().FirstOrDefault(),
				attributes.OfType<AbbrHtmlPropertiesAttribute>().FirstOrDefault(),
			}.Where(pc => pc != null))
			{
				metadata.AdditionalValues.Add(propertyCollection.GetType().Name,
											  MetadataProvider.FetchHtmlAttributes(propertyCollection));
			}

			return metadata;
		}

		private static IDictionary<string, object> FetchHtmlAttributes(HtmlPropertiesAttribute propertyCollection)
		{
			var collection = new Dictionary<string, object>();
			var properties = propertyCollection.GetType().GetProperties();

			foreach (var property in properties.Where(p => !collection.ContainsKey(p.Name) && 
			                                               !p.Name.Equals("TypeId", StringComparison.CurrentCultureIgnoreCase)))
			{
				var propertyValue = property.GetValue(propertyCollection, null);

				if (propertyValue != null) collection.Add(property.Name, propertyValue);
			}

			return collection;
		}
	}
}