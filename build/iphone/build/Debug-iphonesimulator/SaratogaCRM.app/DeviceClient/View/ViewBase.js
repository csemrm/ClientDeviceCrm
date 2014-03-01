// Initialise the "namespace".
if ( typeof DeviceClient.View !== "object" ) {
	DeviceClient.View = {}; 
}

DeviceClient.View.ViewBase = function(controller) {
	
	// Public variables.
    this.controller = null;
    this.win = null;
    this.underConstructionLabel = null;

	// Constructor functionality.
	
	// Remember constructor.
    this.controller = controller;
}

// Prototype functions.

DeviceClient.View.ViewBase.prototype.build = function() {

	// Subclasses should create the UI elements that are children of the this.win window. 
	// Do not fill in their data in this method. That is what load() is for.
}

// Load the data into the UI created in build().
DeviceClient.View.ViewBase.prototype.load = function() {

	// Fill in the data into the UI created in build() 
}

DeviceClient.View.ViewBase.prototype.open = function() {
	if ( this.win != null ) {
		this.win.open();
		this.win.show();
	}
}

DeviceClient.View.ViewBase.prototype.addConstructionMessage = function() {
	if ( this.win != null ) {
			
		// A simple label is shown on the window in case the construction of the real contents takes a while.
		this.underConstructionLabel = Ti.UI.createLabel ( { id: "windowEmptyLabel",
													  color: DeviceClient.CONST.FIELD_FOREGROUND_COLOUR,
													  shadowColor: DeviceClient.CONST.FIELD_BACKGROUND_COLOUR,
													  shadowOffset: {x: 0, y: 1},
													  textAlign: "center",
													  opacity: DeviceClient.CONST.HINT_TEXT_OPACITY,
													  width: "auto",
													  height: "auto",
													  bottom: "50%", // Slightly offset so that the activity spinner does not display on top of the text.
													  text: "Loading..." } );
		this.win.add(this.underConstructionLabel);
	}
}

DeviceClient.View.ViewBase.prototype.removeConstructionMessage = function() {

	if ( this.win != null && this.underConstructionLabel != null ) {
		this.win.remove(this.underConstructionLabel);
	}
}

DeviceClient.View.ViewBase.prototype.close = function() {	
	if ( this.win != null ) {
		this.win.close();
		this.win = null; 
	}
	
	this.controller = null;	
}

DeviceClient.View.ViewBase.prototype.getWindow = function() {

   	return this.win;
}
