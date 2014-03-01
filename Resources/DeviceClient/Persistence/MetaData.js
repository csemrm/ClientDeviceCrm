/* Class: MetaData
 * All access to the metadata.
 * History#	Date		Author			Description
 * 1.0		2011-09-25	MDS				Creation.
 */
(function() {
	DeviceClient.MetaData = {}; // Initialise the "namespace".

	// Private variables.
	var metaData = null; // Once loaded in memory, the meta data lives in this variable and is accessed by functions defined below.
	var derivedMetaData = null; // Calculated by the app and only stored in memory.	

	// Public functions.
	
	// Load the metadata if it is not already loaded. Return if successful or not. 
	DeviceClient.MetaData.load = function(displayErrors) {

		if ( !metaData ) {
			return read(displayErrors);
		}
		return true;
	}

	DeviceClient.MetaData.unload = function() {
		metaData = null;
		derivedMetaData = null;
	}

	DeviceClient.MetaData.save = function(newMetaData) {
 
		// Save the meta to the device.
		putMetaDataToDevice ( newMetaData );
				
		// Make sure we are using this new meta.
		metaData = null;
		metaData = newMetaData;
		
		// The app calculates derived meta data from the data sent from the server, for runtime efficiency.
		// If is also calculated elsewhere when the meta data is read from "disk".
		calculateDerivedMetaData ( metaData );
	}
	
	// SilenftMode flag decides if the read method is to be called with the displayErrors flag set.
	DeviceClient.MetaData.getAll = function( silentMode ) {
 
		if ( !metaData ) {
			if ( silentMode == true) {
				read(false);
			} else {
				read(true);
			}
		}
		return metaData;
	}
	 		
	DeviceClient.MetaData.getBusinessObjects = function() {

		if ( !metaData ) {
			read(true);
		}
		return metaData.BusinessObjectDefList;
	}

	// Gets the task pad form for the form id.
	DeviceClient.MetaData.getTaskPad = function ( taskPadId ) {
		
		if ( !metaData ) {
			read(true);
		}
		
		if ( metaData.TaskPadDefList && _.isArray(metaData.TaskPadDefList) ) {
			var numTaskPads = metaData.TaskPadDefList.length;
			for ( var i = 0; i<numTaskPads; i++) {
				if ( metaData.TaskPadDefList[i].Id == taskPadId ) {
					return metaData.TaskPadDefList[i];
				}
			}
		}
		
		return null;
	}

	// Gets the default form for the table name. 
	DeviceClient.MetaData.getDefaultDataFormUiLayoutForTableName = function(tableName) {

		if ( !metaData ) {
			read(true);
		}
		
		// Convert name to id, then use the id-based function.
		var tableId = DeviceClient.MetaData.getTableId(tableName);
		if ( tableId ) {
			return DeviceClient.MetaData.getDefaultDataFormUiLayoutForTableId(tableId);
		}
		
		return null;
	}

	// Gets the default form for the table id. 
	DeviceClient.MetaData.getDefaultDataFormUiLayoutForTableId = function(tableId) {

		if ( !metaData ) {
			read(true);
		}

		var tableInfo = derivedMetaData.TableDefList.TableIds[tableId];
		if ( tableInfo && tableInfo.HasDefaultForm ) {
			return tableInfo.DefaultForm;
		}
		
		return null;
	}

	// Gets the all the root forms for the table id. 
	DeviceClient.MetaData.getRootDataFormsForTableId = function(tableId) {

		if ( !metaData ) {
			read(true);
		}

		var tableInfo = derivedMetaData.TableDefList.TableIds[tableId];
		if ( tableInfo ) {
			return tableInfo.RootForms;
		}
		
		return null;
	}

	// Gets the all the insert forms for the table id. 
	DeviceClient.MetaData.getInsertDataFormsForTableId = function(tableId) {

		if ( !metaData ) {
			read(true);
		}

		var tableInfo = derivedMetaData.TableDefList.TableIds[tableId];
		if ( tableInfo ) {
			return tableInfo.InsertForms;
		}
		
		return null;
	}	
	
	DeviceClient.MetaData.tableHasDefaultForm = function(tableId) {
// 		DeviceClient.Util.logDebug("DeviceClient.MetaData.tableHasDefaultForm");

		if ( !metaData ) {
			read(true);
		}

		var tableInfo = derivedMetaData.TableDefList.TableIds[tableId];
		if ( tableInfo ) {
			return tableInfo.HasDefaultForm;
		}
		
		return false;
	}
			
	DeviceClient.MetaData.tableHasRootForm = function(tableId) {
// 		DeviceClient.Util.logDebug("DeviceClient.MetaData.tableHasRootForm");

		if ( !metaData ) {
			read(true);
		}

		var tableInfo = derivedMetaData.TableDefList.TableIds[tableId];
		if ( tableInfo ) {
			return tableInfo.HasRootForm;
		}
		
		return false;
	}
		
	DeviceClient.MetaData.tableHasMultipleRootForms = function(tableId) {
// 		DeviceClient.Util.logDebug("DeviceClient.MetaData.tableHasMultipleRootForms");

		if ( !metaData ) {
			read(true);
		}

		var tableInfo = derivedMetaData.TableDefList.TableIds[tableId];
		if ( tableInfo ) {
			return tableInfo.HasMultipleRootForms;
		}
		
		return false;
	}

	DeviceClient.MetaData.tableHasMultipleInsertForms = function(tableId) {
// 		DeviceClient.Util.logDebug("DeviceClient.MetaData.tableHasMultipleInsertForms");

		if ( !metaData ) {
			read(true);
		}

		var tableInfo = derivedMetaData.TableDefList.TableIds[tableId];
		if ( tableInfo ) {
			return tableInfo.HasMultipleInsertForms;
		}
		
		return false;
	}
	
	// One or more forms.
	DeviceClient.MetaData.tableHasForm = function(tableId) {
// 		DeviceClient.Util.logDebug("DeviceClient.MetaData.tableHasForm");

		if ( !metaData ) {
			read(true);
		}

		var tableInfo = derivedMetaData.TableDefList.TableIds[tableId];
		if ( tableInfo ) {
			return tableInfo.HasForm;
		}
		
		return false;
	}
	
	// If the table has multiple root forms then any of those forms will be a match.
	DeviceClient.MetaData.formIsRootForTable = function ( formId, tableId ) {
// 		DeviceClient.Util.logDebug("DeviceClient.MetaData.formIsRootForTable");

		var rootForms = this.getRootDataFormsForTableId(tableId);
		if ( rootForms ) {
			for (var i=0; i<rootForms.length; i++) {
				if ( rootForms[i].DataFormUIDef.FormId == formId ) {
					return true;
				}
			}
		}
		return false;
	}	
	
	DeviceClient.MetaData.getDataFormUiLayout = function(formId) {
// 		DeviceClient.Util.logDebug("DeviceClient.MetaData.getDataFormUiLayout");

		if ( !metaData ) {
			read(true);
		}
		
		var formInfo = derivedMetaData.FormDefList.FormIds[formId];
		if ( formInfo ) {
			return formInfo;
		}
		
		/*
		// Find the form meta for the formId.
		if ( metaData.DataFormDefList == null || !(metaData.DataFormDefList instanceof Array) || metaData.DataFormDefList.length <= 0 ) {
			DeviceClient.Util.logError("DeviceClient.MetaData.getDataFormUiLayout request for formId " + formId + " failed because meta data cache does not have any business objects.");
			return null;
		}
		var numForms = metaData.DataFormDefList.length;
		for ( var i = 0; i<numForms; i++) {
			var formDef = metaData.DataFormDefList[i];
			if ( formDef.DataFormUIDef != null && formDef.DataFormUIDef.FormId == formId ) {
				return formDef;
			}
		}
		*/
		
		return null;
	}

	DeviceClient.MetaData.getDataFormId = function(formName) {
 //		DeviceClient.Util.logDebug("DeviceClient.MetaData.getDataFormId");

		if ( !metaData ) {
			read(true);
		}
		
		var formInfo = derivedMetaData.FormDefList.FormNames[formName];
		if ( formInfo ) {
			return formInfo.FormId;
		}
		
		return null;
	}
	
	DeviceClient.MetaData.getTableId = function ( tableName ) {

		if ( !metaData ) {
			read(true);
		}
		
		var tableInfo = derivedMetaData.TableDefList.TableNames[tableName];
		if ( tableInfo ) {
			return tableInfo.TableId;
		}
		
		return null;
	}
	
	DeviceClient.MetaData.getTableName = function ( tableId ) {

		if ( !metaData ) {
			read(true);
		}
		
		var tableInfo = derivedMetaData.TableDefList.TableIds[tableId];
		if ( tableInfo ) {
			return tableInfo.TableName;
		}
		
		return null;
	}
	
	// Has to return data via a callback because of lazy loading.
	DeviceClient.MetaData.getTableSearchDefLists = function ( tableName, callback ) {
//	 	DeviceClient.Util.logDebug("DeviceClient.MetaData.getTableSearchDefLists table: " + tableName);

		// Get the definitions that we know about currently in the cache.
		var searchDefinition = this.getCachedTableSearchDefLists(tableName);
		if ( searchDefinition == null ) {
			// The definition for the searches for the table are not yet loaded. These get delay loaded for tables that are not associated with business objects. Go to the server to get the searches.
			this.getSearchesForTable ( tableName, _.bind(function(searches){this.onSearchesForTableLoaded(searches, callback);}, this), null );
		} else {
			// The metadata is cached on the device. 
			callback(searchDefinition);
		}
	}

	DeviceClient.MetaData.onSearchesForTableLoaded = function(searchDefinition, callback) {
	 	DeviceClient.Util.logDebug("DeviceClient.MetaData.onSearchesForTableLoaded");
	 	
	 	// Before returning the lazy-loaded list searches, they are stored in the metadata so that they do not need to be returned again.
	 	putTableSearchDefLists ( searchDefinition );
	 	
		callback(searchDefinition);
	}

	DeviceClient.MetaData.getSearchesForTable = function(tableName, callback, errorCallback) {
	 	DeviceClient.Util.logDebug("DeviceClient.MetaData.getSearchesForTable tableName: " + tableName);

		var tableNameURLEncoded = Ti.Network.encodeURIComponent(tableName);

		var serverURL = DeviceClient.Properties.serverurl() + "/MetaData/AppLayout/SearchList/ByTableName/" + tableNameURLEncoded;

  	    var params = {};
  	    params["AuthenticatedToken"] = DeviceClient.Properties.userToken();

		if (DeviceClient.Properties.workOffline() || DeviceClient.Properties.demoMode()) {
			// Offline or Demo means the meta data will not be in the offline cache. Meta data is never saved in the offline cache. The reply updates the cached meta data file itself. So if it was not already found then it will not be anywhere else on the device.
			callback(null); // TODO TEST
		} else {
			// Get data from server.
			// TODO TEST
			DeviceClient.Server.Comms.sendRequest("POST", serverURL, params, false, callback, errorCallback); // Meta data is never saved in the offline cache. The reply updates the cached meta data file itself.
		}
	}
	
	// null is returned if no searches known for the table. Others may exist that we do not know about yet, because of lazy loading. 
	// Use DeviceClient.MetaData.getTableSearchDefLists() to get the definitive answer that includes communications with the server if necessary.
	DeviceClient.MetaData.getCachedTableSearchDefLists = function(tableName) {
 		DeviceClient.Util.logDebug("DeviceClient.MetaData.getCachedTableSearchDefLists");

		if ( !metaData ) {
			read(true);
		}
		
		// Find the search meta for the table.
		if ( metaData.SearchDefList == null || !(metaData.SearchDefList instanceof Array) || metaData.SearchDefList.length <= 0 ) {
			DeviceClient.Util.logError("DeviceClient.MetaData.getCachedTableSearchDefLists request for table " + tableName + " failed because meta data cache does not have any search information.");
			return null;
		}
		var numTables = metaData.SearchDefList.length;
		for ( var i = 0; i<numTables; i++) {
			if ( metaData.SearchDefList[i].TableName == tableName )
				return metaData.SearchDefList[i];
		}
		
		// DeviceClient.Util.logInfo("No search definitions available for table " + tableName + " in the meta data.");
		return null;	
	}
	
	DeviceClient.MetaData.getTableSummary = function(tableId) {
// 		DeviceClient.Util.logDebug("DeviceClient.MetaData.getTableSummary");

		if ( !metaData ) {
			read(true);
		}

		var tableInfo = derivedMetaData.TableDefList.TableIds[tableId];
		return tableInfo;
	}

	DeviceClient.MetaData.getDashboardLayout = function() {
 		DeviceClient.Util.logDebug("DeviceClient.MetaData.getDashboardLayout");

		if ( !metaData ) {
			read(true);
		}
		
		return metaData.DashboardDef;
	}
		
	DeviceClient.MetaData.getCacheFile = function() {
 		DeviceClient.Util.logDebug("DeviceClient.MetaData.getCacheFile");

		if (!metaData)
			read(true);
				
		var metaFile = Ti.Filesystem.getFile(DeviceClient.Util.getSystemRootDirectoryPath(), DeviceClient.CONST.META_CACHE_FILE_NAME);
		if ( !metaFile.exists() ) {
			DeviceClient.Util.logError("Meta data file not found: " + metaFile.nativePath);
			return null;
		}
		return metaFile;
	}

	DeviceClient.MetaData.getMetaDataSchemaVersion = function() {
 		DeviceClient.Util.logDebug("DeviceClient.MetaData.getMetaDataSchemaVersion");

		// Load the meta data from cache if it is not already loaded.
		if ( DeviceClient.MetaData.load(false) )
		{
			return metaData.MetaDataSchemaVersion;
		}

		return null; 		
	}

	DeviceClient.MetaData.getMetaDataVersion = function() {

		// Load the meta data from cache if it is not already loaded.
		if ( DeviceClient.MetaData.load(false) )
		{
			return metaData.MetaDataVersion;
		}

		return null; 		
	}

	DeviceClient.MetaData.getDefaultFormIdForTableId = function(tableId){
		
		if ( !metaData ) {
			read(true);
		}
		
		var tableInfo = derivedMetaData.TableDefList.TableIds[tableId];
		if ( tableInfo && tableInfo.HasDefaultForm ) {
			return tableInfo.DefaultForm.DataFormUIDef.FormId;
		}
		
		return null;
	}	
	
	DeviceClient.MetaData.getSystemType = function() {
// 		DeviceClient.Util.logDebug("DeviceClient.MetaData.getSystemType");

		// Load the meta data from cache if it is not already loaded.
		if ( DeviceClient.MetaData.load(false) )
		{
			// SystemType was added in SP2, so if the property is missing we can assume it is a Pivotal system.
			if ( DeviceClient.Properties.demoMode() ) {
				return DeviceClient.CONST.SYSTEM_TYPE.DEMO;
			} else {
				var systemType = metaData.SystemType;
				if ( !systemType ) {
					systemType = DeviceClient.CONST.SYSTEM_TYPE.PIVOTAL;
				}
				return systemType;
			}
		}

		return null; 		
	}

	DeviceClient.MetaData.isSystemPivotal = function() {
// 		DeviceClient.Util.logDebug("DeviceClient.MetaData.isSystemPivotal");

		return ( DeviceClient.MetaData.getSystemType() == DeviceClient.CONST.SYSTEM_TYPE.PIVOTAL );
	}
	
	DeviceClient.MetaData.isSystemSaratoga = function() {
// 		DeviceClient.Util.logDebug("DeviceClient.MetaData.isSystemSaratoga");

		return ( DeviceClient.MetaData.getSystemType() == DeviceClient.CONST.SYSTEM_TYPE.SARATOGA );
	}
	
	DeviceClient.MetaData.isSystemDemo = function() {
// 		DeviceClient.Util.logDebug("DeviceClient.MetaData.isSystemDemo");

		return ( DeviceClient.MetaData.getSystemType() == DeviceClient.CONST.SYSTEM_TYPE.DEMO );
	}
	
	DeviceClient.MetaData.getSystemServerVersion = function() {
 
		// Load the meta data from cache if it is not already loaded.
		if ( DeviceClient.MetaData.load(false) )
		{
			// SystemServerVersion was added in SP2. Return "" if not present.
			var systemServerVersion = metaData.SystemServerVersion;
			if ( !systemServerVersion ) {
				systemServerVersion = "";
			}
			return systemServerVersion;
		}

		return null; 		
	}

	DeviceClient.MetaData.getDeviceServerVersion = function() {

		// Load the meta data from cache if it is not already loaded.
		if ( DeviceClient.MetaData.load(false) )
		{
			// DeviceServerVersion was added in SP2. Return "" if not present.
			var deviceServerVersion = metaData.DeviceServerVersion;
			if ( !deviceServerVersion ) {
				deviceServerVersion = "";
			}
			return deviceServerVersion;
		}

		return null;
	}

	DeviceClient.MetaData.getDoNotRunQuickSearchImmediately = function() {
 
		// Load the meta data from cache if it is not already loaded.
		if ( DeviceClient.MetaData.load(false) )
		{
			// DoNotRunQuickSearchImmediately was added in SP2. Return false if not present.
			if ( DeviceClient.Util.hasValue(metaData.DoNotRunQuickSearchImmediately) ) {
				return DeviceClient.Util.isPropertyTrue(metaData.DoNotRunQuickSearchImmediately);
			}
		}

		return false; 		
	}
	
	DeviceClient.MetaData.getDisableMenuAdd = function() {

		// Load the meta data from cache if it is not already loaded.
		if ( DeviceClient.MetaData.load(false) )
		{
			// DisableMenuAdd was added in SP4. Return false if not present.
			if ( DeviceClient.Util.hasValue(metaData.DisableMenuAdd) ) {
				return DeviceClient.Util.isPropertyTrue(metaData.DisableMenuAdd);
			}
		}

		return false; 		
	}
	
	DeviceClient.MetaData.getDisableMenuSendShortcut = function() {

		// Load the meta data from cache if it is not already loaded.
		if ( DeviceClient.MetaData.load(false) )
		{
			// DisableMenuSendShortcut was added in SP4. Return false if not present.
			if ( DeviceClient.Util.hasValue(metaData.DisableMenuSendShortcut) ) {
				return DeviceClient.Util.isPropertyTrue(metaData.DisableMenuSendShortcut);
			}
		}

		return false; 		
	}	


	// Private functions.
	
	function read(displayErrors) {
 			
		var readMetaData = getMetaDataFromDevice ( displayErrors );
		if ( readMetaData ) {
			// Update the metaData static variable only if the read was successful.
			metaData = readMetaData; 
			// Calculate derived data held in memory.
			calculateDerivedMetaData(metaData);
			// Success in reading the meta data.
			return true;
		}
		return false;
	};

	function getMetaDataFromDevice(displayErrors) {
 			
		// Load all meta from cache file on device.
		if (DeviceClient.Properties.demoMode()){
		}
		
		var metaFile = Ti.Filesystem.getFile(DeviceClient.Util.getSystemRootDirectoryPath(), DeviceClient.CONST.META_CACHE_FILE_NAME);
		if ( !metaFile.exists() ) {
			
			if (displayErrors) {
			}
			
			return null;
		}
		var metaDataBlob = null;
		try {
			metaDataBlob = metaFile.read();				
		} catch(ex) {
			
			if (displayErrors) {
			}
			
			return null;
		}
		
		try {
			var metaDataObject = JSON.parse(metaDataBlob);
		} catch(ex) {
			
			if (displayErrors) {
			}
			return null;
		}
		metaDataBlob = null;
		metaFile = null;
		
		if ( !metaDataObject ) {
			
			if (displayErrors)
				
			return null;
		}
		
		return metaDataObject;
	};
	
	function putMetaDataToDevice (newMetaData) {
 
		// Save the meta to the device.
		var metaFile = Ti.Filesystem.getFile(DeviceClient.Util.getSystemRootDirectoryPath(), DeviceClient.CONST.META_CACHE_FILE_NAME);
		metaFile.write(JSON.stringify(newMetaData),false);
	}

	// Update the searches known for the table. 
	function putTableSearchDefLists (searchDefList) {
 
		// public put functions update meta data twice. Once for the in-memory version of the meta data. And again for the version saved on the device.
		// This is done because the app changes the saved meta data for its own use during runtime, and we do not want to accidentally save those temporary changes.
		
		// Update the in-memory meta data.
		updateTableSearchDefLists ( searchDefList, metaData );
		
		// Update the meta data saved on the device.
		if ( DeviceClient.Properties.demoMode() ) {
			// Safety check: don't update demo meta data.
			return;
		}
		var deviceMetaData = getMetaDataFromDevice();
		updateTableSearchDefLists ( searchDefList, deviceMetaData );
		putMetaDataToDevice(deviceMetaData);
	}

	// Update the searches known for the table, in the supplied target meta data object.
	function updateTableSearchDefLists (searchDefList, targetMetaData) {

		if ( !targetMetaData || !searchDefList ) {
			return;
		}
		
		// Create the parent nodes if they are missing.
		if ( targetMetaData.SearchDefList == null || !(targetMetaData.SearchDefList instanceof Array) ) {
			targetMetaData.SearchDefList = [];
		}
		// Search for the node for this table in case it already exists.
		var numTables = targetMetaData.SearchDefList.length;
		for ( var i = 0; i<numTables; i++) {
			if ( targetMetaData.SearchDefList[i].TableName == searchDefList.TableName ) {
				// Update the existing search info.
				targetMetaData.SearchDefList[i] = _.clone(searchDefList); // Important to do a clone, otherwise too many pointers to what should be temporary intermediate data.
				return;
			}
		}
		// Add the search info - it did not exist before.
		targetMetaData.SearchDefList.push ( _.clone(searchDefList) ); // Important to do a clone, otherwise too many pointers to what should be temporary intermediate data.
	}
	
	function calculateDerivedMetaData ( sourceMetaData ) {
 		
 		// Destination if module-local object.
 		derivedMetaData = {};
 		
 		// Build up some summary information by table id. Use the permissions list of tables as the list of tables.
 		// Also build up a quick-lookup array of table name to table id.
 		var tableIds = {};
 		var tableNames = {};
 		var tablePerms = DeviceClient.Permissions.getAllTablePermissions();
 		if ( tablePerms && _.isArray(tablePerms) && tablePerms.length > 0 ) {
 			
 			// Once round the loop for each table.
 			var numTables = tablePerms.length;
	 		for ( var i=0; i<numTables; i++ ) {
	 			
	 			// The table we are working on.
	 			var table = tablePerms[i];
	 			
				// Find all, the default, and adding forms for the table.
				var allForms = [];
				var defaultForm = null;
				var rootForms = []; // Root forms are ones that foreign keys and search results lists can use as "entry points" into looking at the record.
				var insertForms = [];
				if ( sourceMetaData.DataFormDefList && _.isArray(sourceMetaData.DataFormDefList) && sourceMetaData.DataFormDefList.length > 0 ) {
					var numForms = sourceMetaData.DataFormDefList.length;
					for ( var j = 0; j<numForms; j++) {
						var formDef = sourceMetaData.DataFormDefList[j];
						if ( formDef.DataFormUIDef != null && formDef.DataFormUIDef.TableId == table.TableId ) {
							allForms.push(formDef);
							if ( DeviceClient.Util.isPropertyTrue(formDef.IsDefault) ) {
								defaultForm = formDef; // Only one default.
							}
							if ( !DeviceClient.Util.hasValue(formDef.IsRoot) || // Older versions of the API don't supply this value, so assume true.
							     (DeviceClient.Util.hasValue(formDef.IsRoot) && DeviceClient.Util.isPropertyTrue(formDef.IsRoot)) ) {
								rootForms.push(formDef);
							}
							if ( !DeviceClient.Util.hasValue(formDef.CanInsert) || // Older versions of the API don't supply this value, so assume true.
							     (DeviceClient.Util.hasValue(formDef.CanInsert) && DeviceClient.Util.isPropertyTrue(formDef.CanInsert)) ) {
								insertForms.push(formDef);
							}
						}
					}
				}

				// Construct entries in the table ids and table names objects for this table.
	 			tableIds[table.TableId] = { TableName: table.Table,
	 										AllForms: allForms,
	 									    DefaultForm: defaultForm,
	 									    RootForms: rootForms,
	 									    InsertForms: insertForms,
	 									    HasForm: (allForms.length > 0), // One or more.
	 									    HasDefaultForm: defaultForm != null,
	 									    HasRootForm: (rootForms.length > 0),
	 									    HasInsertForm: (insertForms.length > 0), // TODO mix in with table permissions?
	 									    HasMultipleRootForms: (rootForms.length > 1),
	 									    HasMultipleInsertForms: (insertForms.length > 1) };
	 			tableNames[table.Table] = { TableId: table.TableId };
	 		}
 		}
 		
 		// Store in memory the derived table data properties.
 		derivedMetaData["TableDefList"] = { TableIds: tableIds,
 									        TableNames: tableNames };
 									        
 		// Create fast access to form information, by name or by id.
 		var formIds = {};
 		var formNames = {};
		if ( sourceMetaData.DataFormDefList && _.isArray(sourceMetaData.DataFormDefList) && sourceMetaData.DataFormDefList.length > 0 ) {
			var numForms = sourceMetaData.DataFormDefList.length;
			for ( var j = 0; j<numForms; j++) {
				var formDef = sourceMetaData.DataFormDefList[j];
				formIds[formDef.DataFormUIDef.FormId] = formDef;
				formNames[formDef.FormName] = formDef;
			}
		}

 		// Store in memory the derived form data properties.
 		derivedMetaData["FormDefList"] = { FormIds: formIds,
 									       FormNames: formNames };

	}
	
})();
