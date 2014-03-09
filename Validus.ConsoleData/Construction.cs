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
    public class Construction : TeamSetup
    {
        public Construction(IConsoleRepository consoleRepository)
            : base(consoleRepository)
        {

        }

        #region COB
        private COB COB_AG; //CL:  Direct - Casualty - Marine Liability 
        private COB COB_CC; //CR:  Direct Casualty Energy Liability
        public override void SetUpCob()
        {
            COB_AG = ResolveCob("AG", "Direct - Property - Construction");
            COB_CC = ResolveCob("CC", "Direct - Casualty - Construction");
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
        private Link Link_19;
        // ReSharper restore InconsistentNaming
        public override void SetUpLinks()
        {
            Link_01= ResolveLink("DMS", "Document Management", "http://docs.talbotuw.com/default.aspx");
            Link_02= ResolveLink("MMT", "ebusiness", "https://acord.validusholdings.com/MMT/MessageSummary.aspx");
            Link_03= ResolveLink("Qatarlyst", "eBusiness", "https://www.ri3k.com/marketplace/login/index.html");
            Link_04= ResolveLink("Open Xposure", "Exposure Management", "Current open Xposure management link as per desktop setup");
            Link_05= ResolveLink("Subscribe", "Policy Admin", "As per standard desktop installation");
            Link_06= ResolveLink("Weekly Management Reports", "Reports", "http://intranet.validusholdings.com/BI/SitePages/Regular%20Talbot%20Reports.aspx");
            Link_07= ResolveLink("Class Summaries & Triangles", "Reports", "http://ireport:8700/talbot/getfolderitems.do?folder=/UW/Monthly%20UW%20Figures");
            Link_08= ResolveLink("Market wordings database", "Information", "https://www.lloydswordings.com/lma/auth/login.do?req_url=https://www.lloydswordings.com/lma/app/start.do");
            Link_09= ResolveLink("Workflow Dashboard", "Workflow", "http://apps.talbotuw.com/sites/workflow/pages/underwritingworkflow.aspx");
            Link_10= ResolveLink("Crystal", "Compliance Tools", "http://www.lloyds.com/The-Market/Tools-and-Resources/Tools-E-Services/Crystal");
            Link_11= ResolveLink("XE Live Exchange Rates", "Information", "www.xe.com");
            Link_12= ResolveLink("Weekly Underwriter Pack", "Information", "http://intranet.validusholdings.com/Underwriting/Talbot/SitePages/UWPack.aspx");
            Link_13= ResolveLink("Construction PUMA modifier", "Pricing Models", @"G:\Underwriting\Property Fac\CONSTRUCTION\PUMA 3.3.1\2013 Projects\PUMA modifier v102 02.xls");
            Link_14= ResolveLink("Munich Re on-line natural peril mapping", "Information", "https://register.munichre.com/webcrm/LoginSite/Login.aspx");
            Link_15= ResolveLink("IMIA – The International Association of Engineering Insurers (international market body)", "Information", "http://www.imia.com/");
            Link_16= ResolveLink("LEG – London Engineering Group (London market body)", "Information", "http://www.londonengineeringgroup.com/");
            Link_17= ResolveLink("Cyclone tracking in USA", "Information", "http://www.nhc.noaa.gov/");
            Link_18= ResolveLink("FEMA - Flood exposure mapping in USA", "Information", "http://fema.maps.arcgis.com/home/");
            Link_19= ResolveLink("Cyclone tracking in Australia", "Information", "http://www.bom.gov.au/cyclone/?ref=dropdown");
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
        private User User07;
        private User User08;
        private User User09;
        private User User10;
        // ReSharper restore InconsistentNaming
        public override void SetUpUser()
        {
            User01 = ResolveUser("LON", "Patrick Bravery", "BraverP", "PB");
            User02 = ResolveUser("LON", "Tom De'ath", "deathth", "");
            User03 = ResolveUser("LON", "Simon Wilcock", "WilcockS", "SCW");
            User04 = ResolveUser("LON", "David Turner", "TurnerD", "DGT");
            User05 = ResolveUser("NYC", "Rupert Allhusen", "allhusr", "RA");
            User06 = ResolveUser("SNG", "Joe Wee", "WeeJ", "JSW");
            User07 = ResolveUser("MIA", "Luis Sonville", "Luis.Sonville", "LAS"); //SonvilL	
            User08 = ResolveUser("MIA", "Diego San Martin", "SanmarD", "");
            User09 = ResolveUser("DUB", "Samuel Raj", "rajsamu", "SQR");
            User10 = ResolveUser("NYC", "Chris Sonneman", "chris.sonneman", "");
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

            QuoteTemplate01 = _consoleRepository.Query<QuoteTemplate>(qtmpl => qtmpl.Name == "Construction - Indication").SingleOrDefault();
            QuoteTemplate01 = QuoteTemplate01 ?? new QuoteTemplate { Name = "Construction - Indication", RdlPath = "/Underwriting/Console/QuoteSheet_CO" };

            SubmissionType01 = _consoleRepository.Query<SubmissionType>(styp => styp.Id == "CO").SingleOrDefault();
            SubmissionType01 = SubmissionType01 ?? new SubmissionType { Id = "CO", Title = "Construction_Submission" };

            Team01 = _consoleRepository.Query<Team>(team => team.Title == "Construction").SingleOrDefault();

            if (Team01 == null)
            {
                Team01 = new Team
                {
                    Title = "Construction",
                    QuoteExpiryDaysDefault = 30,
                    RelatedCOBs = new List<COB> { COB_AG, COB_CC },
                    Links = new List<Link> { Link_01,Link_02,Link_03,Link_04,Link_05,Link_06,Link_07,Link_08,Link_09,Link_10,Link_11,Link_12,Link_13,Link_14,Link_15,Link_16,Link_17,Link_18,Link_19 },
                    RelatedQuoteTemplates = new List<QuoteTemplate> { QuoteTemplate01 },
                    Memberships = new Collection<TeamMembership> { new TeamMembership { StartDate = DateTime.Now, User = User01 }, 
                                                                   new TeamMembership { StartDate = DateTime.Now, User = User02 }, 
                                                                   new TeamMembership { StartDate = DateTime.Now, User = User03 }, 
                                                                   new TeamMembership { StartDate = DateTime.Now, User = User04 }, 
                                                                   new TeamMembership { StartDate = DateTime.Now, User = User05 }, 
                                                                   new TeamMembership { StartDate = DateTime.Now, User = User06 }, 
                                                                   new TeamMembership { StartDate = DateTime.Now, User = User07 },
                                                                   new TeamMembership { StartDate = DateTime.Now, User = User08 },
                                                                   new TeamMembership { StartDate = DateTime.Now, User = User09 }, 
                                                                   new TeamMembership { StartDate = DateTime.Now, User = User10 },
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
