/* Inspiration:
 * http://www.bennadel.com/blog/2184-Object-create-Improves-Constructor-Based-Inheritance-In-Javascript-It-Doesn-t-Replace-It.htm
 * http://www.coolpage.com/developer/javascript/Correct%20OOP%20for%20Javascript.html
 * http://mckoss.com/jscript/object.htm
 */

Function.prototype.inherits = function ( parent )
{
	this.prototype = Object.create(parent.prototype); 	// Object.create avoids calling the parent constructor, which we do not want to do at the point at "declaring" an object inherits from a base class. We want the parent constructor called when the child constructor is called.
}

// TODO: Does this give a correct way to have a parent pointer? http://www.kevlindev.com/tutorials/javascript/inheritance/index.htm
// Or this? http://brokenliving.blogspot.com/2009/09/simple-javascript-inheritance.html


/* NOTE: If devices don't have Javascipt interpreters that implement Object.create (ECMA 5) then this might be an option:

if (typeof Object.create !== 'function') {
Object.create = function (o) {
var F = function () {};
F.prototype = o;
return new F();
};
}
var myObj = Object.create(class);

From: http://www.bennadel.com/blog/2184-Object-create-Improves-Constructor-Based-Inheritance-In-Javascript-It-Doesn-t-Replace-It.htm
*/


/* Old version. 
 * 
 * The problem with this was the this.prototype.parent did nt work when a subclass was subclassed. This is because everything gets flattened and there is no hierarchy of functions.  
 * Instead the subclass has to explicitly call its base class' constructor. A parent pointer is not possible.

Function.prototype.inherits = function ( parent )
{
	this.prototype = Object.create(parent.prototype); 	// Object.create avoids calling the parent constructor, which we do not want to do at the point at "declaring" an object inherits from a base class. We want the parent constructor called when the child constructor is called.
	this.prototype.parent = parent; 					// Sets up parent property for calling parent methods and constructor when needed. 
}

//	this.constructor.call ( this, controlProperties ); // this as first parameter is necessary. Will call lowest level base class (ControlBase) and not any intermediate.
//	this.parent.call ( this, controlProperties ); // subclass of a subclass will end in a loop once the first level down tries to call this.parent.call

*/

/* Older version:

Function.prototype.inherits = function( parent )
{
	this.prototype = Object.create(parent.prototype); 	// Object.create avoids calling the parent constructor, which we do not want to do at the point at "declaring" an object inherits from a base class. We want the parent constructor called when the child constructor is called.
	this.prototype.parent = parent.prototype; 			// Problem with this version is only the prototyped functions are made available to the paraent property.
//	this.prototype.constructor = this; 					// Is this needed when using Object.create?
}

*/



/*
// From http://www.coolpage.com/developer/javascript/Correct%20OOP%20for%20Javascript.html

Function.prototype.inherits = function( parent )
{
	this.prototype = new parent;
	this.prototype.constructor = this;
}

// Used like this: //DeviceClient.UI.Control.TextField2.inherits(DeviceClient.UI.Control.ControlBase);
// The problem with this approach is the parent constructor is called when inherits is invoked.

Object.prototype.baseConstructor = function( parent )
{
	if( arguments.length > 1 )
	{
		parent.apply( this, Array.prototype.slice.call( arguments, 1 ) );
	}
	else
	{
		parent.call( this );
	}
}

// Used like this: this.baseConstructor ( DeviceClient.UI.Control.ControlBase, controlProperties );

*/

