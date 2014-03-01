
DeviceClient.Model.DashboardModel = function() {
	
	// Call parent constructor.
	DeviceClient.Model.ModelBase.call ( this );

	// Constructor functionality.
}
DeviceClient.Model.DashboardModel.inherits(DeviceClient.Model.ModelBase); // Declare base class. Has to happen after function definition because otherwise Javascript does not know the child object is a function. Could pre-declare inherits if we used "function childClass() { ... }" but we do not use that form because it clutters the global namespace.

// Prototype functions.


DeviceClient.Model.DashboardModel.prototype.load = function() {

}
                                                                                                                                                                                                                                                                                                          