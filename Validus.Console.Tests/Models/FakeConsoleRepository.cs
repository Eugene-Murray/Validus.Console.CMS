extern alias globalVM;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using Validus.Console.Data;
using Validus.Console.Tests.Models;
using globalVM::Validus.Models;

namespace Validus.Console.Fakes
{
    public class FakeConsoleRepository : FakeRepository, IConsoleRepository
    {

        

        public IQueryable<User> Users
        {
            get { return _map.Get<User>().AsQueryable(); }
            set { _map.Use<User>(value); }
        }

        public IQueryable<Link> Links
        {
            get { return _map.Get<Link>().AsQueryable(); }
            set { _map.Use<Link>(value); }
        }
     

       
      
    }
}