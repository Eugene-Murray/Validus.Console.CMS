$(function() {

	var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

	ConsoleApp.adminConfig = new function() {
		this.request_GetTeamsFullDataList = "request-GetTeamsFullDataList";
		this.request_CreateTeam = "request-CreateTeam";
		this.request_DeleteTeam = "request-DeleteTeam";
		this.request_EditTeam = "request-EditTeam";
		this.pubSub_BasicTeamList = "pubSub-BasicTeamList";
		this.pubSub_FullTeamsDataList = "pubSub-FullTeamsDataList";
	};
});