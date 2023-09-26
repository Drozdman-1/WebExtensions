(() => {
if (window.TwitRun) {
	return;
}
window.TwitRun = true;

var obs_started=false
var targetNode, last_id, prev_last_id, prev_last_id3

var last_Tw_css = {'background':'#D9F3F6','border':'2px solid #D50000'} //#D0EFED
var prev_Tw_css = {'background':'#E1D8F4','border':'2px solid #D50000'} //#D0EFED  
var prev_Tw_css3 = {'background':'#DBDEF6','border':'2px solid #D50000'}//'color':'green',
var set_Tw_css = {'background':'#F3EFDD','border':'2px solid #000'}
var last_text_css ={'color':'#600000','background':'#F3EFDD'}

$(document).ready(function(){
/* 	
// start from main content script
	if(window.location.hostname.match('twitter.com|X.com')){
		setTimeout(function(){ Tw_observer_start()}, 2000)
		setTimeout(function(){ Tw_observer_start()}, 5000)
	}
	window.addEventListener('dblclick',function(){ //alert() 
			clean_page()  	 
	}) 
	 */
})
/* 
function clean_page(){
  $("span:contains('Who to follow')").each(function(){//Dec30 2019
    var $first=$(this).parents(".r-1adg3ll").parent()
    $first.addClass("my_check")
		$first.next().find(".r-1adg3ll").contents().remove()
		$first.next().next().find(".r-1adg3ll").contents().remove()
		$first.next().next().next().find(".r-1adg3ll").contents().remove()
  });	
	$(".css-1dbjc4n.r-aqfbo4").css({'position': 'relative'})// header fixed sticky
	 $("span.css-901oao:contains('Promoted')").each(function(){
			$(this).css({'color':'#00718D'}).parents('[data-testid="cellInnerDiv"]').html("")//remove() 
	 });    
	 
	 $("span.css-901oao.css-16my406:contains('Ad')").each(function(){//
			//css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0
			$(this).css({'color':'#00718D'}).parents('[data-testid="cellInnerDiv"]').html("")//remove()  
	 });
} 
 */
browser.runtime.onMessage.addListener((message) => {
	if(message.command === "give_last"){
		let name=message.name 
		let id=message.id
		let id2=message.id2
		let id3=message.id3
		last_id=id
		prev_last_id=id2
		prev_last_id3=id3
		hi_last_tweet(id,id2,id3)
	}else if(message.command === "give_last_by_text"){
		let name=message.name 
		let text=message.text
		hi_last_tweet_by_text(text)	
  }
  return Promise.resolve({ response: "" });
});

//============================================



function response_from_background(message) {
}

function handleError(error){  console.log(`Error: ${error}`);}


const bg_to_get = function(){
	let url=window.document.location.href;
	let username=url.match(/twitter\.com\/([a-zA-Z0-9_]+)[^&#\\]/)
	username=username[1]
  const sending = browser.runtime.sendMessage({
    command: "get_last",
		name: username
  });
}

const bg_to_get_2 = function(){
	let url=window.document.location.href;
	let username=url.match(/twitter\.com\/([a-zA-Z0-9_]+)[^&#\\]/)
	username=username[1]

  const sending = browser.runtime.sendMessage({
    command: "get_last_by_text",
		name: username
  });
}

const bg_to_set = function(){
	if(window.getSelection().toString()==""){
		let $timeline=$('[aria-label^="Timeline:"]')
		let $first=$timeline.find('div[data-testid="cellInnerDiv"] article:not(:contains("Pinned")):not(:contains("Promoted Post"))')
		var $par=$first
	}else{
		var sel_elem=window.getSelection().getRangeAt(0).startContainer.parentNode ;
		var $par=$(sel_elem).parents("article")
	}
	var text=$par.find('[data-testid="tweetText"]').text()
	text=text.substr(0,40) ;//hi_last_tweet_by_text
	var $x=$par.find("a time").parent()
	var href=$x.attr("href")
	//var x=par.querySelector("a time").parentNode		//var href=x.getAttribute("")
	href=href.match(/status\/(\d+$)/)
	var id=href[1]
	var url=window.document.location.href;
	var username=url.match(/twitter\.com\/([a-zA-Z0-9_]+)[^&#\\]/)
	username=username[1]
	$("article").find('[href*="' + id + '"]').parents("article").css(set_Tw_css)
	$('article[data-testid="socialContext"] span:contains("Pinned")').parents("article").css({'background':'#98ABAE','max-height':'100px'});
	
  const sending = browser.runtime.sendMessage({
    command: "set_last",
		name: username,
		id: id,
		text: text
  });
  sending.then(response_from_background, handleError);
}


function hi_last_tweet(last,prev_last,prev_last3){
    $last_tweet=$("article").find('[href*="' + last + '"]')
		var $prev_last_tweet=$("article").find('[href*="' + prev_last + '"]')
    $prev_last_tweet.parents("article").css(prev_Tw_css); 
		var $prev_last_tweet3=$("article").find('[href*="' + prev_last3 + '"]')
    $prev_last_tweet3.parents("article").css(prev_Tw_css3); 		
    var $last_tweet=$("article").find('[href*="' + last + '"]')
    $last_tweet=$last_tweet.parents("article")
		$last_tweet.css(last_Tw_css)
}


function hi_last_tweet_obs(last,prev_last,prev_last3){
    $last_tweet=$("article").find('[href*="' + last + '"]')
		var $prev_last_tweet=$("article").find('[href*="' + prev_last + '"]')
    $prev_last_tweet.parents("article").css(prev_Tw_css); 
		var $prev_last_tweet3=$("article").find('[href*="' + prev_last3 + '"]')
    $prev_last_tweet3.parents("article").css(prev_Tw_css3);
    var $last_tweet=$("article").find('[href*="' + last + '"]')
    $last_tweet=$last_tweet.parents("article")
    $last_tweet.css(last_Tw_css)
}

function hi_last_tweet_by_text(text){
		var patt1=new RegExp('^' +text,'') ;
		$last_tweet_t=$('[data-testid="tweetText"]').filter(function(){return $(this).text().match(patt1) })
		if(text.length>5)
			$last_tweet_t.css(last_text_css);
		try{
			console.log("Twitter patt : ",patt1)
			$last_tweet_t.parents('article')[0].scrollIntoView();
		}catch(err){ }
}

/* 
 if(window.parent==window){
	//Menu_Button(document.querySelector("body"), bg_to_set, bg_to_get)
	//document.querySelector(".my_div_menu2").querySelector(".Dr_button_menu2").style.display="block"
 }
 */

function notifyBackgroundPage(e) {
  const sending = browser.runtime.sendMessage({
    command: "Message from the content script",
  });
  sending.then(handleResponse, handleError);
}


//==================================================


const Tw_observer_start = function(){
	if(obs_started==true)return
	bg_to_get()
	
	if(window.location.hostname.match('twitter.com') || window.location.hostname=="X.com" || window.location.hostname=="www.X.com"){
		var targetNode = document.querySelector('[aria-label^="Timeline"]');
	}
  var config = { attributes: false, childList: true, subtree: true };	
  const observer = new MutationObserver(callback);

  observer.observe(targetNode, config);
	obs_started=true
}

const callback = (mutationList, observer) => {
	var div;
	for (const mutation of mutationList){
		if (mutation.type === "childList") {			 
			try{
				div=mutation.target.querySelector('div[data-testid="cellInnerDiv"]')
				if(div){
						hi_last_tweet_obs(last_id, prev_last_id, prev_last_id3)
				}
			}catch(err){ }
		} 
	}
};


function objToString(obj){
	var str = '';   
	for (var p in obj){
	 if (obj.hasOwnProperty(p)){  
		str += p + ' : ' + obj[p] + '\n';  
	 }
	}
	return str;
}


function contains(selector, text){
	return [...document.querySelectorAll(selector)].filter(element => element.childNodes?.[0]?.nodeValue?.match(text));
}


const Menu_Button = function(elem,func1,func2){
	if(document.querySelector("#Dr_add_button_menu"))return
	var div =document.createElement('div');
	div.style.position="fixed";
	div.style.top="0px";div.style.left="50px"
	div.className="Dr_div_menu";div.id="Dr_add_button_menu"
	var button_menu =document.createElement('div');
	var bckg="linear-gradient(0deg, #300000, #770000, #300000)";
	var bckg2="linear-gradient(0deg, #002035, #004877, #002035)";//blue
	var bckg2="linear-gradient(0deg, #003310, #006921, #003310)";//green
	button_menu.className="Dr_button_menu";
	button_menu.style.position="relative";
	button_menu.style.zIndex="112300000"; 
	button_menu.style.background= bckg

	button_menu.style.borderRadius="5px";button_menu.style.border="2px solid #9C9C9C";
	button_menu.style.color= "#F1F1F1"; button_menu.style.fontWeight="700";
	button_menu.style.fontSize="11px";  button_menu.style.textShadow="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
	button_menu.style.fontFamily="Verdana";
	button_menu.style.boxSizing="content-box";//"border-box"
	button_menu.style.width="40px";
	button_menu.style.display="inline-block"
	button_menu.style.margin="4px 1px";
	button_menu.style.padding="2px 2px 3px 2px";
	button_menu.style.cursor="pointer";	button_menu.style.whiteSpace="nowrap"

	button_menu.innerHTML="&nbsp; set &nbsp;"
	button_menu.className="button_menu2";	
	button_menu.onmousedown = function(e){e.preventDefault();func1()	}
	
	button_menu2=button_menu.cloneNode(true)
	button_menu2.innerHTML="&nbsp; last &nbsp;";
	button_menu2.onclick=function(){func2()}
	
	button_menu2.style.background= bckg2
	
	button_menu.title="Remember last post";//on profile page
	button_menu2.title="Highlight last post if found"// on profile page
	
	div.appendChild(button_menu);	
	div.appendChild(button_menu2);
	elem.appendChild(div); 	
}

const alert_txt=function(text,time,x,y,bg){
  var time,text; var y, x;  
  var el=document.createElement('div'); el.id="alert_txt"; el.className = "alert_elem my_div_JS"; 
  var el_in=document.createElement('div'); el_in.id="alert_text_in"; el_in.className = "alert_elem my_div_JS"; 
  el.style.position="fixed";  
  el.style.top= y +"px"; el.style.left=x +"px";   
  el.style.maxHeight="640px" ;el.style.maxWidth="350px";
  el_in.style.maxHeight="340px" ;el_in.style.maxWidth="250px";
  el.style.zIndex="400000";
  el.style.border="2px outset black"; el.style.borderRadius="20px";
	
  var bg_dark="linear-gradient(0deg, #1f2835 0%,#2e3b50 25%,#3f4f6a 50%,#2e3b50 75%,#1f2835 100%)"; //dark
	var bg_red="linear-gradient(0deg, #9b0000 0%,#c40000 25%,#e80000 50%,#c40000 75%,#9b0000 100%)";  //red
	var bg_green="#036624"
	var bckgr=(typeof bg=="string") ? bg : ((bg ==1 ) ? bg_dark : bg_red) 
	if (typeof bg=="number"){if (bg==3)bckgr=bg_green}
 
	el.style.background=bckgr; 
	
	el.style.fontWeight="700"; el.style.fontFamily="Segoe UI"
	el.style.fontSize="11px";el.style.color="#ECECEC";
	el_in.style.fontSize="11px" ;el_in.style.color="#ECECEC";
	el_in.style.margin="0px" ;el.style.lineHeight="1em";	
  el.style.textAlign="center";
  el.style.padding="2px 8px 3px 8px";	
  el_in.style.display="table-cell";  
	el.style.verticalAlign="middle"; 
	el.style.display="table";		
  el_in.innerHTML=text;
  el.appendChild(el_in);
  window.document.body.appendChild(el);
	if(time<=0){return};
  setTimeout(function(){
		var alert_element = window.document.getElementById("alert_txt");
		if(alert_element)alert_element.parentNode.removeChild(alert_element); 
  }, time);
}	


window.Menu_Button = Menu_Button;
window.Tw_observer_start = Tw_observer_start;
window.bg_to_set = bg_to_set;
window.bg_to_get = bg_to_get;
window.bg_to_get_2 = bg_to_get_2;
window.alert_txt = alert_txt;

})();