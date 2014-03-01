
// Note: businessObjectId can be null if the BO is not on the tab group.
// filterSearchDefinition can be unspecified.
DeviceClient.Controller.BusinessObjectController = function ( properties ) {

	// Call parent constructor.
	DeviceClient.Controller.ControllerBase.call ( this );

	// Constructor functionality.
	this.title = "";					// Displayed to user only.
	this.id = properties.id;
	this.businessObjectTableName = properties.tableName;											// Required.
	this.businessObjectTableId = properties.tableId;

	// Create view and model.
	this.view = DeviceClient.CONST.SMALL_DEVICE ? new DeviceClient.View.BusinessObjectSDView(this) : new DeviceClient.View.BusinessObjectView(this);
	// Note: this.model is in the parent.
}
DeviceClient.Controller.BusinessObjectController.inherits(DeviceClient.Controller.ControllerBase); // Declare base class. Has to happen after function definition because otherwise Javascript does not know the child object is a function. Could pre-declare inherits if we used "function childClass() { ... }" but we do not use that form because it clutters the global namespace.

// Prototype functions.

// Load the data managed by the controller. Do not display it yet.
DeviceClient.Controller.BusinessObjectController.prototype.load = function( ) {
	// Build the view and model once, if they do not already exist.
	if ( this.model == null ) {
		this.model = new DeviceClient.Model.BusinessObjectModel ( this.title, this.businessObjectTableName, this.businessObjectTableId);
		this.model.load();	
	}
}

// Display the controller's view. Shows the window with its default loaded data. 
DeviceClient.Controller.BusinessObjectController.prototype.open = function ( options ) {
	
	// Load data into window (and create window if not already built).
	this.load();
	
	// Show the window.
	if ( this.view != null ) {
		this.view.open(options); 
	}
}

// Stop displaying the controller's view. 
// It is up to the view to decide if it closes the window or hides it.
DeviceClient.Controller.BusinessObjectController.prototype.close = function() {

	if ( this.view != null ) {
		this.view.close();
	}
}

// Handle a change in device orientation.
DeviceClient.Controller.BusinessObjectController.prototype.orientate = function(event) {
	
	if ( this.view != null ) {
		this.view.orientate(event); 
	}
}

DeviceClient.Controller.BusinessObjectController.prototype.onGlobalBOActionClick = function(event) {
	
}

