$(function()
{
	var ConsoleApp = window.ConsoleApp = window.ConsoleApp || { };

	ConsoleApp.adminTeamRepository = new function() {
		var self = this;

		self.basicTeamList = [];
		self.fullDataTeamList = [];

		self.Initialize = function()
		{
			amplify.request.define(ConsoleApp.adminConfig.request_GetTeamsFullDataList, "ajax", {
				url: "/Admin/GetTeamsFullData",
				dataType: "json",
				type: "GET"
			});

			amplify.request.define(ConsoleApp.adminConfig.request_CreateTeam, "ajax", {
				url: "/Admin/CreateTeam",
				dataType: "json",
				contentType: 'application/json',
				type: "POST"
			});
			
			amplify.request.define(ConsoleApp.adminConfig.request_DeleteTeam, "ajax", {
				url: "/Admin/DeleteTeam",
				dataType: "json",
				contentType: 'application/json',
				type: "DELETE"
			});
			
			amplify.request.define(ConsoleApp.adminConfig.request_EditTeam, "ajax", {
				url: "/Admin/EditTeam",
				dataType: "json",
				contentType: 'application/json',
				type: "PUT"
			});
			
			return self.SetTeamsBasicAndFullDataList();
		};
		
		self.SetTeamsBasicAndFullDataList = function()
		{
			return $.Deferred(function(dfd)
			{
				amplify.request({
					resourceId: ConsoleApp.adminConfig.request_GetTeamsFullDataList,
					data: null,
					success: function(data) {
						self.basicTeamList = [];
						self.fullDataTeamList = [];
						$.each(data, function(key, team)
						{
							var basicTeam = self.SetBasicTeamAndRelatedOffices(team);
							self.basicTeamList.push(basicTeam);

							var fullTeam = self.SetFullTeamData(team);
							self.fullDataTeamList.push(fullTeam);
						});

						// Basic Teams And Related Offices
						self.PublishBasicTeamList(self.basicTeamList);

						// Full Teams Data
						self.PublishFullTeamsDataList(self.fullDataTeamList);

						dfd.resolve(data);
					},
					error: dfd.reject
				});

			}).promise();

		};

		// Request - Posts 
		self.CreateTeam = function(teamDto)
		{
			return $.Deferred(function(dfd)
			{
				amplify.request({
					resourceId: ConsoleApp.adminConfig.request_CreateTeam,
					data: teamDto,
					success: function(data) {

						// Basic Team List
						self.basicTeamList.push({ Id: data.Id, Title: data.Title, RelatedOffices: data.RelatedOffices });
						self.PublishBasicTeamList(self.basicTeamList);

						// Full Team List
						//var fullTeam = self.SetFullTeamData(data);
						//self.fullDataTeamList.push(fullTeam);

						dfd.resolve(data);	
					},
					error: dfd.reject
				});

			}).promise();
		};

		self.EditTeam = function(team)
		{
			var teamDto = ko.toJSON(team);

			return $.Deferred(function(dfd)
			{
				amplify.request({
					resourceId: ConsoleApp.adminConfig.request_EditTeam,
					data: teamDto,
					success: function(data)
					{
						// Basic Team List
						var basicTeamMatch = _.find(self.basicTeamList, function(item) { return item.Id === team.Id(); });
						if (basicTeamMatch)
						{
							basicTeamMatch.Title = team.Title();
							self.PublishBasicTeamList(self.basicTeamList);
						}
						
						// Full Team List
						var fullTeamMatch = _.find(self.fullDataTeamList, function(item) { return item.Id() === team.Id(); });
						if (fullTeamMatch)
						{
							fullTeamMatch.Title(team.Title());
						}
						
						dfd.resolve(data);
					},
					error: dfd.reject
				});

			}).promise();
		};
		
		self.DeleteTeam = function(teamDto, teamId)
		{
			return $.Deferred(function(dfd)
			{
				amplify.request({
					resourceId: ConsoleApp.adminConfig.request_DeleteTeam,
					data: teamDto,
					success: function(data)
					{

						// Basic Team List
						self.basicTeamList = _.filter(self.basicTeamList, function(item)
						{
							return item.Id != teamId;
						});
						self.PublishBasicTeamList(self.basicTeamList);

						// Full Team List
						self.fullDataTeamList = _.filter(self.basicTeamList, function(item)
						{
							return item.Id != teamId;
						});

						dfd.resolve(data);
					},
					error: dfd.reject
				});

			}).promise();
		};

		// PubSub - publish
		self.PublishBasicTeamList = function(teams) {
			amplify.publish(ConsoleApp.adminConfig.pubSub_BasicTeamList, teams); 
		};
		
		self.PublishFullTeamsDataList = function(teams) {
			amplify.publish(ConsoleApp.adminConfig.pubSub_FullTeamsDataList, teams); 
		};

		// Helpers
		self.SetBasicTeamAndRelatedOffices = function(team)
		{
			var offices = [];
			$.each(team.RelatedOffices, function(officekey, officevalue)
			{
				offices.push({ Id: officevalue.Id, Title: officevalue.Title });
			});
			return { Id: team.Id, Title: team.Title, relatedOffices: offices };
		};

		self.SetFullTeamData = function(team)
		{
			if (team.AllLinks)
			{
				var allLinksList = [];
				$.each(team.AllLinks, function(key, value) {
					allLinksList.push(new ConsoleApp.Link().Id(value.Id).Title(value.Title).Url(value.Url).Category(value.Category));
				});
			}

			if (team.AllUsers)
			{
				var allUserList = [];
				$.each(team.AllUsers, function(key, value) {
					allUserList.push(new ConsoleApp.BasicUser().Id(value.Id).DomainLogon(value.DomainLogon));
				});
			}

			if (team.AllRelatedCOBs)
			{
				var allRelatedCobList = [];
				$.each(team.AllRelatedCOBs, function(key, value) {
					allRelatedCobList.push(new ConsoleApp.COB().Id(value.Id).Narrative(value.Narrative));
				});
			}

			if (team.AllRelatedOffices)
			{
				var allRelatedOfficeList = [];
				$.each(team.AllRelatedOffices, function(key, value) {
					allRelatedOfficeList.push(new ConsoleApp.Office().Id(value.Id).Title(value.Title));
				});
			}

			if (team.Links) {
				var linksList = [];
				$.each(team.Links, function(key, value) {
					linksList.push(new ConsoleApp.Link().Id(value.Id).Title(value.Title).Url(value.Url).Category(value.Category));
				});
			}

			if (team.Users)
			{
				var userList = [];
				$.each(team.Users, function(key, value) {
					userList.push(new ConsoleApp.BasicUser().Id(value.Id).DomainLogon(value.DomainLogon));
				});
			}

			if (team.RelatedCOBs)
			{
				var relatedCobList = [];
				$.each(team.RelatedCOBs, function(key, value) {
					relatedCobList.push(new ConsoleApp.COB().Id(value.Id).Narrative(value.Narrative));
				});
			}

			if (team.RelatedOffices)
			{
				var relatedOfficeList = [];
				$.each(team.RelatedOffices, function(key, value) {
					relatedOfficeList.push(new ConsoleApp.Office().Id(value.Id).Title(value.Title));
				});
			}
			
			return new ConsoleApp.Team(
				team.Id,
				team.Title,
				team.DefaultMOA,
				team.DefaultDomicile,
				team.QuoteExpiryDaysDefault,
			    team.FilterInsLRByTeam,
				team.SubmissionTypeId,
        		team.SubmissionTypeTitle,
				team.ExpiryDateOffset,
				userList,
				linksList,
				relatedCobList,
				relatedOfficeList,
				allUserList,
				allLinksList,
				allRelatedCobList,
				allRelatedOfficeList,
				team.DefaultPolicyType
				);
		};
		
		// Store to Browser

		// Basic team List
		//self.StoreBasicTeamListToClient = function(teams)
		//{
		//	amplify.store(ConsoleApp.adminConfig.store_BasicTeamList(), ko.toJSON(teams));
		//};

		//self.GetBasicTeamListFromClientStore = function()
		//{
		//	return ko.toJS(amplify.store(ConsoleApp.adminConfig.store_BasicTeamList()));
		//};

		return self;
	};
});