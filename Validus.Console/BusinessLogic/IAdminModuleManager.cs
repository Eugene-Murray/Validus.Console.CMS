using System;
using System.Collections.Generic;
using Validus.Console.DTO;
using Validus.Models;

namespace Validus.Console.BusinessLogic
{
    public interface IAdminModuleManager
    {
        // Team
        Team GetTeam(int? teamId);
        List<TeamDto> GetTeamsFullData();
        //RequiredDataCreateTeamDto GetRequiredDataCreateTeam();
        //TeamDto CreateTeam(TeamDto team);
        //TeamDto EditTeam(TeamDto team);
        string DeleteTeam(Team team);

        // User
        //UserDto GetUser(int? userId);
        List<User> GetUsers();
        List<string> GetUsersInTeam(int? teamId);
        int CreateUser(UserDto user);
        //int EditUser(UserDto user);
        string DeleteUser(User user);
        //UserDto GetSelectedUserByName(string userName);
        
        List<UserDto> SearchForUserByName(string userName);
        RequiredDataUserDto GetRequiredDataCreateUser();
       // List<UserTeamLinkDto> GetUserTeamLinks();

        // Link
        Link GetLink(int? linkId);
        List<Link> GetLinks();
        Link CreateLink(Link link);
        Link EditLink(Link link);
        string DeleteLink(Link link);
        List<Link> GetLinksForTeam(int? teamId);
        string SaveLinksForTeam(TeamLinksDto teamLinksDto);

    }
}
