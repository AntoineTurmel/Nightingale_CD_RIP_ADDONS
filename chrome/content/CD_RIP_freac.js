if (typeof CdRip == 'undefined') {  var CdRip = {};}CdRip.freac = {		_fileStr: "",	_args: null,	_pid: 0,	init: function(fileStr, args){		this.fileStr = fileStr;		this.args = args;	},		set fileStr (fileStr){		if(typeof(fileStr)=='string'){			this._fileStr = fileStr;						var prefs = Components.classes["@mozilla.org/preferences-service;1"]						.getService(Components.interfaces.nsIPrefService);			prefs = prefs.getBranch("extensions.cd-rip.");						prefs.setCharPref("pathtofreac",this.fileStr);				}		else{			alert("set fileStr error");		}	},		set args (args){		if(typeof(args)=='object'&&(args instanceof Array)){			this._args = args;		}		else{			alert("set args error");		}	},		get fileStr (){		return this._fileStr;	},		get args (){		return this._args;	},		get pid (){		return this._pid;	},		//only for debug	show_status: function(){		alert("PATH : "+this._fileStr);	},		/**	* Execute a file on the command line with the given arguments	* @param {String} fileStr File in native format (e.g., "C:\\Users\\Brett")	* @param {String[]} args Array of arguments to pass to the file	* @returns {String} Process ID	*/	run: function() {			var file = Components.classes["@mozilla.org/file/local;1"].						 createInstance(Components.interfaces.nsILocalFile);		file.initWithPath(this.fileStr);		var p = Components.classes["@mozilla.org/process/util;1"]						.createInstance(Components.interfaces.nsIProcess);		p.init(file);		p.run(false, this.args, this.args.length);		this.pid = p.pid; // Can't use anymore, but does return in Windows at least	},};