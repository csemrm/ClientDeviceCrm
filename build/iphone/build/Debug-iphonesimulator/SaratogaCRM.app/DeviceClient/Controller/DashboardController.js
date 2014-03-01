
DeviceClient.Controller.DashboardController = function(properties) {	
	// Call parent constructor.
	DeviceClient.Controller.ControllerBase.call ( this );

	// Constructor functionality.
	this.id = properties.id;	
	this.view = DeviceClient.CONST.SMALL_DEVICE ? new DeviceClient.View.DashboardSDView(this) :  new DeviceClient.View.DashboardView(this); // View object always created on controller construction because the tab group controller needs the view's window to correctly initialise.
	this.model = new DeviceClient.Model.DashboardModel(this.view);
}
DeviceClient.Controller.DashboardController.inherits(DeviceClient.Controller.ControllerBase); // Declare base class. Has to happen after function definition because otherwise Javascript does not know the child object is a function. Could pre-declare inherits if we used "function childClass() { ... }" but we do not use that form because it clutters the global namespace.

// Prototype functions.
DeviceClient.Controller.DashboardController.prototype.onRefreshClick = function ( event ) {
}

DeviceClient.Controller.DashboardController.prototype.orientate = function(event) {

	this.view.orientate(event);
}

DeviceClient.Controller.DashboardController.prototype.onActivateTab1ButtonClick = function ( event ) {
	//DeviceClient.App.tabGroupController.activateTabByTypeById(DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.BUSINESS_OBJECT, "3");
	
	var tab = DeviceClient.App.tabGroupController.getTabByTypeById(DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.BUSINESS_OBJECT, "3");
	if (tab != undefined) {
		DeviceClient.App.tabGroupController.closeTab(tab);
	}
}
