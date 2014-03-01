
DeviceClient.View.TabGroupView = function(controller) {
	
	// Call parent constructor.
	DeviceClient.View.ViewBase.call ( this, controller );

	// Constructor functionality.
    this.layout = null;
    this.win = null;			// this.win is the TabGroup
}
DeviceClient.View.TabGroupView.inherits(DeviceClient.View.ViewBase); // Declare base class. Has to happen after function definition because otherwise Javascript does not know the child object is a function. Could pre-declare inherits if we used "function childClass() { ... }" but we do not use that form because it clutters the global namespace.

// Prototype functions.

DeviceClient.View.TabGroupView.prototype.loadLayout = function(layout) {

   	this.layout = layout;	
}

DeviceClient.View.TabGroupView.prototype.buildLayout = function() {

	this.win = Ti.UI.createTabGroup( { allowUserCustomization: true,
									   editButtonTitle: "Configure", // The title of the button shown at the top of the screen
									   backgroundColor: DeviceClient.CONST.TABGROUP_WINDOW_BACKGROUND_COLOUR
									} );																			
	
	this.createTabGroup();	
}

DeviceClient.View.TabGroupView.prototype.createTabGroup = function() {

	var tabs = this.layout.tabs;
	var tabCount = this.layout.tabs.length;
	

	for (var i = 0; i < tabCount; i++) {
		var tabTitle = tabs[i].Name;
		var tabSubTitle = tabs[i].Label;
		var tabIconName = tabs[i].Icon;
		var tabId = tabs[i].Id;
		var bsnObjTable = tabs[i].Table;
		var bsnObjTableId = tabs[i].TableId;
		var functionType = tabs[i].Type;
		var tabIconUrl = "";
		
		var tabWin = null;
		var tabItem = null;
		var tabController = this.controller.getTabController( functionType, tabId );

		if ( functionType == DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.DASHBOARD ) {
			if ( tabController != undefined ) {
 				tabWin = tabController.getWindow();		 			
			}
			
			tabIconUrl = "/Images/dashboard_tab.png";
				
		} else if ( functionType == DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.BUSINESS_OBJECT ) {
			if ( tabController != undefined ) {
 				tabWin = tabController.getWindow();		 			
			}
						
			if (tabIconName)
				tabIconUrl = DeviceClient.ImageCache.getURL(tabIconName);

			if (!tabIconUrl)
				tabIconUrl = "/Images/business_object_tab.png";			
		}
		
		if ( tabWin != null ) {
	        tabItem = Ti.UI.createTab({ icon: tabIconUrl, iconName : tabIconName, title: tabSubTitle, window: tabWin, functionType: functionType, businessObjectTable: bsnObjTable, businessObjectTableId: bsnObjTableId, id: tabId, businessObjectName: tabTitle }); 	        
	        this.win.addTab(tabItem);	        
	    }
	} 	
	
    this.win.addEventListener ( "focus", _.bind(this.controller.onTabFocus, this.controller) ); 	// Ensure "this" context is this controller when the event happens.
	Ti.Gesture.addEventListener('orientationchange',  _.bind(this.controller.onOrientationChange, this.controller) );
}


DeviceClient.View.TabGroupView.prototype.displayTab = function(tab) {

    this.win.setActiveTab(tab);
}

DeviceClient.View.TabGroupView.prototype.close = function(tabIndex) {

	if ( this.win != null ) {
		var tabCount = this.win.tabs.length;
		
		for (var i = 0; i < tabCount; i++) {
			var tab = this.win.tabs[0]; 
	    	this.win.setActiveTab(tab);		
			this.win.removeTab(tab);			
		}			
	}
	
	if ( this.win != null ) {
		this.win.close();
		this.win = null; 
	}
	
	this.controller = null;	
}
