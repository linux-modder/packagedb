dojo._xdResourceLoaded(function(dojo, dijit, dojox){
return {depends: [["provide", "tests.parser"]],
defineResource: function(dojo, dijit, dojox){if(!dojo._hasResource["tests.parser"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["tests.parser"] = true;
dojo.provide("tests.parser");
if(dojo.isBrowser){
	doh.registerUrl("tests.parser", dojo.moduleUrl("tests", "parser.html"));
}

}

}};});