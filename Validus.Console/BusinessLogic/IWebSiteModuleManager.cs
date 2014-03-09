using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Validus.Models;

namespace Validus.Console.BusinessLogic
{
    public interface IWebSiteModuleManager : IDisposable
    {
        //User EnsureCurrentUser();
        //void SetMyUserBoolean(String propertyName, bool value);
        List<TemplatedPage> GetTemplatedPages();
    }
}
