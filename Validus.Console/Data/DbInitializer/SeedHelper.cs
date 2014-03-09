using System;
using System.Collections.Generic;
using System.Linq;
using Validus.Models;

namespace Validus.Console.Data.DbInitializer
{
    public static class SeedHelper
    {
        public static void SeedData(IConsoleRepository context)
        {
            var domainPrefix = global::Validus.Console.Properties.Settings.Default.DomainPrefix;

            
            
               


           
            var addUser1 = new User
                {
                    DomainLogon = domainPrefix + @"\DaviesA",
                    IsActive = true,
                    
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                }; //, FilterCOBs = energyCobs };
            ////developers


            var globalTim = new User
                {
                    DomainLogon = domainPrefix + @"\tim",
                    IsActive = true,
                   
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                };
            context.AddOrUpdate<User>(globalTim);

            var u2 = new User
                {
                    DomainLogon = domainPrefix + @"\baillief",
                    IsActive = true,
                    
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                };
            context.AddOrUpdate<User>(u2);

            var u2b = new User
                {
                    DomainLogon = @"globaldev\baillief",
                    IsActive = true,
                    
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                };
            context.AddOrUpdate<User>(u2b);


            var u6 = new User
                {
                    DomainLogon = @"TALBOTDEV\svcUKDEVTFSBuild",
                    
                    IsActive = true,
                    
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                };
           
            context.AddOrUpdate<User>(u6);
            var u5 = new User
                {
                    DomainLogon = @"GLOBALDEV\anandarr",
                    
                    IsActive = true,
                   
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                };
           
            context.AddOrUpdate<User>(u5);

            var u4 = new User
                {
                    DomainLogon = domainPrefix + @"\SheppaA",
                    
                    IsActive = true,
                   
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                };
            
            context.AddOrUpdate<User>(u4);

            var u3 = new User
                {
                    DomainLogon = domainPrefix + @"\MurrayE",
                   
                    IsActive = true,
                    
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                };

            var u = new User
                {
                    DomainLogon = domainPrefix + @"\seigelj",
                    IsActive = true,
                    
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                };
            context.AddOrUpdate<User>(u);
            

            // Energy
            var energyUser1 = new User
                {
                    DomainLogon = domainPrefix + @"\McDonaldJ",
                    IsActive = true,
                   
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                }; 
            var energyUser2 = new User
                {
                    DomainLogon = domainPrefix + @"\sarjeat",
                    IsActive = true,
                   
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                }; //, FilterCOBs = energyCobs };
            var energyUser3 = new User
                {
                    DomainLogon = domainPrefix + @"\MassieZ",
                    IsActive = true,
                    
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                }; //, FilterCOBs = energyCobs };
            var energyUser4 = new User
                {
                    DomainLogon = domainPrefix + @"\CantwellJ",
                    IsActive = true,
                   
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                }; //, FilterCOBs = energyCobs };
            var energyUser5 = new User
                {
                    DomainLogon = domainPrefix + @"\GreenM",
                    IsActive = true,
                    
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                }; //, FilterCOBs = energyCobs };
            var energyUser6 = new User
                {
                    DomainLogon = domainPrefix + @"\EwingtonJ",
                    IsActive = true,
                    
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                }; //, FilterCOBs = energyCobs };
            var energyUser7 = new User
                {
                    DomainLogon = domainPrefix + @"\ShilingS",
                    IsActive = true,
                    
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                }; //, FilterCOBs = energyCobs };
            var energyUser8 = new User
                {
                    DomainLogon = domainPrefix + @"\GarrettJ",
                    IsActive = true,
                   
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                }; //, FilterCOBs = energyCobs };
            var energyUser9 = new User
                {
                    DomainLogon = domainPrefix + @"\StoopE",
                    IsActive = true,
                    
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                }; //, FilterCOBs = energyCobs };
            var energyUser10 = new User
                {
                    DomainLogon = domainPrefix + @"\KeoganA",
                   
                    IsActive = true,
                   
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                }; //, FilterCOBs = energyCobs };
            var energyUser11 = new User
                {
                    DomainLogon = domainPrefix + @"\ShawI",
                   
                    IsActive = true,
                   
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                }; //, FilterCOBs = energyCobs };
            var energyUser12 = new User
                {
                    DomainLogon = domainPrefix + @"\IsmailR",
                   
                    IsActive = true,
                   
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                }; //, FilterCOBs = energyCobs };
            var energyUser13 = new User
                {
                    DomainLogon = domainPrefix + @"\SibleyA",
                   
                    IsActive = true,
                   
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                }; //, FilterCOBs = energyCobs };
            var energyUser14 = new User
                {
                    DomainLogon = domainPrefix + @"\DaviesK",
                   
                    IsActive = true,
                   
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                }; //, FilterCOBs = energyCobs };
            var energyUser15 = new User
                {
                    DomainLogon = domainPrefix + @"\orsoc",
                   
                    IsActive = true,
                  
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                }; //, FilterCOBs = energyCobs };
            var energyUser16 = new User
                {
                    DomainLogon = domainPrefix + @"\dempsef",
                  
                    IsActive = true,
                 
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                }; //, FilterCOBs = energyCobs };


            var energyTeamUsersList = new List<User>
                {
                    energyUser1,
                    energyUser2,
                    energyUser3,
                    energyUser4,
                    energyUser5,
                    energyUser6,
                    energyUser7,
                    energyUser8,
                    energyUser9,
                    energyUser10,
                    energyUser11,
                    energyUser12,
                    energyUser13,
                    energyUser14,
                    energyUser15,
                    energyUser16
                };

            // TeamList and Link List
            var linkList = CreateLinksList();

            var teamList = CreateTeamList();

            teamList[0].Links = new List<Link>();
            foreach (var link in linkList.GetRange(0, 3))
            {
                teamList[0].Links.Add(link);
            }

            teamList[1].Links = new List<Link>();
            foreach (var link in linkList)
            {
                teamList[1].Links.Add(link);
            }
            
           
            

           

            var energyTeamMemberships =
                energyTeamUsersList.Select(
                    energyTeamUser =>
                    new TeamMembership
                        {
                            PrimaryTeamMembership = true,
                            User = energyTeamUser,
                            Team = teamList[1],
                            IsCurrent = true,
                            StartDate = DateTime.Now,
                            EndDate = null,
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        }).ToList();
            energyTeamMemberships.Add(new TeamMembership
                {
                    PrimaryTeamMembership = false,
                    Team = teamList[1],
                    User = u5,
                    StartDate = DateTime.Now,
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                });

            var teamMemberships = new List<TeamMembership>
                {
                    new TeamMembership
                        {
                            User = u3,
                            Team = teamList[0],
                            IsCurrent = true,
                            StartDate = DateTime.Now,
                            EndDate = DateTime.Now.AddYears(4),
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                };

            var memb1 = new TeamMembership
                {
                    PrimaryTeamMembership = true,
                    Team = teamList[0],
                    User = u,
                    StartDate = DateTime.Now,
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                };
            var memb3 = new TeamMembership
                {
                    PrimaryTeamMembership = true,
                    Team = teamList[0],
                    User = u4,
                    StartDate = DateTime.Now,
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                };
            var memb2 = new TeamMembership
                {
                    PrimaryTeamMembership = true,
                    Team = teamList[0],
                    User = u2,
                    StartDate = DateTime.Now,
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                };
            var memb5 = new TeamMembership
                {
                    PrimaryTeamMembership = true,
                    Team = teamList[0],
                    User = u5,
                    StartDate = DateTime.Now,
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                };
            var memb6 = new TeamMembership
                {
                    PrimaryTeamMembership = true,
                    Team = teamList[0],
                    User = u6,
                    StartDate = DateTime.Now,
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                };
            var memb4 = new TeamMembership
                {
                    PrimaryTeamMembership = true,
                    Team = teamList[0],
                    User = globalTim,
                    StartDate = DateTime.Now,
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                };

           

            teamList[0].Memberships = new List<TeamMembership> {memb1, memb2, memb4, memb3, memb5, memb6};

            foreach (var teamM in teamMemberships)
            {
                teamList[0].Memberships.Add(teamM);
            }

            teamList[1].Memberships = new List<TeamMembership>();
            foreach (var energyTeamMembership in energyTeamMemberships)
            {
                teamList[1].Memberships.Add(energyTeamMembership);
            }

            foreach (var team in teamList)
            {
                context.AddOrUpdate<Team>(team);
            }

            var templates = CreateTemplates();
            foreach (var template in templates)
            {
                context.Add<Template>(template);
            }

            var templatedPages = CreateTemplatedPages();
            foreach (var siteSection in templatedPages)
            {
                context.Add<TemplatedPage>(siteSection);
            }

            var pageTemplates = CreatePageTemplates(teamList, templates, templatedPages);
            foreach (var pageTemplate in pageTemplates)
            {
                context.Add<PageTemplate>(pageTemplate);
            }

        }

       
        

       

        

        private static List<Link> CreateLinksList()
        {
            return new List<Link>
                {
                    new Link
                        {
                            Url = "http://docs.talbotuw.com/default.aspx",
                            Title = "DMS",
                            Category = "Doc Management",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new Link
                        {
                            Url = "https://acord.validusholdings.com/MMT/MessageSummary.aspx",
                            Title = "MMT - ebusiness",
                            Category = "ebusiness",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new Link
                        {
                            Url = "https://www.ri3k.com/marketplace/login/index.html",
                            Title = "MMT - Qatarlyst",
                            Category = "Qatarlyst",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new Link
                        {
                            Url = "http://intranet.validusholdings.com/BI/SitePages/Regular%20Talbot%20Reports.aspx",
                            Title = "Weekly management reports",
                            Category = "Reports",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new Link
                        {
                            Url = "http://ireport:8700/talbot/getfolderitems.do?folder=/UW/Monthly%20UW%20Figures",
                            Title = "Class summaries & triangles",
                            Category = "Reports",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new Link
                        {
                            Url =
                                "https://www.lloydswordings.com/lma/auth/login.do?req_url=https://www.lloydswordings.com/lma/app/start.do",
                            Title = "Market wordings database - Info",
                            Category = "Information",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new Link
                        {
                            Url = "http://apps.talbotuw.com/sites/workflow/pages/underwritingworkflow.aspx",
                            Title = "Market wordings database - Workflow",
                            Category = "Workflow",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new Link
                        {
                            Url = "http://www.lloyds.com/The-Market/Tools-and-Resources/Tools-E-Services/Crystal",
                            Title = "Crystal - Compliance Tools",
                            Category = "Compliance Tools",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new Link
                        {
                            Url =
                                "http://uktrms01.talbotuw.com/Wiki/EM_Wiki/Aggregate_Reports/Summary/ExposureDashboard.html",
                            Title = "WOL/Terror hotspot report",
                            Category = "Reports",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        }

                };
        }

        private static List<Team> CreateTeamList()
        {
           

            return new List<Team>
                {
                    new Team
                        {
                            Title = "Developers",
                           
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                            
                        },
                    new Team
                        {
                            Title = "Energy",
                           
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                           
                        },
                    new Team
                        {
                            Title = "Political Violence",
                            
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                           
                        },
                    new Team
                        {
                            Title = "Financial Institutions",
                           
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                            
                        },
                    new Team
                        {
                            Title = "Cargo",
                           
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                            
                        },
                    new Team
                        {
                            Title = "Hull&Marine",
                            
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                           
                        },
                    new Team
                        {
                            Title = "Marine&Energy",
                           
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                            
                        },
                    new Team
                        {
                            Title = "Construction",
                            
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                            
                        },
                    new Team
                        {
                            Title = "Political Risk",
                            
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                            
                        },
                    new Team
                        {
                            Title = "Accident & Health",
                            
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                            
                        },
                    new Team
                        {
                            Title = "Contingency",
                            
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                            
                        },
                    new Team
                        {
                            Title = "Crisis Management",
                           
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                           
                        },
                };
        }

        private static List<Template> CreateTemplates()
        {
            return new List<Template>
                {
                    new Template
                        {
                            Title = "Default Home Page Template",
                            Url = "/Home/_DefaultHomeTemplate",
                            IsPageStructureTemplate = true,
                            AfterRenderDomFunction = "",
                            TemplatePictureUrl = "",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new Template
                        {
                            Title = "1 Section Template",
                            Url = "/Templates/_1SectionTemplate",
                            IsPageStructureTemplate = true,
                            AfterRenderDomFunction = "",
                            TemplatePictureUrl = "",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new Template
                        {
                            Title = "2 Section Template",
                            Url = "/Templates/_2SectionTemplate",
                            IsPageStructureTemplate = true,
                            AfterRenderDomFunction = "",
                            TemplatePictureUrl = "",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new Template
                        {
                            Title = "4 Section Template",
                            Url = "/Templates/_4SectionTemplate",
                            IsPageStructureTemplate = true,
                            AfterRenderDomFunction = "",
                            TemplatePictureUrl = "",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new Template
                        {
                            Title = "5 Section Template",
                            Url = "/Templates/_5SectionTemplate",
                            IsPageStructureTemplate = true,
                            AfterRenderDomFunction = "",
                            TemplatePictureUrl = "",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new Template
                        {
                            Title = "8 Section Template",
                            Url = "/Templates/_8SectionTemplate",
                            IsPageStructureTemplate = true,
                            AfterRenderDomFunction = "",
                            TemplatePictureUrl = "",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },

                    new Template
                        {
                            Title = "Search",
                            Url = "/Home/_Search",
                            IsPageStructureTemplate = false,
                            AfterRenderDomFunction = "Setup_Search()",
                            TemplatePictureUrl = "",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new Template
                        {
                            Title = "Workflow Tasks",
                            Url = "/WorkItem/_WorkflowTasks",
                            IsPageStructureTemplate = false,
                            AfterRenderDomFunction = "Setup_WorkFlowTable()",
                            TemplatePictureUrl = "",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new Template
                        {
                            Title = "Renewals",
                            Url = "/Policy/_Renewals",
                            IsPageStructureTemplate = false,
                            AfterRenderDomFunction = "Setup_RenewalsTable()",
                            TemplatePictureUrl = "",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new Template
                        {
                            Title = "Recent Quotes",
                            Url = "/Submission/_RecentQuotes",
                            IsPageStructureTemplate = false,
                            AfterRenderDomFunction = "Setup_RecentSubmissionsTable()",
                            TemplatePictureUrl = "",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new Template
                        {
                            Title = "Search Results",
                            Url = "/Home/_SearchResults",
                            IsPageStructureTemplate = false,
                            AfterRenderDomFunction = "",
                            TemplatePictureUrl = "",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new Template
                        {
                            Title = "Preview",
                            Url = "/Home/_Preview",
                            IsPageStructureTemplate = false,
                            AfterRenderDomFunction = "",
                            TemplatePictureUrl = "",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new Template
                        {
                            Title = "Holding Template",
                            Url = "holding-template",
                            IsPageStructureTemplate = false,
                            AfterRenderDomFunction = "",
                            TemplatePictureUrl = "",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new Template
                        {
                            Title = "Pie Chart",
                            Url = "/DataViz/PieChart",
                            IsPageStructureTemplate = false,
                            AfterRenderDomFunction = "",
                            TemplatePictureUrl = "",
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        }

                };
        }

        private static List<TemplatedPage> CreateTemplatedPages()
        {
            return new List<TemplatedPage>
                {
                    new TemplatedPage
                        {
                            PageTitle = "Home",
                            ViewModel = "vmHome",
                            IsMenuLinkVisible = false,
                            IsSeparateBrowserTab = false,
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new TemplatedPage
                        {
                            PageTitle = "Data Visualization",
                            ViewModel = "vmDataViz",
                            IsMenuLinkVisible = false,
                            IsSeparateBrowserTab = false,
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        },
                    new TemplatedPage
                        {
                            PageTitle = "WorkFlow",
                            ViewModel = "vmWorkFlow",
                            IsMenuLinkVisible = true,
                            IsSeparateBrowserTab = false,
                            CreatedBy = "InitialSetup",
                            CreatedOn = DateTime.Now,
                            ModifiedBy = "InitialSetup",
                            ModifiedOn = DateTime.Now
                        }
                };
        }

        private static List<PageTemplate> CreatePageTemplates(List<Team> teams, List<Template> allTemplates,
                                                              List<TemplatedPage> templatedPages)
        {
            var sectionLevelTemplates = new List<Template>(allTemplates);
            sectionLevelTemplates.RemoveRange(0, 4);

            var pageTemplates = new List<PageTemplate>();

            foreach (var team in teams)
            {
                // Top Level Page Structure Templates

                // Home 
                pageTemplates.Add(new PageTemplate
                    {
                        TemplatedPage = templatedPages.FirstOrDefault(s => s.PageTitle == "Home"), // Home Page
                        Template = allTemplates.FirstOrDefault(t => t.Title == "Default Home Page Template"),
                        // Default Home Page Template 
                        PageSectionId = 0,
                        Team = team,
                        IsVisible = true,
                        IsReadOnly = false,
                        CreatedBy = "InitialSetup",
                        CreatedOn = DateTime.Now,
                        ModifiedBy = "InitialSetup",
                        ModifiedOn = DateTime.Now
                    });

                // Data Viz
                pageTemplates.Add(new PageTemplate
                    {
                        TemplatedPage = templatedPages.FirstOrDefault(s => s.PageTitle == "Data Visualization"),
                        // Data Viz
                        Template = allTemplates.FirstOrDefault(t => t.Title == "4 Section Template"),
                        // 4 Section Template
                        PageSectionId = 0,
                        Team = team,
                        IsVisible = true,
                        IsReadOnly = false,
                        CreatedBy = "InitialSetup",
                        CreatedOn = DateTime.Now,
                        ModifiedBy = "InitialSetup",
                        ModifiedOn = DateTime.Now
                    });

                // WorkFlow
                pageTemplates.Add(new PageTemplate
                    {
                        TemplatedPage = templatedPages.FirstOrDefault(s => s.PageTitle == "WorkFlow"), // Data Viz
                        Template = allTemplates.FirstOrDefault(t => t.Title == "1 Section Template"),
                        // 1 Section Template
                        PageSectionId = 0,
                        Team = team,
                        IsVisible = true,
                        IsReadOnly = false,
                        CreatedBy = "InitialSetup",
                        CreatedOn = DateTime.Now,
                        ModifiedBy = "InitialSetup",
                        ModifiedOn = DateTime.Now
                    });

                // Page Section Level Templates inside of the Top level page structure templates

                // Home Page 
                SetSectionTemplates("Home", allTemplates, templatedPages, pageTemplates, team);

                // Data Viz
                SetSectionTemplates("Data Visualization", allTemplates, templatedPages, pageTemplates, team);

                // WorkFlow
                SetSectionTemplates("WorkFlow", allTemplates, templatedPages, pageTemplates, team);

            }

            return pageTemplates;
        }

        private static void SetSectionTemplates(string pageTitle, List<Template> allTemplates,
                                                List<TemplatedPage> templatedPages, List<PageTemplate> pageTemplates,
                                                Team team)
        {
            // - Section 1 
            pageTemplates.Add(new PageTemplate
                {
                    TemplatedPage = templatedPages.FirstOrDefault(s => s.PageTitle == pageTitle),
                    Template = allTemplates.FirstOrDefault(t => t.Title == "Holding Template"),
                    PageSectionId = 1,
                    Team = team,
                    IsVisible = true,
                    IsReadOnly = false,
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                });

            // Section 2 
            pageTemplates.Add(new PageTemplate
                {
                    TemplatedPage = templatedPages.FirstOrDefault(s => s.PageTitle == pageTitle),
                    Template = allTemplates.FirstOrDefault(t => t.Title == "Holding Template"),
                    PageSectionId = 2,
                    Team = team,
                    IsVisible = true,
                    IsReadOnly = false,
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                });

            // Section 3
            pageTemplates.Add(new PageTemplate
                {
                    TemplatedPage = templatedPages.FirstOrDefault(s => s.PageTitle == pageTitle),
                    Template = allTemplates.FirstOrDefault(t => t.Title == "Holding Template"),
                    PageSectionId = 3,
                    Team = team,
                    IsVisible = true,
                    IsReadOnly = false,
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                });

            // Section 4
            pageTemplates.Add(new PageTemplate
                {
                    TemplatedPage = templatedPages.FirstOrDefault(s => s.PageTitle == pageTitle),
                    Template = allTemplates.FirstOrDefault(t => t.Title == "Holding Template"),
                    PageSectionId = 4,
                    Team = team,
                    IsVisible = true,
                    IsReadOnly = false,
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                });

            // Section 5
            pageTemplates.Add(new PageTemplate
                {
                    TemplatedPage = templatedPages.FirstOrDefault(s => s.PageTitle == pageTitle),
                    Template = allTemplates.FirstOrDefault(t => t.Title == "Holding Template"),
                    PageSectionId = 5,
                    Team = team,
                    IsVisible = true,
                    IsReadOnly = false,
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                });

            // Section 6
            pageTemplates.Add(new PageTemplate
                {
                    TemplatedPage = templatedPages.FirstOrDefault(s => s.PageTitle == pageTitle),
                    Template = allTemplates.FirstOrDefault(t => t.Title == "Holding Template"),
                    PageSectionId = 6,
                    Team = team,
                    IsVisible = true,
                    IsReadOnly = false,
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                });

            // Section 7
            pageTemplates.Add(new PageTemplate
                {
                    TemplatedPage = templatedPages.FirstOrDefault(s => s.PageTitle == pageTitle),
                    Template = allTemplates.FirstOrDefault(t => t.Title == "Holding Template"),
                    PageSectionId = 7,
                    Team = team,
                    IsVisible = true,
                    IsReadOnly = false,
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                });

            // Section 8
            pageTemplates.Add(new PageTemplate
                {
                    TemplatedPage = templatedPages.FirstOrDefault(s => s.PageTitle == pageTitle),
                    Template = allTemplates.FirstOrDefault(t => t.Title == "Holding Template"),
                    PageSectionId = 8,
                    Team = team,
                    IsVisible = true,
                    IsReadOnly = false,
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now
                });
        }

    }
}