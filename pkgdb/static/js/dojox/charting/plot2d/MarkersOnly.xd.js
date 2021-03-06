/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._xdResourceLoaded(function(dojo, dijit, dojox){
return {depends: [["provide", "dojox.charting.plot2d.MarkersOnly"],
["require", "dojox.charting.plot2d.Default"]],
defineResource: function(dojo, dijit, dojox){if(!dojo._hasResource["dojox.charting.plot2d.MarkersOnly"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.charting.plot2d.MarkersOnly"] = true;
dojo.provide("dojox.charting.plot2d.MarkersOnly");

dojo.require("dojox.charting.plot2d.Default");

dojo.declare("dojox.charting.plot2d.MarkersOnly", dojox.charting.plot2d.Default, {
	constructor: function(){
		this.opt.lines   = false;
		this.opt.markers = true;
	}
});

}

}};});
