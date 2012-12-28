/* This code is subject to the GNU Lesser Public License, Version 3. */
/* ------------------------------------------------ */
/*  Generate Wikipedia <ref>{{cite web...}}</ref>.  */
/* ------------------------------------------------ */
function initialize() {
  var RDF = Components.classes["@mozilla.org/rdf/rdf-service;1"].
            getService(Components.interfaces.nsIRDFService);
  var ds =  Components.classes["@mozilla.org/rdf/datasource;1?name=cite4wiki"].
            getService(Components.interfaces.nsIRDFDataSource);
  var rdfRes = RDF.GetResource("cite4wiki");
  var screenXRes = RDF.GetResource("screenX");
  var screenYRes = RDF.GetResource("screenY");
  var screenX = ds.GetTarget(rdfRes, screenXRes, true).
                QueryInterface(Components.interfaces.nsIRDFLiteral);
  var screenY = ds.GetTarget(rdfRes, screenYRes, true).
                QueryInterface(Components.interfaces.nsIRDFLiteral);
  window.moveto(screenX.value, screenY.value);
  window.sizetocontent();
}
function makeDateArray() {
  for (i = 0; i<makeDateArray.arguments.length; i++) this[i + 1] = makeDateArray.arguments[i];
}
function generate(dateStyle) {
/* Window dressing. */
  var width = "400";
  var height = "300";
  // For some reason, the "title", "location" and "menubar" details appear to have no effect:
  var cfg = "width=" + width + ",height=" + height + ",centerscreen,title='Cite4Wiki',titlebar=yes,location=no,menubar=no";
//
// ***************************************************************************
/* The meat. */
  var _url = window.content.document.location.href;
  var _title = window.content.document.title;
    /* Escape various characters to prevent potential problems, especially
       embedded wikicode being excecuted, accidentally or otherwise, and
       quotation mark cleanup: */
    /* Note that all quotation marks are being reduced to single quotes;
       This may cause nested quotation problems, but must be done. It 
       is tempting to convert single to double, then double to single,
       but this would turn apostrophes into double quotes. */
    /* Localizers may wish to use different quote characters, such as
       European angle-quotes. */
    //Handle different line endings:
    _title = _title.replace(/\r\n/g, "\n");
    _title = _title.replace(/\r/g, "\n");
    _title = _title.replace(/\n/g, " "); // move this outside function
    /* Escape various characters to prevent potential problems: */
    _title = _title.replace(/\"/g, "'");
    _title = _title.replace(/\`/g, "'");
    _title = _title.replace(/\=/g, "&#61;");
    _title = _title.replace(/\</g, "&#60;");
    _title = _title.replace(/\>/g, "&#62;");
    _title = _title.replace(/\[/g, "&#91;");
    _title = _title.replace(/\]/g, "&#93;");
    _title = _title.replace(/\{/g, "&#123;");
    _title = _title.replace(/\}/g, "&#125;");
    _title = _title.replace(/\|/g, "&#124;");
    _title = _title.replace(/\'\'\'/g, "'<nowiki>'</nowiki>'");
    _title = _title.replace(/\'\'/g, "'<nowiki />'");
    _title = _title.replace(/__/g, "_<nowiki />_");
  var _type = "web";
  var _pubr = "";
  var _loc = "";
  var _isbn = "";
  var _issn = "";
  var _oclc = "";
  /*The code used is apparently more rubust (esp. w/ frames) in FireFox than 
    the window.content.getSelection().toString() "normal" way.
    The more specific window.content.document.commandDispatcher.focusedWindow...
    fails here.  Another method said to work
    is document.getElementById('canvas_frame').contentWindow... */
  var _quote = document.commandDispatcher.focusedWindow.getSelection().toString();
    //Handle different line endings:
    _quote = _quote.replace(/\r\n/g, "\n");
    _quote = _quote.replace(/\r/g, "\n");
    /* Escape various characters to prevent potential problems: */
    _quote = _quote.replace(/\"/g, "'");
    _quote = _quote.replace(/\=/g, "&#61;");
    _quote = _quote.replace(/\</g, "&#60;");
    _quote = _quote.replace(/\>/g, "&#62;");
    //Collapse space between newlines:
    _quote = _quote.replace(/\n\040\n/g, "\n\n");
    _quote = _quote.replace(/\n\t\n/g, "\n\n");
    //Strip out leading and terminal newlines entirely (sloppy text selections):
    _quote = _quote.replace(/^\n\n/g, ""); //test this
    _quote = _quote.replace(/^\n/g, ""); //test this
    _quote = _quote.replace(/\n\n$/g, "");
    _quote = _quote.replace(/\n$/g, "");
    /* Catch any attempts to quote multiple paragraphs, and flag as error: */
    var quoteParagraphs = _quote.indexOf("\n\n");
    if (quoteParagraphs != -1) { _quote = "{{err|{{CANNOT QUOTE MULTIPLE PARAGRAPHS}}}}"; }
    //And turn other newlines into spaces (sorry poetry & code quoters;
		//you'll have to format something like that manually):
    _quote = _quote.replace(/\n/g, " "); 
    var quoteLength = _quote.length;
    if (quoteLength > 1000) { _quote = _quote + " {{err|{{HUGE QUOTE}}}}"; }
  var _work = window.content.document.domain;
    /* Strip leading "www." from site name for "work" field; doesn't affect URL. */
    _work = _work.replace(/^www\./i, "");
  /* **************************************************************** */
  /* Experimental "real name" feature to enter customized info for a  */
	/* bunch of major sites on a per-site basis.  User-extensible.      */
	/* Dev note: Break out into separate file.                          */
  /* **************************************************************** */
  //British news sources
  if (_work == 'news.bbc.co.uk') {
    _work = "[[BBC News]]";
    _pubr = "[[British Broadcasting Corporation|BBC]]";
    _loc  = "[[London, England|London]]";
    _type = "news";
  }
  if (_work == 'timesonline.co.uk') {
    _work = "[[TimesOnline]]";
    _pubr = "[[News Intl]]";
    _loc  = "[[London, England|London]]";
    _type = "news";
    _issn = "0140-0460";
  }
  if (_work == 'guardian.co.uk') {
    _work = "[[The Guardian]]";
    _pubr = "[[Guardian Media Group|GMG]]";
    _loc  = "[[London, England|London]]";
    _type = "news";
    _issn = "0261-3077";
    _oclc = "60623878";
  }
  if (_work == 'observer.guardian.co.uk') {
    _work = "[[The Observer]]";
    _pubr = "[[Guardian Media Group|GMG]]";
    _loc  = "[[London, England|London]]";
    _type = "news";
    _issn = "0029-7712";
    _oclc = "50230244";
  }
  if (_work == 'guardianweekly.co.uk') {
    _work = "[[The Guardian Weekly]]";
    _pubr = "[[Guardian Media Group|GMG]]";
    _loc  = "[[London, England|London]]";
    _type = "news";
    _issn = "0959-3608";
    _oclc = "44669620";
  }
  if (_work == 'dailyrecord.co.uk') {
    _work = "[[Daily Record (Scotland)|Daily Record]]";
    _pubr = "[[Trinity Mirror]]";
    _loc  = "[[Glasgow, Scotland|Glasgow]]";
    _type = "news";
    _issn = "0956-8069";
    _oclc = "500344244";
  }
  if (_work == 'mirror.co.uk') {
    _work = "[[Daily Mirror]]";
    _pubr = "[[Trinity Mirror]]";
    _loc  = "[[London, UK|London]]";
    _type = "news";
    _issn = "9975-9950"; // Maybe really the ISSN for its Sunday Mirror ver.
    _oclc = "223228477";
  }
  if (_work == 'telegraph.co.uk') {
    _work = "[[The Daily Telegraph]]";
    _pubr = "[[Telegraph Media Group|TMG]]";
    _loc  = "[[London, UK|London]]";
    _type = "news";
    _issn = "0307-1235"; // Maybe really the ISSN for its Sunday Tel. ver.
    _oclc = "49632006";
  }
  if (_work == 'independent.co.uk') {
    _work = "[[The Independent]]";
    _pubr = "[[Independent News & Media|INM]]";
    _loc  = "[[London, UK|London]]";
    _type = "news";
    _issn = "0951-9467";
    _oclc = "185201487";
  }
  //US news sources
  if (_work == 'query.nytimes.com') { _work = "nytimes.com"; }
  if (_work == 'nytimes.com') {
    _work = "[[The New York Times]]";
    _pubr = "[[New York Times Company|NYTC]]";
    _loc  = "[[New York, NY|New York]]";
    _type = "news";
    _issn = "0362-4331";
  }
  if (_work == 'sfgate.com') {
    _work = "[[San Francisco Chronicle]]";
    _pubr = "[[Hearst Newspapers|Hearst]]";
    _loc  = "[[San Francisco, CA|San Francisco]]";
    _type = "news";
    _issn = "1932-8672";
  }
  if (_work == 'latimes.com') {
    _work = "[[Los Angeles Times]]";
    _pubr = "[[Tribune Co]]";
    _loc  = "[[Los Angeles, CA|Los Angeles]]";
    _type = "news";
    _issn = "0458-3035";
  }
  if (_work == 'boston.com') {
    _work = "[[The Boston Globe]]";
    _pubr = "[[New York Times Company|NYTC|]]";
    _loc  = "[[Boston, MA|Boston]]";
    _type = "news";
    _issn = "0743-1791";
  }
  if (_work == 'online.wsj.com') {
    _work = "[[The Wall Street Journal]]";
    _pubr = "[[Dow Jones & Company|Dow Jones]]";
    _loc  = "[[New York, NY|New York]]";
    _type = "news";
    _issn = "0099-9660";
  }
  if (_work == 'washingtonpost.com') {
    _work = "[[The Washington Post]]";
    _pubr = "[[Washington Post Company|WPC]]";
    _loc  = "[[Washington, DC|Washington DC]]";
    _type = "news";
    _issn = "0190-8286";
  }
  if (_work == 'usatoday.com') {
    _work = "[[USA Today]]";
    _pubr = "[[Gannett Company|Gannett]]";
    _loc  = "[[McLean, VA]]";
    _type = "news";
    _issn = "0734-7456";
  }
  if (_work == 'news.cnet.com') {
    _work = "[[CNET News]]";
    _pubr = "[[CBS Interactive|CBS]]";
    _loc  = "[[San Francisco, CA|San Francisco]]";
    _type = "web";
  }
  if (_work == 'cbsnews.com') {
    _work = "[[CBS News]]";
    _pubr = "[[CBS Broadcasting|CBS]]";
    _loc  = "[[New York, NY|New York]]";
    _type = "web";
  }
  if (_work == 'anthropologymatters.com') {
    _work = "Anthropology Matters";
    _pubr = "Association of Social Anthropologists";
    _loc  = "[[Brighton, England]]";
    _type = "journal";
    _issn = "17586453";
  }
  if (_work == 'sports.yahoo.com') {
    _work = "Yahoo! Sports";
    _pubr = "[[Yahoo!]]";
    _loc  = "[[Sunnyvale, CA]]";
    _type = "news";
  }
  if (_work == 'ca.news.yahoo.com') {
    _work = "Yahoo! Canada News";
    _pubr = "[[Yahoo!|Yahoo! Canada]]";
    _loc  = "[[Toronto, ON]]";
    _type = "news";
  }
  if (_work == 'ca.sports.yahoo.com') {
    _work = "Yahoo! Canada Sports";
    _pubr = "[[Yahoo!|Yahoo! Canada]]";
    _loc  = "[[Toronto, ON]]";
    _type = "news";
  }
  if (_work == 'au.news.yahoo.com') {
    _work = "Yahoo!7 News";
    _pubr = "[[Yahoo!7]]";
    _loc  = "[[Sydney, Australia]]";
    _type = "news";
  }
  if (_work == 'au.sports.yahoo.com') {
    _work = "Yahoo!7 Sport";
    _pubr = "[[Yahoo!7]]";
    _loc  = "[[Sydney, Australia]]";
    _type = "news";
  }
  if (_work == 'nz.news.yahoo.com') {
    _work = "Yahoo!Xtra News";
    _pubr = "[[Yahoo!Xtra]]";
    _loc  = "[[Auckland, NZ]]";
    _type = "news";
  }
  if (_work == 'nz.sports.yahoo.com') {
    _work = "Yahoo!Xtra Sport";
    _pubr = "[[Yahoo!Xtra]]";
    _loc  = "[[Auckland, NZ]]";
    _type = "news";
  }
  if (_work == 'uk.news.yahoo.com') {
    _work = "Yahoo! News: UK &amp; Ireland";
    _pubr = "[[Yahoo! Europe]]";
    _loc  = "[[London, England|London]]";
    _type = "news";
  }
  if (_work == 'uk.eurosport.yahoo.com') {
    _work = "Yahoo! Sports/Eurosport: UK &amp; Ireland";
    _pubr = "[[Yahoo! Europe]]/[[British Eurosport]]";
    _loc  = "[[London, England|London]]/[[Feltham, England]]";
    _type = "news";
  }
  if (_work == 'eurosport.yahoo.com') {
    _work = "Yahoo! Sports/Eurosport";
    _pubr = "[[Yahoo! Europe]]/[[Eurosport]]";
    _loc  = "[[London, England|London]]/[[Issy-les-Moulineaux]], [[France]]";
    _type = "news";
  }
  if (_work == 'spiegel.de') {
    //This site just doesn't put article titles in  <title> for some reason;
    //individual page titles are in the content on the pages as headings.
    _title = "{{err|{{TITLE MISSING}}}}";
		_work = "[[Der Spiegel|Spiegel Online]]: International Edition";
    _pubr = "SpiegelNet GmbH";
    _loc  = "[[Hamburg, Germany|Hamburg]]";
    _type = "news";
    var eng = _url.indexOf("/international/");
    if (eng == -1) {
      _lang = "[[German language|German]]";		  
      _work = "[[Der Spiegel|Spiegel Online]]";
    }		
  }
  // WikiProject Cue sports
  if (_work == 'worldsnooker.com') {
    //This site just repeats its site name in <title> for some reason;
    //individual page titles are in <h#> headings on the pages.
    _title = "{{err|{{TITLE MISSING}}}}";
    _work = "World Snooker";
    _pubr = "[[World Professional Billiards and Snooker Association]]";
    _loc  = "[[Bristol, England]]";
    _type = "web";
  }
  if (_work == 'global-snooker.com') {
    _work = "Global-Snooker.com: Maximum Snooker Coverage";
    _pubr = "Cuefactor";
    _loc  = "[[London, England|London]]";
    _type = "web";
  }
  if (_work == 'matchroomsport.com') {
    //This site just repeats its site name in <title> for some reason;
    //individual page titles are in <div class="title"> on the pages.
    _title = "{{err|{{TITLE MISSING}}}}";
    _work = "MatchroomSport.com";
    _pubr = "[[Matchroom Sport]]";
    _loc  = "[[Brentwood, Essex]]";
    _type = "web";
  }
  var _lyear = content.document.lastModified.substr(6,4); 
  var adate = new Date();
  var ayear = adate.getFullYear(); 
  var amonth = adate.getMonth() + 1;
  var aday = adate.getDate();
  var _adate = "";
  /* Localizers will want to change these. */
  var months = new makeDateArray('January','February','March','April','May', 'June','July','August','September','October','November','December');
  /* Set the date format: */
  if (dateStyle != 'US') {
    // Intl: [D]D Month YYYY
    _adate = aday + " " + months[amonth] + " " + ayear;
  } else {
    // US: Month [D]D, YYYY
    _adate = months[amonth] + " " + aday + ", " + ayear;
  }
  var txt ="";
  /* Change the template and parameter names below to use on other wikis: */
  txt = txt + "<ref>";
  txt = txt + "{{cite " + _type;
  txt = txt + " |url= " + _url;
  txt = txt + " |title=" + _title;
  txt = txt + " |first=";
  txt = txt + " |last=" + "{{err|{{AUTHOR MISSING}}}}";
  if (_type != "book") {
	  txt = txt + " |work=" + _work;
  } else {
    txt = txt + " |isbn=" + _isbn; 
  }
  if (_type == "web") {
    txt = txt + " |year=" + _lyear + " [last update]";
  } else if (_type == "news") {
    txt = txt + " |date=" + "{{err|{{DATE MISSING}}}}";
  } else if (_type == "journal") {
    txt = txt + " |year=" + "{{err|{{YEAR MISSING}}}}";
  } else {
    txt = txt + " |year=";
  }
  if (_type == "journal") { txt = txt + " |volume="; }
  if (_type == "journal") { txt = txt + " |issue="; }
  if (_type == "journal") { txt = txt + " |pages="; }
  if (_pubr != "") { txt = txt + " |publisher=" + _pubr; }
  if (_loc != "") { txt = txt + " |location=" + _loc; }
  if (_issn != "") { txt = txt + " |issn=" + _issn; }
  if (_oclc != "") { txt = txt + " |oclc=" + _oclc; }
  if (_quote != "") { txt = txt + " |quote=" + _quote; }
  txt = txt + " |accessdate=" + _adate;
  txt = txt + "}}";
  txt = txt + "</ref>";
  window.openDialog('chrome://cite4wiki/content/cite4wikiref.xul', '_blank', 'chrome,'+cfg,txt);
}
function copy_clip(wikicode) {
/* This code was borrored from the codebase.nl free software site (defunct). */
  // Enable a privilege:
  // obsolete // netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
  // Open clipboard interface:
  var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
  if (!clip) { return; }
  // Make it transferable:
  var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
  if (!trans) { return; }
  // Specify what data type we want to obtain (text in this case):
  trans.addDataFlavor('text/unicode');
  // New object is needed to store the transferable data:
  var str = new Object();
  str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
  str.data=wikicode;
  trans.setTransferData("text/unicode",str,wikicode.length*2);
  var clipid=Components.interfaces.nsIClipboard;
  if (!clip) { return false; }
  clip.setData(trans,null,clipid.kGlobalClipboard);  
  return false;
}
