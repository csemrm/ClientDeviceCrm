DeviceClient.View.BusinessObjectSDView = function(controller) {

	// Call parent constructor.
	DeviceClient.View.ViewBase.call(this, controller);

	// Public properties.
	this.detailNavigationLeftButton = null;
	this.businessObjectId = this.controller.id;
	this.mainNavigation = null;
	this.globalBOActionButton = null;

	this.master = {};
	this.detail = {};

	this.master.window = null;
	this.detail.window = null;
	this.master.view = null;
	this.detail.view = null;
	this.win = null;

	// Constructor functionality.

	this.build();
}

DeviceClient.View.BusinessObjectSDView.inherits(DeviceClient.View.ViewBase);
// Declare base class. Has to happen after function definition because otherwise Javascript does not know the child object is a function. Could pre-declare inherits if we used "function childClass() { ... }" but we do not use that form because it clutters the global namespace.

// Prototype functions.

DeviceClient.View.BusinessObjectSDView.prototype.build = function() {

	this.buildMasterWindow();
	this.buildBaseDetailWindow();

	this.mainNavigation = this.master.window;
	//Ti.UI.createWindow ( { window: this.master.window, navBarHidden: false } );
	this.win = this.mainNavigation;
	this.win.navBarHidden = false;
	this.globalBOActionButton = Ti.UI.createButton({
		backgroundImage : DeviceClient.CONST.ACTION_BUTTON_IMAGE,
		width : 30,
		height : 15
	});
	this.globalBOActionButton.addEventListener("click", _.bind(function(event) {
		this.controller.onGlobalBOActionClick(event);
	}, this));
	this.win.rightNavButton = this.globalBOActionButton;
}

DeviceClient.View.BusinessObjectSDView.prototype.open = function(options) {

	if (this.win != null) {
		this.orientate();
	}
}

DeviceClient.View.BusinessObjectSDView.prototype.close = function() {

	this.master.window.close();
	this.detail.window.close();

	this.master.window = null;
	this.detail.window = null;
	this.master.view = null;
	this.detail.view = null;
	this.win = null;
	this.mainNavigation = null;

	this.controller = null;
}

DeviceClient.View.BusinessObjectSDView.prototype.buildMasterWindow = function() {

	this.master.window = Ti.UI.createWindow({
		backgroundColor : 'green',
		title : 'Master View - Red Window',
		navBarHidden : true
	});
	this.master.view = Ti.UI.createView();
}

DeviceClient.View.BusinessObjectSDView.prototype.buildBaseDetailWindow = function() {

	if (this.businessObjectId == "0") {
		this.detail.window = Ti.UI.createWindow({
			backgroundColor : 'red',
			title : 'Detail View - Red Window'
		});
	} else if (this.businessObjectId == "1") {
		this.detail.window = Ti.UI.createWindow({
			backgroundColor : 'yellow',
			title : 'Detail View - Yellow Window'
		});
	} else if (this.businessObjectId == "9") {
		this.detail.window = Ti.UI.createWindow({
			backgroundColor : 'white',
			title : 'Detail View - White Window'
		});
	} else {
		this.detail.window = Ti.UI.createWindow({
			backgroundColor : 'pink',
			title : 'Detail View - Pink Window'
		});
	}
}

DeviceClient.View.BusinessObjectSDView.prototype.open = function(options) {

	if (this.win != null) {
		this.orientate();
	}
}

DeviceClient.View.BusinessObjectSDView.prototype.orientate = function(event) {

	if (event != null) {
		switch (event.orientation) {
			case Ti.UI.PORTRAIT:
			case Ti.UI.UPSIDE_PORTRAIT:
				this.openPortrait();
				break;
			case Ti.UI.LANDSCAPE_LEFT:
			case Ti.UI.LANDSCAPE_RIGHT:
				this.openLandscape();
				break;
			default:
				this.openPortrait();
				break;
		}
	} else {
		var orientation = this.win.orientation;
		switch (orientation) {
			case Ti.UI.PORTRAIT:
			case Ti.UI.UPSIDE_PORTRAIT:
				this.openPortrait();
				break;
			case Ti.UI.LANDSCAPE_LEFT:
			case Ti.UI.LANDSCAPE_RIGHT:
				this.openLandscape();
				break;
			default:
				this.openPortrait();
				break;
		}
	}
}

DeviceClient.View.BusinessObjectSDView.prototype.openPortrait = function() {
}

DeviceClient.View.BusinessObjectSDView.prototype.openLandscape = function() {
}

DeviceClient.View.BusinessObjectSDView.prototype.refresh = function() {

}

