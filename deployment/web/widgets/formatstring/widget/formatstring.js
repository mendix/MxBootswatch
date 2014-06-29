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
});