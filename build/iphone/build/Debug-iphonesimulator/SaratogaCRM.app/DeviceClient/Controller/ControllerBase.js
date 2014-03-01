// Initialise the "namespace".
if ( typeof DeviceClient.Controller !== "object" ) {
	DeviceClient.Controller = {}; 
}

DeviceClient.Controller.ControllerBase = function() {
	
	// Public variables.
	this.view = null; 	// Must be created in subclass's constructor. this.view.win will hold the window object.
	this.model = null; 	// Must be created in build()

	// Constructor functionality.

}

// Prototype functions.

// Load the data managed by the controller. Do not display it yet.
DeviceClient.Controller.ControllerBase.prototype.load = function() {

	// Build this window and its controls once, if the window does not already exist.
	if ( this.view == null ) {
		this.build();
	}
	
	// Load in the data into the model (and therefore the window too).
	if ( this.model != null ) {
		this.model.load();
	}
}

// Create model and view. Initialise both. Make sure the window and all controls on it exist. Do not automatically show the window.
// build() is called by load. The idea is that the code calling load should not have to know if the controller's window has been fully drawn or not.
DeviceClient.Controller.ControllerBase.prototype.build = function() {

	// Subclasses should Ti.UI.createWindow() here and build any controls in the window in this function. 
	/* For example:	
	if ( this.view == null ) {
		this.view = new DeviceClient.settingView(this);
		this.model = new DeviceClient.Model.SettingsModel(this.view);
	}
	*/
}

// Display the controller's view. Shows the window with its loaded data. 
DeviceClient.Controller.ControllerBase.prototype.open = function() {
	
	// Load data into window (and create window if not already built).
	this.load();
	
	// Show the window.
	if ( this.view != null ) {
		this.view.open();
	}
}

// Stop displaying the controller's view. 
// It is up to the view to decide if it closes the window or hides it.
DeviceClient.Controller.ControllerBase.prototype.close = function() {

	if ( this.view != null ) {
		this.view.close();
	}
}

DeviceClient.Controller.ControllerBase.prototype.getWindow = function() {

	if ( this.view != null ) {
  		return this.view.win;
  	}
}

// Definitely clean up everything.
DeviceClient.Controller.ControllerBase.prototype.destroy = function() {

	// Close, if this has not already happened.
	this.close();

	// Destroy the view, if it still exists.
	if ( this.view != null ) {
		this.view.destroy();
		this.view = null;
	}

	// TODO Do the models need a more structured function to tear themselves down properly?
	this.model = null;
}
