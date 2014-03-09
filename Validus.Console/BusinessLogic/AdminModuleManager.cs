using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Linq;
using System.Reflection;
using System.Transactions;
using System.Web;
using System.Xml;
using RazorEngine;
using Validus.Console.Data;
using Validus.Console.DTO;
using Validus.Core.HttpContext;
using Validus.Core.LogHandling;
using Validus.Models;

namespace Validus.Console.BusinessLogic
{
    public class AdminModuleManager : IAdminModuleManager
    {
        private readonly IConsoleRepository ConsoleRepository;
        private readonly ILogHandler LogHandler;
        private readonly ICurrentHttpContext CurrentHttpContext;
        private readonly IWebSiteModuleManager WebSiteModuleManager;

        public AdminModuleManager(IConsoleRepository consoleRepository, ILogHandler logHandler,
                                  ICurrentHttpContext currentHttpContext, IWebSiteModuleManager webSiteModuleManager)
        {
            this.LogHandler = logHandler;
            this.ConsoleRepository = consoleRepository;
            this.CurrentHttpContext = currentHttpContext;
            this.WebSiteModuleManager = webSiteModuleManager;

        }

        #region User Team Link

        public Team GetTeam(int? teamId)
        {
            if (teamId == null) // TODO: Not needed if parameter is not nullable ?
                throw new Exception("teamId is empty"); // TODO: Throw new ArgumentNullException(teamId)

            using (ConsoleRepository)
            {
                return ConsoleRepository.Query<Team>().FirstOrDefault(t => t.Id == teamId.Value);
            }
        }

        public List<TeamDto> GetTeamsFullData()
        {
            var teamList = new List<TeamDto>();
            using (ConsoleRepository)
            {
                var teams =
                    ConsoleRepository.Query<Team>(t => t.Memberships.Select(mu => mu.User), 
                                                     t => t.Links).OrderBy(t=>t.Title).ToList();



                teams.ForEach(team =>
                    {
                        var users = new List<BasicUserDto>();
                        var links = new List<LinkDto>();
                        
                        var allUsers = new List<BasicUserDto>();
                        var allLinks = new List<LinkDto>();
                        

                        

                        if (team.Memberships != null)
                        {
                            users.AddRange(team.Memberships.Where(m => m.IsCurrent).ToList().Select(mem => new BasicUserDto {Id = mem.User.Id, DomainLogon = mem.User.DomainLogon}));
                        }

                        if (team.Links != null)
                        {
                            links.AddRange(team.Links.ToList().Select(link => new LinkDto
                                {
                                    Id = link.Id, Category = link.Category, Url = link.Url, Title = link.Title
                                }));
                        }

                        

                        // Get the List values not already added to the team
                        var currentUsers = team.Memberships.Where(m => m.IsCurrent).Select(m => m.User).ToList();
                        allUsers = ConsoleRepository.Query<User>().ToList().Except(currentUsers).Select(u => new BasicUserDto { Id = u.Id, DomainLogon = u.DomainLogon }).ToList();

                        allLinks = ConsoleRepository.Query<Link>().ToList().Except(team.Links.ToList()).Select(l => new LinkDto { Id = l.Id, Category = l.Category, Url = l.Url, Title = l.Title }).ToList();

                       

                        teamList.Add(new TeamDto
                            {
                                Id = team.Id,
                                Title = team.Title,
                                
                                Users = users,
                                Links = links,
                                
                                AllLinks = allLinks,
                                
                                AllUsers = allUsers
                            });
                    });

            }
            return teamList;
        }

        public List<User> GetUsers()
        {
            using (ConsoleRepository)
            {
                return ConsoleRepository.Query<User>().ToList();
            }
        }

        public List<string> GetUsersInTeam(int? teamId)
        {
            using (ConsoleRepository)
            {
                var teamMemberships =
                    ConsoleRepository.Query<TeamMembership>().Where(tm => tm.TeamId == teamId && tm.IsCurrent);

                return teamMemberships.Select(tm => tm.User.DomainLogon).OrderBy(dl=>dl).ToList();
            }
        }

        //public TeamDto CreateTeam(TeamDto teamDto)
        //{
        //    using (ConsoleRepository)
        //    {
        //        var existingTeam = ConsoleRepository.Query<Team>().FirstOrDefault(t => t.Title == teamDto.Title);

        //        if (existingTeam != null)
        //            throw new ArgumentException("Team already exists, please use another Title.");

        //        var submissionType = SetSubmissionType(teamDto);

        //        var team = new Team
        //            {
        //                Title = teamDto.Title,
                        
        //            };

        //        if (teamDto.Links != null)
        //        {
        //            var linkList = new List<Link>();
        //            foreach (var newLink in teamDto.Links)
        //            {
        //                var link = ConsoleRepository.Query<Link>().FirstOrDefault(l => l.Id == newLink.Id);
        //                linkList.Add(link);
        //            }
        //            team.Links = linkList;
        //        }

                

        //        if (teamDto.Users != null)
        //        {
        //            var teamMembershipList = new List<TeamMembership>();
        //            var userList = new List<User>();
        //            foreach (var newUser in teamDto.Users)
        //            {
        //                var user = ConsoleRepository.Query<User>().FirstOrDefault(u => u.Id == newUser.Id);
        //                userList.Add(user);
        //                teamMembershipList.Add(new TeamMembership
        //                    {
        //                        User = user,
        //                        Team = team,
        //                        StartDate = DateTime.Now,
        //                        EndDate = null
        //                    });
        //            }
        //            team.Memberships = teamMembershipList;

        //            // Add Team FilterCOBs and FilterOffices to added users
        //            foreach (var user in userList)
        //            {
        //                AddTeamFilters(teamMembershipList.Select(tm => tm.TeamId).Distinct(), user, team);
        //            }
        //        }

        //        ConsoleRepository.Add<Team>(team);
        //        ConsoleRepository.SaveChanges();


        //        // Add Page Templates for new Team
        //        var structureTemplate = ConsoleRepository.Query<Template>().FirstOrDefault(t => t.Title.Equals("8 Section Template"));
        //        var holdingTemplate = ConsoleRepository.Query<Template>().FirstOrDefault(t => t.Title.Equals("Holding Template"));

        //        foreach (var templatedPage in ConsoleRepository.Query<TemplatedPage>().ToList())
        //        {
        //            TemplatesModule.SetPageTemplates(ConsoleRepository, templatedPage, structureTemplate, holdingTemplate, team);
        //        }
        //        ConsoleRepository.SaveChanges();

        //        teamDto.Id = team.Id;
        //        return teamDto;
        //    }
        //}

        //public TeamDto EditTeam(TeamDto teamDto)
        //{
        //    using (ConsoleRepository)
        //    {
        //        var team =
        //            ConsoleRepository.Query<Team>(t => t.Links).FirstOrDefault(t => t.Id == teamDto.Id);

        //        if (team == null)
        //            throw new Exception("Team to Edit does not exist"); // TODO: throw new NullReferenceException(team);

        //        var submissionType = SetSubmissionType(teamDto);

        //        ConsoleRepository.Attach<Team>(team);

        //        team.Title = teamDto.Title;
                

        //        if (teamDto.Links != null)
        //        {
        //            if (team.Links != null)
        //                team.Links.Clear();

        //            var linkList = new List<Link>();
        //            foreach (var newLink in teamDto.Links)
        //            {
        //                var link = ConsoleRepository.Query<Link>().FirstOrDefault(l => l.Id == newLink.Id);
        //                if (link != null)
        //                    linkList.Add(link);
        //            }
        //            team.Links = linkList;
        //        }

                
        //        //  TeamMembership
        //        if (teamDto.AllUsers != null)
        //        {
        //            foreach (var membership in teamDto.AllUsers)
        //            {
        //                var teamMembership = team.Memberships.FirstOrDefault(tm => tm.UserId == membership.Id);
        //                if (teamMembership != null)
        //                {
        //                    if (!membership.IsCurrentMembership)
        //                    {
        //                        teamMembership.IsCurrent = false;
        //                        teamMembership.EndDate = DateTime.Now;

        //                        // Remove team filters from user
        //                        var user =
        //                            team.Memberships.Where(
        //                                tm => tm.UserId == teamMembership.UserId && tm.IsCurrent == false)
        //                                .Select(t => t.User)
        //                                .FirstOrDefault();

                                
        //                    }
        //                    else
        //                    {
        //                        teamMembership.IsCurrent = true;
        //                        teamMembership.EndDate = null;
        //                    }
        //                }
        //            }
        //        }

        //        if (teamDto.Users != null)
        //        {
        //            var userList = new List<User>();
        //            foreach (var newMem in teamDto.Users)
        //            {
        //                var currentMem = team.Memberships.FirstOrDefault(m => m.UserId == newMem.Id);
        //                var user = ConsoleRepository.Query<User>().FirstOrDefault(u => u.Id == newMem.Id);

        //                if (currentMem == null)
        //                {
        //                    team.Memberships.Add(new TeamMembership
        //                        {
        //                            TeamId = team.Id,
        //                            UserId = newMem.Id,
        //                            StartDate = DateTime.Now,
        //                            EndDate = null
        //                        });
        //                }
        //                else
        //                {
        //                    userList.Add(user);

        //                    currentMem.IsCurrent = true;
        //                    currentMem.EndDate = null;
        //                }
        //            }

        //            // Add Team FilterCOBs and FilterOffices to added users
        //            foreach (var user in userList)
        //            {
        //                AddTeamFilters(team.Memberships.Select(tm => tm.TeamId).Distinct(), user, team);
        //            }
        //        }

        //        ConsoleRepository.SaveChanges();

        //        return teamDto;
        //    }
        //}

        public string DeleteTeam(Team team)
        {
            using (ConsoleRepository)
            {
                ConsoleRepository.Attach<Team>(team);
                ConsoleRepository
                    .Query<Team>(t => t.Id == team.Id,
                                                
                                                t => t.Links,
                                                t=>t.Memberships
                                              ).FirstOrDefault();
               

               

                ConsoleRepository.Delete<Team>(team);
                ConsoleRepository.SaveChanges();
                return "Successfully Deleted Team";
            }
        }

        public int CreateUser(UserDto userDto)
        {
            using (ConsoleRepository)
            {
                var existingUser =
                    ConsoleRepository.Query<User>().FirstOrDefault(u => u.DomainLogon == userDto.DomainLogon);

                if (existingUser != null)
                    throw new ApplicationException("User already exists");

                var user = new User();
                user.DomainLogon = userDto.DomainLogon;
                user.IsActive = userDto.IsActive;
                

                if (userDto.TeamMemberships != null)
                {
                    var teamMembershipList = new List<TeamMembership>();
                    foreach (var newTeamM in userDto.TeamMemberships)
                    {
                        var team = ConsoleRepository.Query<Team>().FirstOrDefault(t => t.Id == newTeamM.Team.Id);
                        teamMembershipList.Add(new TeamMembership
                            {
                                User = user,
                                Team = team,
                                StartDate = DateTime.Now,
                                EndDate = null,
                                PrimaryTeamMembership = newTeamM.PrimaryTeamMembership
                            });
                    }
                    user.TeamMemberships = teamMembershipList;
                }

               

               

                ConsoleRepository.Add<User>(user);
                ConsoleRepository.SaveChanges();
                return user.Id;
            }
        }

        //public int EditUser(UserDto userDto)
        //{
        //    using (ConsoleRepository)
        //    {
        //        var user =
        //            ConsoleRepository.Query<User>();

        //        if (user == null)
        //            throw new ApplicationException("User to edit not found");
        //        // TODO: Throw new NullReferenceException(user)

        //        if (string.IsNullOrEmpty(userDto.UnderwriterId))
        //            throw new ApplicationException("Underwriter required");

                

        //        ConsoleRepository.Attach<User>(user);

                
             

        //        ConsoleRepository.SaveChanges();

        //        if (CurrentHttpContext.CurrentUser.Identity.Name.ToUpper() == user.DomainLogon.ToUpper())
        //            CurrentHttpContext.Context.Session["User"] = null;

        //        return user.Id;
        //    }
        //}

        public string DeleteUser(User user)
        {
            using (ConsoleRepository)
            {
                ConsoleRepository.Attach<User>(user);
                ConsoleRepository.Delete<User>(user);
                ConsoleRepository.SaveChanges();
                return "Successfully Deleted User";
            }
        }

        public Link GetLink(int? linkId)
        {
            if (linkId == null) // TODO: Remove nullable from linkId ?
                throw new Exception("linkId is empty"); // TODO: Throw new ArgumentNullException(linkId)

            using (ConsoleRepository)
            {
                return ConsoleRepository.Query<Link>().FirstOrDefault(t => t.Id == linkId.Value);
            }
        }

        public List<Link> GetLinks()
        {
            using (ConsoleRepository)
            {
                return ConsoleRepository.Query<Link>().ToList();
            }
        }

        public Link CreateLink(Link link)
        {
            // TODO: sort out http etc on url string
            //if(link.Url.sub

            using (ConsoleRepository)
            {
                ConsoleRepository.Add<Link>(link);
                ConsoleRepository.SaveChanges();
                return link;
            }
        }

        public Link EditLink(Link link)
        {
            using (ConsoleRepository)
            {
                ConsoleRepository.Attach<Link>(link);
                ConsoleRepository.SaveChanges();
                return link;
            }
        }

        public string DeleteLink(Link link)
        {
            using (ConsoleRepository)
            {
                ConsoleRepository.Attach<Link>(link);
                ConsoleRepository.Delete<Link>(link);
                ConsoleRepository.SaveChanges();
                return "Successfully Deleted Link";
            }
        }

        public List<UserDto> SearchForUserByName(string userName)
        {
            if (userName == null)
                throw new Exception("userName is empty"); // TODO: Throw new ArgumentNullException(userName)

            using (ConsoleRepository)
            {
                return ConsoleRepository.Query<User>().Where(u => u.DomainLogon.Contains(userName)).ToList().Select(u =>
                                                                                                                    new UserDto
                                                                                                                        {
                                                                                                                            Id
                                                                                                                                =
                                                                                                                                u
                                                                                                                        .Id,
                                                                                                                            DomainLogon
                                                                                                                                =
                                                                                                                                u
                                                                                                                        .DomainLogon
                                                                                                                        })
                                        .ToList();
            }

        }

        

        //public UserDto GetSelectedUserByName(string userName)
        //{
        //    if (userName == null)
        //        throw new Exception("userName is empty"); // TODO: Throw new ArgumentNullException(userName)

        //    var userDto = new UserDto();

        //    using (ConsoleRepository)
        //    {
                
        //        var user = 
        //            ConsoleRepository.Query<User>(t => t.DomainLogon == userName, 
                                               
        //                                         t => t.TeamMemberships.Select(tm => tm.Team.PricingActuary))
        //                             .SingleOrDefault();

        //        if (user != null)
        //        {
        //            user.TeamMemberships.OrderBy(tm => tm.Team.Title).ToList().ForEach((tm) =>
        //                { user.TeamMemberships.Remove(tm); user.TeamMemberships.Add(tm); });
        //            SetUserDto(userDto, user, ConsoleRepository);
        //        }
        //    }

        //    return userDto;
        //}

        //public UserDto GetUser(int? userId)
        //{
        //    if (userId == null) // TODO: Remove nullable from userId
        //        throw new Exception("userId is empty"); // TODO: throw new ArgumentNullException(userId)

        //    var userDto = new UserDto();
        //    using (ConsoleRepository)
        //    {
        //        var user =
        //            ConsoleRepository.Query<User>(t => t.Id == userId.Value, 
                                                   
                                                   
        //                                            t => t.TeamMemberships.Select(tm => tm.Team).FirstOrDefault();

        //        if (user != null)
        //        {
        //            SetUserDto(userDto, user, ConsoleRepository);
        //        }
        //    }

        //    return userDto;
        //}

        public List<Link> GetLinksForTeam(int? teamId)
        {
            // TODO: Remove nullable from teamId ?
            // TODO: Where is the argument null reference check ?

            using (ConsoleRepository)
            {
                var firstOrDefault =
                    ConsoleRepository.Query<Team>(t => t.Id == teamId.Value, t => t.Links).FirstOrDefault();
                if (firstOrDefault != null)
                    return firstOrDefault.Links.ToList();
            }

            return null;
        }

        public string SaveLinksForTeam(TeamLinksDto teamLinksDto)
        {
            using (ConsoleRepository)
            {
                // Check does Team Links exist
                var team = ConsoleRepository.Query<Team>(t => t.Links).FirstOrDefault(t => t.Id == teamLinksDto.TeamId);

                bool linksChanged = false;
                if (team != null)
                {
                    // Remove links that need to be removed
                    var currentTeamLinks = team.Links.Select(t => t.Id).ToList();
                    var linksToRemove = currentTeamLinks.Except(teamLinksDto.TeamLinksIdList).ToList();

                    foreach (var linkId in linksToRemove)
                    {
                        var linkToDelete = ConsoleRepository.Query<Link>().FirstOrDefault(l => l.Id == linkId);

                        if (linkToDelete != null && team.Links.Any(l => l.Equals(linkToDelete)))
                        {
                            team.Links.Remove(linkToDelete);
                            linksChanged = true;
                        }
                    }

                    // Add Links that need to be added
                    foreach (var linkId in teamLinksDto.TeamLinksIdList)
                    {
                        if (team.Links.Any(l => l.Id == linkId)) continue;
                        var linkToAdd = ConsoleRepository.Query<Link>().FirstOrDefault(l => l.Id == linkId);

                        team.Links.Add(linkToAdd);
                        linksChanged = true;
                    }

                    ConsoleRepository.SaveChanges();

                    if (linksChanged)
                        return "Saved Link(s) for Team";
                    else
                        return "Link(s) for Team have not changed";
                }
                else
                {
                    return "Save Links - Team does not Exist";
                }
            }
        }

        //public static RequiredDataUserDto GetRequiredDataEditUser(string userName, IConsoleRepository _consoleRepository)
        //{
        //    var requiredDataDto = new RequiredDataUserDto();
        //    using (_consoleRepository)
        //    {
        //        var user = _consoleRepository.Query<User>(
        //                                    u => u.TeamMemberships.Select(t => t.Team);

        //        if (user == null)
        //            throw new Exception("User not Found"); // TODO: throw new NullReferenceException(user)

        //        var allTeams = _consoleRepository.Query<Team>().Select(t => t).ToList();

        //        var currentUserTeamMemberships =
        //            _consoleRepository.Query<TeamMembership>()
        //                              .Where(tm => tm.User.DomainLogon.Contains(userName) && tm.IsCurrent)
        //                              .Select(t => t.Team)
        //                              .ToList();

        //        var allTeamMemberships = allTeams.Except(currentUserTeamMemberships).Select(t =>
        //            {
        //                // Create a new empty team Membership
        //                return new TeamMembershipDto
        //                    {
        //                        Id = 0,
        //                        Team = new TeamDto {Id = t.Id, Title = t.Title},
        //                        EndDate = null,
        //                        StartDate = new DateTime()
        //                    };

        //            }).OrderBy(tm => tm.Team.Title).ToList();

                

        //        var allAdditionalUsers =
        //            _consoleRepository.Query<User>(u => true, u => u.TeamMemberships.Select(tm => tm.Team)).ToList().Except(currentAdditionalUsers).Select(u =>
        //                {
        //                    return new UserDto { Id = u.Id, DomainLogon = u.DomainLogon, TeamMemberships = u.TeamMemberships.Where(tm => tm.IsCurrent && tm.PrimaryTeamMembership).Select(tm => new TeamMembershipDto { Team = new TeamDto{Title = tm.Team.Title} }).ToList() };

        //                }).OrderBy(u => u.DomainLogon).ToList();

        //        requiredDataDto.AllTeamMemberships = allTeamMemberships;
                
        //        requiredDataDto.AllAdditionalUsers = allAdditionalUsers;
        //    }

        //    return requiredDataDto;
        //}

        public RequiredDataUserDto GetRequiredDataCreateUser()
        {
            var requiredDataDto = new RequiredDataUserDto();
            using (ConsoleRepository)
            {
                // 1. Get All TeamsMemberships
                var allTeamMemberships = ConsoleRepository.Query<Team>().OrderBy(t => t.Title).ToList().Select(tm =>
                    {
                        return new TeamMembershipDto
                            {
                                Id = tm.Id,
                                EndDate = null,
                                StartDate = DateTime.Now,
                                Team = new TeamDto { Id = tm.Id, Title = tm.Title }
                            };

                    }).ToList();

                

                // 4. AllFilterMembers
                var allUsers = ConsoleRepository.Query<User>(u => true, u => u.TeamMemberships.Select(tm => tm.Team)).OrderBy(u => u.DomainLogon).ToList().Select(u =>
                    {
                        return new UserDto { Id = u.Id, DomainLogon = u.DomainLogon, TeamMemberships = u.TeamMemberships.Where(tm => tm.IsCurrent && tm.PrimaryTeamMembership).Select(tm => new TeamMembershipDto { Team = new TeamDto { Title = tm.Team.Title } }).ToList() };

                    }).ToList();

                requiredDataDto.AllTeamMemberships = allTeamMemberships;
                
                requiredDataDto.AllFilterMembers = allUsers;
                
                requiredDataDto.AllAdditionalUsers = allUsers;

               
                requiredDataDto.AllDefaultUnderwriters = allUsers;
            }

            return requiredDataDto;
        }

        //public RequiredDataCreateTeamDto GetRequiredDataCreateTeam()
        //{
        //    var requiredDto = new RequiredDataCreateTeamDto();
        //    using (ConsoleRepository)
        //    {
        //        var teams =
        //            ConsoleRepository.Query<Team>(t => t.Memberships.Select(tm => tm.User).ToList();

        //        teams.ForEach(team =>
        //            {
        //                var allUsers = new List<UserDto>();
        //                var allLinks = new List<LinkDto>();
                       

        //                allUsers = ConsoleRepository.Query<User>().ToList().Select(u =>
        //                    {
        //                        return new UserDto { Id = u.Id, DomainLogon = u.DomainLogon };

        //                    }).ToList();

        //                allLinks = ConsoleRepository.Query<Link>().ToList().Select(l =>
        //                    {
        //                        return new LinkDto { Id = l.Id, Category = l.Category, Url = l.Url, Title = l.Title };

        //                    }).ToList();

                        

        //                requiredDto.AllLinks = allLinks;
                        
        //                requiredDto.AllUsers = allUsers;

        //            });
        //    }

        //    return requiredDto;
        //}

        //public List<UserTeamLinkDto> GetUserTeamLinks()
        //{
        //    return WebSiteModuleManager.EnsureCurrentUser().TeamMemberships.SelectMany(tm => tm.Team.Links)
        //     .Distinct()
        //     .GroupBy(l => l.Category,
        //             l => new Url() { LinkUrl = l.Url, LinkCategory = l.Category, Title = l.Title },
        //             (t, f) => (new UserTeamLinkDto() { CategoryName = t, Urls = new List<Url>(f).ToList() })).ToList();
        //}

		


        #endregion

        #region QuoteTemplate

        
        

        

        #endregion

        

        

        

        

        

        

        #region Helpers

        

        //private static void SetUserDto(UserDto userDto, User user, IConsoleRepository _consoleRepository)
        //{
        //    userDto.Id = user.Id;
        //    userDto.DomainLogon = user.DomainLogon;
        //    userDto.IsActive = user.IsActive;

        //    // Currently Selected Values
        //    userDto.DefaultOrigOffice = (user.DefaultOrigOffice != null)
        //                                    ? new OfficeDto
        //                                        {
        //                                            Id = user.DefaultOrigOffice.Id,
        //                                            Title = user.DefaultOrigOffice.Name
        //                                        }
        //                                    : null;
        //    userDto.PrimaryOffice = (user.PrimaryOffice != null)
        //                                ? new OfficeDto { Id = user.PrimaryOffice.Id, Title = user.PrimaryOffice.Name }
        //                                : null;
        //    userDto.DefaultUW = (user.DefaultUW != null)
        //                            ? new UserDto { Id = user.DefaultUW.Id, DomainLogon = user.DefaultUW.DomainLogon }
        //                            : null;
        //    userDto.UnderwriterId = user.UnderwriterCode;
        //    userDto.DefaultBroker = user.DefaultBroker; 

        //    OfficeDto officeDto = null;
        //    var officeList = _consoleRepository.Query<Office>().ToList();
        //    if (user.DefaultOrigOffice != null)
        //    {
        //        var defaultOrigOfficeList = new List<OfficeDto>();
        //        defaultOrigOfficeList.Add(userDto.DefaultOrigOffice);

        //        defaultOrigOfficeList.AddRange(
        //            officeList.Where(o => o.Id != userDto.DefaultOrigOffice.Id)
        //            .Select(o => new OfficeDto {Title = o.Name, Id = o.Id}
        //            ));
        //        userDto.DefaultOrigOfficeList = defaultOrigOfficeList.OrderBy(o=>o.Title).ToList();
        //    }

        //    if (user.PrimaryOffice != null)
        //    {
        //        var primaryOfficeList = new List<OfficeDto>();
        //        primaryOfficeList.Add(userDto.PrimaryOffice);

        //        primaryOfficeList.AddRange(
        //            officeList.Where(o => o.Id != userDto.PrimaryOffice.Id)
        //                      .Select(o => new OfficeDto() { Id = o.Id, Title = o.Name }));

        //        userDto.PrimaryOfficeList = primaryOfficeList.OrderBy(o => o.Title).ToList();
        //    }

        //    if (userDto.DefaultOrigOfficeList == null || userDto.PrimaryOfficeList == null)
        //    {
        //        var officeDtoList = officeList.ToList().Select(o =>
        //            {
        //                return new OfficeDto { Id = o.Id, Title = o.Name };
        //            }).OrderBy(o => o.Title).ToList();

        //        if (userDto.DefaultOrigOfficeList == null)
        //            userDto.DefaultOrigOfficeList = officeDtoList;

        //        if (userDto.PrimaryOfficeList == null)
        //            userDto.PrimaryOfficeList = officeDtoList;
        //    }

        //    if (userDto.DefaultUW != null)
        //    {
        //        var defaultUWDtoList = new List<UserDto>();
        //        defaultUWDtoList.Add(userDto.DefaultUW);

        //        UserDto defaultUW = null;
        //        defaultUWDtoList.AddRange(_consoleRepository.Query<User>().OrderBy(u=>u.DomainLogon).ToList().Select(u =>
        //            {
        //                if (u.Id != userDto.DefaultUW.Id)
        //                    defaultUW = new UserDto { Id = u.Id, DomainLogon = u.DomainLogon };
        //                return defaultUW;
        //            }).ToList());

        //        userDto.DefaultUWList = defaultUWDtoList;
        //    }

        //    if (userDto.DefaultUW == null)
        //    {
        //        var defaultUWDtoList = _consoleRepository.Query<User>().OrderBy(u => u.DomainLogon).ToList().Select(u =>
        //            {
        //                return new UserDto { Id = u.Id, DomainLogon = u.DomainLogon };
        //            }).ToList();
        //        userDto.DefaultUWList = defaultUWDtoList;
        //    }


        //    userDto.TeamMemberships = (user.TeamMemberships != null && user.TeamMemberships.Any())
        //                                  ? user.TeamMemberships.Where(m => m.IsCurrent).OrderBy(tm=>tm.Team.Title).ToList().ConvertAll(tm =>
        //        new TeamMembershipDto
        //        {
        //            TeamId = tm.TeamId,
        //            EndDate = tm.EndDate,
        //            Id = tm.Id,
        //            PrimaryTeamMembership = tm.PrimaryTeamMembership,
        //            IsCurrent = tm.IsCurrent,
        //            StartDate = tm.StartDate,
        //            Team = new TeamDto
        //            {
        //                Id = tm.Team.Id,
        //                Title = tm.Team.Title,
        //                DefaultDomicile = tm.Team.DefaultDomicile,
        //                DefaultMOA = tm.Team.DefaultMOA,
        //                PricingActuary = tm.Team.PricingActuary,
        //                QuoteExpiryDaysDefault = tm.Team.QuoteExpiryDaysDefault,
        //                DefaultPolicyType = tm.Team.DefaultPolicyType
        //            }
        //        }) : null;

        //    userDto.AdditionalUsers = (user.AdditionalUsers != null && user.AdditionalUsers.Any())
        //                                  ? user.AdditionalUsers.OrderBy(u=>u.DomainLogon).ToList()
        //                                        .ConvertAll(ad => new UserDto { Id = ad.Id, DomainLogon = ad.DomainLogon })
        //                                  : null;
        //    userDto.AdditionalCOBs = (user.AdditionalCOBs != null && user.AdditionalCOBs.Any())
        //                                 ? user.AdditionalCOBs.OrderBy(cob => cob.Narrative).ToList()
        //                                       .ConvertAll(cob => new COBDto { Id = cob.Id, Narrative = cob.Narrative })
        //                                 : null;
        //    userDto.FilterCOBs = (user.FilterCOBs != null && user.FilterCOBs.Any())
        //                             ? user.FilterCOBs.OrderBy(cob => cob.Narrative).ToList()
        //                                   .ConvertAll(cob => new COBDto { Id = cob.Id, Narrative = cob.Narrative })
        //                             : null;
        //    userDto.AdditionalOffices = (user.AdditionalOffices != null && user.AdditionalOffices.Any())
        //                                    ? user.AdditionalOffices.OrderBy(o => o.Name).ToList()
        //                                          .ConvertAll(o => new OfficeDto { Id = o.Id, Title = o.Name })
        //                                    : null;
        //    userDto.FilterMembers = (user.FilterMembers != null && user.FilterMembers.Any())
        //                                ? user.FilterMembers.OrderBy(u => u.DomainLogon).ToList()
        //                                      .ConvertAll(fm => new UserDto { Id = fm.Id, DomainLogon = fm.DomainLogon })
        //                                : null;
        //    userDto.FilterOffices = (user.FilterOffices != null && user.FilterOffices.Any())
        //                                ? user.FilterOffices.OrderBy(o => o.Name).ToList()
        //                                      .ConvertAll(fo => new OfficeDto { Id = fo.Id, Title = fo.Name })
        //                                : null;

        //    var requiredData = GetRequiredDataEditUser(user.DomainLogon, _consoleRepository);

        //    userDto.AllAdditionalUsers = requiredData.AllAdditionalUsers;
        //    userDto.AllAdditionalCOBs = requiredData.AllAdditionalCOBs;
        //    userDto.AllAdditionalOffices = requiredData.AllAdditionalOffices;
        //    userDto.AllFilterCOBs = requiredData.AllFilterCOBs;
        //    userDto.AllFilterMembers = requiredData.AllFilterMembers;
        //    userDto.AllFilterOffices = requiredData.AllFilterOffices;
        //    userDto.AllTeamMemberships = requiredData.AllTeamMemberships;
        //}

        
        #endregion

    }

}