// Should be the first thing included in any thread.

// Define the app root namespace.
DeviceClient = {};
// Define a "shortcut" to the full namespace.
DC = DeviceClient;

//Include major UI components and styling properties
Ti.include(
	'/DeviceClient/ThirdParty/Underscore.js',	
	'/DeviceClient/Common/Constants.js',
	'/DeviceClient/Common/SimpleInheritance.js'
);
