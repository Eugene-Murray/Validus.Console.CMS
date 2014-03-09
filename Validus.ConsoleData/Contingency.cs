using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Validus.Console.Data;
using Validus.Models;

namespace Validus.ConsoleData
{
    public class Contingency : TeamSetup
    {
        public Contingency(IConsoleRepository consoleRepository)
            : base(consoleRepository)
        {

        }

        #region COB
        private COB COB_AD; 
        public override void SetUpCob()
        {
            COB_AD = ResolveCob("AD", "Direct - Property - Contingency");
        }
        #endregion

        #region Wording
        public override void SetUpTermsNCondition()
        {
            //throw new NotImplementedException();
        }
        #endregion

        #region Link
        // ReSharper disable InconsistentNaming
        private Link Link_01;
        private Link Link_02;
        private Link Link_03;
        private Link Link_04;
        private Link Link_05;
        private Link Link_06;
        private Link Link_07;
        private Link Link_08;
        // ReSharper restore InconsistentNaming
        public override void SetUpLinks()
        {
            Link_01 = ResolveLink("DMS", "Document Management", "http://docs.talbotuw.com/default.aspx");
            Link_02 = ResolveLink("MMT", "ebusiness", "https://acord.validusholdings.com/MMT/MessageSummary.aspx");
            Link_03 = ResolveLink("Qatarlyst", "eBusiness", "https://www.ri3k.com/marketplace/login/index.html");
            Link_04 = ResolveLink("Weekly Management Reports", "Reports", "http://intranet.validusholdings.com/BI/SitePages/Regular%20Talbot%20Reports.aspx");
            Link_05 = ResolveLink("Class Summaries & Triangles", "Reports", "http://ireport:8700/talbot/getfolderitems.do?folder=/UW/Monthly%20UW%20Figures");
            Link_06 = ResolveLink("Market wordings database", "Information", "https://www.lloydswordings.com/lma/auth/login.do?req_url=https://www.lloydswordings.com/lma/app/start.do");
            Link_07 = ResolveLink("Workflow Dashboard", "Workflow", "https://www.lloydswordings.com/lma/auth/login.do?req_url=https://www.lloydswordings.com/lma/app/start.do");
            Link_08 = ResolveLink("Crystal", "Compliance Tools", "https://www.lloydswordings.com/lma/auth/login.do?req_url=https://www.lloydswordings.com/lma/app/start.do");
        }
        #endregion

        #region User
        // ReSharper disable InconsistentNaming
        private User User01;
        private User User02;
        private User User03;
        private User User04;
        private User User05;
        private User User06;
        // ReSharper restore InconsistentNaming



        public override void SetUpUser()
        {
            User01 = ResolveUser("LON", "Alan Norris", "NorrisA", "AXN");
            User02 = ResolveUser("LON", "Ian Ritchie", "RitchieI", "WZD");
            User03 = ResolveUser("LON", "Gareth Meech", "meechg", "GZM");
            User04 = ResolveUser("LON", "Angus Stewart", "StewarAn", "   ");
            User05 = ResolveUser("SNG", "Simon Wilmot-Smith", "wilmots", "SWS");
            User06 = ResolveUser("LON", "Susan House", "houses", "SBH");
          
        }
        #endregion

        #region Team
        // ReSharper disable InconsistentNaming
        private QuoteTemplate QuoteTemplate01;
        private SubmissionType SubmissionType01;
        private Team Team01;
        // ReSharper restore InconsistentNaming
        public override void SetupTeam()
        {
            this.SetUpCob();
            this.SetUpTermsNCondition();
            this.SetUpLinks();
            this.SetUpUser();

            QuoteTemplate01 = _consoleRepository.Query<QuoteTemplate>(qtmpl => qtmpl.Name == "Contingency").SingleOrDefault();
            QuoteTemplate01 = QuoteTemplate01 ?? new QuoteTemplate { Name = "Contingency", RdlPath = "/Underwriting/Console/QuoteSheet_CN" };

            SubmissionType01 = _consoleRepository.Query<SubmissionType>(styp => styp.Id == "CN").SingleOrDefault();
            SubmissionType01 = SubmissionType01 ?? new SubmissionType { Id = "CN", Title = "Contingency_Submission" };

            Team01 = _consoleRepository.Query<Team>(team => team.Title == "Contingency").SingleOrDefault();

            if (Team01 == null)
            {
                Team01 = new Team
                {
                    Title = "Contingency",
                    QuoteExpiryDaysDefault = 30,
                    RelatedCOBs = new List<COB> { COB_AD },
                    Links = new List<Link> { Link_01, Link_02, Link_03, Link_04, Link_05, Link_06, Link_07, Link_08 },
                    RelatedQuoteTemplates = new List<QuoteTemplate> { QuoteTemplate01 },
                    Memberships = new Collection<TeamMembership> { new TeamMembership { StartDate = DateTime.Now, User = User01 }, 
                                                                   new TeamMembership { StartDate = DateTime.Now, User = User02 }, 
                                                                   new TeamMembership { StartDate = DateTime.Now, User = User03 }, 
                                                                   new TeamMembership { StartDate = DateTime.Now, User = User04 }, 
                                                                   new TeamMembership { StartDate = DateTime.Now, User = User05 }, 
                                                                   new TeamMembership { StartDate = DateTime.Now, User = User06 }, 
                    },
                    RelatedOffices = new List<Office>
                        {
                            _consoleRepository.Query<Office>(off => off.Id == "LON").Single(),
                            _consoleRepository.Query<Office>(off => off.Id == "MIA").Single(),
                            _consoleRepository.Query<Office>(off => off.Id == "LAB").Single(),
                            _consoleRepository.Query<Office>(off => off.Id == "NYC").Single(),
                            _consoleRepository.Query<Office>(off => off.Id == "SNG").Single(),
                            _consoleRepository.Query<Office>(off => off.Id == "DUB").Single(),
                        },
                    CreatedBy = "InitialSetup",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "InitialSetup",
                    ModifiedOn = DateTime.Now,
                    SubmissionTypeId = SubmissionType01.Id,
                    DefaultPolicyType = "NONMARINE"
                };
               
                //filters
                foreach (var teamMembership in Team01.Memberships)
                {
                    var membershipLocal = teamMembership;
                    _consoleRepository.Query<User>(u => u.Id == membershipLocal.User.Id, u => u.FilterMembers,
                                                   u => u.FilterCOBs, u => u.FilterOffices).FirstOrDefault();

                    if (teamMembership.User.FilterMembers == null) teamMembership.User.FilterMembers = new Collection<User>();
                    foreach (var membership in Team01.Memberships)
                    {
                        if (teamMembership.User.FilterMembers.All(fm => fm.DomainLogon != membership.User.DomainLogon))
                            teamMembership.User.FilterMembers.Add(membership.User);
                    }

                    if (teamMembership.User.FilterCOBs == null) teamMembership.User.FilterCOBs = new Collection<COB>();
                    foreach (var relatedCoB in Team01.RelatedCOBs)
                    {
                        if (teamMembership.User.FilterCOBs.All(fc => fc.Id != relatedCoB.Id))
                            teamMembership.User.FilterCOBs.Add(relatedCoB);
                    }

                    if (teamMembership.User.FilterOffices == null) teamMembership.User.FilterOffices = new Collection<Office>();
                    foreach (var relatedOffice in Team01.RelatedOffices)
                    {
                        if (teamMembership.User.FilterOffices.All(fo => fo.Id != relatedOffice.Id))
                            teamMembership.User.FilterOffices.Add(relatedOffice);
                    }

                }
                _consoleRepository.Add(Team01);
            }
            _consoleRepository.SaveChanges();
        }
        #endregion
    }
}
