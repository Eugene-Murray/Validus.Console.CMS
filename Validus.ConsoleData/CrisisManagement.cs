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
    public class CrisisManagement : TeamSetup
    {
        public CrisisManagement(IConsoleRepository consoleRepository)
            : base(consoleRepository)
        {

        }

        #region COB
        // ReSharper disable InconsistentNaming
        private COB COB_AK;
        // ReSharper restore InconsistentNaming
        public override void SetUpCob()
        {
            COB_AK = ResolveCob("AK", "Direct - Property - Political Risk");
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
        private Link Link_09;
        private Link Link_10;
        private Link Link_11;
        private Link Link_12;
        private Link Link_13;
        private Link Link_14;
        private Link Link_15;
        private Link Link_16;
        private Link Link_17;
        private Link Link_18;
        // ReSharper restore InconsistentNaming
        public override void SetUpLinks()
        {
            Link_01	=	ResolveLink("DMS", "Document Management", "http://docs.talbotuw.com/default.aspx");
            Link_02	=	ResolveLink("Open Xposure", "Exposure Management", "Current open Xposure management link as per desktop setup");
            Link_03	=	ResolveLink("Subscribe", "Policy Admin", "As per standard desktop installation");
            Link_04	=	ResolveLink("Terrorism Model", "Pricing Models", @"G:\Underwriting\Marine\Terrorism\Terrorism Model\Terrorism Model folder");
            Link_05	=	ResolveLink("Weekly Management Reports", "Reports", "http://intranet.validusholdings.com/BI/SitePages/Regular%20Talbot%20Reports.aspx");
            Link_06	=	ResolveLink("Class Summaries & Triangles", "Reports", "http://ireport:8700/talbot/getfolderitems.do?folder=/UW/Monthly%20UW%20Figures");
            Link_07	=	ResolveLink("Market wordings database", "Information", "https://www.lloydswordings.com/lma/auth/login.do?req_url=https://www.lloydswordings.com/lma/app/start.do");
            Link_08	=	ResolveLink("Workflow Dashboard", "Workflow", "http://apps.talbotuw.com/sites/workflow/pages/underwritingworkflow.aspx");
            Link_09	=	ResolveLink("Crystal", "Compliance Tools", "http://www.lloyds.com/The-Market/Tools-and-Resources/Tools-E-Services/Crystal");
            Link_10	=	ResolveLink("WOL/Terror hotspot report", "Reports", "http://uktrms01.talbotuw.com/Wiki/EM_Wiki/Aggregate_Reports/Summary/ExposureDashboard.html");
            Link_11	=	ResolveLink("XE Live Exchange Rates", "Information", "www.xe.com");
            Link_12	=	ResolveLink("Weekly Underwriter Pack", "Information", "http://intranet.validusholdings.com/Underwriting/Talbot/SitePages/UWPack.aspx");
            Link_13	=	ResolveLink("Control Risks", "Information", "http://www.controlrisks.com/Pages/Home.aspx");
            Link_14	=	ResolveLink("Global Insight", "Information", "http://myinsight.ihsglobalinsight.com/servlet/cats?pageContent=home");
            Link_15	=	ResolveLink("Bankscope", "Information", "https://bankscope2.bvdep.com/version-2013829/Search.QuickSearch.serv?_CID=1&context=QGF8YJYYTYQNLR");
            Link_16	=	ResolveLink("Pol Risks Aggs", "Reports", "http://uktrms01.talbotuw.com/Wiki/EM_Wiki/Aggregate_Reports/PR_Report_web.html");
            Link_17	=	ResolveLink("Food & Drink rating model", "Pricing Models", @"G:\Underwriting\Crisis Management\Product Recall\1 PCI - Food & Beverage\Rate Models ");
            Link_18	=	ResolveLink("Auto rating model", "Pricing Models", @"G:\Underwriting\Crisis Management\Product Recall\2 Auto");
        }
        #endregion

        #region User
        // ReSharper disable InconsistentNaming
        private User User01;
        private User User04;
        private User User09;
        // ReSharper restore InconsistentNaming
        public override void SetUpUser()
        {
            User01 = ResolveUser("LON", "Jon Atkinson", "AtkinsJ", "JZA");
            User04 = ResolveUser("LON", "Neil Evans", "EvansN", "NZE");
            User09 = ResolveUser("LON", "Thomas Howard", "HowardT", "");
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

            QuoteTemplate01 = _consoleRepository.Query<QuoteTemplate>(qtmpl => qtmpl.Name == "Political Risk").SingleOrDefault();
            QuoteTemplate01 = QuoteTemplate01 ?? new QuoteTemplate { Name = "Political Risk", RdlPath = "/Underwriting/Console/QuoteSheet_WK" };

            SubmissionType01 = _consoleRepository.Query<SubmissionType>(styp => styp.Id == "CM").SingleOrDefault();
            SubmissionType01 = SubmissionType01 ?? new SubmissionType { Id = "CM", Title = "Crisis Management_Submission" };

            Team01 = _consoleRepository.Query<Team>(team => team.Title == "Crisis Management").SingleOrDefault();

            if (Team01 == null)
            {
                Team01 = new Team
                {
                    Title = "Crisis Management",
                    QuoteExpiryDaysDefault = 14,
                    RelatedCOBs = new List<COB> { COB_AK },
                    Links = new List<Link> { Link_01,Link_02,Link_03,Link_04,Link_05,Link_06,Link_07,Link_08,Link_09,Link_10,Link_11,Link_12,Link_13,Link_14,Link_15,Link_16,Link_17,Link_18 },
                    RelatedQuoteTemplates = new List<QuoteTemplate> { QuoteTemplate01 },
                    Memberships = new Collection<TeamMembership> { new TeamMembership { StartDate = DateTime.Now, User = User01 }, 
                                                                   new TeamMembership { StartDate = DateTime.Now, User = User04 }, 
                                                                   
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
                    DefaultPolicyType = "MARINE"
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
