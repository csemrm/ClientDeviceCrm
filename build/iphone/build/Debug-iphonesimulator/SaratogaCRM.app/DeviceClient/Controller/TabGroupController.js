
DeviceClient.Controller.TabGroupController = function() {
	
	// Call parent constructor.
	DeviceClient.Controller.ControllerBase.call ( this );

	// Properties.
	this.model = null;
	this.view = null;

	// Constructor functionality.
	this.businessObjectControllers = []; 	// The main controller manages an array of BusinessObjectController objects once we get the meta data.
	this.dashboardController = null;
}

DeviceClient.Controller.TabGroupController.inherits(DeviceClient.Controller.ControllerBase); // Declare base class. Has to happen after function definition because otherwise Javascript does not know the child object is a function. Could pre-declare inherits if we used "function childClass() { ... }" but we do not use that form because it clutters the global namespace.

// Prototype functions.

// Load the data managed by the controller. 
DeviceClient.Controller.TabGroupController.prototype.load = function() {

	// Build the view and model once, if they do not already exist.
	if ( this.view == null ) {
		this.build();
	}
	
	// Load in the data into the model (and therefore the window too).
	this.model.load();
		
	// Create the controllers for the business objects.
	var numTabs = this.model.layout.tabs.length;
	for ( var i=0; i<numTabs; i++ ) {
		if ( this.model.layout.tabs[i].Type == DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.DASHBOARD) {
			this.dashboardController = new DeviceClient.Controller.DashboardController( { id: this.model.layout.tabs[i].Id } ); 			
		}		
		
		else if ( this.model.layout.tabs[i].Type == DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.BUSINESS_OBJECT) {
			var newBusinessObjectController = new DeviceClient.Controller.BusinessObjectController ( { title: this.model.layout.tabs[i].Label != null && this.model.layout.tabs[i].Label != undefined ? this.model.layout.tabs[i].Label : this.model.layout.tabs[i].Name, 
																							 	  	   id: this.model.layout.tabs[i].Id, 
																							 	  	   tableName: this.model.layout.tabs[i].Table,
																							 	  	   tableId: this.model.layout.tabs[i].TableId
																							 	     } );
			this.businessObjectControllers.push ( newBusinessObjectController );
		}
	}
	
	// Get our view to load and build the tab-group navigation for all the meta-data driven business objects, and for the built-in app functins like settings, etc.
	this.view.loadLayout(this.model.layout);
	this.view.buildLayout();
}

// Ensure the view and model managed by the controller exist. 
// This builds all the objects and controls but does not load data into the view or display the window.
DeviceClient.Controller.TabGroupController.prototype.build = function() {

	// Create the view and model managed by this controller.
	if ( this.view == null ) {		
        this.view = new DeviceClient.View.TabGroupView (this);
        this.model = new DeviceClient.Model.TabGroupModel(this);
	}
}

// Display the controller's view. Shows the window with its loaded data. 
DeviceClient.Controller.TabGroupController.prototype.open = function() {
	
	// Show the window.
	if ( this.view != null ) {
		this.view.open();
	}
}

// Definitely clean up everything.
DeviceClient.Controller.TabGroupController.prototype.unload = function() {

	if ( this.view != null ) {
		this.view.close();
		this.view = null; // TODO test for memory release!
	}
	
	if ( this.dashboardController != null ) {
		this.dashboardController.close();
		this.dashboardController = null;
	}
	
	if ( this.businessObjectControllers != null ) {
		for (var i = 0; i < this.businessObjectControllers.length; i++) {
			var bsnObjCtrller = this.businessObjectControllers[i].close();
		}
	}
	
	this.businessObjectControllers = {};
	this.model = null; // TODO test for memory release!	
}

// Called when the tabs are first displayed, before onTabGroupOpen(). And also called when a click on any of the tab group tab buttons happens.
// Note: this.view.win.activeTab is maintained by the Ti platform and will reflect the user's click at the point this function is called.
DeviceClient.Controller.TabGroupController.prototype.onTabFocus = function(event) {

	// Don't do display of tab windows unless this event is coming after the tab group is on display. 
	// Note: this event can get called before the tab group is shown, and after the tab group has been destroyed.
	// Hence the test for this.view != null is there because this event can happen after the main controller destroys all its children, including the view and tab.
	// Also event.index == -1 is possible. In both cases the eventis ignored.
	if ( event.index >= 0 && this.view != null ) { 

		var tabGroup = this.view.getWindow();
				
		// Because the call to onTabFocus is event driven, it is possible during logout that the underlying objects are destroyed before it gets executed. So extra checks are made for this case.
		if ( tabGroup != null && tabGroup.activeTab != null ) {
			this.openTab(tabGroup.activeTab);	
		}
	} 
}

DeviceClient.Controller.TabGroupController.prototype.onOrientationChange = function(event) {
	this.orientate(event);
}

DeviceClient.Controller.TabGroupController.prototype.openTab = function(tab) {

	if (!tab) {
		return;
	} 
	
	var controller = this.getTabController(tab.functionType, tab.id);
	if (!controller) {
		return;
	}
	
	controller.open();
}

DeviceClient.Controller.TabGroupController.prototype.closeTab = function(tab) {

	if (!tab) {
		return;
	} 
	
	var controller = this.getTabController(tab.functionType, tab.id);
	if (!controller) {
		return;
	}

	if ( this.view != null ) { 

		var tabGroup = this.view.getWindow();
		if ( tabGroup != null ) {
			tabGroup.removeTab(tab);	
		}
	} 
	
	controller.close();	
	this.removeTabController(tab.functionType, tab.id);
}


DeviceClient.Controller.TabGroupController.prototype.activateTabByTypeById = function(tabType, tabId) {
	
	var tabGroup = this.view.getWindow();
	
	var tabToDisplay = null;
	for (var tabIndex = 0; tabIndex < tabGroup.tabs.length; tabIndex++) {
		var tab = tabGroup.tabs[tabIndex];	
		if (tab != null && tab.functionType == tabType && tab.id == tabId) {
			tabToDisplay = tab;
			break;
		}
	}
	
	if (tabToDisplay != null) {
		this.view.displayTab(tabToDisplay);		
	}
}

DeviceClient.Controller.TabGroupController.prototype.activateTabByTableId = function(tableId) {
	
	var tabGroup = this.view.getWindow();
	
	var tabToDisplay = null;
	for (var tabIndex = 0; tabIndex < tabGroup.tabs.length; tabIndex++) {
		var tab = tabGroup.tabs[tabIndex];	
		if (tab != null && tab.functionType == DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.BUSINESS_OBJECT && tab.businessObjectTableId == tableId) {
			tabToDisplay = tab;
			break;
		}
	}
	
	if (tabToDisplay != null) {
		this.view.displayTab(tabToDisplay);		
	}
}

// The base window, once login has happened.
DeviceClient.Controller.TabGroupController.prototype.getWindow = function ( ) {

	if ( this.view != null ) {
		return this.view.getWindow();
	}
	
	return null;
}

DeviceClient.Controller.TabGroupController.prototype.getTabController = function ( controllerType, tabId ) {

	if ( controllerType == DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.DASHBOARD ) {
		if ( this.dashboardController.id == tabId ) {
			return this.dashboardController;
		}	
	} else if ( controllerType == DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.BUSINESS_OBJECT ) {
		var numControllers = this.businessObjectControllers.length;
		for ( var i=0; i< numControllers; i++ ) {
			if ( this.businessObjectControllers[i].id == tabId ) {
				return this.businessObjectControllers[i];
			}
		}		
	}

	return null;
}

DeviceClient.Controller.TabGroupController.prototype.getTabByTypeById = function(tabType, tabId) {
	
	var tabGroup = this.view.getWindow();
	
	var getTab = null;
	for (var tabIndex = 0; tabIndex < tabGroup.tabs.length; tabIndex++) {
		var tab = tabGroup.tabs[tabIndex];	
		if (tab != null && tab.functionType == tabType && tab.id == tabId) {
			getTab = tab;
			break;
		}
	}
	
	return getTab;
}

DeviceClient.Controller.TabGroupController.prototype.getBusinessObjectByTableId = function ( tableId ) {

	var numControllers = this.businessObjectControllers.length;
	for ( var i=0; i< numControllers; i++ ) {
		if ( this.businessObjectControllers[i].businessObjectTableId == tableId ) {
			return this.businessObjectControllers[i];
		}
	}
	
	return null;
}

DeviceClient.Controller.TabGroupController.prototype.removeTabController = function ( controllerType, tabId ) {

	if ( controllerType == DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.DASHBOARD ) {
		if ( this.dashboardController.id == tabId ) {
			this.dashboardController = null;
		}	
	} else if ( controllerType == DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.BUSINESS_OBJECT ) {
		var numControllers = this.businessObjectControllers.length;
		for ( var i=0; i< numControllers; i++ ) {
			if ( this.businessObjectControllers[i].id == tabId ) {
				this.businessObjectControllers.splice(i, 1);			
				break;
			}
		}		
	}
}

DeviceClient.Controller.TabGroupController.prototype.orientate = function(event) {
	
	// Don't do anything unless this event is coming after the tab group is on display. 
	if ( this.view != null ) { 
		var tabGroup = this.view.getWindow();
		if ( tabGroup != null && tabGroup.activeTab != null ) {
			var activeController = this.getTabController ( tabGroup.activeTab.functionType, tabGroup.activeTab.id );
			if ( activeController != null ) {
				activeController.orientate(event);
			}		
		}	
	}
}