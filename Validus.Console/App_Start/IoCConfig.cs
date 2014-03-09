using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.ServiceLocation;
using Microsoft.Practices.Unity;
using Validus.Console.BusinessLogic;
using Validus.Console.Controllers;
using Validus.Console.Data;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.Unity;
using Microsoft.Practices.EnterpriseLibrary.Logging;
using Validus.Core.HttpContext;
using Validus.Core.LogHandling;


namespace Validus.Console.App_Start
{
    public static class IoCConfig
    {
        static readonly IUnityContainer container = new UnityContainer();

        public static void RegisterIoC(HttpConfiguration config)
        {
            IServiceLocator serviceLocator = new UnityServiceLocator(container);

            EnterpriseLibraryContainer.Current = serviceLocator;
            container.AddNewExtension<EnterpriseLibraryCoreExtension>();
            container.RegisterType<ILogHandler, LogHandler>(new HttpContextLifetimeManager<LogHandler>());
            container.RegisterType<ICurrentHttpContext, CurrentHttpContext>(new HttpContextLifetimeManager<CurrentHttpContext>());

            container.RegisterType<IConsoleRepository, ConsoleRepository>(new HttpContextLifetimeManager<ConsoleRepository>());
            
            container.RegisterType<IAdminModuleManager, AdminModuleManager>(new HttpContextLifetimeManager<IAdminModuleManager>());
            
            container.RegisterType<IWebSiteModuleManager, WebSiteModuleManager>(new HttpContextLifetimeManager<IWebSiteModuleManager>());
            

            
            container.RegisterType<ITemplatesModule, TemplatesModule>(new HttpContextLifetimeManager<ITemplatesModule>());

            System.Web.Mvc.DependencyResolver.SetResolver(new Unity.Mvc3.UnityDependencyResolver(container));
            config.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);
        }
    }
}