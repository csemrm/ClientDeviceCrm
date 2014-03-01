
DeviceClient.Model.BusinessObjectModel = function(title, baseTableName, baseTableId) {
	
	// Call parent constructor.
	DeviceClient.Model.ModelBase.call ( this );

	// Constructor functionality.
	this.title = title;											// 
	this.baseTableName = baseTableName;    						// The root table this business object is handling. Other table records may get stacked in the detail area, but the root table is important as its own concept: it is the search results for the root table that drive the navigation of data.
	this.baseTableId = baseTableId;								// The root table id this business object is handling.
}

DeviceClient.Model.BusinessObjectModel.inherits(DeviceClient.Model.ModelBase); // Declare base class. Has to happen after function definition because otherwise Javascript does not know the child object is a function. Could pre-declare inherits if we used "function childClass() { ... }" but we do not use that form because it clutters the global namespace.

// Prototype functions.

// recordId: optional. Select this record once the search is shown.
// searchData: optional. If present then BO loaded with that search result. If null then default search is attempted. 
// selectedRecordId: select this record if it is in the search results (either searchData or default search). If null then first record is selected.
DeviceClient.Model.BusinessObjectModel.prototype.load = function ( ) {
	
}

