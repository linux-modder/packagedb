/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._xdResourceLoaded(function(dojo, dijit, dojox){
return {depends: [["provide", "dojox.dtl.render.html"],
["require", "dojox.dtl.Context"],
["require", "dojox.dtl.html"]],
defineResource: function(dojo, dijit, dojox){if(!dojo._hasResource["dojox.dtl.render.html"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.dtl.render.html"] = true;
dojo.provide("dojox.dtl.render.html");
dojo.require("dojox.dtl.Context");
dojo.require("dojox.dtl.html");

dojox.dtl.render.html.Render = function(/*DOMNode?*/ attachPoint, /*dojox.dtl.HtmlTemplate?*/ tpl){
	this._tpl = tpl;
	this.domNode = dojo.byId(attachPoint);
}
dojo.extend(dojox.dtl.render.html.Render, {
	setAttachPoint: function(/*Node*/ node){
		this.domNode = node;
	},
	render: function(/*Object*/ context, /*dojox.dtl.HtmlTemplate?*/ tpl, /*dojox.dtl.HtmlBuffer?*/ buffer){
		if(!this.domNode){
			throw new Error("You cannot use the Render object without specifying where you want to render it");
		}

		this._tpl = tpl = tpl || this._tpl;
		buffer = buffer || tpl.getBuffer();
		context = context || new dojox.dtl.Context();

		var frag = tpl.render(context, buffer).getParent();
		if(!frag){
			throw new Error("Rendered template does not have a root node");
		}

		if(this.domNode !== frag){
			this.domNode.parentNode.replaceChild(frag, this.domNode);
			dojo._destroyElement(this.domNode);
			this.domNode = frag;
		}
	}
});

}

}};});
