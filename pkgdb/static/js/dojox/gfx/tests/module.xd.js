dojo._xdResourceLoaded(function(dojo, dijit, dojox){
return {depends: [["provide", "dojox.gfx.tests.module"],
["require", "dojox.gfx.tests.matrix"],
["require", "dojox.gfx.tests.decompose"]],
defineResource: function(dojo, dijit, dojox){if(!dojo._hasResource["dojox.gfx.tests.module"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.gfx.tests.module"] = true;
dojo.provide("dojox.gfx.tests.module");

try{
	dojo.require("dojox.gfx.tests.matrix");
	dojo.require("dojox.gfx.tests.decompose");
}catch(e){
	doh.debug(e);
}


}

}};});