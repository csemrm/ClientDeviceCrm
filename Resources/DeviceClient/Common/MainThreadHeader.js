// Include the common includes for all threads, plus the ones that are unique to the main thread.
Ti.include(
	'/DeviceClient/Common/CommonThreadHeader.js',
	// All the includes below are specific to the main app thread.
	'/DeviceClient/App/App.js',
	'/DeviceClient/Model/ModelBase.js',
	'/DeviceClient/Model/TabGroupModel.js',
	'/DeviceClient/Model/BusinessObjectModel.js',
	'/DeviceClient/Model/DashboardModel.js',
	'/DeviceClient/View/ViewBase.js',
	'/DeviceClient/View/iOS/iPad/BusinessObjectView.js',
	'/DeviceClient/View/iOS/iPhone/BusinessObjectSDView.js',	
	'/DeviceClient/View/iOS/iPad/DashboardView.js',
	'/DeviceClient/View/iOS/iPhone/DashboardSDView.js',
	'/DeviceClient/View/TabGroupView.js',		
	'/DeviceClient/Ui/UI.js',
	'/DeviceClient/Controller/ControllerBase.js',
	'/DeviceClient/Controller/TabGroupController.js',
	'/DeviceClient/Controller/DashboardController.js',
	'/DeviceClient/Controller/BusinessObjectController.js'
);

// Include native modules.

// Define Aptean modules namespace.
DeviceClient.Module = {};



