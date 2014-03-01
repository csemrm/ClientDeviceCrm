
DeviceClient.View.DashboardView = function(dashboardController) {
	// Call parent constructor.
	DeviceClient.View.ViewBase.call ( this, dashboardController );

	// Constructor functionality.
	
	this.refreshButton = null;

	// Every view must create its top-level window in its constructor so that the tab group controller can use it when defining the navigation tabs.
	this.win = Ti.UI.createWindow ( { top: 0, 
									  navBarHidden: false,
									  title: "",
									  fullscreen: false } );
									  									  
	if ( !DeviceClient.CONST.IOS7Plus ) {
		this.win.backgroundImage = "/Images/general_background.png";
	} else {
		this.win.backgroundColor = DeviceClient.CONST.WINDOW_BACKGROUND_COLOUR;
	}			
							  
	this.refreshButton = Ti.UI.createButton( { backgroundImage : DeviceClient.CONST.DASHBOARD_REFRESH_BUTTON_IMAGE,
											   width : DeviceClient.CONST.DASHBOARD_REFRESH_BUTTON_SIZE,
											   height : DeviceClient.CONST.DASHBOARD_REFRESH_BUTTON_SIZE } );
	this.refreshButton.addEventListener ( "click", _.bind(function(event){this.controller.onRefreshClick(event);}, this) );
							
	this.win.rightNavButton = this.refreshButton;

	
	this.emptyDashboardView = Ti.UI.createView ( { backgroundImage: "/Images/general_background.png",
												     opacity: DeviceClient.CONST.HIDE_MOST_THINGS_BELOW_OPACITY,
												     visible: true } );
	this.win.add(this.emptyDashboardView);

	this.emptyMaskImage = Ti.UI.createLabel ( { width: "362",
											    height: "167",
											    opacity: 0.6,
											    backgroundImage: "/Images/form_no_item_selected.png" } );
		
	this.emptyDashboardView.add(this.emptyMaskImage);
	
	this.activateTab1Button = Ti.UI.createButton( { title: L('activate tab 1'),
											   width : 200,
											   height : 40,
											   top: 50 } );
	this.activateTab1Button.addEventListener ( "click", _.bind(function(event){this.controller.onActivateTab1ButtonClick(event);}, this) );

	this.emptyDashboardView.add(this.activateTab1Button);		
							  
									  	
}
DeviceClient.View.DashboardView.inherits(DeviceClient.View.ViewBase); // Declare base class. Has to happen after function definition because otherwise Javascript does not know the child object is a function. Could pre-declare inherits if we used "function childClass() { ... }" but we do not use that form because it clutters the global namespace.

// Prototype functions

// Override functions - start
DeviceClient.View.DashboardView.prototype.build = function() {
	
}

DeviceClient.View.DashboardView.prototype.open = function() {
	
	if ( this.win != null ) {
		this.orientate(); 
	}	
}

DeviceClient.View.DashboardView.prototype.close = function() {

	// TODO - Revisit after Appcelerator fixes memory leaks with removal of tabs and
	// freeing of the associated windows
		
	if (this.emptyDashboardView) {
		this.emptyDashboardView.remove(this.emptyMaskImage);
		this.win.remove(this.emptyDashboardView);
		this.emptyDashboardView = null;	
	}
	
	this.win.rightNavButton = null;
	
	this.emptyMaskImage = null;
	this.refreshButton = null;
	
	if ( this.win != null ) {
		//this.win.close();
		this.win = null; 
	}
	
	this.controller = null;		
}

// Override functions - end

DeviceClient.View.DashboardView.prototype.buildDashboard = function() {
	
	if (this.controller && this.controller.model)
	{
		// Set the dashboard's title
		var dashboardTitle = this.controller.model.getDashboardTitle();
		this.win.title = dashboardTitle;
	}	
}

DeviceClient.View.DashboardView.prototype.orientate = function(event) {
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

DeviceClient.View.DashboardView.prototype.openPortrait = function() {
 var i = 0;
}

DeviceClient.View.DashboardView.prototype.openLandscape = function() {
 var i = 0;
}


