//Use the UI namespace for all UI component creation.  A few common components will be defined in this file,
//but the bigger ones get their own file (along with styles)
(function() {
	DeviceClient.UI = {};
	DeviceClient.UI.Util = {};

	DeviceClient.UI.Util.createWindowNavigator = function ( properties ) {
	 
	    var me;
	 
	    if ( DeviceClient.CONST.ENV.IS_IOS ) {   
	    	//Ti 3.2.0
	    	me = Titanium.UI.iOS.createNavigationWindow ( properties ); 
	    	
	    	//Ti 3.1.3
	    	//me = Ti.UI.iPhone.createNavigationGroup ( properties );	 
	    	
	    } else if ( DeviceClient.CONST.ENV.IS_WEB ) {    	
	    	me = Ti.UI.MobileWeb.createNavigationGroup ( properties );
	    } else {
	 		me = {};
	 		
	        var navViews = []; // A stack of navigation bars
	        var navView;
	 
	        function pushNavBar() {
	            navView = Ti.UI.createView({
	                top: 0,
	                height: 60,
	                backgroundColor: '#ccc'
	            });                                 
	            navViews.push(navView);         
	        }
	        function popNavBar() {
	            navViews.pop();
	            navView = navViews[navViews.length - 1];
	        }
	 
	        // Make sure we always have a navView available to prepare          
	        pushNavBar();
	 
	        me.open = function(win) {
	            navView.add(Ti.UI.createLabel({
	                text: win.title,
	                color: '#333'           
	            }));
	 
	            if ( navViews.length >= 2 ) {
	                var button = Ti.UI.createButton({
	                    title: navViews[navViews.length - 2].win.title || '<-'
	                });
	                me.addLeftButton(win, button);
	                button.addEventListener('click', function() {
	                    popNavBar();
	                    win.close();
	                });
	            }
	 
	            navView.win = win;
	            win.add(navView);
	 
	            win.navBarHidden = true;
	            win.open();
	 
	            pushNavBar(); // Prepare for the next window
	        };
	 
	        me.addLeftButton = function(win, button) {
	            button.top = 8;
	            button.left = 5;
	            button.width = 100;
	            navView.add(button);
	        };
	 
	        me.setRightButton = function(win, button) {
	            button.top = 8;
	            button.right = 5;
	            button.width = 100;
	            navView.add(button);
	        };
	    }
	 
	    return me;
	}

})();
