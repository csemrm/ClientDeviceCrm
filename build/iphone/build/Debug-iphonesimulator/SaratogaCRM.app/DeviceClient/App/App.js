// Main app thread.
// Initialises the app and launches everything else.

(function() {
	DeviceClient.App = {}; // Declare the "namespace". App only exists in the main thread.

	// Public properties.
	//DeviceClient.App.launchURL = null;
	//DeviceClient.App.resumeURL = null;
	
	DeviceClient.App.main = function(){

		DeviceClient.App.tabGroupController = new DeviceClient.Controller.TabGroupController();
		
		DeviceClient.App.load();
		DeviceClient.App.open();
	}
	
	DeviceClient.App.load = function(){
		// Load the tab group, but don't display yet.
		return DeviceClient.App.tabGroupController.load();
	}
	
	DeviceClient.App.open = function(){
		DeviceClient.App.tabGroupController.open();
	}
	
	DeviceClient.App.unload = function(){
		DeviceClient.App.tabGroupController.unload();
	}		
		
	
}());

