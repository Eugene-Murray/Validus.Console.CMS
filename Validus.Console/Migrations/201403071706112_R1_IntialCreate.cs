namespace Validus.Console.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class R1_IntialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DomainLogon = c.String(nullable: false, maxLength: 256),
                        IsActive = c.Boolean(nullable: false),
                        CreatedOn = c.DateTime(),
                        ModifiedOn = c.DateTime(),
                        CreatedBy = c.String(maxLength: 256),
                        ModifiedBy = c.String(maxLength: 256),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TeamMemberships",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TeamId = c.Int(nullable: false),
                        UserId = c.Int(nullable: false),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(),
                        PrimaryTeamMembership = c.Boolean(nullable: false),
                        IsCurrent = c.Boolean(nullable: false),
                        CreatedOn = c.DateTime(),
                        ModifiedOn = c.DateTime(),
                        CreatedBy = c.String(maxLength: 256),
                        ModifiedBy = c.String(maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Teams", t => t.TeamId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.TeamId)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Teams",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false, maxLength: 256),
                        CreatedOn = c.DateTime(),
                        ModifiedOn = c.DateTime(),
                        CreatedBy = c.String(maxLength: 256),
                        ModifiedBy = c.String(maxLength: 256),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Links",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Url = c.String(nullable: false, maxLength: 2048),
                        Title = c.String(nullable: false, maxLength: 256),
                        Category = c.String(maxLength: 256),
                        CreatedOn = c.DateTime(),
                        ModifiedOn = c.DateTime(),
                        CreatedBy = c.String(maxLength: 256),
                        ModifiedBy = c.String(maxLength: 256),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TemplatedPages",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ViewModel = c.String(nullable: false),
                        PageTitle = c.String(nullable: false),
                        IsMenuLinkVisible = c.Boolean(nullable: false),
                        IsSeparateBrowserTab = c.Boolean(nullable: false),
                        CreatedOn = c.DateTime(),
                        ModifiedOn = c.DateTime(),
                        CreatedBy = c.String(maxLength: 256),
                        ModifiedBy = c.String(maxLength: 256),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.PageTemplates",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TemplateId = c.Int(nullable: false),
                        PageSectionId = c.Int(nullable: false),
                        IsVisible = c.Boolean(nullable: false),
                        IsReadOnly = c.Boolean(nullable: false),
                        TeamId = c.Int(nullable: false),
                        TemplatedPageId = c.Int(nullable: false),
                        CreatedOn = c.DateTime(),
                        ModifiedOn = c.DateTime(),
                        CreatedBy = c.String(maxLength: 256),
                        ModifiedBy = c.String(maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Templates", t => t.TemplateId, cascadeDelete: true)
                .ForeignKey("dbo.Teams", t => t.TeamId, cascadeDelete: true)
                .ForeignKey("dbo.TemplatedPages", t => t.TemplatedPageId, cascadeDelete: true)
                .Index(t => t.TemplateId)
                .Index(t => t.TeamId)
                .Index(t => t.TemplatedPageId);
            
            CreateTable(
                "dbo.Templates",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false),
                        Url = c.String(nullable: false),
                        IsPageStructureTemplate = c.Boolean(nullable: false),
                        AfterRenderDomFunction = c.String(),
                        TemplatePictureUrl = c.String(),
                        CreatedOn = c.DateTime(),
                        ModifiedOn = c.DateTime(),
                        CreatedBy = c.String(maxLength: 256),
                        ModifiedBy = c.String(maxLength: 256),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.LinkTeams",
                c => new
                    {
                        Link_Id = c.Int(nullable: false),
                        Team_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Link_Id, t.Team_Id })
                .ForeignKey("dbo.Links", t => t.Link_Id, cascadeDelete: true)
                .ForeignKey("dbo.Teams", t => t.Team_Id, cascadeDelete: true)
                .Index(t => t.Link_Id)
                .Index(t => t.Team_Id);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.LinkTeams", new[] { "Team_Id" });
            DropIndex("dbo.LinkTeams", new[] { "Link_Id" });
            DropIndex("dbo.PageTemplates", new[] { "TemplatedPageId" });
            DropIndex("dbo.PageTemplates", new[] { "TeamId" });
            DropIndex("dbo.PageTemplates", new[] { "TemplateId" });
            DropIndex("dbo.TeamMemberships", new[] { "UserId" });
            DropIndex("dbo.TeamMemberships", new[] { "TeamId" });
            DropForeignKey("dbo.LinkTeams", "Team_Id", "dbo.Teams");
            DropForeignKey("dbo.LinkTeams", "Link_Id", "dbo.Links");
            DropForeignKey("dbo.PageTemplates", "TemplatedPageId", "dbo.TemplatedPages");
            DropForeignKey("dbo.PageTemplates", "TeamId", "dbo.Teams");
            DropForeignKey("dbo.PageTemplates", "TemplateId", "dbo.Templates");
            DropForeignKey("dbo.TeamMemberships", "UserId", "dbo.Users");
            DropForeignKey("dbo.TeamMemberships", "TeamId", "dbo.Teams");
            DropTable("dbo.LinkTeams");
            DropTable("dbo.Templates");
            DropTable("dbo.PageTemplates");
            DropTable("dbo.TemplatedPages");
            DropTable("dbo.Links");
            DropTable("dbo.Teams");
            DropTable("dbo.TeamMemberships");
            DropTable("dbo.Users");
        }
    }
}
