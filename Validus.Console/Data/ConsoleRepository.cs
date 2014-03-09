using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using Validus.Core.Data;
using Validus.Models;
using System.Data.Entity.Migrations;
using Microsoft.Practices.Unity;

namespace Validus.Console.Data
{
    public class ConsoleRepository : DataContext, IConsoleRepository
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, add the following
        // code to the Application_Start method in your Global.asax file.
        // Note: this will destroy and re-create your database with every model change.
        // 
        // System.Data.Entity.Database.SetInitializer(new System.Data.Entity.DropCreateDatabaseIfModelChanges<Validus.Console.Models.DatabaseContext>());
        [InjectionConstructor]
        public ConsoleRepository()
            : base("name=DatabaseContext")
        {
        }

        public ConsoleRepository(DbConnection connection)
            : base(connection, true)
        {

        }

        
        //public DbSet<User> Users { get; set; }
        //public DbSet<Team> Teams { get; set; }
        public DbSet<TeamMembership> TeamMemberships { get; set; }
        public DbSet<TemplatedPage> TemplatedPages { get; set; }
        public DbSet<PageTemplate> PageTemplates { get; set; }
        public DbSet<Template> Templates { get; set; }
        

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            

        }
      
    }
}