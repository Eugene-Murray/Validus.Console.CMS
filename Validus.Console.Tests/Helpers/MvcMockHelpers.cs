﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Text.RegularExpressions;
using System.IO;
using System.Collections.Specialized;
using System.Web.Mvc;
using System.Web.Routing;
using Moq;
using System.Xml;

namespace Validus.Console.Tests.Helpers
{
	

	public static class MvcMockHelpers
    {
        public static string CreateQuoteResponseXml()
        {
            var doc = new XmlDocument();
            doc.Load(File.Exists(@"TestXml\CreateQuoteResponse.xml")
                         ? @"TestXml\CreateQuoteResponse.xml"
                         : "CreateQuoteResponse.xml");
            return doc.InnerXml;
        }

        public static string CreateGetReferenceResponseXml()
        {
            var doc = new XmlDocument();
            doc.Load(File.Exists(@"TestXml\GetReferenceResponse.xml")
                         ? @"TestXml\GetReferenceResponse.xml"
                         : "GetReferenceResponse.xml");
            return doc.InnerXml;
        }

        public static HttpContext BasicHttpContext()
        {
            var mockSession = new Mock<HttpSessionStateBase>();

            var httpRequest = new HttpRequest("", "http://mySomething/", "");
            var stringWriter = new StringWriter();
            var httpResponse = new HttpResponse(stringWriter);

            return new HttpContext(httpRequest, httpResponse);
        }

        public static HttpContextBase FakeHttpContext()
        {
            var context = new Mock<HttpContextBase>();
            var httpApplication = new Mock<HttpApplication>();
            var request = new Mock<HttpRequestBase>();
            var response = new Mock<HttpResponseBase>();
            var session = new Mock<HttpSessionStateBase>();
            var server = new Mock<HttpServerUtilityBase>();

            context.Expect(ctx => ctx.Request).Returns(request.Object);
            context.Expect(ctx => ctx.Response).Returns(response.Object);
            context.Expect(ctx => ctx.Session).Returns(session.Object);
            context.Expect(ctx => ctx.Server).Returns(server.Object);

            return context.Object;
        }

        private static long _sessionValue = -1;
        public static HttpContextBase FakeHttpContextWithSession()
        {
            var httpContextBase = new Mock<HttpContextBase>();
            var session = new Mock<HttpSessionStateBase>();
            httpContextBase.Setup(x => x.Session).Returns(session.Object);
            httpContextBase.SetupGet(x => x.Session["id"]).Returns(_sessionValue);
            httpContextBase.SetupSet(x => x.Session["id"] = It.IsAny<long>());
            httpContextBase.SetupSet(x => x.Session["id"] = It.IsAny<long>())
                .Callback((string name, object val) =>
                {
                   _sessionValue = (long)val;
                   httpContextBase.SetupGet(x => x.Session["id"]).Returns(_sessionValue);
                });

            return httpContextBase.Object;
        }

        public static HttpContextBase FakeHttpContext(string url)
        {
            HttpContextBase context = FakeHttpContext();
            context.Request.SetupRequestUrl(url);
            return context;
        }

        public static void SetFakeControllerContext(this Controller controller)
        {
            var httpContext = FakeHttpContext();
            ControllerContext context = new ControllerContext(new RequestContext(httpContext, new RouteData()), controller);
            controller.ControllerContext = context;
        }

        static string GetUrlFileName(string url)
        {
            if (url.Contains("?"))
                return url.Substring(0, url.IndexOf("?"));
            else
                return url;
        }

        static NameValueCollection GetQueryStringParameters(string url)
        {
            if (url.Contains("?"))
            {
                NameValueCollection parameters = new NameValueCollection();

                string[] parts = url.Split("?".ToCharArray());
                string[] keys = parts[1].Split("&".ToCharArray());

                foreach (string key in keys)
                {
                    string[] part = key.Split("=".ToCharArray());
                    parameters.Add(part[0], part[1]);
                }

                return parameters;
            }
            else
            {
                return null;
            }
        }

        public static void SetHttpMethodResult(this HttpRequestBase request, string httpMethod)
        {
            Mock.Get(request)
                .Expect(req => req.HttpMethod)
                .Returns(httpMethod);
        }

        public static void SetupRequestUrl(this HttpRequestBase request, string url)
        {
            if (url == null)
                throw new ArgumentNullException("url");

            if (!url.StartsWith("~/"))
                throw new ArgumentException("Sorry, we expect a virtual url starting with \"~/\".");

            var mock = Mock.Get(request);

            mock.Expect(req => req.QueryString)
                .Returns(GetQueryStringParameters(url));
            mock.Expect(req => req.AppRelativeCurrentExecutionFilePath)
                .Returns(GetUrlFileName(url));
            mock.Expect(req => req.PathInfo)
                .Returns(String.Empty);
        }
    }
}