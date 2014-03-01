DeviceClient.View.BusinessObjectView = function(controller) {
	
	// Call parent constructor.
	DeviceClient.View.ViewBase.call ( this, controller );

	// Public properties.
	this.master = {};				// Major object collection: all controls on the left search area.
	this.detail = {};				// Major object collection: all controls in the detail record area on the right.
	this.detailNavigationLeftButton = null;	
	this.businessObjectId = this.controller.id;
	
	// Constructor functionality.
															   
	this.build();
}

DeviceClient.View.BusinessObjectView.inherits(DeviceClient.View.ViewBase); // Declare base class. Has to happen after function definition because otherwise Javascript does not know the child object is a function. Could pre-declare inherits if we used "function childClass() { ... }" but we do not use that form because it clutters the global namespace.


// Prototype functions.


DeviceClient.View.BusinessObjectView.prototype.build = function() {

	this.buildMasterWindow();
	this.buildBaseDetailWindow();
	
	this.master.navigation	= DeviceClient.UI.Util.createWindowNavigator ( { window: this.master.window } ); // Ti.UI.iPhone.createNavigationGroup({ window: this.master.window });
	this.detail.navigation	= DeviceClient.UI.Util.createWindowNavigator ( { window: this.detail.window } ); // Ti.UI.iPhone.createNavigationGroup({ window: this.detail.window });
	
	this.splitView =  Ti.UI.iPad.createSplitWindow  ( { navBarHidden: false } );
	
	this.splitView.masterView = this.master.navigation; 
	this.splitView.detailView = this.detail.navigation;
	this.splitView.popoverView = this.master.view;
	
	this.globalBOActionButton = Ti.UI.createButton( { backgroundImage : DeviceClient.CONST.ACTION_BUTTON_IMAGE,
											   width : 30,
											   height : 15 } );
	this.globalBOActionButton.addEventListener ( "click", _.bind(function(event){this.controller.onGlobalBOActionClick(event);}, this) );						
	this.splitView.rightNavButton = this.globalBOActionButton;	
	
	this.win = this.splitView;			
}

DeviceClient.View.BusinessObjectView.prototype.open = function(options) {
	
	if ( this.win != null ) {
		this.orientate(); 
	}
}

DeviceClient.View.BusinessObjectView.prototype.close = function() {
	
	this.master.window.close();
	this.detail.window.close();
	
	this.master.navigation.close();
	this.detail.navigation.close();
	this.splitView.close();		
	
	this.master.window = null;
	this.detail.window = null;
	this.master.navigation	= null;
	this.detail.navigation	= null;
				
	this.win.masterView = null;
	this.win.detailView = null;
	this.win.popoverView = null;	


	this.splitView = null;
	this.win = null;		
	
	this.controller 		= null;
}

// Lays out itself with respect to the device's current orientation.
DeviceClient.View.BusinessObjectView.prototype.orientate = function(event) {

	if ( event != null ) {
		switch (event.orientation) {
			case Ti.UI.PORTRAIT:
			case Ti.UI.UPSIDE_PORTRAIT:			
				this.openPortrait();
				break;
			case Ti.UI.LANDSCAPE_LEFT:
			case Ti.UI.LANDSCAPE_RIGHT:
				this.openLandscape();		
				break;	
			default:
				this.openPortrait();
				break;				
		}
	} else {
		var orientation = this.win.orientation;
		switch (orientation) {
			case Ti.UI.PORTRAIT:
			case Ti.UI.UPSIDE_PORTRAIT:			
				this.openPortrait();
				break;
			case Ti.UI.LANDSCAPE_LEFT:
			case Ti.UI.LANDSCAPE_RIGHT:
				this.openLandscape();		
				break;	
			default:
				this.openPortrait();
				break;					
		}		
	}
}

DeviceClient.View.BusinessObjectView.prototype.buildMasterWindow = function() {
	
	
	this.master.window = Ti.UI.createWindow({ backgroundColor: 'green', title: 'Master View - Red Window' });
	this.master.view = Ti.UI.createView();	

}

DeviceClient.View.BusinessObjectView.prototype.buildBaseDetailWindow = function() {
	
	if (this.businessObjectId == "0") {
		this.detail.window = Ti.UI.createWindow({ backgroundColor: 'red', title: 'Detail View - Red Window' });	
	} else if (this.businessObjectId == "1") {
		this.detail.window = Ti.UI.createWindow({ backgroundColor: 'yellow', title: 'Detail View - Yellow Window' });	
	} else if (this.businessObjectId == "9") {
		this.detail.window = Ti.UI.createWindow({ backgroundColor: 'white', title: 'Detail View - White Window' });	
	} else {
		this.detail.window = Ti.UI.createWindow({ backgroundColor: 'pink', title: 'Detail View - Pink Window' });			
	}
	
	this.detailNavigationLeftButton = Ti.UI.createButton( { title : "Search",
											   				width : 30,
											   				height : 15 } );
											   				  										   				  
}

DeviceClient.View.BusinessObjectView.prototype.openPortrait = function() {
	this.detail.window.leftNavButton = this.detailNavigationLeftButton;
}

DeviceClient.View.BusinessObjectView.prototype.openLandscape = function() {
	this.detail.window.leftNavButton = null;
}

DeviceClient.View.BusinessObjectView.prototype.refresh = function() {

}

