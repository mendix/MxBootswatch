/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

dojo.provide("HTMLSnippet");if(!dojo._hasResource["HTMLSnippet.widget.HTMLSnippet"]){dojo._hasResource["HTMLSnippet.widget.HTMLSnippet"]=true;dojo.provide("HTMLSnippet.widget.HTMLSnippet");mendix.widget.declare("HTMLSnippet.widget.HTMLSnippet",{inputargs:{contenttype:"html",contents:"",documentation:"",style:""},postCreate:function(){logger.debug(this.id+".postCreate");switch(this.contenttype){case "html":dojo.style(this.domNode,{"height":"auto","width":"100%"});dojo.attr(this.domNode,"style",this.style);this.domNode.innerHTML=this.contents;break;case "js":try{eval(this.contents);}catch(e){dojo.html.set(this.domNode,"Error while evaluating JavaScript: "+e);}break;}this.actRendered();},uninitialize:function(){}});}