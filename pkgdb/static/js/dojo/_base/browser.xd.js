/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._xdResourceLoaded(function(dojo, dijit, dojox){
return {depends: [["provide", "dojo._base.browser"],
["require", "dojo._base.window"],
["require", "dojo._base.event"],
["require", "dojo._base.html"],
["require", "dojo._base.NodeList"],
["require", "dojo._base.query"],
["require", "dojo._base.xhr"],
["require", "dojo._base.fx"]],
defineResource: function(dojo, dijit, dojox){if(!dojo._hasResource["dojo._base.browser"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojo._base.browser"] = true;
dojo.provide("dojo._base.browser");

dojo.require("dojo._base.window");
dojo.require("dojo._base.event");
dojo.require("dojo._base.html");
dojo.require("dojo._base.NodeList");
dojo.require("dojo._base.query");
dojo.require("dojo._base.xhr");
dojo.require("dojo._base.fx");

//Need this to be the last code segment in base, so do not place any
//dojo.requireIf calls in this file. Otherwise, due to how the build system
//puts all requireIf dependencies after the current file, the require calls
//could be called before all of base is defined.
if(dojo.config.require){
	dojo.forEach(dojo.config.require, "dojo['require'](item);");
}

}

}};});
