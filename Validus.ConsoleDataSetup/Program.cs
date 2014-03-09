using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Validus.Console.Data;
using Validus.ConsoleData;

namespace Validus.ConsoleDataSetup
{
    class Program
    {
        static void Main(string[] args)
        {
            var teamName = args[0];

            switch (teamName)
            {
                case "HM" :
                    {
                        ITeamSetup teamSetup = new HullSetup(new ConsoleRepository() );
                        teamSetup.DomainPrefix = args[1];
                        teamSetup.SetupTeam();
                    }
                    break;
                case "CA":
                    {
                        ITeamSetup teamSetup = new CargoSetup(new ConsoleRepository());
                        teamSetup.DomainPrefix = args[1];
                        teamSetup.SetupTeam();
                    }
                    break;
                case "ME":
                    {
                        ITeamSetup teamSetup = new MarineSetup(new ConsoleRepository());
                        teamSetup.DomainPrefix = args[1];
                        teamSetup.SetupTeam();
                    }
                    break;
                case "CO":
                    {
                        ITeamSetup teamSetup = new Construction(new ConsoleRepository());
                        teamSetup.DomainPrefix = args[1];
                        teamSetup.SetupTeam();
                    }
                    break;
                case "CN":
                    {
                        ITeamSetup teamSetup = new Contingency(new ConsoleRepository());
                        teamSetup.DomainPrefix = args[1];
                        teamSetup.SetupTeam();
                    }
                    break;
                case "WK":
                    {
                        ITeamSetup teamSetup = new PoliticalRisk(new ConsoleRepository());
                        teamSetup.DomainPrefix = args[1];
                        teamSetup.SetupTeam();
                    }
                    break;
                case "AH":
                    {
                        ITeamSetup teamSetup = new AccidentnHealth(new ConsoleRepository());
                        teamSetup.DomainPrefix = args[1];
                        teamSetup.SetupTeam();
                    }
                    break;
                case "CM":
                    {
                        ITeamSetup teamSetup = new CrisisManagement(new ConsoleRepository());
                        teamSetup.DomainPrefix = args[1];
                        teamSetup.SetupTeam();
                    }
                    break;
            }

        }
    }
}
