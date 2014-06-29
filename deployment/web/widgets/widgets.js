dojo.provide("widgets.widgets");
dojo.registerModulePath("formatstring", "../../widgets/formatstring");
dojo.provide("formatstring.widget.formatstring");

dojo.declare('formatstring.widget.formatstring', mxui.widget._WidgetBase, {
    
    _hasStarted         : false,
    _mxobj              : null,
    displayattributes   : null,
    
    startup : function() {
        if (this._hasStarted)
            return;
        
        this.attributeList = this.notused;
        this._hasStarted = true;
        dojo.addClass(this.domNode, 'formatstring_widget');

        if (this.onclickmf !== '') 
            this.connect(this.domNode, "onclick", this.execmf);

        this.actLoaded();
    },

    update : function(obj, callback){
        dojo.empty(this.domNode);
        
        if (!obj){
            callback && callback();
            return;
        }
        
        this._mxobj = obj;

        this.subscribe({
            guid : obj.getGuid(),
            callback : this.getData
        });

        
        this.getData();

        callback && callback();
    },

    getData : function() {
        this.displayattributes = [];
        var referenceAttributeList = [];
        var numberlist = [];
        for (var i = 0; i  < this.attributeList.length; i++) {
            var value = null;
            if(this._mxobj.get(this.attributeList[i].attrs) !== null) {
                value = this.fetchAttr(this._mxobj, this.attributeList[i].attrs, this.attributeList[i].renderHTML, i);
                this.displayattributes.push(value);
            } else {
                //we'll jump through some hoops with this.
                referenceAttributeList.push(this.attributeList[i]);
                numberlist.push(i);
            }
        }
        
        if(referenceAttributeList.length > 0){
            //if we have reference attributes, we need to fetch them. Asynchronicity FTW
            this.fetchReferences(referenceAttributeList, numberlist);
        } else {
            var message = this.buildString();
            this.renderString(message);
        }        
    },

    fetchAttr : function(obj, attr, htmlBool, i) { 
        if(obj.isDate(attr)){
            if (this.attributeList[i].datetimeago) {
                var timeago = this.parseTimeAgo(obj.get(attr));
                return timeago;
            } else {
                var format = {};
                format.dateformat = this.attributeList[i].dateformat;
                format.timeformat = this.attributeList[i].timeformat;
                var date = this.parseDate(format, obj.get(attr));
                return date;
            }
        } else if (obj.isEnum(attr)){
            var caption = obj.getEnumCaption(attr, obj.get(attr));
            caption = this.checkString(caption, htmlBool);
            return caption;
        } else {
            var value = mx.parser.formatAttribute(obj, attr, {places : this.decimalPrecision});

            if (obj.getAttributeType(attr) == "String") value = this.checkString(value, htmlBool);
            
            return value;
        }
    },

    fetchReferences : function(list, numberlist) {
        for(var i = 0; i < list.length; i++) {
            var self = this;
            var split = list[i].attrs.split('/');
            var guid = this._mxobj.getReference(split[0]);
            var htmlBool = list[i].renderHTML;
            var oldi = i;
            var oldnumber = numberlist[i];
            mx.data.get({
                guid : guid, 
                callback : function(obj) {
                    value = self.fetchAttr(obj, split[2], htmlBool, oldnumber);
                    self.displayattributes.push(value);
                    if(oldi == list.length - 1) {
                        var message = self.buildString();
                        self.renderString(message);
                    }
                }
            });
        }
    },

    buildString : function() {
        var str = this.displaystr.replace(/\$\{(\d+)\}/gi, dojo.hitch(this, function(_, m2) {
            var value = this.displayattributes[(+m2)]; //str -> int
            if (!value && this.emptystr !== '')
                return this.emptystr;
            else
                return value ? value : '';
        }));

        return str;
    },

    renderString : function(msg) {
        dojo.empty(this.domNode);
        var div = mxui.dom.div( { 'class': 'formatstring'});
        div.innerHTML = msg;
        this.domNode.appendChild(div);
    },

    checkString : function (string, htmlBool) {
        if(string.indexOf("<script") > -1 || !htmlBool)
            string = mxui.dom.escapeHTML(string);   
        return string;  
    },


    parseDate : function(format, value) {
        var datevalue = value;
        if ((format.dateformat !== '' || format.timeformat !== '') && value !== '') {
            var selector = 'date';
            if (format.dateformat !== '' && format.timeformat !== '')
                selector = 'datetime';
            else if (format.timeformat !== '')
                selector = 'time';
            
            datevalue = dojo.date.locale.format(new Date(value), {
                selector : selector,
                datePattern : format.dateformat,
                timePattern : format.timeformat
            });
        }
        return datevalue;
    },

    parseTimeAgo : function(value) {
        var date = new Date(value),
        now = new Date(),
        appendStr = (date > now) ? 'from now' : 'ago',
        diff = Math.abs(now.getTime() - date.getTime()),
        seconds = Math.floor(diff / 1000),
        minutes = Math.floor(seconds / 60),
        hours = Math.floor(minutes / 60),
        days = Math.floor(hours / 24),
        weeks = Math.floor(days / 7),
        months = Math.floor(days / 31),
        years = Math.floor(months / 12);
        
        function createTimeAgoString(nr, unitSingular, unitPlural) {
            return nr + " " + (nr === 1 ? unitSingular : unitPlural) + " "+appendStr;
        }
        
        if (seconds < 60) {
            return createTimeAgoString(seconds, "second", "seconds");
        } else if (minutes < 60) {
            return createTimeAgoString(minutes, "minute", "minutes");
        } else if (hours < 24) {
            return createTimeAgoString(hours, "hour", "hours");
        } else if (days < 7) {
            return createTimeAgoString(days, "day", "days");
        } else if (weeks < 5) {
            return createTimeAgoString(weeks, "week", "weeks");
        } else if (months < 12) {
            return createTimeAgoString(months, "month", "months");
        } else if (years < 10) {
            return createTimeAgoString(years, "year", "years");
        } else {
            return "a long time "+appendStr;
        }
    },

    execmf : function() {
        if(!this._mxobj)
            return;

        mx.data.action({
            params: {
                actionname  : this.onclickmf,
                applyto : 'selection',
                guids : [this._mxobj.getGuid()]
            },
            callback    : function() {
                // ok   
            },
            error       : function() {
                // error
            },

        });
    }
});;
dojo.registerModulePath("HTMLSnippet", "../../widgets/HTMLSnippet");
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

dojo.provide("HTMLSnippet");if(!dojo._hasResource["HTMLSnippet.widget.HTMLSnippet"]){dojo._hasResource["HTMLSnippet.widget.HTMLSnippet"]=true;dojo.provide("HTMLSnippet.widget.HTMLSnippet");mendix.widget.declare("HTMLSnippet.widget.HTMLSnippet",{inputargs:{contenttype:"html",contents:"",documentation:"",style:""},postCreate:function(){logger.debug(this.id+".postCreate");switch(this.contenttype){case "html":dojo.style(this.domNode,{"height":"auto","width":"100%"});dojo.attr(this.domNode,"style",this.style);this.domNode.innerHTML=this.contents;break;case "js":try{eval(this.contents);}catch(e){dojo.html.set(this.domNode,"Error while evaluating JavaScript: "+e);}break;}this.actRendered();},uninitialize:function(){}});};
dojo.registerModulePath("HTMLSnippet", "../../widgets/HTMLSnippet");
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
dojo.provide("HTMLSnippet-Mobile");
if (!dojo._hasResource["HTMLSnippet.widget.HTMLSnippet-Mobile"]) {
    dojo._hasResource["HTMLSnippet.widget.HTMLSnippet-Mobile"] = true;
    dojo.provide("HTMLSnippet.widget.HTMLSnippet-Mobile");
    dojo.declare("HTMLSnippet.widget.HTMLSnippet-Mobile", mobile.widget._Widget, {
        inputargs: {
            contenttype: "html",
            contents: "",
            documentation: "",
            style: ""
        },

        postCreate: function () {
            logger.debug(this.id + ".postCreate");
            switch (this.contenttype) {
            case "html":
                dojo.style(this.domNode, {
                    "height": "auto",
                    "width": "100%"
                });
                dojo.attr(this.domNode, "style", this.style);
                this.domNode.innerHTML = this.contents;
                break;
            case "js":
                try {
                    eval(this.contents);
                } catch (e) {
                    dojo.html.set(this.domNode, "Error while evaluating JavaScript: " + e);
                }
                break;
            }
            this.actRendered();
        },
        uninitialize: function () {}
    });
};
dojo.registerModulePath("RadioButtonList", "../../widgets/RadioButtonList");
/**
	Radiobutton List Widget
	========================

	@file      : RadioButtonList.js
	@version   : 2.0 
	@author    : Roeland Salij
	@date      : 27-5-2010
	@copyright : Mendix
	@license   : Please contact our sales department.

	Documentation
	=============
	This widget can be used to show a radio button list instead of a dropdown list based on an enumeration attribute of an object.
	
	Open Issues
	===========


	
*/
dojo.provide("RadioButtonList.widget.AttrRadioButtonList");

mendix.dom.insertCss(mx.moduleUrl('RadioButtonList') + 'widget/ui/RadioButtonList.css');

mendix.widget.declare('RadioButtonList.widget.AttrRadioButtonList', {
	//DECLARATION
	addons       : [dijit._Templated, mendix.addon._Contextable],
	templateString : '<div class="RadioButtonList"><div style="float:none;clear:both"></div></div>',
	inputargs: {
		name : '',
		direction : 'horizontal',
		captiontrue: 'true',
		captionfalse: 'false',
		onchangeAction: '',
		readonly : false
	},
	
	//IMPLEMENTATION
	mendixobject : null,
	attrDisable :false,
	selectedValue : '',
	keyNodeArray : null,
	
	
	// updates the widget with a new dataobject
	setDataobject : function(mxObject) {
		logger.debug(this.id + ".setDataobject");
		//load embedded
		var loaded = false;
		var errorhandled = false;



		this.mendixobject = mxObject;

		if (mxObject != null) {
			try {
				if (this.name != '') {
					var enumerationObj;
					//get enumeration for current attribute
					if(mxObject.getAttributeClass(this.name) == 'Enum')
						enumerationObj = mxObject.getEnumKVPairs(this.name);
					else if(mxObject.getAttributeClass(this.name) == 'Boolean')
					{
						enumerationObj = {};
						enumerationObj['true'] = this.captiontrue;
						enumerationObj['false'] = this.captionfalse;
					}
					this.initRadioButtonList(enumerationObj);
					loaded = true;
				}
			}
			catch (err) {
				console && console.error(this.id +'.setDataobject: error while loading attr ' + err);
				loaded = false;
			}

			var self = this;

			mx.data.subscribe({
			    guid     : mxObject.getGuid(),
			    val      : true,
			    callback : function(validations) {
			    	if(self.readonly){
			    		validations[0].removeAttribute(self.name);
			    	} else {
				    	var reason = validations[0].getReasonByAttribute(self.name);
						if(dojo.query('.alert', self.domNode).length > 0) {
							dojo.destroy(dojo.query('.alert', self.domNode)[0]);
						}
				        var div = dojo.create('div', {'class' : 'alert alert-danger'});
				        mxui.dom.textContent(div, reason);
				        dojo.place(div, self.domNode, 'last');
				        validations[0].removeAttribute(self.name);
			    	}
			    }
			});

		}
		else
			logger.warn(this.id + '.setDataobject: received null object');
	},
	
	initRadioButtonList : function(enumObj){
		var i = 0;
		dojo.empty(this.domNode);
		var attrName = "" + this.mendixobject.getAttribute(this.name);
		for (var key in enumObj) {
			var radioid = this.name+'_'+this.id+'_'+i;
			var radiodiv = this.direction == 'horizontal' ? dojo.create('div', {'class' : 'radio-inline'}) : dojo.create('div', {'class' : 'radio'});
			var rbNode = mendix.dom.input({
				'type' : 'radio',
				'value' : key,
				//'name' : "radio"+this.mendixobject.getGUID()+'_'+this.id,
				'id' : radioid
			});
			//MWE: name is set here, because otherwise it will result in a
			//"INVALID_CHARACTER_ERR (5)" exception,
			//which is a result of the fact that document.createElement("<tagname baldibla='basdf'>") is not allowed anymore
			dojo.attr(rbNode, 'name',  "radio"+this.mendixobject.getGUID()+'_'+this.id);
			
			
			this.keyNodeArray[key] = rbNode;
			
			var labelNode = mendix.dom.label();
			dojo.attr(labelNode,'for', radioid);
			dojo.attr(labelNode, 'disabled', this.attrDisable);
			
			dojo.attr(rbNode, 'disabled', this.attrDisable);

			if (attrName == key) {
				dojo.attr(rbNode,'defaultChecked', true);
				this.selectedValue = key;
			}

			var textDiv = mendix.dom.span(enumObj[key]);
			dojo.style(textDiv, { cursor : 'default' });
			this.connect(rbNode, "onclick", dojo.hitch(this, this.onChangeRadio, rbNode, key));
			this.connect(textDiv, "onclick", dojo.hitch(this, this.onChangeRadio, rbNode, key));
			
			var listItemNode = mendix.dom.li(textDiv);
			
			labelNode.appendChild(rbNode);
			labelNode.appendChild(textDiv);
			radiodiv.appendChild(labelNode);
			
			//TODO: add the radio div.
			this.domNode.appendChild(radiodiv);
			i++;
		}
	},
 
	onChangeRadio : function(rbNode, enumkey) {
		logger.debug(this.id + ".onChangeRadio");
		if (this.attrDisable)
			return;

		dojo.attr(rbNode,'checked', true);
		this.selectedValue = enumkey;
		this._setValueAttr(enumkey);
		this.onChange();
		this.triggerMicroflow();
	},
 
	//invokes the microflow coupled to the tag editor
	triggerMicroflow : function() {
		logger.debug(this.id + ".triggerMicroflow");
		
		if (this.onchangeAction) {
			mx.processor.xasAction({
				error       : function() {
					logger.error("RadioButtonList.widget.AssocRadioButtonList.triggerMicroFlow: XAS error executing microflow")
				},
				actionname  : this.onchangeAction,
				applyto     : 'selection',
				guids       : [this.mendixobject.getGUID()]
			});
		}
	},
	
 	_setDisabledAttr : function (value) {
		if (!this.readonly)
			this.attrDisable = !!value;
	},
	
	_getValueAttr : function () {
		return this.selectedValue;
	},
	
	_setValueAttr : function (oldvalue) {
		var value = oldvalue;

		if ( this.selectedValue !== null) {
			if (  this.selectedValue != '' && this.keyNodeArray[this.selectedValue] ) {
				this.keyNodeArray[this.selectedValue].checked = false;
				this.keyNodeArray[this.selectedValue].defaultChecked = false;
			}
		}
		if (this.mendixobject !== null) {

			if(this.mendixobject.isBoolean(this.name)) {
				var boolvalue = oldvalue == 'true' ? true : false;
				this.mendixobject.set(this.name, boolvalue);
				this.selectedValue = boolvalue;
			} else {
				this.mendixobject.set(this.name, value);
				this.selectedValue = value;
			}
		}

		if (value !== '' && this.keyNodeArray[value]) {
			this.keyNodeArray[this.selectedValue].checked = true;
			this.keyNodeArray[this.selectedValue].defaultChecked = true;
		}	
	},
	
	//summary : stub function, will be used or replaced by the client environment
	onChange : function(){
	},
	postCreate : function(){
		logger.debug(this.id + ".postCreate");
  
		this.keyNodeArray = {};
		if (this.readonly)
			this.attrDisable = true;
	
		this.initContext();
		this.actRendered();
	},
 
	applyContext : function(context, callback){
		logger.debug(this.id + ".applyContext");
		
		if (context) {
			mx.processor.getObject(context.getActiveGUID(), dojo.hitch(this, this.setDataobject));
		} else
			logger.warn(this.id + ".applyContext received empty context");
		callback && callback();
	},
	
	uninitialize : function(){
		logger.debug(this.id + ".uninitialize");
	}
});
;
dojo.registerModulePath("RadioButtonList", "../../widgets/RadioButtonList");
/**
	Radio button list Widget
	========================

	@file      : RadioButtonList.js
	@version   : 2.0
	@author    : Roeland Salij
	@date      : 27-5-2010
	@copyright : Mendix
	@license   : Please contact our sales department.

	Documentation
	=============
	This widget can be used to show a radio button list instead of a dropdown list bases on an association.
	
	Open Issues
	===========
	
*/

dojo.provide("RadioButtonList.widget.AssocRadioButtonList");

mendix.dom.insertCss(mx.moduleUrl('RadioButtonList') + 'widget/ui/RadioButtonList.css');


mendix.widget.declare('RadioButtonList.widget.AssocRadioButtonList', {
	//DECLARATION
	addons       : [dijit._Templated, mendix.addon._Contextable],
	templateString : '<div class="RadioButtonList"><ul dojoAttachPoint="listNode"></ul><div style="float:none;clear:both"></div></div>',
	inputargs: { 
		RadioListObject : '',
		Constraint : '',
		RadioListItemAttribute: '',
		name: '',
		direction : 'horizontal',
		onchangeAction : '',
		readonly : false,
		sortAttr : '',
		sortOrder : 'asc'
	},
	
	//IMPLEMENTATION
	mendixobject : null,
	nameName : '',
	attrDisable :false,
	selectedValue : null,
	keyNodeArray : null,
	
	// updates the widget with a new dataobject
	setDataobject : function(mxObject) {
		//this.name = mxObject.getClass() + "/" + this.assocName; //to catch data validation
		this.mendixobject = mxObject;
		logger.debug(this.id + ".setDataobject");
		var self = this;

		mx.data.subscribe({
		    guid     : mxObject.getGuid(),
		    val      : true,
		    callback : function(validations) {
		    	if(self.readonly){
		    		validations[0].removeAttribute(self.name);
		    	} else {
			    	var reason = validations[0].getReasonByAttribute(self.name);
					if(dojo.query('.alert', this.domNode).length > 0) {
						dojo.destroy(dojo.query('.alert', this.domNode)[0]);
					}
			        var div = dojo.create('div', {'class' : 'alert alert-danger'});
			        mxui.dom.textContent(div, reason);
			        dojo.place(div, self.domNode, 'last');
			        validations[0].removeAttribute(self.name);
		    	}
		    }
		});

		this.getListObjects(this.mendixobject);
	},
	
	getListObjects : function(context) {
		var xpathString = '';
		if (context)
			xpathString = "//" + this.RadioListObject + this.Constraint.replace("'[%CurrentObject%]'", context);
		else
			xpathString = "//" + this.RadioListObject + this.Constraint;

		var options = {
			limit   : 50,
			depth	: 0,
			sort    : [[this.sortAttr, this.sortOrder]]
		};
		
		mx.processor.getObjectsByXPath(
			xpathString,
			options,
			dojo.hitch(this, this.initRadioButtonList)
		);
	},
	
	initRadioButtonList : function(mxObjArr){
		dojo.empty(this.listNode);
		var mxObj;
		
		var currentSelectedValue;
		
		if(this.mendixobject.getReferences(this.assocName).length == 1) {
			this.selectedValue = currentSelectedValue = this.mendixobject.getReferences(this.assocName)[0];
		}
		
		for (var i = 0; i < mxObjArr.length; i++) {
			mxObj = mxObjArr[i];
			
			var radioid = this.RadioListObject+'_'+this.id+'_'+i;
								
			var labelNode = mendix.dom.label();
			dojo.attr(labelNode,'for', radioid);
			dojo.attr(labelNode, 'disabled', this.attrDisable);
			
			var guid = mxObj.getGUID();
			var rbNode = mendix.dom.input({
				'type' : 'radio',
				'value' : guid ,
			//	'name' : "radio"+this.mendixobject.getGUID()+'_'+this.id,
				'id' : radioid
			});

			//MWE: name is set here, because otherwise it will result in a
			//"INVALID_CHARACTER_ERR (5)" exception,
			//which is a result of the fact that document.createElement("<tagname baldibla='basdf'>") is not allowed anymore
			dojo.attr(rbNode, 'name', "radio"+this.mendixobject.getGUID()+'_'+this.id);

			this.keyNodeArray[guid] = rbNode;
			
			dojo.attr(rbNode, 'disabled', this.attrDisable);
			
			if (currentSelectedValue == mxObj.getGUID()) {
				dojo.attr(rbNode,'defaultChecked', true);
			}
			
			var textDiv = mendix.dom.span(mxObj.getAttribute(this.RadioListItemAttribute));
			dojo.style(textDiv, { cursor : 'default' });
			
			labelNode.appendChild(rbNode);
			labelNode.appendChild(textDiv);
			
			this.connect(rbNode, "onclick", dojo.hitch(this, this.onclickRadio, mxObj.getGUID(), rbNode));
			this.connect(textDiv, "onclick", dojo.hitch(this, this.onclickRadio, mxObj.getGUID(), rbNode));
			
			var listItemNode = mendix.dom.li(labelNode);
			
			if(this.direction == 'horizontal') {
				dojo.addClass(listItemNode, 'horizontal');
			}
			
			this.listNode.appendChild(listItemNode);
		}
			
	},
	
	onclickRadio : function( radioKey, rbNode) {
		logger.debug(this.id + ".onclickRadio");
		if (this.attrDisable)
			return;
			
		this._setValueAttr(radioKey);
			dojo.attr(rbNode,'checked', true);
			
		this.onChange();
		this.triggerMicroflow();
	},
		
	
	_getValueAttr : function () {
		return this.selectedValue;
	},
		
			
	_setValueAttr : function (value) {
		
		if ( this.selectedValue != null) {
			if (  this.selectedValue != '' && this.keyNodeArray[this.selectedValue] ) {
				this.keyNodeArray[this.selectedValue].checked = false;
				this.keyNodeArray[this.selectedValue].defaultChecked = false;
			}
		}
		this.selectedValue = value;

		if (this.mendixobject != null) {
			this.mendixobject.set(this.assocName, value);
		}
		if (value !== '' && this.keyNodeArray[value]) {
			this.keyNodeArray[this.selectedValue].checked = true;
			this.keyNodeArray[this.selectedValue].defaultChecked = true;
		}
	},
		
	//invokes the microflow coupled to the tag editor
	triggerMicroflow : function() {
		logger.debug(this.id + ".triggerMicroflow");
		
		if (this.onchangeAction)
		{
			mx.processor.xasAction({
				error       : function() {
					logger.error("RadioButtonList.widget.AssocRadioButtonList.triggerMicroFlow: XAS error executing microflow");
				},
				actionname  : this.onchangeAction,
				applyto     : 'selection',
				guids       : [this.mendixobject.getGUID()]
			});
		}
	},

	_setDisabledAttr : function (value) {
		if (!this.readonly)
			this.attrDisable = !!value;
	},
	
	//summary : stub function, will be used or replaced by the client environment
	onChange : function(){
	},

	postCreate : function(){
		logger.debug(this.id + ".postCreate");
		this.keyNodeArray = {};
		this.assocName = this.name.split("/")[0];
		
		this.name = this.assocName; //to catch data validation
		//dojo.attr(this.domNode, 'name', this.name);
		
		if (this.readonly)
			this.attrDisable = true;
	
		this.initContext();
		this.actRendered();
	},
	
	applyContext : function(context, callback){
		logger.debug(this.id + ".applyContext");
		
		if (context)
			mx.processor.getObject(context.getActiveGUID(), dojo.hitch(this, this.setDataobject));
		else
			logger.warn(this.id + ".applyContext received empty context");
			
		callback && callback();
	},
	
	uninitialize : function(){
		logger.debug(this.id + ".uninitialize");
	}
});
;
dojo.registerModulePath("SprintrFeedbackWidget", "../../widgets/SprintrFeedbackWidget");
dojo.provide("SprintrFeedbackWidget.SprintrFeedback");
dojo.require("dojo.io.script");

mendix.widget.declare('SprintrFeedbackWidget.SprintrFeedback', {
    inputargs: {

		sprintrapp : '',
		entity : '',
		usernameattr : '',
		emailattr : '',
		allowFile : true,
		allowSshot : false,
		sprintrserver : ''

    },

	postCreate : function(){
		if (!window.sprintrFeedback) {
			var url = this.sprintrserver + (this.sprintrserver.match(/\/$/) != null ? "" : "/");
			dojo.io.script.attach("sprintrfeedbackWrapper", url + "feedback/sprintrfeedback.js");

			this.checkScript(function () { return typeof window.sprintrFeedback != "undefined";}, dojo.hitch(this, function() {
				mx.addOnLoad(dojo.hitch(this, this.loadData));
			}), 0);
		} else {
			mx.addOnLoad(dojo.hitch(this, this.loadData));
		}
		this.actRendered();
	},
	loadData : function () {
		if (this.entity !== '' && !!mx.session.getUserId()) {
			mx.processor.get({
				guid : mx.session.getUserId(),
				callback : dojo.hitch(this, this.startFeedback),
				error: function(e) {
					alert("Error while loading feedback form: " +e);
				}
			});
		} else {
			this.startFeedback(null);
		}
	},
	startFeedback : function (userobj) {
		var data = {
			'sprintrid' : this.sprintrapp,
			'allowFile' : this.allowFile,
			'allowSshot' : this.allowSshot
		};
		var username = '';
		if (userobj != null && this.usernameattr != '' && userobj.hasAttribute(this.usernameattr))
			username = userobj.getAttribute(this.usernameattr)
		else if (mx.session.getUserId() > 0 && mx.session.isGuest && !mx.session.isGuest())
			username = mx.session.getUserName();

		var emailaddr =
			(userobj != null && this.emailattr != '' && userobj.hasAttribute(this.emailattr))
			? userobj.getAttribute(this.emailattr)
			: (username.match(/.+@.+\..+/) ? username : ''); //if it looks like an email address, it is one.

		var roles = mx.session.getUserRoles();
		var rolenames = [];
		for(var i = 0; i < roles.length; i++)
			rolenames.push(roles[i].getAttribute("Name"));

		data.userdata = {
			'username' : username,
			'emailaddress' : emailaddr,
			'userroles' : rolenames.join(" ") + " (account: " + username + ")"
		};
		window.sprintrFeedback.create(data);
	},
	checkScript : function (elem, cb, counter) {
        if (elem()) {
            cb();
        } else {
            if (counter < 30) {
                setTimeout(dojo.hitch(this, function () {
                    this.checkScript(elem, cb, counter+1);
                }), 50);
            }
        }
    },
	uninitialize : function(){
	}
});;
