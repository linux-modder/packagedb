/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._xdResourceLoaded(function(dojo, dijit, dojox){
return {depends: [["provide", "dojox.charting.themes.SageToLime"],
["require", "dojox.charting.Theme"]],
defineResource: function(dojo, dijit, dojox){if(!dojo._hasResource["dojox.charting.themes.SageToLime"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.charting.themes.SageToLime"] = true;
dojo.provide("dojox.charting.themes.SageToLime");
dojo.require("dojox.charting.Theme");

(function(){
	var dxc=dojox.charting;
	dxc.themes.SageToLime=new dxc.Theme({
		colors: [
			"#abdbcb", 
			"#435a51",
			"#70998b",
			"#5f8074",
			"#80ccbb",
			"#539e8b",
			"#78a596",
			"#335f54",
			"#8dd1c2",
			"#68c5ad"
		]
	});
})();

}

}};});
