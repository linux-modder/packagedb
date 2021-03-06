/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._xdResourceLoaded(function(dojo, dijit, dojox){
return {
defineResource: function(dojo, dijit, dojox){//This file is the command-line entry point for running the tests in
//Rhino and Spidermonkey.

/*=====
dojo.tests = {
	// summary: D.O.H. Test files for Dojo unit testing.
};
=====*/

load("dojo.js");
load("tests/runner.js");
tests.run();

}};});
