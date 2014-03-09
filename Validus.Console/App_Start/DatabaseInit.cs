using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using Validus.Console.Data;
using Validus.Core.Data;
using Validus.Core.LogHandling;
using Validus.Models;

namespace Validus.Console.Init
{
	public static class DatabaseInit
	{
		private static readonly ILogHandler _LogHandler = new LogHandler();

		public static void SyncSemiStaticData()
		{
            //DatabaseInit._LogHandler.WriteLog("SyncSemiStaticData()", LogSeverity.Information, LogCategory.DataAccess);

            //using (var httpHandler = new HttpClientHandler())
            //{
            //    httpHandler.UseDefaultCredentials = true;

            //    using (var httpClient = new HttpClient(httpHandler))
            //    {
            //        httpClient.BaseAddress = new Uri(Properties.Settings.Default.ServicesHostUrl);
            //        httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/xml"));

            //        using (var consoleRepository = new ConsoleRepository())
            //        {
            //            DatabaseInit.SyncBrokers(httpClient, consoleRepository);
            //            DatabaseInit.SyncNonLondonBrokers(httpClient, consoleRepository);
            //            DatabaseInit.SyncCOBs(httpClient, consoleRepository);
            //            DatabaseInit.SyncOffices(httpClient, consoleRepository);
            //            DatabaseInit.SyncUnderwriters(httpClient, consoleRepository);
            //            DatabaseInit.SyncRiskCodes(httpClient, consoleRepository);

            //            consoleRepository.SaveChanges();
            //        }
            //    }
            //}
		}


	}
}