using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Validus.Console.Data;
using Validus.Core.HttpContext;
using Validus.Models;

namespace Validus.Console.BusinessLogic
{
    public class WebSiteModuleManager : IWebSiteModuleManager
    {
        private readonly ICurrentHttpContext _currentHttpContext;
        private readonly IConsoleRepository _repository;

        public WebSiteModuleManager(IConsoleRepository repository, ICurrentHttpContext currentHttpContext)
        {
            _repository = repository;
            _currentHttpContext = currentHttpContext;   
        }

        //public void SetMyUserBoolean(String propertyName, Boolean value)
        //{
        //    User u = EnsureCurrentUser();
        //    PropertyInfo prop = u.GetType().GetProperty(propertyName, BindingFlags.Public | BindingFlags.Instance);
        //    if (null != prop && prop.CanWrite)
        //    {
        //        //var val = Convert.ChangeType(value, prop.PropertyType);
        //        prop.SetValue(u, value, null);
        //    }
        //    _repository.Attach<User>(u);
        //    _repository.SaveChanges();
        //}

        //public User EnsureCurrentUser()
        //{
        //    if (_currentHttpContext == null)
        //        throw new Exception("_currentHttpContext is null");

        //    var u = (_currentHttpContext.Context.Session != null)
        //                ? _currentHttpContext.Context.Session["User"] as User
        //                : null;

        //    if (u == null)
        //    {
        //        if (_repository.Query<User>().Any(w => (w.DomainLogon.ToLower() == _currentHttpContext.CurrentUser.Identity.Name.ToLower() && w.IsActive == true)))
        //        {
        //            u = _repository.Query<User>(
                                            
        //                                    us => us.TeamMemberships.Select(tm => tm.Team),
        //                                    us => us.TeamMemberships.Select(tm => tm.Team.Links)
                                           
                                            
        //                            ).SingleOrDefault(w => (w.DomainLogon == _currentHttpContext.CurrentUser.Identity.Name && w.IsActive == true));

        //            if (u.TeamMemberships != null)
        //                u.TeamMemberships = u.TeamMemberships.Where(tm => tm.IsCurrent).ToList();
        //        }

        //        if (u == null)
        //        {
        //            u = new User { DomainLogon = _currentHttpContext.CurrentUser.Identity.Name };
        //            u = _repository.Add(u);
        //            _repository.SaveChanges();
        //        }

        //        if (_currentHttpContext.Context.Session != null)
        //            _currentHttpContext.Context.Session["User"] = u;
        //    }

        //    return u;
        //}

        public List<TemplatedPage> GetTemplatedPages()
        {
            return _repository.Query<TemplatedPage>().Where(tp => tp.IsMenuLinkVisible).ToList();
        }

        public void Dispose()
        {
            _repository.Dispose();
        }
    }
}