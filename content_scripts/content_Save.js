(() => {
  if (window.SaveRun) {
    return;
  }
	
window.SaveRun = true;

var css_style;


const next_prev_tabF = (e) => {
	if(e.key==="F1"){
		browser.runtime.sendMessage({command: "prev_tab"})
	}else if(e.key==="F2"){
		browser.runtime.sendMessage({command: "next_tab"})
	}
}

const next_prev_tab1 = (e) => {
	if(e.target.tagName!=="TEXTAREA" && e.target.tagName!=="INPUT" && e.target.tagName!=="SELECT"){
		if(e.key==="1"){
			browser.runtime.sendMessage({command: "prev_tab"})
		}else if(e.key==="2"){
			browser.runtime.sendMessage({command: "next_tab"})		
		}else if(e.key==="3"){
			window.location.reload(); 
		}
	}
}

browser.runtime.sendMessage({command: "send_settings"}).then(onSettingsData, onError);	

function onError(error){ 
 console.error(`Error:`, error);
}

function onSettingsData(message){
	let host = window.location.hostname.replace("www.","");
	let host0 = "<all>"
  let obj =	message.data
 	if(message.response==="settings_data"){
		window.Dr_settings = message.data;
		let nextTabF = message.data["nextTabF"];
		let	nextTab1 = message.data["nextTab1"];
		let	loadJS = message.data["loadJS"];
		let	loadCSS = message.data["loadCSS"];
		let	loadX = message.data["loadX"];
		let	en_X_dblclick = message.data["en_X_dblclick"];
		let	Twitter_last = message.data["Twitter_last"];
		let	Twitter_last_but = message.data["Twitter_last_but"];	

		if(nextTabF){
			document.addEventListener("keyup", next_prev_tabF);
		}else{
			document.removeEventListener("keyup", next_prev_tabF)
		}
		if(nextTab1){
			document.addEventListener("keyup", next_prev_tab1);
		}else{
			document.removeEventListener("keyup", next_prev_tab1)
		}
		
		if(loadJS){
			if(typeof obj["hosts"][host] !== "undefined" && typeof obj["hosts"][host]["JS"] !== "undefined" && obj["hosts"][host]["JS"] !==""){
				var js = obj["hosts"][host]["JS"];
			}else{
				var js = obj["hosts"][host0]["JS"];
			}
      //browser.runtime.sendMessage({command: "run_JS", script: js})
			setTimeout(function(js){browser.runtime.sendMessage({command: "run_JS", script: js});}, 800, js);
			//eval(js)
		}	
		
		
		if(typeof obj["hosts"][host] !== "undefined" && typeof obj["hosts"][host]["CSS"] !== "undefined" && obj["hosts"][host]["CSS"] !==""){
			css_style = obj["hosts"][host]["CSS"];
		}else{
			css_style = obj["hosts"][host0]["CSS"];
		}
		
		if(loadCSS){
			browser.runtime.sendMessage({command: "apply_CSS", style: css_style, url: window.location.href, hostname: window.location.hostname})
			window.DrStyleApplied=true;
		}
		
		if(loadX){
			X_ButtonStart()
		}
		
		if(en_X_dblclick){
			let func =message.data["X-Button"]["dblClick_"]
			window.addEventListener('dblclick',function(){eval(func)}) 
		}		

		if(Twitter_last){
			if (window.location.hostname.match("twitter.com") || window.location.hostname=="X.com" || window.location.hostname=="www.X.com"){
				
				if(Twitter_last_but){
					if(window.parent==window){
						setTimeout(function(){ Menu_Button(document.querySelector("body"), bg_to_set, bg_to_get);}, 1000); 
						//Menu_Button(document.querySelector("body"), bg_to_set, bg_to_get);
					}
				}
				
				$(document).ready(function(){	
					if(window.location.hostname.match('twitter.com|X.com')){
						if(window.parent==window){							
							setTimeout(function(){ Tw_observer_start()}, 2000)
							setTimeout(function(){ Tw_observer_start()}, 5000)
						}
					}
				})			
			}
		}
		
		window.Dr_arch={}
		window.Dr_arch["name_1"] = message.data["archive_files"]["name_1"]
		window.Dr_arch["name_2"] = message.data["archive_files"]["name_2"]
		window.Dr_arch["name_3"] = message.data["archive_files"]["name_3"];
	} 
} 


//function response_(message){}


function send_to_bg_save_html(text,title){
  const sending = browser.runtime.sendMessage({
    command: "save_html",
		text: text,
		title: title
  });
  //sending.then(response_, onError);
}

function getMessage(message, sender, sendResponse){
	if(message.command === "get_host"){
		let hostname = window.location.hostname.replace("www.","");
		sendResponse({ command: "send_host", hostname: hostname,  href: window.location.href});
	}else if(message.command === "x_button"){	
		X_ButtonStart()		
	}
}

browser.runtime.onMessage.addListener(getMessage);

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if(message.command === "save_html_data") {
		var selectorJS = message.selector;
		var del = message.del;
		var del_JS_code = "$(" + del + ").remove();"
		var host_JS_code =  selectorJS ;
		let hostname = window.location.hostname.replace("www.","");
		let data=Save_html(hostname, del_JS_code, host_JS_code)
		if (data==""){
			return
		}
		send_to_bg_save_html(data["html"],data["title"])	
		 
	}else if(message.command === "archive_text_init"){	
		let tags=message.tags;
		let type = message.type;
		let Tw_spec = message.type_2.Twitter_spec
		let Twit_txt = message.type_2.Twitter_sel_text
		let link = message.links;
		var text;

		if(Tw_spec && (window.location.hostname.match("twitter.com") || window.location.hostname=="X.com" || window.location.hostname=="www.X.com")){ 
			if(link==="none")Twit_txt=false // save selected text only on Twitter - on shift click
			text=get_selection_Twitter(tags, type, link, Twit_txt)
		}else{		
			text=get_selection(tags, type, link);
		}
		if(text!==null)
			browser.runtime.sendMessage({command: "archive_text_send", text: text, which: message.which})				

	}else if(message.command === "archive_saved"){	
		alert_txt("Saved",3000,(window.innerWidth -160),40,3) 
		if(document.querySelector("#Add_buttons_1")){//if JS archive buttons on
			alert_txt("Saved",3000,50,470,3) 
		}
		
	}else if(message.command === "archive_error"){	
		console.log("ping from Python script: error",message.error);
		alert_txt("Saved",3000,(window.innerWidth -160),60,1)
		 
  }else if (message.command === "script_eval"){
		let script = message.script
		eval(script)
		
  }else if (message.command === "my_alert"){
    alert(message.text)
		
  }else if (message.command === "txt_alert"){
		let args = message.args
		alert_txt.apply(this, args);
	}else if (message.command === "apply_CSS_init"){
		if(!window.DrStyleApplied){
			browser.runtime.sendMessage({command: "apply_CSS", style: css_style, url: window.location.href, hostname: window.location.hostname})
			window.DrStyleApplied=true
		}else if(window.DrStyleApplied===true){
			browser.runtime.sendMessage({command: "remove_CSS", style: css_style, url: window.location.href, hostname: window.location.hostname})
			window.DrStyleApplied=false			
		}
		
	}else{
	
  }
});


function X_ButtonStart(){
	browser.runtime.sendMessage({command: "send_settings"}).then(onSettingsDataXButt, onError);	
}

function onSettingsDataXButt(message){
	let objX= message.data["X-Button"];
 	if(message.response==="settings_data"){
		let main_X_but=objX["xButton"]
		let obj = objX["main"];
		let obj_vid = objX["vid"];
		let obj_pics = objX["pic"];
		let obj_m = objX["misc"];
		X_Button.init(main_X_but,obj,obj_vid,obj_pics,obj_m)
	}
}

//============================================

function Save_html(host, del_JS_code, host_JS_code){

	var title=document.title, date = new Date(),url=window.location.href;
	var charset='<meta charset="utf-8">'
	var css='body{max-width:700px;margin:auto;font-family: Tahoma; font-size:17px ;line-height: 1.35em}.url{font-size:13px; font-family:Lucida Console; line-height: 1.2em}b > a,b > a:visited{color:#9E0000}';
	css= css + 'yel{background-color:#FEFFB6} red{background-color:#FFDEDE} bez{background-color:#F3F0E2;} y_bold{background-color:#FEFFB6;font-weight:700} r_bold{background-color:#FFDEDE;font-weight:700} bez_bold{background-color:#F3F0E2;font-weight:700}'

	var sel=document.createElement('div');
	var sel_head=document.createElement('div');
	var sel_tit=document.createElement('h1'),sel_text=document.createElement('div'), sel_text2=document.createElement('div');
	var sel_text3=document.createElement('div'), sel_text4=document.createElement('div');
	var range=document.createRange(), range2=document.createRange(), range3=document.createRange();
	var range4=document.createRange(); ;var range5=document.createRange();
	var out;

	var chars=$('meta[charset]').attr("charset"); 
	if(chars)
			charset='<meta charset="'+ chars+'">'

	if(!chars){
		var chars=$('meta[content*="charset"]').attr("content")
		if(chars)chars=chars.match(/charset=(.+)/)
		if(chars && chars[1])
			charset='<meta charset="'+ chars[1]+'">'
	}

	if(window.location.hostname.match('localhost')){
		//return
	};

	video_to_link(); 
	YT_to_link(); 
	wikimapia_iframe_to_link(); 
	tiktok_to_link();

	var time="";
	var time1=document.querySelector('meta[name*="article:published_time"],meta[property*="article:published_time"],meta[itemprop="datePublished"]')
	if(time1){
		let attr=time1.getAttribute("content") 
		if(attr)
			time='<br>time from meta: ' + attr + '<br>'
		console.log("*** time : "+ time)
		$('meta').remove();
	}else if(document.querySelector('[data-timestamp]')){
		let attr = document.querySelector('[data-timestamp]').getAttribute("data-timestamp")
		if(attr)
			time='<br>time from meta: ' + attr + '<br>'
	}else if(document.querySelector('[data-timestamp-original]')){
		let attr = document.querySelector('[data-timestamp-original]').getAttribute("data-timestamp-original")
		if(attr)
			time='<br>time from meta: ' + attr
	//data-pubdate
	}else{
		$('meta').remove();		
	}

	console.log('save_html del_JS_code ',del_JS_code); 
	
	try{
		eval(del_JS_code); 
	}catch(e){
		if(e instanceof SyntaxError){
			console.log("ERROR eval(del_JS_code)",e.message)
			alert("delete elements - eval error\n" + e.message);
		}
	}
	
	if(window.getSelection().toString().length !=0){
		sel.appendChild(window.getSelection().getRangeAt(0).cloneContents());		
	}else{
		console.log('save_html host_JS_code\n' ,host_JS_code)
		try{
			eval(host_JS_code); 
		}catch(e){
			if(e instanceof SyntaxError){
				console.log("ERROR eval(host_JS_code) selectors",e.message)
				alert("selectors - eval error" + e.message);
			}
		}
		if(sel.innerHTML===null){
			return
		}
		if(sel.innerHTML===""){
			alert("Chosen selectors not found for hostname: \n" + host)
			return ""
		}
	}
	
	sel.innerHTML= sel.innerHTML+'\n' + sel_text.innerHTML;
	
	//========== remove attributes
	var div=document.createElement('div');
	div.innerHTML=sel.innerHTML
	div=remove_attr(div)
	sel.innerHTML=div.innerHTML
	//==========
	
	sel.innerHTML=sel.innerHTML.replace(/”|“|„/gi,'\"').replace(/’|‘|'/gi,'\'').replace(/–|—/gi,' - ').replace(/&rsquo;|&bdquo;|&rdquo;/gi,'\"').replace(/…|&#8230;/gi,'...'); 

	sel.innerHTML=sel.innerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,'').replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,'').replace(/<noscript>[\S\s]*?<\/noscript>/gi,'').replace(/<!--[\S\s]*?-->/gi,'').replace(/<div style="background-attachment[\S\s]*?<\/div>/gi,"").replace(/<\/?font[\S\s]*?>/g,'');

	sel.innerHTML=sel.innerHTML.replace(/<div>\s*\n*<\/div>/g,'').replace(/<span>\s*\n*<\/span>/g,'').replace(/<p>\s*\n*<\/p>/g,'')
	//sel.innerHTML=sel.innerHTML.replace(/<(p|table|span))[\S\s]*?>/g,'<$1>')
//sel.innerHTML=sel.innerHTML.replace(/rel="[^"]*?"/g,'').replace(/title="[^"]*?"/g,'').replace(/target="[^"]*?"/g,'').replace(/onclick="[^"]*?"/g,'').replace(/itemprop="[^"]*?"/g,'');
	//sel.innerHTML=sel.innerHTML.replace(/<\/?(table|tbody|thead|td|tr|th|tt)(?:[^<]*)?>/g,'');
	sel.innerHTML=sel.innerHTML.replace(/<p>&nbsp;<\/p>/g,'').replace(/<div>&nbsp;<\/div>/g,'').replace(/<a>\s*\n*<\/a>/g,'').replace(/<img>/gi,"").replace(/<div>\s*\n*<\/div>/g,'')

	sel.innerHTML=sel.innerHTML.replace(/<a>([^<]*?)<\/a>/g,'$1');
	sel.innerHTML=sel.innerHTML.replace(/<span>(.*?)<\/span>/gi,'$1')

	sel.innerHTML=sel.innerHTML.replace(/<a href="http:\/\/ad\.doubleclick[\S\s]*?<\/a>/gi,"").replace(/<fb:like[\S\s]*?<\/fb:like>/g,'').replace(/<g:plusone[\S\s]*?<\/g:plusone>/g,'');

	sel.innerHTML=sel.innerHTML.replace(/\n{3,}/g,'\n\n').replace(/\s{8,}/g,' ')
	sel.innerHTML=sel.innerHTML.replace(/<\/div>[\s\n]*?/g,'</div>\n').replace(/<\/p>[\s\n]*?/g,'</p>\n').replace(/<\/span>[\s\n]*?/g,'</span>\n').replace(/<\/li>/g,'</li>\n')
	sel.innerHTML=sel.innerHTML.replace(/<\/div>[\s]+<\/div>/g,'</div></div>').replace(/<div>[\s]+<div>/g,'<div><div>')

	title=title_replace(title);
	title = title + ' •[' + window.location.hostname.toString().replace('www.','') + ']';
	title=title + ".html"
	
	//console.log('*** save title', title) 
	//console.log('*** save  date, time', date , time) 
	//console.log('*** save ', sel.innerHTML) 
	charset = (charset.length !=0) ? '\n' + charset : '';

	date= date.toString().replace(' (Eastern Daylight Time)','')
	out= '<!DOCTYPE html><html>\n' + '<head>\n' + '<style>'+css+'</style>'  + charset + '\n<title>' 
	+ title + '</title>\n</head>\n<body>\n\n' +'<br>'+ sel.innerHTML +'\n\n\n<br><br>\n<hr><div class="url">' + url 
	+ '<br>\n'+ 'Saved on: ' + date +"\n" +time+'</div>\n\n<hr><br><br></body></html>';	

	return {html:out,title:title}
}


function title_replace(title){ 
	title = title.replace(/\s\s+/g,' ');
	title = title.replace(/,(?:”|\"|')/g,'”,').replace(/\.(?:”|\"|')/g,'”.')
	title = title.replace(/:/g,' - ').replace(/\x22/g,"'").replace(/\*/g,'•').replace(/\|/g,'｜').replace(/\\/g,'-').replace(/\//g,' ∕ ').replace(/\?/g,'¿').replace(/–|—/g,'-').replace(/&#8230;/g,'...')
	title = title.replace(/&#039;/g,"'").replace(/#/g,"'").replace(/\n/g,"");
	//title=escapeUnicode(title)
	return title
}
/* 
function escapeUnicode(str) {//unicode string
    return str.replace(/[^\0-~]/g, function(ch) {
        //return "\\u" + ("000" + ch.charCodeAt().toString(16)).slice(-4); //hex
				return "\\u" + ("000" + ch.charCodeAt());
    });
}
 */
var remove_attr=function(div){// exclude href src class
	var divs= div.querySelectorAll("*");
	for (var j=0; j<=divs.length;j++){ 
		if(typeof divs[j]!="object")continue
		var len=divs[j].attributes.length; 
		for (var i=1; i<=len;i++){
			var atr=divs[j].attributes[len-i]
			var atr_name=atr.name;
			if(atr.name!="class" && atr.name!="id" && atr.name!="src" && atr.name!="href"){
				divs[j].removeAttribute(atr.name)
			}
		} 
	}
	return div
}

//=======  Selection archive ======


function get_selection(tags, type, link){
	var sel=window.getSelection().toString(); 
	var title=document.title;
	var url = window.location.href;
	var sel_div=document.createElement('div'); 
	var no_selection=false
	if(window.getSelection().toString()=="" && !window.location.host.match('youtube.com')){
		no_selection=true
		alert('No selection') 	
		return null
	}

	sel_div.appendChild(window.getSelection().getRangeAt(0).cloneContents());
	var f_link=sel_div.querySelectorAll('a');
	var links = "\n--- links:";
	if(link==="single" && f_link.length){
		links = "\n--- link:\n" + f_link[0].textContent + ': ' + f_link[0]
	}else if(link==="all" && f_link.length){
		for(var i=0;i<f_link.length;i++){
			links=links + "\n" + f_link[i].textContent+': ' +f_link[i]
		}
	}else{
		links = ""
	}		
	
	if(sel.length===0 && !window.location.host.match('youtube.com')){
		var sel_f;
		for(var i=0;i<window.frames.length;i++){ 
			sel_f=window.frames[i].getSelection()
		}
		if(sel_f){
			sel="(from frame)\n" + sel_f.toString()
		}
	}
	if(window.location.host.match('youtube.com')){
		title=get_Youtube_info();
		//var t2=get_Youtube_info_JSON();
		//title=title + "\n" + t2;
		if(sel.length===0)sel=".";
	}
	
	//alert( sel+"\nlinks:"+links+"\n"+type+"\n"+tags);
	sel = sel + links
	
	
	//var d = new Date()//d.toLocaleString()+;	
	
	title=title.substring(0,200)
	sel=sel.replace(/\n\s\n/g,'\n').replace(/\s\n/g,'\n').replace(/\n{2,}/g,'\n').replace(/\s{3,}/g,' ')
	var date_= Date().substring(4,24)
	if(tags!=="")tags = tags + "\n"
	var out
	if (type==="add"){
		out= 'QUOTE:' + sel + '\n' ;	
	}else if (type==="add_sep"){
		out= "===\n" + title + '\n' + 'url=' + url + '\nQUOTE:' + sel + '\n' ;
	}else{
		out= "\n\n\n" + tags + "***** " + date_ + " *****\n" + title + '\n' + 'url=' + url + '\nQUOTE:' + sel + '\n' ;
	}
	
	return out
}






function get_selection_Twitter(tags, type, link, Twit_txt){
	var sel=window.getSelection().toString(); 
	var title=document.title;
	var url = window.location.href;
	var sel_div=document.createElement('div'); 
	var no_selection=false
	if(window.getSelection().toString()==""){
		no_selection=true
		alert('No selection') 	
		return null
	}

	var url1= url.split("?");
	if(url1[0])url=url1[0];
	
	
	var sel_elem=window.getSelection().getRangeAt(0).startContainer.parentNode ;
	var $par=$(sel_elem).parents("article")
	//sel=sel_elem.textContent
		
	if(Twit_txt){
		link="none"
		var sel_elem_=sel_elem.closest("article").querySelector('[data-testid="tweetText"]')
		var selection = window.getSelection();
		var end=sel_elem_.parentNode.nextSibling; 
		if(!end)end=sel_elem_.parentNode.parentNode.nextSibling; 
		//alert( end+"\n\n"+sel); 
		if(end){
			selection.setBaseAndExtent(sel_elem_, 0, end,0)
			sel=window.getSelection().toString();
		}else{
			console.log('Drozd: error setBaseAndExtent, Tw') 
			sel=sel_elem_.textContent
		}
		sel=sel.trim()
	}
	
	function repl1(txt){
		txt=txt.replace(/\n*\s*\n+/g,'\n')	
		txt=txt.replace(/\n{2,}/g,' ') //.replace(/\n+/g,'\n')
		txt=txt.replace(/\n+/g,'\n')
		//txt=txt.replace(/#/g,'')
		txt=txt.trim()
		return txt
	}
	sel=repl1(sel)
	
	try{
	var $retweet=$par.find('[data-testid="socialContext"]')// retweet
		sel= $retweet.text()+"\n"+sel
	}catch(err){	 console.log("No: " + err); }
	

	var $name=$par.find('[data-testid="User-Name"] a')
	var $timeEl=$par.find('time')
	var url_post=$timeEl.parent().attr("href") //Oct7 2023
	if(url_post)
		url = "https://twitter.com" + url_post 
	
	var $name=$par.find('[data-testid="User-Name"] a')
	var time=$par.find('time').attr("datetime")
  title=$name.text()+" "+time
	
	var $art=$par.find('[data-testid="card.layoutLarge.detail"],[data-testid="card.wrapper"]')
	if(typeof $art[0] !=="undefined"){
		var txt2= $art.text()
		if (typeof txt2!=="undefined" && txt2!=""){
				sel=sel +"\n---art---\n"+txt2
		}
	}


  $art.each(function(){
    var $link=$(this).find('[href^="https://t.co/"]');
    var url= $link.attr("href");
		console.log('*** link', url) 
    if(url){
			sel=sel +"\n"+url+"\n"
    }	
  });

  $art.each(function(){
    var $link=$(this).find('[data-testid^="card.layoutLarge.media"] a');
    var url= $link.attr("href");
		console.log('*** link', url) 
    if(url){
			sel=sel +"\n"+url+"\n"
    }	
  });


	var $retw=$par.find('[aria-labelledby^="id__"]') 
	if (typeof $retw[0]!="undefined"){
		var txt4=	$retw.eq(0).text()
		try{
			txt4=	txt4+"\n"+$retw.eq(1).text()
		}catch(err){ }
		txt4=repl1(txt4)
		if (typeof txt4!=="undefined" && txt4!="" && txt4.match('Quote')){
			if((txt4.replace("·","")!=$name.text()) && (txt4!=sel.replace(/\n/g,''))){
				txt4=txt4.replace(/\n+/g,'\n')
				sel=sel +"\n---quote---\n"+txt4
			}else{
				if(typeof $retw.find("video")[0]!=="undefined")
					sel=sel +"\n---video---\n"
			}
		}
	}	

	
	if(!url.match("/status/")){
		url="twitter.com" +$par.find('time').parents("a").attr("href")
	}
	
	sel_div.appendChild(window.getSelection().getRangeAt(0).cloneContents());
	var f_link=sel_div.querySelectorAll('a');
	var links = "\n--- links:";
	if(link === "single" && f_link.length){	
		links = "\n--- link:\n" + f_link[0].textContent + ': ' + f_link[0]
	}else if(link === "all" && f_link.length){
		for(var i=0;i<f_link.length;i++){
			links=links + "\n" + f_link[i].textContent+': ' +f_link[i]
		}
	}else{
		links = ""
	}
	
	sel=sel.replace(/Translate post$/,"")
	sel = sel + links
	
	sel=sel.trim();
	
	title=title.substring(0,200)
	sel=sel.replace(/\n\s\n/g,'\n').replace(/\s\n/g,'\n').replace(/\n{2,}/g,'\n').replace(/\s{3,}/g,' ')
	var date_= Date().substring(4,24)
	if(tags!=="")tags = tags + "\n"
	var out
 
	if (type==="add"){
		out= 'QUOTE:' + sel + '\n' ;	
	}else if (type==="add_sep"){
		out= "===\n" + title + '\n' + 'url=' + url + '\nQUOTE:' + sel + '\n' ;
	}else{
		out= "\n\n\n" + tags + "***** " + date_ + " *****\n" + title + '\n' + 'url=' + url + '\nQUOTE:' + sel + '\n' ;
	}
	
	return out
}

})();
