
(function() {
	DeviceClient.Properties = {};
	
	DeviceClient.Properties.init = function() {
		
		// NOTE!!!!!!!!!!
		//
		// When adding to the set of properties, also update resetUserPreferences() if the new property is one the user can change.
		//
		// NOTE!!!!!!!!!!
		
		if ( !Ti.App.Properties.hasProperty("UserToken") )	
			Ti.App.Properties.setString("UserToken", "");	
			
		if ( !Ti.App.Properties.hasProperty("UserID") )	
			Ti.App.Properties.setString("UserID", "");
						
		if ( !Ti.App.Properties.hasProperty("UserPassword") )	
			Ti.App.Properties.setString("UserPassword", "");				
			
		if ( !Ti.App.Properties.hasProperty("OfflinePassword") )	
			Ti.App.Properties.setString("OfflinePassword", "");				
			
		if ( !Ti.App.Properties.hasProperty("ServerURL") )
			Ti.App.Properties.setString("ServerURL", "");
			
		if( !Ti.App.Properties.hasProperty("LogDebugInfo") )
			Ti.App.Properties.setBool("LogDebugInfo", false);
			
		if( !Ti.App.Properties.hasProperty("LogToConsole") )
			Ti.App.Properties.setBool("LogToConsole", true);

		if( !Ti.App.Properties.hasProperty("AlternativeLoginOption") )
			Ti.App.Properties.setInt("AlternativeLoginOption", 0);

		if( !Ti.App.Properties.hasProperty("WorkOffline") )
			Ti.App.Properties.setBool("WorkOffline", false);
			
		if( !Ti.App.Properties.hasProperty("DemoMode") )
			Ti.App.Properties.setBool("DemoMode", true);

		if( !Ti.App.Properties.hasProperty("HideDashboard") )
			Ti.App.Properties.setBool("HideDashboard", false);

		if( !Ti.App.Properties.hasProperty("AutoDisplayFirstSearchResultRecord") )
			Ti.App.Properties.setBool("AutoDisplayFirstSearchResultRecord", true);
			
		if( !Ti.App.Properties.hasProperty("HideSearchIndex") )
			Ti.App.Properties.setBool("HideSearchIndex", true);			

		if( !Ti.App.Properties.hasProperty("AutoReconnect") )
			Ti.App.Properties.setBool("AutoReconnect", false);

		if( !Ti.App.Properties.hasProperty("DisableAutoLoginOnAppStart") )
			Ti.App.Properties.setBool("DisableAutoLoginOnAppStart", false);

		if( !Ti.App.Properties.hasProperty("DisableAutoLoginAfterIdleTimeout") )
			Ti.App.Properties.setBool("DisableAutoLoginAfterIdleTimeout", false);

		if( !Ti.App.Properties.hasProperty("DoNotRememberUsernameOnAppStart") )
			Ti.App.Properties.setBool("DoNotRememberUsernameOnAppStart", false);

		if( !Ti.App.Properties.hasProperty("DisableOffline") )
			Ti.App.Properties.setBool("DisableOffline", false);
			
		if( !Ti.App.Properties.hasProperty("DisableOfflinePassword") )
			Ti.App.Properties.setBool("DisableOfflinePassword", true);

		if ( !Ti.App.Properties.hasProperty("AdministratorEmail") )	
			Ti.App.Properties.setString("AdministratorEmail", "");					

		if ( !Ti.App.Properties.hasProperty("ConnectionTimeout") )
			Ti.App.Properties.setInt("ConnectionTimeout", DeviceClient.CONST.COMMUNICATIONS_TIMEOUT_DEFAULT_CHOICE);

		if ( !Ti.App.Properties.hasProperty("LoginTimeout") )
			Ti.App.Properties.setInt("LoginTimeout", DeviceClient.CONST.LOGIN_TIMEOUT_DEFAULT_CHOICE);
			
		if (!Ti.App.Properties.hasProperty("LoginAuthenticationMode"))
			Ti.App.Properties.setString("LoginAuthenticationMode", DeviceClient.CONST.LOGIN_AUTHENTICATION_DEFAULT_CHOICE);

		if ( !Ti.App.Properties.hasProperty("DateAbbreviation") )
			Ti.App.Properties.setString("DateAbbreviation", DeviceClient.CONST.DATE_ABBREVIATION_DEFAULT_CHOICE);

		if ( !Ti.App.Properties.hasProperty("PhoneOptions") )
			Ti.App.Properties.setString("PhoneOptions", DeviceClient.CONST.PHONE_OPTION_DEFAULT_CHOICE);

		if ( !Ti.App.Properties.hasProperty("DashboardGraphs") )
			Ti.App.Properties.setInt("DashboardGraphs", DeviceClient.CONST.DASHBOARD_GRAPHS_DEFAULT_CHOICE);

		if ( !Ti.App.Properties.hasProperty("DashboardQueries") )
			Ti.App.Properties.setInt("DashboardQueries", DeviceClient.CONST.DASHBOARD_QUERIES_DEFAULT_CHOICE);					

		if( !Ti.App.Properties.hasProperty("CurrentSystemName") )
			Ti.App.Properties.setString("CurrentSystemName", "");

		if( !Ti.App.Properties.hasProperty("Systems") )
			Ti.App.Properties.setString("Systems", "{}");
				
		// Developer switches

		if( !Ti.App.Properties.hasProperty("LoginAlwaysRefreshesImages") )
			Ti.App.Properties.setBool("LoginAlwaysRefreshesImages", false);

		if( !Ti.App.Properties.hasProperty("LoginAlwaysRefreshesMetaData") )
			Ti.App.Properties.setBool("LoginAlwaysRefreshesMetaData", false);

		if( !Ti.App.Properties.hasProperty("ClippyMode") )
			Ti.App.Properties.setBool("ClippyMode", false);
			
	}
	
	DeviceClient.Properties.userToken = function(token) {
		var usrtoken = "";
		if (token === undefined) {
			// It is a read request.
			usrtoken = Ti.App.Properties.getString("UserToken");
		} else {
			Ti.App.Properties.setString("UserToken", token);		
			usrtoken = Ti.App.Properties.getString("UserToken", "");
		}
		
		return usrtoken;
	}
	
	DeviceClient.Properties.offlinePassword = function(pwd) {
		var offlinePwd = "";
		if (pwd === undefined) {
			// It is a read request.
			offlinePwd = Ti.App.Properties.getString("OfflinePassword");
		} else {
			Ti.App.Properties.setString("OfflinePassword", pwd);		
			offlinePwd = Ti.App.Properties.getString("OfflinePassword", "");
		}
		
		return offlinePwd;
	}
		
	DeviceClient.Properties.userPassword = function(pwd) {
		var usrpwd = '';
		
		// If auto login on application start is disabled, don't allow setting/getting of the password. 
		if ( !Ti.App.Properties.getBool("DisableAutoLoginOnAppStart") ) {
			if (pwd === undefined) {
				// It is a read request.
				usrpwd = Ti.App.Properties.getString("UserPassword");
			} else {
				var oldusrpwd = Ti.App.Properties.getString("UserPassword");	
				Ti.App.Properties.setString("UserPassword", pwd);
				usrpwd = Ti.App.Properties.getString("UserPassword", "");
				if (oldusrpwd != pwd) {
					// Password changed, cached user token needs to be cleared.
					// Normally, after the password is changed, it should follow by Server Login Call which in return usertoken is called to set UserToken
					// if the Server Login Call is not called and UserToken will be invalidated, the next server call, will trigger Login Prompt.
					Ti.App.Properties.setString("UserToken", "");
				}
			}
		}			
		
		return usrpwd;		
	}

	DeviceClient.Properties.connectionTimeout = function(timeout) {
		if (timeout !== undefined) {
			// It is an update request.
			Ti.App.Properties.setInt("ConnectionTimeout", timeout);		
		}			
		
		timeout = Ti.App.Properties.getInt("ConnectionTimeout");
		// Add a fail-safe, because preferences can be reset to nothing.
		if ( timeout == null || timeout == "" || timeout == 0 ) {
			timeout = DeviceClient.CONST.COMMUNICATIONS_TIMEOUT_DEFAULT_CHOICE;
		}
		return timeout;
	}

	DeviceClient.Properties.loginTimeout = function(timeout) {
		if (timeout !== undefined) {
			// It is an update request.
			Ti.App.Properties.setInt("LoginTimeout", timeout);		
		}			
		
		timeout = Ti.App.Properties.getInt("LoginTimeout");
		// Add a fail-safe, because preferences can be reset to nothing.
		if ( timeout == null || timeout == "" || timeout == 0 ) {
			timeout = DeviceClient.CONST.LOGIN_TIMEOUT_DEFAULT_CHOICE;
		}
		return timeout;
	}
	
	DeviceClient.Properties.loginAuthenticationMode = function(authenticationMode) {
		if (authenticationMode !== undefined) {
			// It is an update request.
			Ti.App.Properties.setString("LoginAuthenticationMode", authenticationMode);		
		}			
		
		authenticationMode = Ti.App.Properties.getString("LoginAuthenticationMode");
		// Add a fail-safe, because preferences can be reset to nothing.
		if ( authenticationMode == null || authenticationMode == "" || authenticationMode == 0 ) {
			authenticationMode = DeviceClient.CONST.LOGIN_AUTHENTICATION_DEFAULT_CHOICE;
		}
		return authenticationMode;
	}	
			
	DeviceClient.Properties.dateAbbreviation = function(length) {
		if (length !== undefined) {
			// It is an update request.
			Ti.App.Properties.setString("DateAbbreviation", length);		
		}			
		
		length = Ti.App.Properties.getString("DateAbbreviation");
		// Add a fail-safe, because preferences can be reset to nothing.
		if ( length == null || length == "" || length == 0 ) {
			length = DeviceClient.CONST.DATE_ABBREVIATION_DEFAULT_CHOICE;
		}
		return length;
	}
				
	DeviceClient.Properties.phoneOptions = function(option) {
		if (option !== undefined) {
			// It is an update request.
			Ti.App.Properties.setString("PhoneOptions", option);		
		}			
		
		if (!DeviceClient.CONST.SMALL_DEVICE) {
			option = DeviceClient.CONST.PHONE_OPTION_DEFAULT_CHOICE;
		} else {
			option = Ti.App.Properties.getString("PhoneOptions");
		}
		
		// Add a fail-safe, because preferences can be reset to nothing.
		if ( option == null || option == "" || option == 0 ) {
			option = DeviceClient.CONST.PHONE_OPTION_DEFAULT_CHOICE;
		}
		return option;
	}
			
	DeviceClient.Properties.dashboardGraphs = function(graphs) {
		if (graphs !== undefined) {
			// It is an update request.
			Ti.App.Properties.setInt("DashboardGraphs", graphs);		
		}			
		
		return Ti.App.Properties.getInt("DashboardGraphs");
	}
	
	DeviceClient.Properties.dashboardQueries = function(queries) {
		if (queries !== undefined) {
			// It is an update request.
			Ti.App.Properties.setInt("DashboardQueries", queries);		
		}			
		
		return Ti.App.Properties.getInt("DashboardQueries");
	}
	
	DeviceClient.Properties.tabLayout = function(tabOrder) {
		var value = this.currentSystemProperty("TabLayout", tabOrder);
		
		return value;
	}

	DeviceClient.Properties.systemServerUrl = function(serverUrl) {
		var value = this.currentSystemProperty("ServerUrl", serverUrl);
		
		return value;
	}

	DeviceClient.Properties.systemGlobalId = function(systemGlobalId) {
		var value = this.currentSystemProperty("SystemGlobalId", systemGlobalId);
		
		return value;
	}

	DeviceClient.Properties.getSystemServerUrlForSystemGlobalId = function(systemGlobalId) {
		
		// Parameter check.
		if ( !systemGlobalId ) {
			return "";
		}
		
		// Get the json string from the stored "Systems" property and
		// deserialize it into an object.
		var storedSystems = Ti.App.Properties.getString("Systems", "{}");
		var systems = JSON.parse(storedSystems);
		if ( systems && typeof systems === "object" ) {
			for ( var system in systems ) {
				if ( systems[system].SystemGlobalId && systems[system].SystemGlobalId.toLowerCase() == systemGlobalId.toLowerCase() ) {
					return systems[system].ServerUrl;
				}
			}
		}
			
		return "";
	}

	DeviceClient.Properties.getSystemServerUrlForSystemName = function(systemName) {
		
		// Parameter check.
		if ( !systemName ) {
			return "";
		}
		
		// Get the json string from the stored "Systems" property and
		// deserialize it into an object.
		var storedSystems = Ti.App.Properties.getString("Systems", "{}");
		var systems = JSON.parse(storedSystems);
		if ( systems && typeof systems === "object" ) {
			for ( var system in systems ) {
				if (system && system.toLowerCase() == systemName.toLowerCase() ) {
					return systems[system].ServerUrl;
				}
			}
		}
			
		return "";
	}
	
	DeviceClient.Properties.getSystemGlobalIdForSystemName = function(systemName) {
		
		// Parameter check.
		if ( !systemName ) {
			return "";
		}
		
		// Get the json string from the stored "Systems" property and
		// deserialize it into an object.
		var storedSystems = Ti.App.Properties.getString("Systems", "{}");
		var systems = JSON.parse(storedSystems);
		if ( systems && typeof systems === "object" ) {
			for ( var system in systems ) {
				if (system && system.toLowerCase() == systemName.toLowerCase() ) {
					return systems[system].SystemGlobalId;
				}
			}
		}
			
		return "";
	}	
	
	DeviceClient.Properties.isValidSystemByServerUrl = function(serverUrl) {
		// Parameter check.
		if ( !serverUrl ) {
			return false;
		}
		
		var serverurlInLowerCase = serverUrl.toLowerCase();
		
		// Get the json string from the stored "Systems" property and
		// deserialize it into an object.
		var storedSystems = Ti.App.Properties.getString("Systems", "{}");
		var systems = JSON.parse(storedSystems);
		if ( systems && typeof systems === "object" ) {
			for ( var system in systems ) {
				if (system && systems[system].ServerUrl.toLowerCase() == serverurlInLowerCase) {
						return true;					
				}
			}
		}
			
		return false;		
	}
	
	DeviceClient.Properties.getSystemsInfo = function() {
		
		var systemsInfo = [];
		
		// Get the json string from the stored "Systems" property and
		// deserialize it into an object.
		var storedSystems = Ti.App.Properties.getString("Systems", "{}");
		var systems = JSON.parse(storedSystems);
		if ( systems && typeof systems === "object" ) {
			for ( var system in systems ) {
				systemsInfo.push ( { SystemName: system, SystemGlobalId: systems[system].SystemGlobalId, ServerUrl: systems[system].ServerUrl } );
			}
		}
			
		return systemsInfo;
	}
	
	DeviceClient.Properties.serverurl = function(url) {
		if (url !== undefined) {
			// It is an update request.
			Ti.App.Properties.setString("ServerURL", url);		
		}			

		if ( Ti.App.Properties.getBool("DemoMode") ) {
			return DeviceClient.CONST.DEMO_MODE_URL;
		} else {
			return Ti.App.Properties.getString("ServerURL");
		}
	}
	
	DeviceClient.Properties.userid = function(usr) {	
		var userId = "";
		
		// If "DoNotRememberUsernameOnAppStart" flag is set, don't allow setting/getting of the user id		
		if (!Ti.App.Properties.getBool("DoNotRememberUsernameOnAppStart")) {			
			if (usr !== undefined) {
				// It is an update request.
				Ti.App.Properties.setString("UserID", usr);
			}			
				
			userId = Ti.App.Properties.getString("UserID"); 
		}
		
		return userId;
	}
	
	DeviceClient.Properties.alternativeLoginOption = function(alternativeLoginOption) {
		if (alternativeLoginOption !== undefined) {
			// It is an update request.
			Ti.App.Properties.setInt("AlternativeLoginOption", alternativeLoginOption);		
		}			
		
		return Ti.App.Properties.getInt("AlternativeLoginOption");
	}
	
	DeviceClient.Properties.loginAlwaysRefreshesImages = function(refresh) {
		if (refresh !== undefined) {
			// It is an update request.
			if (refresh == true) 
				Ti.App.Properties.setBool("LoginAlwaysRefreshesImages", true);
			else 
				Ti.App.Properties.setBool("LoginAlwaysRefreshesImages", false);
		}
		return Ti.App.Properties.getBool("LoginAlwaysRefreshesImages");
	}
	
	DeviceClient.Properties.loginAlwaysRefreshesMetaData = function(refresh) {
		if (refresh !== undefined) {
			// It is an update request.
			if (refresh == true) 
				Ti.App.Properties.setBool("LoginAlwaysRefreshesMetaData", true);
			else 
				Ti.App.Properties.setBool("LoginAlwaysRefreshesMetaData", false);
		}
		return Ti.App.Properties.getBool("LoginAlwaysRefreshesMetaData");
	}
	
	DeviceClient.Properties.logDebugInfo = function(logDebugInfo) {
		if (logDebugInfo !== undefined) {
			// It is an update request.
			if (logDebugInfo == true) 
				Ti.App.Properties.setBool("LogDebugInfo", true);
			else 
				Ti.App.Properties.setBool("LogDebugInfo", false);
		}
		return Ti.App.Properties.getBool("LogDebugInfo");
	}
	
	DeviceClient.Properties.logToConsole = function(logToConsole) {
		if (logToConsole !== undefined) {
			// It is an update request.
			if (logToConsole == true) 
				Ti.App.Properties.setBool("LogToConsole", true);
			else 
				Ti.App.Properties.setBool("LogToConsole", false);
		}
		return Ti.App.Properties.getBool("LogToConsole");
	}
	
	DeviceClient.Properties.workOffline = function(workOffline) {
		if (workOffline !== undefined) {
			// It is an update request.
			if (workOffline == true) 
				Ti.App.Properties.setBool("WorkOffline", true);
			else 
				Ti.App.Properties.setBool("WorkOffline", false);
		}
		return Ti.App.Properties.getBool("WorkOffline");
	}
	
	DeviceClient.Properties.demoMode = function(demoMode) {
		if (demoMode !== undefined) {
			// It is an update request.
			if (demoMode == true) 
				Ti.App.Properties.setBool("DemoMode", true);
			else 
				Ti.App.Properties.setBool("DemoMode", false);
		}
		return Ti.App.Properties.getBool("DemoMode");
	}

	DeviceClient.Properties.hideDashboard = function(hideDashboard) {
		if (hideDashboard !== undefined) {
			// It is an update request.
			if (hideDashboard == true) 
				Ti.App.Properties.setBool("HideDashboard", true);
			else 
				Ti.App.Properties.setBool("HideDashboard", false);
		}
		return Ti.App.Properties.getBool("HideDashboard");
	}
		
	DeviceClient.Properties.autoDisplayFirstSearchResultRecord = function(autoDisplayFirstSearchResultRecord) {
		if (autoDisplayFirstSearchResultRecord !== undefined) {
			// It is an update request.
			if (autoDisplayFirstSearchResultRecord == true) 
				Ti.App.Properties.setBool("AutoDisplayFirstSearchResultRecord", true);
			else 
				Ti.App.Properties.setBool("AutoDisplayFirstSearchResultRecord", false);
		}
		return Ti.App.Properties.getBool("AutoDisplayFirstSearchResultRecord");
	}
	
	DeviceClient.Properties.hideSearchIndex = function(hideSearchIndex) {
		if (hideSearchIndex !== undefined) {
			// It is an update request.
			if (hideSearchIndex == true) 
				Ti.App.Properties.setBool("HideSearchIndex", true);
			else 
				Ti.App.Properties.setBool("HideSearchIndex", false);
		}
		return Ti.App.Properties.getBool("HideSearchIndex");
	}	
	
	DeviceClient.Properties.autoReconnect = function(autoReconnect) {
		if (autoReconnect !== undefined) {
			// It is an update request.
			if (autoReconnect == true) 
				Ti.App.Properties.setBool("AutoReconnect", true);
			else 
				Ti.App.Properties.setBool("AutoReconnect", false);
		}
		return Ti.App.Properties.getBool("AutoReconnect");
	}

	DeviceClient.Properties.disableOfflinePassword = function(disableOfflinePassword) {
		if (disableOfflinePassword !== undefined) {
			// It is an update request.
			if (disableOfflinePassword == true) {
				Ti.App.Properties.setBool("DisableOfflinePassword", true);
				Ti.App.Properties.setString("OfflinePassword", "" ); // Switch being turned on, so forget password.
			} else { 
				Ti.App.Properties.setBool("DisableOfflinePassword", false);
//				Ti.App.Properties.setString("OfflinePassword", Ti.App.Properties.getString("UserPassword") ); // Since this switch is being turned off, copy whatever is in the UserPassword property.
			}
		}
		return Ti.App.Properties.getBool("DisableOfflinePassword");
	}	

	DeviceClient.Properties.disableAutoLoginOnAppStart = function(disableAutoLoginOnAppStart) {
		if (disableAutoLoginOnAppStart !== undefined) {
			// It is an update request.
			if (disableAutoLoginOnAppStart == true) {
				Ti.App.Properties.setBool("DisableAutoLoginOnAppStart", true);				
				Ti.App.Properties.setString("UserPassword", ""); // Clear any record of the user password too, to ensure no record on the device, and code does not have the ability to use it.
			} else { 
				Ti.App.Properties.setBool("DisableAutoLoginOnAppStart", false);
			}
		}
		return Ti.App.Properties.getBool("DisableAutoLoginOnAppStart");
	}	

	DeviceClient.Properties.disableAutoLoginAfterIdleTimeout = function(disableAutoLoginAfterIdleTimeout) {
		if (disableAutoLoginAfterIdleTimeout !== undefined) {
			// It is an update request.
			if (disableAutoLoginAfterIdleTimeout == true) {
				Ti.App.Properties.setBool("DisableAutoLoginAfterIdleTimeout", true);				
			}
			else 
				Ti.App.Properties.setBool("DisableAutoLoginAfterIdleTimeout", false);
		}
		return Ti.App.Properties.getBool("DisableAutoLoginAfterIdleTimeout");
	}	

	DeviceClient.Properties.doNotRememberUsernameOnAppStart = function(doNotRememberUsernameOnAppStart) {
		if (doNotRememberUsernameOnAppStart !== undefined) {
			// It is an update request.
			if (doNotRememberUsernameOnAppStart == true) {
				Ti.App.Properties.setBool("DoNotRememberUsernameOnAppStart", true);				
			}
			else 
				Ti.App.Properties.setBool("DoNotRememberUsernameOnAppStart", false);
		}
		return Ti.App.Properties.getBool("DoNotRememberUsernameOnAppStart");
	}	


	DeviceClient.Properties.disableOffline = function(disableOffline) {
		if (disableOffline !== undefined) {
			// It is an update request.
			if (disableOffline == true) {
				Ti.App.Properties.setBool("DisableOffline", true);				
			}
			else 
				Ti.App.Properties.setBool("DisableOffline", false);
		}
		return Ti.App.Properties.getBool("DisableOffline");
	}	
	
	DeviceClient.Properties.administratorEmail = function(adminEmail) {
		if (adminEmail !== undefined) {
			// It is an update request.
			Ti.App.Properties.setString("AdministratorEmail", adminEmail);		
		}
				
		return Ti.App.Properties.getString("AdministratorEmail");
	}
	
	DeviceClient.Properties.currentSystemName = function(systemName) {
		if (systemName !== undefined) {
			// It is an update request.
			Ti.App.Properties.setString("CurrentSystemName", systemName);		
		}
				
		return Ti.App.Properties.getString("CurrentSystemName");
	}
		
	DeviceClient.Properties.clippyMode = function(clippyMode) {
		if (clippyMode !== undefined) {
			// It is an update request.
			if (clippyMode == true) 
				Ti.App.Properties.setBool("ClippyMode", true);
			else 
				Ti.App.Properties.setBool("ClippyMode", false);
		}
		return Ti.App.Properties.getBool("ClippyMode");
	}
	
	DeviceClient.Properties.metadataVersion = function(version) {
		var value = this.currentSystemProperty("MetadataVersion", version);
		
		return value;
	}

	DeviceClient.Properties.currentSystemProperty = function(propertyName, propertyValue) {
		var systemPropertyValue;
		
		// Get the current system information
		var currentSystem = this.currentSystemName();
		if (currentSystem) {
			var saveInfo = false;
			
			// Get the json string from the stored "Systems" property and
			// deserialize it into an object
			var storedSystems = Ti.App.Properties.getString("Systems", "{}");
			var systems = JSON.parse(storedSystems);
			
			// Lookup the current system information in the dictionary
			var currentSystemInfo = systems[currentSystem];
			
			// If the current system doesn't exist yet, initialize it, set it in the dictionary
			// and specify that the "systems" property will need to be saved
			if (!currentSystemInfo) {
				currentSystemInfo = {TabLayout : null};
				systems[currentSystem] = currentSystemInfo;
				saveInfo = true;
			}
			
			// See if we are getting or setting the value
			if (propertyValue !== undefined) {
				// Update request - set the property value and specify that the "systems" property
				// will need to be saved
				currentSystemInfo[propertyName] = propertyValue;
				systemPropertyValue = propertyValue;
				saveInfo = true;
			}
			else {
				systemPropertyValue = currentSystemInfo[propertyName];
			}
			
			// If necessary, save the "Systems" property back
			if (saveInfo)
			{
				storedSystems = JSON.stringify(systems);
				Ti.App.Properties.setString("Systems", storedSystems);
			}
		}
		
		return systemPropertyValue;
	}

	DeviceClient.Properties.getSystemNameFromUrl = function(url){
		var systemName = null;
		var storedSystems = Ti.App.Properties.getString("Systems", "{}");
		var systems = JSON.parse(storedSystems);
		
		for (var key in systems) {
			if (systems[key].ServerUrl == url) {
				systemName = key;
				break;				
			}
		}
		
		return systemName;
	}

	DeviceClient.Properties.getSystemNameFromSystemGlobalId = function(Id){
		var systemName = null;
		var storedSystems = Ti.App.Properties.getString("Systems", "{}");
		var systems = JSON.parse(storedSystems);
		
		for (var key in systems) {
			if (systems[key].SystemGlobalId == id) {
				systemName = key;
				break;				
			}
		}
		
		return systemName;
	}

	DeviceClient.Properties.getServerUrlFromSystemGlobalId = function(Id){
		var serverUrl = null;
		var storedSystems = Ti.App.Properties.getString("Systems", "{}");
		var systems = JSON.parse(storedSystems);
		
		for (var key in systems) {
			if (systems[key].SystemGlobalId == id) {
				serverUrl = systems[key].ServerUrl;
				break;				
			}
		}
		
		return serverUrl;
	}

	DeviceClient.Properties.resetUserPreferences = function(){

		// Removes or clears all user preference properties, and then inits them back to their original install values.
		
		Ti.App.Properties.removeProperty("LogDebugInfo");			
		Ti.App.Properties.removeProperty("LogToConsole");
		Ti.App.Properties.removeProperty("ConnectionTimeout");
		Ti.App.Properties.removeProperty("LoginAuthenticationMode");
		Ti.App.Properties.removeProperty("LoginTimeout");
		Ti.App.Properties.removeProperty("DateAbbreviation");
		Ti.App.Properties.removeProperty("PhoneOptions");
		Ti.App.Properties.removeProperty("HideDashboard");
		Ti.App.Properties.removeProperty("DashboardGraphs");
		Ti.App.Properties.removeProperty("DashboardQueries");
		Ti.App.Properties.removeProperty("LoginAlwaysRefreshesImages");
		Ti.App.Properties.removeProperty("LoginAlwaysRefreshesMetaData");
		Ti.App.Properties.removeProperty("ClippyMode");
		Ti.App.Properties.removeProperty("AutoDisplayFirstSearchResultRecord");
		Ti.App.Properties.removeProperty("AlternativeLoginOption");
		Ti.App.Properties.removeProperty("HideSearchIndex");		
		
		DeviceClient.Properties.tabLayout(null);
		
		DeviceClient.Properties.init();
	}
		
}());
