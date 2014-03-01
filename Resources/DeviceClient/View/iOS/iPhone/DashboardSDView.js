
DeviceClient.View.DashboardSDView = function(dashboardController) {

	
	// Call parent constructor.
	DeviceClient.View.ViewBase.call ( this, dashboardController );
	
    // Define the top level container objects.
    this.win = null;
    this.navGroup = null;
    this.master = {};
    this.detail = {};	
    
    this.currentDashboardItem = null;
    this.dashboardItems = {};
    
 	this.orientationIsLandscape = null;//	DeviceClient.Util.isDeviceOrientationLandscape(); // Keeps track of which way the controls in this view has been drawn. Used to determine if a redraw is needed or not when orientation events happen.   
	
	this.isDetailWindowOpen = false;
	
	// Constructor functionality.

	// Every view must create its top-level window in its constructor so that the tab group controller can use it when defining the navigation tabs.
	this.win = Ti.UI.createWindow ( { top: 0, 
									  navBarHidden: true,
									  title: "",
									  fullscreen: false, 
									  backgroundImage: "/Images/general_background.png" } );
									  
	this.blockingOverlay = Ti.UI.createView ( {
						backgroundColor: "#E3E3E3",
						top: 0,
						right: 0, 
						width: "100%", 
						height: "100%",						
						opacity: 0.4,
						visible: false } );	
											
	this.spinner = Ti.UI.createActivityIndicator({
						  style: Ti.Platform.name === 'iPhone OS' ? Ti.UI.iPhone.ActivityIndicatorStyle.BIG : Ti.UI.ActivityIndicatorStyle.DARK,
						});				
																							  							 
}

DeviceClient.View.DashboardSDView.inherits(DeviceClient.View.ViewBase); // Declare base class. Has to happen after function definition because otherwise Javascript does not know the child object is a function. Could pre-declare inherits if we used "function childClass() { ... }" but we do not use that form because it clutters the global namespace.

// Prototype functions.


DeviceClient.View.DashboardSDView.prototype.build = function() {
		
}

DeviceClient.View.DashboardSDView.prototype.open = function() {
	
	if ( this.win != null ) {		
		this.win.open();
		this.win.show();	
	}		
}

DeviceClient.View.DashboardSDView.prototype.buildDashboard = function() {
	
	if (this.controller && this.controller.model)
	{		
		// Create the controls within the main master and detail areas.
		this.buildMasterWindow();
		this.buildDetailWindow();
			
		this.navGroup = DeviceClient.UI.Util.createWindowNavigator({ window: this.master.window });
	
		this.win.add(this.navGroup);	
		this.win.add(this.blockingOverlay);		
		this.win.add(this.spinner);	
	}	
}

DeviceClient.View.DashboardSDView.prototype.buildMasterWindow = function() {

	var dashboardTitle = this.controller.model.getDashboardTitle();
	
	this.master.window = Ti.UI.createWindow ( { title: dashboardTitle } );
															
	this.master.window.addEventListener("open", _.bind(function(event){this.onMasterWindowOpen(event);}, this))						   
																								
	this.master.tableView = Ti.UI.createTableView ( { allowsSelection: true });
	this.master.tableView.addEventListener("click", _.bind ( function(event) {this.showDashboardItem(event);}, this) );
	
	this.master.window.add(this.master.tableView);
	
	this.show();
	
}

DeviceClient.View.DashboardSDView.prototype.buildDetailWindow = function() {

	// - refresh individual dashboard item
	this.detail.refreshButton = Ti.UI.createButton ( { backgroundImage : "/Images/refreshButton_dark.png",
											           width : 25,
											           height : 25 } );	
	this.detail.refreshButton.addEventListener ( "click", _.bind(function(event){this.controller.onRefreshClick(event);}, this) );
		
	this.detail.window = Ti.UI.createWindow();		
	this.detail.window.addEventListener("open", _.bind(function(event){this.onDetailWindowOpen(event);}, this))			
	this.detail.window.addEventListener("focus", _.bind(function(event){this.onDetailWindowFocus(event);}, this))			
	this.detail.window.addEventListener("blur", _.bind(function(event){this.onDetailWindowBlur(event);}, this))			
				   
	this.detail.window.rightNavButton = this.detail.refreshButton;
}

DeviceClient.View.DashboardSDView.prototype.show = function() {
	
}

DeviceClient.View.DashboardSDView.prototype.orientate = function(event) {
	var i = 0;
}

DeviceClient.View.DashboardSDView.prototype.close = function() {

	if ( this.detail.window != null ){
	 	var childwins = this.detail.window.getChildren();
	 	if (childwins !== undefined){
	 		for (var w = childwins.length; w > 0; --w){
	 			this.detail.window.remove(childwins[w-1]);
	 			childwins[w-1] = null;
	 		}
	 	}
 	}
 	
 	if ( this.navGroup != null ) {
		if ( this.detail.window != null ) {
			this.navGroup.close(this.detail.window);
		}
		this.navGroup = null;	
	}	
 		
	if ( this.win != null ) {
		this.win.close();
		this.win = null; 
	}
	
	this.controller = null;		
}
