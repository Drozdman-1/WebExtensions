
const archive_file_1 = "C:\\archives (Drozd-addon)\\archive_file_1.txt";
const archive_file_2 = "C:\\archives (Drozd-addon)\\archive_file_2.txt";
const archive_file_3 = "C:\\archives (Drozd-addon)\\archive_file_3.txt";

const selectors_1 = `
var single_selector='.main';

var article=document.querySelector(single_selector);
range.selectNodeContents(article);
sel.appendChild(range.cloneContents());
title=title.replace('','')`; 

const selectors_2 = `	
var selector_header='header';
var selector_text='article';

var art_head= document.querySelector(selector_header);
var art_text= document.querySelector(selector_text);

range.selectNodeContents(art_head); 
sel.appendChild(range.cloneContents());
range2.selectNodeContents(art_text);
sel_text.appendChild(range2.cloneContents());

title=title.replace('','')`; 

const selectors_3 = `
var selector_title='.title, h1';
var selector_date='.date';
var selector_text='.story-content';

var art_title= document.querySelector(selector_title);
var art_date=document.querySelector(selector_date);
var art_text= document.querySelector(selector_text);

range.selectNodeContents(art_title);
sel_tit.appendChild(range.cloneContents());
sel.appendChild(sel_tit);
range2.selectNodeContents(art_date);
sel_text.appendChild(range2.cloneContents());
range3.selectNodeContents(art_text);
sel_text2.appendChild(range3.cloneContents());

title=title.replace('','')`;


//=============================

const sel_all = `
var single_selector = 'body';

var article=document.querySelector(single_selector);
range.selectNodeContents(article);
sel.appendChild(range.cloneContents());
title=title.replace('','');
let txt="No selection and no special setting for the hostname:\n" + "'" + window.location.hostname + "'" + "\n\nClick 'Cancel' and make a selection or click 'OK' to save the whole text body.";
let c=confirm(txt);
if(c===false){
  sel=null;
	//sel.innerHTML="";
}`; 


const sel_all_del=`'img, figure, form, meta, button, input, picture, video, audio, iframe, aside, .tags, [class^="gallery"], [class*="_share"], [class*="share_"], [class*="sharing"], [class*="social-share"], [class*="social(?!Byline)"]'`
//=============================

const sel_examp_1 = `
var single_selector = 'main';

var article=document.querySelector(single_selector);
range.selectNodeContents(article);
sel.appendChild(range.cloneContents());
title=title.replace('','')`;  //pbs

const sel_examp_del_1=`'img, svg, figure, form, meta, button, input, picture, video, audio, iframe, aside, .post__col-left, .post__byline, .sidebar'`

//=============================
const sel_examp_3 = `
var art_head = document.querySelector(".headline")
var art_text = document.querySelector(".article__content");

range.selectNodeContents(art_head); 
sel.appendChild(range.cloneContents());		
range2.selectNodeContents(art_text);
sel_text.appendChild(range2.cloneContents());	
	
title=title.replace(/(\|)? CNN Politics|(\|)? CNN Business/,"")
title=title.replace(/| CNN (Politics)?/,"").replace(" | CNN","")`;  //cnn

const sel_examp_del_3=`'img,figure,.social-share,.social-links,.related-content,.factbox_standard,.ad-feedback__modal,.modal__overlay,[class^="video-resource"]'`


//=============================

const sel_examp_2 = `
var art_tit = document.querySelector(".storytitle");
var art_date = document.querySelector("#story-meta");
var art_text = document.querySelector("#storytext");

range.selectNodeContents(art_tit);
sel_tit.appendChild(range.cloneContents());
sel.appendChild(sel_tit);
range2.selectNodeContents(art_date);
sel_text.appendChild(range2.cloneContents());
range3.selectNodeContents(art_text);
sel_text2.appendChild(range3.cloneContents());` //npr

const sel_examp_del_2=`'img, svg, figure, form, button, input, picture, video, audio,iframe'`

//=============================

const sel_examp_4 = `
var single_selector = '.nw-body-top-lhs';

var article=document.querySelector(single_selector);
range.selectNodeContents(article);
sel.appendChild(range.cloneContents());
title=title.replace('','')`;  //croix

const sel_examp_del_4=`'img, svg, figure, form, meta, button, input, picture, video, audio, iframe,.nw-artical-paths,.nw-artical-coverimgs,.nw-artical-img-caption,.nw-artical-share-links-wrapper,.lci_ad_space'`


const JS_examp = `//start_archive_JS_buttons(-2, 470, "red", ["google","yahoo"]);\n\n
if(window.location.href.endsWith("mp4")){
//Add_video_speed_button(-2,300,"",[show_video_speed,""],["del", "del"],[video_speed.bind(null,1.0), "speed 1x"],[video_speed.bind(null,1.2), "speed 1.2"],[video_speed.bind(null,1.5), "speed 1.5x"],[video_speed.bind(null,2.0), "speed 2.0x"], [show_video_speed,"Show speed"]);
};\n\n//alert("User script")`

const CSS_examp = `
article,article p, main p, .main p, #main p{
	font:400 17px/1.4em Tahoma !important;color:#000000 !important
}
h1{border:1px solid #900000; }`

var host0 = "<all>";
var host1 = "pbs.org";
var host2 = "npr.org";
var host3 = "cnn.com";
var host4 = "international.la-croix.com";

var host5 = "youtube.com";
var host6 = "twitter.com";

const data_0 = {
	init: true,
	pageAction: true,
	nextTabF: false,
	nextTab1: false,
	loadCSS: false,
	loadJS: false,
	loadX: false,
	en_X_dblclick: false, 
	Twitter_last: false,
	Twitter_last_but: true,
	popup: 1,
	hosts: {},
	archive_files: {file_1: archive_file_1, file_2: archive_file_2, file_3: archive_file_3, name_1: "archive", name_2: "sport", name_3: "posts"},
	archive_opt: {Twitter_spec: true,	Twitter_sel_text: true, links: "all"},
	contextMenu: {add_menu: true, open_in_browser: {on: false, filepath: "C:\\Programs\\Opera\\opera.exe"}, save_archives: true, open_files: false, add: false, search: [{title: "Google search", url: "https://www.google.com/search?q=", on: true}, {title: "Google.pl", url: "https://www.google.pl/search?num=100&hl=pl&q=", on: false}, {title: "Yahoo search", url: "https://search.yahoo.com/search?p=", on: true}, {title: "Bing search",  url: "https://www.bing.com/search?q=", on: true}]},
	twitter: {}
}

data_0["hosts"][host0]={
	"selector": sel_all.trim(),
	"del": sel_all_del,
	"JS": JS_examp,
	"CSS": CSS_examp
}


data_0["hosts"][host1]={
	"selector": sel_examp_1.trim(),
	"del": sel_examp_del_1
}

data_0["hosts"][host2]={
	"selector": sel_examp_2.trim(),
	"del": sel_examp_del_2
}

data_0["hosts"][host3]={
	"selector": sel_examp_3.trim(),
	"del": sel_examp_del_3
}

data_0["hosts"][host4]={
	"selector": sel_examp_4.trim(),
	"del": sel_examp_del_4
}

data_0["hosts"][host5]={
	"selector": "",
	"del": "",
	"CSS": "",
	"JS": `//Add_video_speed_button(-2,300,"",[show_video_speed,""],["del", "del"],[video_speed.bind(null,1.0), "speed 1x"],[video_speed.bind(null,1.2), "speed 1.2"],[video_speed.bind(null,1.5), "speed 1.5x"],[video_speed.bind(null,2.0), "speed 2.0x"], [set_quality.bind(null,"360p"), "quality 360p"]);\n\n//ShowImageInPopup();\n\n//"red","green","blue", "viol", "black"\n//start_archive_JS_buttons(-2, 470, "green", ["google","yahoo"]);`
}

data_0["hosts"][host6]={
	"selector": "",
	"del": "",
	"CSS": "",
	"JS": `//"red","green","blue", "viol", "black"\n//start_archive_JS_buttons(-2, 470, "red", ["google","yahoo"]);\n\n//Add_video_speed_button(-2,300,"",[show_video_speed,""],["del", "del"],[video_speed.bind(null,1.0), "speed 1x"],[video_speed.bind(null,1.2), "speed 1.2"],[video_speed.bind(null,1.5), "speed 1.5x"],[video_speed.bind(null,2.0), "speed 2.0x"], [show_video_speed,"Show speed"]);\n\n//ShowImageInPopup();`
}


data_0["tags"]={
	"tags1": ["sport","news","politics"],
	"tags2": ["tag1","tag2","tag3"],
	"tags3": ["tag1","tag2","tag3"]
}




var main_X_button = {
		"tip": "", 
		"func": ""
}

const obj_1=[
	{"tit": "separator"},
	{
		"tit": "maxWidth", 
		"tip": "maxWidth 1100px", 
		"func": "maxWidth(1100)"
	},
	{"tit": "separator"},
	{
		"tit": "font 17px", 
		"tip": "Set font size to 17px and font color black ('<p>' selector)", 
		"func": "$('div p, p').css({'font-size':'17px', 'font-family':'Tahoma','color':'#000000'})"
	},
	{
		"tit": "font family", 
		"tip": "Set font family Tahoma ('<p>' selector)", 
		"func": "$('div p, p').css({'font-family':'Tahoma'})"
	},
	{"tit": "separator"},
	{
		"tit": "fit images", 
		"tip": "Fit images to the screen's height ('viewport')", 
		"func": "fit_image()"
	},
	{"tit": "separator"},	
  {
		"bg": "",
    "tit": "Del alt-click",
    "tip": " Delete element on 'alt+click' ",
		"func": "del_elem_alt_click()"
  },	
  {
		"bg": "blue",
    "tit": "test alert",
    "tip": "test alert",
		"func": "alert()"
  },
	{
		"bg": "green",
    "tit": "test dblclick",
    "tip": "test dblclick on webpage after initialization",
    "func":"$(document).off('dblclick.namespace31').on('dblclick.namespace31',function(){alert_txt('test dblclick',2000,100,100)});"
  }
]


const obj_pics=[
 	{
		"tit": "fit images", 
		"tip": "Fit images to the screen's height ('viewport')", 
		"func": "fit_image()"
	}
]

const obj_vid=[
 	{
		"bg": "blue",
		"tit": "Video speed 1x", 
		"tip": 
		"Video speed 1x", "func": "video_speed(1.0)"
	},
	{"tit": "separator"},
	{
		"bg": "blue",
		"tit": "1.25", 
		"tip": "Video speed 1.25x", 
		"func": "video_speed(1.25)"
	},
	{
		"bg": "blue",
		"tit": "1.5", 
		"tip": "Video speed 1.5x", 
		"func": "video_speed(1.5)"
	},
	{
		"bg": "blue",
		"tit": "1.75", 
		"tip": "Video speed 1.75x", 
		"func": "video_speed(1.75)"
	},
	{
		"bg": "blue",
		"tit": "2.0", 
		"tip": "Video speed 2x", 
		"func": "video_speed(2.0)"
	}
]

var obj_m=[
	{
		"bg": "green",
		"tit": "Find last (Twitter)", 
		"tip": "Highlight last Twitter post if remembered and found on profile page", 
		"func": "bg_to_get()"
	},
	{
		"bg": "blue2",
		"tit": "Find by text (Twitter)", 
		"tip": "Highlight last Twitter post found by text's first 40 characters on profile page", 
		"func": "bg_to_set()"
	},	
	{
		"bg": "viol",
		"tit": "Save last (Twitter)", 
		"tip": "Remember last Twitter post found by 'id' on profile page", 
		"func": "bg_to_set()"
	},
	{"tit": "separator"},
	{
		"tit": "font Consolas", 
		"tip": "font family", 
		"func": "$('div p').css({'font-family':'Consolas'})"
	},
	{
		"tit": "font 15px", 
		"tip": "Set font size to 17px and font color black for '<p>' selector", 
		"func": "$('div p').css({'font-size':'17px','color':'#000000'})"
	},
	{"tit": "separator"}
]	


data_0["X-Button"] = {}
data_0["X-Button"]["xButton"] = main_X_button;
data_0["X-Button"]["main"] = obj_1;
data_0["X-Button"]["vid"] = obj_vid;
data_0["X-Button"]["pic"] = obj_pics;
data_0["X-Button"]["misc"] = obj_m;
data_0["X-Button"]["dblClick_"] = `
$(".css-1dbjc4n.r-aqfbo4").css({'position': 'relative'});// header fixed sticky
$("span.css-901oao:contains('Promoted Post')").each(function(){$(this).css({'color':'#00718D'}).parents('[data-testid="cellInnerDiv"]').html("")});
$("span.css-901oao.css-16my406:contains('Ad')").each(function(){$(this).css({'color':'#00718D'}).parents('[data-testid="cellInnerDiv"]').html("")});$("span.css-901oao:contains('Who to follow')").each(function(){$(this).parents('[data-testid="cellInnerDiv"]').html("")});
$('[data-testid="UserCell"] span.css-901oao:contains("Follow")').each(function(){$(this).css({'color':'#00718D'}).parents('[data-testid="cellInnerDiv"]').html("")});
;`

//$(".r-qvutc0:contains(' reposted')").each(function(){$(this).css({'color':'#00718D'}).parents(".r-1adg3ll").css({'background':'#EDF1FC','color':'#001775'}); });  

const str_obj_X_Button = JSON.stringify(data_0["X-Button"]) 


//TEMP
//data_0["nextTabF"] = true;data_0["nextTab1"] = true;data_0["loadX"] = true;data_0["Twitter_"] = true;


