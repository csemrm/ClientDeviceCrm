
DeviceClient.Model.TabGroupModel = function(controller) {
	
	// Call parent constructor.
	DeviceClient.Model.ModelBase.call ( this, null ); // No view provided in this use of the base model because we don't know the view at the time of construction.

	// Constructor functionality.
    this.controller = controller;
	this.layout = { 'tabs': {} }; 
   
}
DeviceClient.Model.TabGroupModel.inherits(DeviceClient.Model.ModelBase); // Declare base class. Has to happen after function definition because otherwise Javascript does not know the child object is a function. Could pre-declare inherits if we used "function childClass() { ... }" but we do not use that form because it clutters the global namespace.

// Prototype functions.

DeviceClient.Model.TabGroupModel.prototype.load = function() {

	
	// Next thing to do is to load and display the business object tabs.
	var tabGroupLayout = [
/*	
	     {
	        "Icon":"",
	        "Id":"",
	        "Label":"History",
	        "Name":"History",
	        "Ordinal":"0",
	        "Type":DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.HISTORY
	     },
*/
	     {
	        "Icon":"",
	        "Id":"1",
	        "Table": "",
	        "TableId": "",
	        "Label":"B1",
	        "Name":"B1",
	        "Ordinal":"0",
	        "Type":DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.BUSINESS_OBJECT
	     },
	     
	    {
	        "Icon":"",
	        "Id":"2",
	        "Table": "",
	        "TableId": "",	        
	        "Label":"B2",
	        "Name":"B2",
	        "Ordinal":"0",
	        "Type":DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.BUSINESS_OBJECT
	     }, 
	     
	    {
	        "Icon":"",
	        "Id":"3",
	        "Table": "",
	        "TableId": "",	        
	        "Label":"B3",
	        "Name":"B3",
	        "Ordinal":"0",
	        "Type":DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.BUSINESS_OBJECT
	     }, 
	     
	    {
	        "Icon":"",
	        "Id":"4",
	        "Table": "",
	        "TableId": "",	        
	        "Label":"B4",
	        "Name":"B4",
	        "Ordinal":"0",
	        "Type":DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.BUSINESS_OBJECT
	     }, 
	     
	    {
	        "Icon":"",
	        "Id":"5",
	        "Table": "",
	        "TableId": "",	        
	        "Label":"B5",
	        "Name":"B5",
	        "Ordinal":"0",
	        "Type":DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.BUSINESS_OBJECT
	     }, 
	     
	    {
	        "Icon":"",
	        "Id":"6",
	        "Table": "",
	        "TableId": "",	        
	        "Label":"B6",
	        "Name":"B6",
	        "Ordinal":"0",
	        "Type":DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.BUSINESS_OBJECT
	     }, 
	     
	    {
	        "Icon":"",
	        "Id":"7",
	        "Table": "",
	        "TableId": "",	        
	        "Label":"B7",
	        "Name":"B7",
	        "Ordinal":"0",
	        "Type":DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.BUSINESS_OBJECT
	     }, 
	     
	    {
	        "Icon":"",
	        "Id":"8",
	        "Table": "",
	        "TableId": "",	        
	        "Label":"B8",
	        "Name":"B8",
	        "Ordinal":"0",
	        "Type":DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.BUSINESS_OBJECT
	     }, 
	     
	    {
	        "Icon":"",
	        "Id":"9",
	        "Table": "",
	        "TableId": "",	        
	        "Label":"B9",
	        "Name":"B9",
	        "Ordinal":"0",
	        "Type":DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.BUSINESS_OBJECT
	     } 	    	    	    	    	    	    	     
	];
	
	// Adjust the tab group data to include the built-in functions like settings.
	
	// Add in special functions that are part of the app and not determined by the server.
	// Prepend the Dashboard.
	var builtinFunctions = 
     {
        "Icon":"",
        "Id":"dshbrd-1",
        "Label":"Dashboard",
        "Name":"Dashboard",
        "Ordinal":"0",
        "Type":DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.DASHBOARD
     };

	tabGroupLayout.unshift ( builtinFunctions );

  	// Append History and Settings.
	builtinFunctions = [
/*	
	     {
	        "Icon":"",
	        "Id":"",
	        "Label":"History",
	        "Name":"History",
	        "Ordinal":"0",
	        "Type":DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.HISTORY
	     },

	     {
	        "Icon":"",
	        "Id":"",
	        "Label":"Settings",
	        "Name":"Settings",
	        "Ordinal":"0",
	        "Type":DeviceClient.CONST.APP_MENU_FUNCTION_TYPE.SETTINGS
	     }
*/	     
	];
	
	// Update model data.
	this.layout.tabs = tabGroupLayout.concat ( builtinFunctions );
}

