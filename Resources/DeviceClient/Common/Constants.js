/* Class: Singleton object containing all application-wide and device-specific runtime constants. 
 * History#	Date		Author			Description
 * 1.0		2011-09-25	MDS				Creation.
 * 2.0		2012-12-03	MDS				Refactored to initialise values in object constructor instead of initialised values. Needed because constants are being built based on other constants now and the "initialiser" approach does not work with property dependencies.
 */

Ti.include(
	'/DeviceClient/ThirdParty/Underscore.js'
)

DeviceClient.CONST = {
	
	// Versioning.
	APP_VERSION: "6.0.5.0.4.2",								// The program version of this app: Major public version, minor public version, service pack, hotfix, sprint number, increment within sprint.
																// When releasing to production then last two numbers are removed. 
																// For example, the app version is this during development: 6.0.10.0.5.1
																// It becomes this for production release: 6.0.10.0
	// Appcelerator SDK versioning differences.
	PRE_SDK_2: (Ti.version.substring(0,2)=="1." ? true : false),// SDK 2.x introduced new positioning and sizing rules and behaviour. 

	// Critical Layout Constants.
	DEVICE_MAXIMUM_PX: Math.max(Ti.Platform.displayCaps.platformWidth, Ti.Platform.displayCaps.platformHeight),
	DEVICE_MINIMUM_PX: Math.min(Ti.Platform.displayCaps.platformWidth, Ti.Platform.displayCaps.platformHeight),
	SMALL_DEVICE_MIN_WIDTH_THRESHOLD_PX: 600
	
}

_.extend ( DeviceClient.CONST, {

	// Critical Layout Constants.
	SMALL_DEVICE: DeviceClient.CONST.DEVICE_MINIMUM_PX <= DeviceClient.CONST.SMALL_DEVICE_MIN_WIDTH_THRESHOLD_PX,
	
	IOS7Plus: (Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad") ? (parseInt(Ti.Platform.version.split(".")[0], 10) >= 7) : false,

	// The Pivotal version of the app and the Saratoga version of the app are basically the same code base.
	// DeviceClient.MetaData.isSystemSaratoga() and DeviceClient.MetaData.isSystemPivotal() should be used to determine if the system the app is talking to is Pivotal or Saratoga.
	// These work by looking at the meta data received from the system. This removes the need for creating different builds of the app for Pivotal and Saratoga.
	// However there are one or two very specific cases where the type of system is not yet known (no meta data downloaded yet). For those situations the following constant is used.
	// The constant below is changed by the developer who builds the final version of the app for submission to Apple. This is like an "ifdef" macro.
	// But always use DeviceClient.MetaData.isSystemSaratoga() and DeviceClient.MetaData.isSystemPivotal() unless you have that case where meta data has not yet been downloaded.
	APP_IS_SARATOGA: true,										// See above comment.

	// General layout and sizing.
	STANDARD_LARGE_SEPARATOR_PX: 20,							// For major view separation.
	STANDARD_MEDIUM_SEPARATOR_PX: 10,							// For control separation.
	STANDARD_SMALL_SEPARATOR_PX: 5,								// For minor control separation.
	STANDARD_ROW_HEIGHT: 34,									// Form section row standard height.
	STANDARD_ROW_LABEL_HEIGHT: 27,								// Form section row label standard height, when fields have vertical label orientation.
	SECTION_TITLE_HEIGHT_PX: 37,								// Height of section title.
	SECTION_FIELD_SEPARATOR_PX: 1,								// Height of separator between rows.
	FIXED_SCROLLABLE_SECTION_SEPARATOR_PX: 2,					// Distance between a fixed header and a scrollable area.
	REQUIRED_INDICATOR_SEPARATOR_PX: 32,						// How far left the "*" is from a required field.
	MINIMUM_DATA_FIELD_WIDTH_PX: 100,							// Since labels can be too big for a section's column, this constant defines the minimum width the data will go to.
	TEXT_FIELD_EDITABLE_TEXT_SHIFT_PX: 7, 						// TiTextField moves its text by this amount when it switches between ediable and not editable.
	AVERAGE_CHAR_WIDTH_PIXELS: 12,								// TODO possible to calculate?
	BORDER_RADIUS: 10,											// In pixels
	BORDER_RADIUS_IOS7Plus: 3,
	BUTTON_BORDER_RADIUS: DeviceClient.CONST.IOS7Plus ? 0 : 10,									// In pixels
	TITLE_BAR_HEIGHT: 44,										// Really an iOS standard, but no way for Titanium to tell what the real height is. http://developer.appcelerator.com/question/104201/height-of-the-titlebar-in-an-iphoneipad-app
																// From: http://www.idev101.com/code/User_Interface/sizes.html
	ACTIVITY_HIGHLIGHTER_SIZE_PX: 40,
	ACTIVITY_HIGHLIGHTER_OPACITY: 0.8,
	DATETIME_PICKER_WIDTH_PX: 450,								// There seems no way to calculate this from the controls themselves.
	DATE_PICKER_WIDTH_PX: 400,									// There seems no way to calculate this from the controls themselves.
	TIME_PICKER_WIDTH_PX: 400,									// There seems no way to calculate this from the controls themselves.
	DATETIME_PICKER_HEIGHT_PX: 212,								// There seems no safe way to calculate this from the controls themselves.
	SEARCH_FILTER_HEIGHT_PX: 44,
	STANDARD_FIELD_BUTTON_DIMENSION: 34,						// Square button which matches the row height
	ATTACHMENT_BUTTON_OFFSET: 22,								// The button is raised above the usual baseline to make way for the attachment data type.

	// Fonts.
	STATIC_TEXT_FONT: { fontSize: 16, fontWeight: "normal" },
	SETTINGS_STATIC_TEXT_FONT: { fontSize: 14, fontWeight: "normal" },
	
	// Font sizes.
	TINY_FONT_SIZE: 12,
	
	// Business Object and Form layout and sizing.
	SPLITVIEW_MASTER_WIDTH_PX: 319,								// iOS standard is actually 320. But we give the detail view an even number of pixels so that its horizontal alignment of forms does not have jagged edges. 
	SPLITVIEW_MASTER_HEADER_HEIGHT_PX: 54,
	SPLITVIEW_MASTER_DETAIL_SEPARATOR_PX: 1					   // Draws the vertical line between master and detail.
} )

_.extend ( DeviceClient.CONST, {
	SPLITVIEW_MASTER_TABLE_VIEW_LANDSCAPE_HEIGHT_PX: DeviceClient.CONST.DEVICE_MINIMUM_PX - (DeviceClient.CONST.SMALL_DEVICE ? 110 : 219), // 549,
	SPLITVIEW_MASTER_TABLE_VIEW_PORTRAIT_HEIGHT_PX: DeviceClient.CONST.DEVICE_MAXIMUM_PX - (DeviceClient.CONST.SMALL_DEVICE ? 130 : ( DeviceClient.CONST.IOS7Plus ? 221 : 204 )), // 820,
	RECORD_SELECTOR_TABLE_VIEW_LANDSCAPE_HEIGHT_PX: 550,//Ti.Platform.displayCaps.platformHeight - 200,//- 158, // 610,
	RECORD_SELECTOR_TABLE_VIEW_PORTRAIT_HEIGHT_PX: Ti.Platform.displayCaps.platformHeight - 240, // 850,

	DATA_FORM_WIDTH_LANDSCAPE_PX: (DeviceClient.CONST.SMALL_DEVICE ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformHeight - DeviceClient.CONST.SPLITVIEW_MASTER_WIDTH_PX + DeviceClient.CONST.SPLITVIEW_MASTER_DETAIL_SEPARATOR_PX), // 704,	// Small devices don't show a SRL when they are in landscape mode. Note: Even number prevents jagged edges on form and other controls needing to use center alignment. See SPLITVIEW_MASTER_WIDTH_PX above.
	DATA_FORM_WIDTH_PORTRAIT_PX: (DeviceClient.CONST.SMALL_DEVICE ? DeviceClient.CONST.DEVICE_MINIMUM_PX : DeviceClient.CONST.DEVICE_MINIMUM_PX + 2), // 770,		TODO Why 768 + 2?					// For now, since the form does not re-arrange itself on rotate, for smaller devices the width is set to the smalest dimenson. 
	DATA_FORM_HEIGHT_LANDSCAPE_PX: (DeviceClient.CONST.SMALL_DEVICE ? DeviceClient.CONST.DEVICE_MINIMUM_PX - 100 : (DeviceClient.CONST.IOS7Plus ? DeviceClient.CONST.DEVICE_MINIMUM_PX - 118 : DeviceClient.CONST.DEVICE_MINIMUM_PX - 108)), // 660,	
	DATA_FORM_HEIGHT_PORTRAIT_PX: (DeviceClient.CONST.SMALL_DEVICE ? DeviceClient.CONST.DEVICE_MAXIMUM_PX - 114 : (DeviceClient.CONST.IOS7Plus ? DeviceClient.CONST.DEVICE_MAXIMUM_PX - 118 : DeviceClient.CONST.DEVICE_MAXIMUM_PX - 114)),// 910,
	DATA_FORM_HEIGHT_INCREMENT_WITHOUT_TABS_PX: 50,
	DATA_FORM_ACTION_VIEW_WIDTH_PX: 86,
	DATA_FORM_EDIT_DATE_LABEL_COLOUR: "#FFF",
	DATA_FORM_EDIT_DATE_HEIGHT_PX: 20,
	RECORD_SELECTOR_BANNER_HEIGHT_PX: 50,
	SEARCH_PARAMETERS_VIEW_HEIGHT_PX: 184,						// 3 fields high.
	SEARCH_CONTROLS_WIDTH_PX: (DeviceClient.CONST.IOS7Plus || DeviceClient.CONST.SMALL_DEVICE ? "100%" : 303), // Width of the controls in the master view.
	SEARCH_FOOTER_HEIGHT_PX: 55,
	SEARCH_FOOTER_SMALL_HEIGHT_PX: 18,
	SEARCH_MAX_IMAGE_WIDTH_PX: 100,								// Max width of an image inside a table view row.
	SEARCH_MAX_DATA_WIDTH_PX: 250,

	// Settings Form.
	SETTINGS_FORM_HEIGHT_PX: 660,
	SETTINGS_FORM_WIDTH_PX: 700,
	SETTINGS_FORM_HEIGHT_PRELOGIN_PX: Ti.Platform.displayCaps.platformHeight - 80,
	
	SETTINGS_FORM_WIDTH_LANDSCAPE_PX: 704,							// Even number prevents jagged edges on form and other controls needing to use center alignment.
	SETTINGS_FORM_WIDTH_PORTRAIT_PX: 770,
	SETTINGS_FORM_HEIGHT_LANDSCAPE_PX: 660,
	SETTINGS_FORM_HEIGHT_PORTRAIT_PX: 910,
	
	SETTINGS_FORM_HEIGHT_INCREMENT_WITHOUT_TABS_PX: 50,	
				
	// PopupWindow.
	POPOVER_TITLE_HEIGHT_ADJUST_PX: 54,
	POPUP_WINDOW_BORDER_WIDTH_PX: DeviceClient.CONST.IOS7Plus ? 1 : 8,							// Standard iOS popup border width.
	MASTER_POPUP_Y_PX: 50,
	MASTER_POPUP_X_PX: 10,
	FOREIGN_KEY_SELECTOR_POPUP_Y_PX: 10,
	FOREIGN_KEY_SELECTOR_POPUP_RIGHT_PX: 10,

	// SelectionDialog.
	NUM_VISIBLE_ITEMS_IN_SELECTION: 15,							// Number of items to show in a popup list. Determines maximum view height.
	MINIMUM_SELECTION_WIDTH_PX: 270,							// Minimum width of lists shown for combos and choices.
	MAXIMUM_SELECTION_WIDTH_PX: DeviceClient.CONST.DEVICE_MINIMUM_PX - 200,
	MINIMUM_SELECTION_HEIGHT_PX: 300,
	SELECTION_ROW_HEIGHT_PX: 46,
	POPOVER_TITLE_HEIGHT_PX: 42,
	SELECTION_BUTTON_HEIGHT_PX: 40,

	// Dashboard
	//DASHBOARD_BACKGROUND_COLOR: "#5e6167",
	DASHBOARD_BACKGROUND_COLOR: "#FFF",
	DASHBOARD_VIEW_LEFT_MARGIN: 10,
	DASHBOARD_VIEW_RIGHT_MARGIN: 10,
	DASHBOARD_VIEW_TOP_MARGIN: 10,
	DASHBOARD_VIEW_BOTTOM_MARGIN: 10,
	DASHBOARD_SECTION_VERTICAL_GAP: 10,
	DASHBOARD_QUERYRESULTS_HEADER_BACKGROUND_COLOR: "#1A8ECE",
	DASHBOARD_QUERYRESULTS_ROW_BACKGROUND_COLOR: "#FFF",
	DASHBOARD_QUERYRESULTS_ROW_DISABLED_BACKGROUND_COLOR: "#e0e0e0",
	DASHBOARD_QUERYRESULTS_ROW_TOP_MARGIN: 3,	
	DASHBOARD_QUERYRESULTS_ROW_BOTTOM_MARGIN: 3,
	DASHBOARD_QUERYRESULTS_TITLE_COLOR: "#000",
	
	// Login
	LOGIN_BACKGROUND_IMAGE_FILENAME: DeviceClient.CONST.IOS7Plus ? "" : ((DeviceClient.CONST.SMALL_DEVICE ? "/Images/login320x480.jpg" : "/Images/login.jpg")),	
	LOGIN_CUSTOM_BACKGROUND_IMAGE_FILENAME: (DeviceClient.CONST.SMALL_DEVICE ? "login320x480.jpg" : "login.jpg"),
	LOGIN_HEADER_VIEW_PIVOTAL_IMAGE_FILENAME: (DeviceClient.CONST.SMALL_DEVICE ? "/Images/login_header_smalldevice.png"	: "/Images/login_header.png"),
	LOGIN_HEADER_VIEW_SARATOGA_IMAGE_FILENAME: (DeviceClient.CONST.SMALL_DEVICE ? "/Images/login_header_smalldevice_saratoga.png" : "/Images/login_header_saratoga.png"),
	LOGIN_HEADER_VIEW_PIVOTAL_IMAGE_FILENAME_IOS7PLUS: (DeviceClient.CONST.SMALL_DEVICE ? "/Images/login_header_smalldevice_ios7plus.png"	: "/Images/login_header_iOS7Plus.png"),
	LOGIN_HEADER_VIEW_SARATOGA_IMAGE_FILENAME_IOS7PLUS: (DeviceClient.CONST.SMALL_DEVICE ? "/Images/login_header_smalldevice_saratoga_ios7plus.png" : "/Images/login_header_saratoga_iOS7Plus.png"),	
	LOGIN_HEADER_VIEW_TOP: 0,
	LOGIN_HEADER_VIEW_WIDTH: 409,
	LOGIN_HEADER_VIEW_HEIGHT: 154,
	LOGIN_HEADER_VIEW_SOFTWARE_LABEL_TOP: 85,
	LOGIN_HEADER_VIEW_SOFTWARE_LABEL_LEFT: 105,
	LOGIN_HEADER_VIEW_SOFTWARE_LABEL_WIDTH: 200,
	LOGIN_HEADER_VIEW_SOFTWARE_LABEL_HEIGHT: 16,	
	LOGIN_HEADER_VIEW_SOFTWARE_LABEL_FONT_SIZE: 11,
	LOGIN_HEADER_VIEW_VERSION_LABEL_TOP: 101,
	LOGIN_HEADER_VIEW_VERSION_LABEL_LEFT: 105,
	LOGIN_HEADER_VIEW_VERSION_LABEL_WIDTH: 200,
	LOGIN_HEADER_VIEW_VERSION_LABEL_HEIGHT: 16,	
	LOGIN_HEADER_VIEW_VERSION_LABEL_FONT_SIZE: 11,	
	
	LOGIN_INPUT_SECTION_LEFT: (DeviceClient.CONST.SMALL_DEVICE ? 0 : 332),
	LOGIN_INPUT_SECTION_TOP: (DeviceClient.CONST.SMALL_DEVICE ? 25 : 194),	
	LOGIN_INPUT_SECTION_WIDTH: (DeviceClient.CONST.SMALL_DEVICE ? 278 : 367),
	LOGIN_INPUT_SECTION_COLLAPSED_HEIGHT: (DeviceClient.CONST.SMALL_DEVICE ? 198 : 266),
	LOGIN_INPUT_SECTION_USING_WEBVIEW_COLLAPSED_HEIGHT: (DeviceClient.CONST.SMALL_DEVICE ? 124 : 148),
	
	LOGIN_INPUT_SECTION_BACKGROUND_COLOUR: "#FFF",
	LOGIN_INPUT_SECTION_LEFT_MARGIN: 12,
	LOGIN_INPUT_SECTION_RIGHT_MARGIN: 12,
	LOGIN_INPUT_SECTION_LABEL_HEIGHT: (DeviceClient.CONST.SMALL_DEVICE ? 10 : 16),
	LOGIN_INPUT_SECTION_LABEL_COLOUR: "#757575",	
	LOGIN_INPUT_SECTION_LABEL_FONT_SIZE: (DeviceClient.CONST.SMALL_DEVICE ? 9 : 14),
	LOGIN_INPUT_SECTION_TEXTBOX_FONT_SIZE: (DeviceClient.CONST.SMALL_DEVICE ? 12 : 16),	
	LOGIN_INPUT_SECTION_TEXTBOX_HEIGHT: (DeviceClient.CONST.SMALL_DEVICE ? 20 : 24),
	LOGIN_INPUT_SECTION_TOP_VERTICAL_GAP: (DeviceClient.CONST.SMALL_DEVICE ? 2 : 7),
	LOGIN_INPUT_SECTION_LABEL_TEXTBOX_VERTICAL_GAP: 2,
	
	LOGIN_INPUT_SECTION_SETTING_BUTTON_TOP: (DeviceClient.CONST.SMALL_DEVICE ? 6 : 1),
	LOGIN_INPUT_SECTION_SETTING_BUTTON_RIGHT: 11,
	LOGIN_INPUT_SECTION_SETTING_BUTTON_WIDTH: 38,	
	LOGIN_INPUT_SECTION_SETTING_BUTTON_HEIGHT: 38,
	LOGIN_INPUT_SECTION_SETTING_BLOCKING_OVERLAY_TOP: (DeviceClient.CONST.SMALL_DEVICE ? 6: 1),
	LOGIN_INPUT_SECTION_SETTING_BLOCKING_OVERLAY_RIGHT: 11,
	LOGIN_INPUT_SECTION_SETTING_BLOCKING_OVERLAY_WIDTH: 38,
	LOGIN_INPUT_SECTION_SETTING_BLOCKING_OVERLAY_HEIGHT: 38,
	LOGIN_INPUT_SECTION_SETTING_BLOCKING_OVERLAY_BACKGROUND_COLOUR: (DeviceClient.CONST.IOS7Plus ? "#d0103a" : (DeviceClient.CONST.SMALL_DEVICE ? "#d0103a" : "#26384a")),
	LOGIN_INPUT_SECTION_SETTING_BLOCKING_OVERLAY_OPACITY: 0.4,
	
	LOGIN_INPUT_SECTION_HEADER_LEFT: 0,
	LOGIN_INPUT_SECTION_HEADER_TOP: 0,	
	LOGIN_INPUT_SECTION_HEADER_HEIGHT: (DeviceClient.CONST.SMALL_DEVICE ? 30 : 40),
	LOGIN_INPUT_SECTION_HEADER_BACKGROUND_COLOUR: (DeviceClient.CONST.IOS7Plus ? "#DD1E38" : "#143256"),
	LOGIN_INPUT_SECTION_HEADER_LABEL_COLOUR: (DeviceClient.CONST.IOS7Plus || DeviceClient.CONST.SMALL_DEVICE ? "#FFFFFF" : "#d9d9d9"),
	LOGIN_INPUT_SECTION_HEADER_LABEL_HEIGHT: (DeviceClient.CONST.SMALL_DEVICE ? 15 : 40),
	LOGIN_INPUT_SECTION_HEADER_LABEL_TOP: (DeviceClient.CONST.SMALL_DEVICE ? 31 : 30),
	LOGIN_INPUT_SECTION_HEADER_LABEL_LEFT: 15,
	LOGIN_INPUT_SECTION_HEADER_LABEL_FONT_SIZE: (DeviceClient.CONST.SMALL_DEVICE ? 14: 18),	
	
	LOGIN_INPUT_SECTION_SEPARATOR_VERTICAL_GAP: (DeviceClient.CONST.SMALL_DEVICE ? 2 : 6),	
	LOGIN_INPUT_SECTION_SEPARATOR_COLOUR: "#bfbfbf",
	LOGIN_INPUT_SECTION_SEPARATOR_LEFT: 0,
	LOGIN_INPUT_SECTION_SEPARATOR_HEIGHT: 1,
	LOGIN_INPUT_SECTION_SEPARATOR_WIDTH: "100%", 
	LOGIN_INPUT_SECTION_SEPARATOR_BOTTOM_LEFT: 0,
	LOGIN_INPUT_SECTION_SEPARATOR_BOTTOM_TOP: (DeviceClient.CONST.SMALL_DEVICE ? 198 : 267),
	LOGIN_INPUT_SECTION_SEPARATOR_BOTTOM_HEIGHT: 1,	
			
	LOGIN_INPUT_SECTION_BUTTON_HEIGHT: (DeviceClient.CONST.SMALL_DEVICE ? 27 : 35 ),
	LOGIN_INPUT_SECTION_BUTTON_TOP: (DeviceClient.CONST.SMALL_DEVICE ? 166 : 218),
	LOGIN_INPUT_SECTION_BUTTON_LEFT: (DeviceClient.CONST.SMALL_DEVICE ? 144 : 190),
	LOGIN_INPUT_SECTION_BUTTON_WIDTH: (DeviceClient.CONST.SMALL_DEVICE ? 120 : 169),
	
	LOGIN_INPUT_SECTION_BUTTON_OFFLINE_ICON_WIDTH: 9,
	LOGIN_INPUT_SECTION_BUTTON_OFFLINE_ICON_HEIGHT: 9,
	LOGIN_INPUT_SECTION_BUTTON_OFFLINE_ICON_TOP_MARGIN: (DeviceClient.CONST.SMALL_DEVICE ? 4 : 5),
	LOGIN_INPUT_SECTION_BUTTON_OFFLINE_ICON_LEFT: (DeviceClient.CONST.SMALL_DEVICE ? 7 : 15),
	
	LOGIN_INPUT_SECTION_SPINNER_LEFT: (DeviceClient.CONST.SMALL_DEVICE ? 120 : 167 ),
	LOGIN_INPUT_SECTION_SPINNER_TOP: (DeviceClient.CONST.SMALL_DEVICE ? 95 : 272 ),
	LOGIN_INPUT_SECTION_SPINNER_WIDTH: 32,
	LOGIN_INPUT_SECTION_SPINNER_HEIGHT:	32,	
	
	LOGIN_STATUS_SECTION_TOP: (DeviceClient.CONST.SMALL_DEVICE ? 233 : 308),
	LOGIN_STATUS_SECTION_HEIGHT: (DeviceClient.CONST.SMALL_DEVICE ? 200 : 200),
	
	// Cancel & Status Button
	LOGIN_BUTTON_LEFT: (DeviceClient.CONST.SMALL_DEVICE ? 79 : 116),
	LOGIN_BUTTON_TOP: (DeviceClient.CONST.SMALL_DEVICE ? 202 : 500),
	LOGIN_BUTTON_WIDTH: (DeviceClient.CONST.SMALL_DEVICE ? 120 : 141),	
	LOGIN_BUTTON_HEIGHT: (DeviceClient.CONST.SMALL_DEVICE ? 27 : 35),
	LOGIN_BUTTON_TEXT_COLOUR: (DeviceClient.CONST.IOS7Plus ? "#0a83fe" : "#FFF"),
	LOGIN_BUTTON_CANCEL_TEXT_COLOUR: (DeviceClient.CONST.IOS7Plus ? "red" : "#FFF"),
	LOGIN_BUTTON_FONT_SIZE: (DeviceClient.CONST.SMALL_DEVICE ? 14: 18),	
	
	LOGIN_POPOVER_TEXTBOX_WIDTH: 300,
	LOGIN_POPOVER_WIDTH: 400,
	LOGIN_POPOVER_HEIGHT: 400, 
	LOGIN_POPOVER_BACKGROUND_COLOUR: "#FFF",
	LOGIN_EXPAND_CONTENT_TOP_MARGIN: 15,
	
	DASHBOARD_REFRESH_BUTTON_SIZE: DeviceClient.CONST.IOS7Plus ? 25 : 25,
	
	ACTION_BUTTON_WIDTH_HEIGHT: 45,
	FORM_CONFIRM_CANCEL_BUTTON_WIDTH_HEIGHT: (DeviceClient.CONST.SMALL_DEVICE ? 34 : 40),
	
	SEARCH_PARAMS_PARENT_LEFT: DeviceClient.CONST.IOS7Plus ? 0 : 8,
	SEARCH_PARAMS_SEARCH_BUTTON_WIDTH_PX: DeviceClient.CONST.IOS7Plus ? "95%" : 303  - (DeviceClient.CONST.STANDARD_MEDIUM_SEPARATOR_PX * 2),
	SEARCH_PARAMS_SEARCH_BUTTON_LEFT: DeviceClient.CONST.STANDARD_MEDIUM_SEPARATOR_PX,
	SEARCH_PARAMS_SEARCH_FORM_WIDTH_PX: DeviceClient.CONST.IOS7Plus ? 319: 303,
	SEARCH_PARAMS_BACKGROUND_COLOR: "#e5e5e5",
	SEARCH_PARAMS_TOGGLEVIEW_BUTTON_IMAGE: DeviceClient.CONST.IOS7Plus ? "/Images/search_params_button_blue.png" : "/Images/search_params_button_green.png",
	SEARCH_PARAMS_REFRESH_BUTTON_IMAGE: DeviceClient.CONST.IOS7Plus ? "/Images/search_refreshButton_whiteNoShadow.png" : "/Images/search_refreshButton.png",
	
	// Colours.
	LOGIN_WINDOW_BACKGROUND_COLOR: DeviceClient.CONST.IOS7Plus ? "#FFF" : "",
	TABGROUP_WINDOW_BACKGROUND_COLOUR : "#747474",
	WINDOW_BACKGROUND_COLOUR: DeviceClient.CONST.IOS7Plus ? "grey" : "#747474",						// For all windows. Was "#D4D4D4"
	SECTION_LABEL_FOREGROUND_COLOUR_APTEAN_RED: "#DD1E38",
	SECTION_LABEL_FOREGROUND_COLOUR: "#F1F1F1",
	SECTION_LABEL_BACKGROUND_COLOUR: DeviceClient.CONST.IOS7Plus ? "#717070" : "#143256",
	FIELD_BACKGROUND_COLOUR: "#FFF",
	FIELD_FOREGROUND_COLOUR: "#000",
	FIELD_CLICKABLE_FOREGROUND_COLOUR: "#00F",
	FIELD_READONLY_BACKGROUND_COLOUR: "#F1F1F1",				// Was: "f2f3f5". Alt: "#F4F4F4". Standard is "#E3E3E3"
	LABEL_REQUIRED_FIELD_FOREGROUND_COLOUR: "#600",				// Label of required field.
	LABEL_NON_REQUIRED_FIELD_FOREGROUND_COLOUR: "#35679E",		// Label of non-required field.
	LABEL_BACKGROUND_COLOUR: "#FFFFFF",							// Label's background colour when not in edit mode.
	LABEL_EDIT_MODE_BACKGROUND_COLOUR: "#F1F1F1",				// Label's background colour when in edit mode.
	FIELD_SEPARATOR_COLOUR: "#BDBDBD",
	TABLE_VIEW_ROW_BACKGROUND_COLOUR: "#FFF",					// Alt: "#f2f3f5"
	TABLE_VIEW_ROW_PRIMARY_TEXT_COLOUR: "#313131",
	TABLE_VIEW_ROW_SECONDARY_TEXT_COLOUR: "#77787c",
	TABLE_VIEW_ROW_BACKGROUND_TOUCHING_COLOUR: "#FFF",			// This colour when a finger is on the table view.
	TABLE_VIEW_ROW_BACKGROUND_SELECTING_COLOUR: "#ffb102",		// This colour while the record being read and loaded.
	TABLE_VIEW_ROW_BACKGROUND_SELECTED_COLOUR: "#ffbe00",		// This colour once the selected record is loaded.
	TABLE_VIEW_SEPARATOR_COLOR: "#b0b0b0",
	SPLITVIEW_BACKGROUND_COLOUR: DeviceClient.CONST.IOS7Plus ? "#FFF" : "#747474",
	RECORD_SELECTOR_BANNER_LIGHT_COLOUR: "#99dbe7",
	RECORD_SELECTOR_BANNER_DARK_COLOUR: "#1598b5",
	DASHBOARD_PAGE_BACKGROUND_COLOUR: "#E3E3E3",
	POPUP_WINDOW_BORDER_COLOUR: DeviceClient.CONST.IOS7Plus ? "#717070" :"#07132c",						// Was: "#07132c". Alt: "#313131"
	IOS_WINDOW_BACKGROUND_COLOUR: "#dfe2e7",
	SETTINGS_SECTION_TITLE_FOREGROUND_COLOUR: "#4c566c",
	SETTINGS_FIELD_SEPARATOR_COLOUR: "#9d9ca1",					// iOS sep color: "#b4b7bb"
	SETTINGS_READONLY_BACKGROUND_COLOUR: "#FEFEFE",				// Settings is shown less "grey" in the read only fields, for clarity.
	DEFAULT_SEARCH_FOREGROUND_COLOUR: "#2b517c",				// Colour indicating this is the default search.
	SEARCH_PARAMETERS_COLOUR: "#8DB600",
	ATTACHMENT_BACKGROUND_COLOUR: "#FFF",
	BUTTON_TOUCH_DARKENING_FACTOR: 1.5,							// Factor to reduce the RGB value(s) of a button when it is touched.
	BUTTON_TEXT_COLOUR: (DeviceClient.CONST.IOS7Plus ? "#0a83fe" : "#FFF"),
	SPLITVIEW_MASTER_DETAIL_SEPARATOR_COLOR: "#717070",
	SEARCH_HEADER_COLOR: DeviceClient.CONST.IOS7Plus ? "#717070" : "",
	SEARCH_FOOTER_COLOR: DeviceClient.CONST.IOS7Plus ? "#717070" : "",
	SEARCH_HEADER_TITLE_COLOR: "#fff",
	SETTINGS_BACKGROUND_COLOR: "#EFEFF5",
	POPUP_SEARCH_HEADER_COLOR: "#403f3f",
	POPUP_SEARCH_FOOTER_COLOR: "#403f3f",
	
	// Opacity
	DISABLED_BUTTON_OPACITY: 0.0,								// Invisible.
	FULL_OPACITY: 1.0,
	HIDDEN_OPACITY: 0.0,
	HINT_TEXT_OPACITY: 0.2,
	HIDE_MOST_THINGS_BELOW_OPACITY: 0.7,
	
	// Animation durations.
	DATA_FORM_HIDE_SHOW_MASTER_DURATION: 0,
	
	// File and folder names.
	META_CACHE_FILE_NAME: "DeviceClient.MetaCache.txt",			// Where the meta data is saved after login, and where it is cached for offline mode.
	PERMISSIONS_CACHE_FILE_NAME: "DeviceClient.Permissions.txt",// Where the permissions saved after login, and where it is cached for offline mode.
	LOG_FILE_NAME: "DeviceClient.Log.txt",						// File name of the app log.
	OFFLINE_CACHE_ROOT_FOLDER_NAME: "OfflineCache",				// Holds offline cached data for multiple systems.
	IMAGE_ROOT_FOLDER_NAME: "Images",							// Holds images and icons sourced from the meta database.
	ATTACHMENTS_ROOT_FOLDER_NAME: "Attachments",				// Holds attachments, temporarily.
	IMAGE_MAP_FILE_NAME: "ImageMap.txt",						// Mapping of image name to image id.
	SYSTEMS_FOLDER_NAME: "Systems",								// Folder which contains all of the systems.
	
	DASHBOARD_REFRESH_BUTTON_IMAGE: DeviceClient.CONST.IOS7Plus ? "/Images/refreshButton_blue_noshadow.png" : "/Images/refreshButton_dark.png",
	MISSING_IMAGE_PATH: "/Images/missing_image.png",
	
	SEARCH_FOOTER_IMAGE: DeviceClient.CONST.IOS7Plus ? "" : "/Images/search_footer.png",
	SEARCH_HEADER_IMAGE: DeviceClient.CONST.IOS7Plus ? "" :  "/Images/search_header.png",
	
	ACTION_BUTTON_IMAGE: DeviceClient.CONST.IOS7Plus ? "/Images/actionButton_ios7plus.png" :  "/Images/actionButton.png", 
	ACTION_BUTTON_WHITE_IMAGE: DeviceClient.CONST.IOS7Plus ? "/Images/actionButtonWhite_ios7plus.png" :  "/Images/actionButton.png", 
	FORM_CANCEL_BUTTON_IMAGE: DeviceClient.CONST.IOS7Plus ? "/Images/form_cancel_ios7plus.png" :  "/Images/form_cancel.png", 
	FORM_CONFIRM_BUTTON_IMAGE: DeviceClient.CONST.IOS7Plus ? "/Images/form_confirm_ios7plus.png" :  "/Images/form_confirm.png", 
	POPOVER_ARROR_IMAGE: DeviceClient.CONST.IOS7Plus ? "/Images/popover_arrow_ios7plus.png" :  "/Images/popover_arrow.png",  
	
	// Special datatypes.
	DATATYPE_DEVICE_ICON: "DeviceIcon",
	DATATYPE_DEVICE_WEBVIEW: "DeviceWebView",
	DATATYPE_DEVICE_APP_URL: "DeviceAppURL",					// This is defunct, but left in because existing release 1 test environments still use it. In theory though, no customer system should use it because the SP10 Toolkit was changed at the last moment to include DeviceWebView.
	// DATATYPE_DEVICE_BROWSER_URL: "DeviceBrowserURL",			// Removed during release 1 development. We did not need it. DeviceWebView provides everything we need. But it still exists in the SP10 Toolkit.
	DATATYPE_DEVICE_SIGNATURE: "Attachment",

	// Default values.	
	DASHBOARD_GRAPHS_DEFAULT_CHOICE: 2,							// A choice index and not a value.
	DASHBOARD_QUERIES_DEFAULT_CHOICE: 3,						// A choice index and not a value.
	COMMUNICATIONS_TIMEOUT_DEFAULT_CHOICE: 30000,				// A choice index AND a value to use in timeout properties. In milliseconds.
	LOGIN_TIMEOUT_DEFAULT_CHOICE: 120000,						// A choice index AND a value to use in timeout properties. In milliseconds. Applies to login and metadata download.
	LOGIN_AUTHENTICATION_DEFAULT_CHOICE: "Application",
	DATE_ABBREVIATION_DEFAULT_CHOICE: "short",					// How a localised date string is shown to the user.
	PHONE_OPTION_DEFAULT_CHOICE: (DeviceClient.CONST.SMALL_DEVICE ? "tel" : "skype"),

	// Logging.
	MAX_LOG_LINES_TO_DISPLAY: 1000,								// Keeps the resources used by the app down.
	MAX_LINES_IN_LOG: 1000, 									// Keeps the size of the app log from always growing, but also allows more than just the last run to be saved. 
	MAX_CHARACTERS_IN_LOG_MESSAGE: 10000,						// Prevents a log message from using up too much memory on the device, and in the log window, and in the email that might be sent.

	// Special tokens for customisers. Note: /i ensures regex ignores case.
	HINT_TEXT_TOKEN_REGEX: /#hint:(.*?)#/i, 					// Put in Field title. Puts light-grey hint text into the control. Example: #hint:Company Name#
	SEGMENT_APPEND_TOKEN_REGEX: /#append:(.*?)#/i,				// Put in Segments title. Allows primary and secondary segments to merge together on the form. Values: true or false. Example: #append:true#
	SEGMENT_LABEL_ALIGN_TOKEN_REGEX: /#labelAlign:(.*?)#/i, 	// For Segments. Label alignment in a section: row or column. Default is row. Example: #labelAlign:column#
	DASHBOARD_ITEM_INDEX_TOKEN_REGEX: /#ordinal:(.*?)#/i,		// For Portal Items. Determines left-to-right ordering of items on the dashboard. Example: #ordinal:42#
	FOREIGN_KEY_FILTER_EXCLUSIVE_TOKEN_REGEX: /#filter:exclusive#/i, // For foreign key field. Put in filter parameter. Makes the app only show this one search when selecting the foreign key record. Only value is exclusive: #filter:exclusive#
	URL_ICON_TOKEN_REGEX: /#icon:(.*?)#/i,						// Put in Field title. Sets the button on the right side of the field to the specified image. Image name must be in double quotes, and must match the name of an image in the BM. Example: #icon:"account manager"#
	SPELLCHECK_TOKEN_REGEX: /#spellcheck:(.*?)#/i,				// Put in Field title. Turns on or off spellchecking for a text field. Values: true or false. Example: #spellcheck:true#
	EDITOR_TOKEN_REGEX: /#editor:(.*?)#/i,						// Put in Field title. Sets the editor for an attachment field. Values: signature. Example: #editor:signature#
	
	// Internal code tokens.
	TABLE_VIEW_FILTER_FIELD_NAME: "__filter__",					// The name of the property which contains the string used for filtering table views.
	FAVOURITES_ID: "Favourites",								// Not a language string. An internal string different from a hex record id.
	USER_TOKEN_OFFLINE_MODE: "usertokenoffline",
	USER_TOKEN_DEMO_MODE: "usertokendemo",
	SECONDARY_DELAY_LOAD_REC_COUNT_ID: "?",						// Record count identifier for secondaries that are delay loaded.
	
	// Demo mode constants
	DEMO_MODE_URL: "http://localhost/doc",						// Only the "doc" part is used.
	
	// String shown to user.
	FILTER_QUERY_TITLE: "Filtered List",
	
	// Global event names.
	GLOBAL_APP_EVENT_HANDLER: "globalAppEvent",
	
	// Field size maximums.
	MAX_ATTACHMENT_FILE_NAME_LENGTH: 254,						// This is the value for Pivotal attachment filenames.
	
	// List constants.
	DEFAULT_LIST_DELIMITER: ",",
	MINIMUM_LIST_WIDTH_PX: 320,									// Minimum width of lists.
	MINIMUM_LIST_HEIGHT_PX: 500,								// Minimum height of lists.
	
	// Warnings.
	ALERT_FLOOD_BRAKE_MILLISECS: 500,							// Do not show communications alerts within 500ms of each other. Stops a flood of alerts appearing if comms breaks badly in some way.	
	SELECTION_ITEM_COUNT_WARNING_THRESHOLD: 100,				// Selection dialog shows count of items if > than this number. Also shows an activity spinner if > this number when popping up.
		
	// Special token values used in the API.
	SECONDARY_FORM_ID_SHOW_NO_FORM: "None"						// If no SecondaryFormId is given then the default is calculated. Supplying this value tells the app to not use the default, but to disallow the user from clicking through.
} )

// "Enumerator" types
DeviceClient.CONST.SERVER_STATUS = {
	SUCCESS: "success",
	ERROR: "Error"
	
}
DeviceClient.CONST.SERVER_ERROR_CODE = {
	BUSINESS_RULE_EXCEPTION: "BusinessRuleException",
	OFFLINE_FILE_MISSING:	"OFFLINE_FILE_MISSING"	
}
DeviceClient.CONST.PRIMARY_DETAIL_DATA_TYPE = {
	FIELD: "field",
	SECONDARY: "secondary",
	WEB_SEGMENT: "webSegment",
	STATIC_TEXT: "staticText",
	BUTTON: "button",
	SEPARATOR: "separator",
	SRL_SEGMENT: "srlSegment"
}
DeviceClient.CONST.DATA_TYPE = {
	TEXT: "Text",
	MEMO: "Memo",
	BOOLEAN: "Boolean",
	CHOICE: "Choice",
	COMBO: "Combo",
	CURRENCY: "Currency",
	DOUBLE: "Double",
	INTEGER: "Integer",
	BINARY: "Binary",
	DATE: "Date",
	DATETIME: "DateTime",
	TIME: "Time",
	RECORD_ID: "Id",
	RN_UPDATE_TYPE: "Rn_Update_Type",
	LIST: "List"
}
DeviceClient.CONST.DATA_SUBTYPE = {
	BINARY_FILE: "BinaryFile",
	SEQUENCE_NUMBER: "IdSequenceNumber",
	ID: "Id",
	URL: "TextUrl",
	EMAIL: "TextEmail",
	PHONE: "TextVoicePhone",
	PASSWORD: "TextPassword",
	STAFF_ID: "IdStaffReference",
	AGENT_ID: "IdAgent",
	TABLE_ID: "IdTable",
	UTC: "UTC"
}
DeviceClient.CONST.APP_MENU_FUNCTION_TYPE = {
	SETTINGS: "settings",
	HISTORY: "history",
	DASHBOARD: "dashboard",
	BUSINESS_OBJECT: "businessObject"
};
DeviceClient.CONST.SEARCH_TYPE = {
	QUICK_SEARCH: "QuickSearch",
	SYSTEM_SEARCH: "SystemSearch"
}
DeviceClient.CONST.CHOICE_SOURCE_TYPE = {
	USER_DATA: "user",
	META_DATA: "meta"
}
DeviceClient.CONST.DATETIME_CONTROL_TYPE = {
	DATETIME: "datetime",
	DATE: "date",
	TIME: "time"
}
DeviceClient.CONST.CONTROLLER_FIELD_ACTION = {
	FIELD_VALUE_CHANGED: "fieldValueChanged",
	SHOW_ATTACHMENT: "showAttachment",
	SHOW_FOREIGN_KEY: "showForeignKey",
	BUTTON_CLICK: "buttonClick",
	SELECT_FOREIGN_KEY: "selectForeignKey",
	GET_ITEMS_FOR_LIST: "getItemsForList",
	SHOW_SECONDARY_GRID: "showSecondaryGrid",
	SHOW_SRL_GRID: "showSearchResultsListGrid"
}
DeviceClient.CONST.GRID_FIELD_ACTION = {
	SHOW_RECORD: "showRecord",
	SHOW_SECONDARY_RECORD: "showSecondaryRecord",
	SHOW_URL: "showURL",
	SHOW_EMAIL: "showEmail",
	CALL_PHONE: "callPhone",
	UNLINK_RECORD: "unlinkRecord",
	SHOW_SEARCH_RECORD: "showSearchRecord"
}
DeviceClient.CONST.LIST_ACTION = {
	SINGLE_ITEM_SELECTED: "singleItemSelected",
	MULTIPLE_ITEM_SELECTED: "multipleItemSelected",
	MULTIPLE_ITEM_UNSELECTED: "multipleItemUnselected"
}
DeviceClient.CONST.FORM_STATE = {
	EMPTY: "empty",
	VIEWING: "view",
	EDITING: "edit",
	ADDING: "add"
}
DeviceClient.CONST.FORM_DATA_DESTINATION = {
	BASE_WINDOW: "base",
	CURRENT_WINDOW: "current",
	NEW_WINDOW: "new",
	CURRENT_SECONDARY_GRID: "currentSecondaryGrid"
	}
DeviceClient.CONST.BUSINESS_OBJECT_TYPE = {
	TAB_GROUP_ITEM: "tabGroupBO",
	RECORD_SELECTION: "recordSelect"
}
DeviceClient.CONST.MEDIA_SOURCE = {
	GALLERY: "gallery",
	CAMERA: "camera"
}
DeviceClient.CONST.MODAL_BUSINESS_OBJECT_RESULT_TYPE = {
	CANCELLED: "cancelled",
	VALUE_SELECTED: "newValue",
	CREATE_NEW_RECORD: "createNewRecord"
}
DeviceClient.CONST.EDITOR_TYPE = { // Used in "editor" token. 
	SIGNATURE: "signature",
	SIGNITURE: "signiture", // server side mis-spelled signature as signiture.  The mis-spelled happened in Pivotal Device Server Meta Extension which if changed, will require PBS re-package the dll which is a lot of hazzle
	CANVAS: "canvas",
	AUDIO: "audio"
}
DeviceClient.CONST.LABEL_ALIGN = {  
	ROW: "row",
	COLUMN: "column"
}
DeviceClient.CONST.LIST_CACHE_OPTIONS = {
	RECORD: "Dataview",			// The first time a record is edited and the dropdown clicked. Then never again for that edit session with that record.
	FORM: "Session",			// The first time any record is edited and the dropdown clicked. Then never again until logout.
	NEVER: "None" 				// Always request list when clicking on dropdown.
}
DeviceClient.CONST.FORMATTING_OPTIONS = {
	IMAGE_NO_FORMATTING: "Normal",
	IMAGE_CROP: "Crop",
	IMAGE_STRETCH: "Stretch",
	TEXT_PROPER_CASE: "Proper", 
	TEXT_UPPER_CASE: "Upper",
	TEXT_NO_FORMATTING: "None"
}
DeviceClient.CONST.TEXT_HORIZONTAL_ALIGN = {  
	LEFT: "Left",
	CENTER: "Center",
	RIGHT: "Right"
}
DeviceClient.CONST.SYSTEM_TYPE = {  
	PIVOTAL: "Pivotal",
	SARATOGA: "Saratoga",
	DEMO: "Demo"				// Used to act as a system-neutral type.
}
DeviceClient.CONST.SELECTION_STYLE = {  
	PLAIN: "Plain",
	BUTTONS: "Buttons"
}
DeviceClient.CONST.COMMAND_TYPE = {  
	RECORD: "Record"
}
DeviceClient.CONST.SHORTCUT_TYPE = {  
	SARATOGA: "scrm",
	PIVOTAL: "sccx"
}
DeviceClient.CONST.ENV = {
	IS_ANDROID: Ti.Platform.osname == "android",
	IS_IOS: Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad",
	IS_IPAD: Ti.Platform.osname == "ipad",
	IS_IPHONE: Ti.Platform.osname == "iphone",
	IS_WEB: Ti.Platform.osname == "mobileweb",
	IS_IOS7Plus: (Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad") ? (parseInt(Ti.Platform.version.split(".")[0], 10) >= 7) : false
}

// Other constants
DeviceClient.CONST.DASHBOARD_GRAPH_DISPLAY_CONFIG_CHOICES =
	[
		{ key: 0, title: "None" },
		{ key: 1, title: "1 per page" },
		{ key: 2, title: "2 per page" }
	];
DeviceClient.CONST.DASHBOARD_QUERY_DISPLAY_CONFIG_CHOICES =
	[
		{ key: 0, title: "None" },
		{ key: 1, title: "1 per page" },
		{ key: 2, title: "Up to 2 per page" },
		{ key: 3, title: "Up to 3 per page" }
	];
DeviceClient.CONST.TIMEOUT_CHOICES =
	[
//		{ key: 100, title: "1 silly second, for testing" },
//		{ key: 200, title: "2 silly seconds, for testing" },
		{ key: 15000, title: "15 seconds" },
		{ key: 20000, title: "20 seconds" },
		{ key: 30000, title: "30 seconds" },
		{ key: 45000, title: "45 seconds" },
		{ key: 60000, title: "1 minute" },
		{ key: 120000, title: "2 minutes" },
		{ key: 360000, title: "5 minutes" }
	];
DeviceClient.CONST.LOGIN_AUTHENTICATION_CHOICES =
	[
		{ key: "standard", title: DeviceClient.CONST.LOGIN_AUTHENTICATION_DEFAULT_CHOICE },
		{ key: "windows", title: "Windows" }, // not supported yet
		{ key: "siteminder", title: "Siteminder" }
	];	
DeviceClient.CONST.ALTERNATIVE_LOGIN_CHOICES =
	[
		{ key: 0, title: "Use Demo" },
		{ key: 1, title: "Work Offline" }
	];
DeviceClient.CONST.DATE_ABBREVIATION_CHOICES =
	[
		{ key: "short", title: "Short" },
		{ key: "medium", title: "Medium" },
		{ key: "long", title: "Long" }
	];
DeviceClient.CONST.PHONE_CHOICES =
	[
		{ key: "tel", title: "Device Phone" },
		{ key: "skype", title: "Skype" }
	];	
	
