var ConsoleApp = window.ConsoleApp = window.ConsoleApp || {};

ConsoleApp.TeamWarrantyWordingsDto = function () {
    this.TeamId = ko.observable('');
    this.OfficeId = ko.observable('');
    this.WarrantyWordingSettingDtoList = ko.observableArray();
};