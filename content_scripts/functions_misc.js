
const maxWidth = (w) => {
	let width=w + 'px'
	$('body').css({'max-width': width,'margin':'auto'})
	
}

const fontCSS = (f,c) => {
	$('.post,body p, article p, main p, .main p, #main p').css({'font':f,'color': c})
}


const video_speed = (rate) => {
  var videos = document.querySelectorAll("video");
  if(videos && videos.length){
    for (var i=0; i<videos.length; i++) {
      var video = videos[i];
      video.playbackRate =rate;
			alert_txt(video.playbackRate + "x",1500,-100,30,2)
    }
  }	
  for(var j=0;j<window.frames.length;j++){ 
    var videos = window.frames[j].document.querySelectorAll("video")
    if (videos && videos.length) {
      for (var j=0; j<videos.length; j++) {
        var video = videos[j];
        video.playbackRate =rate;
				alert_txt(video.playbackRate + "x",1500,-100,10,1)
      }
		}
  }
}


const fit_image = (maxH,el,go) => {
	if(typeof maxH=="undefined")
		var maxH=window.innerHeight-10;
	if(!el)el="img";
	$(el).each(function(){
		if(typeof go!="undefined"&&go!=""){
			if(this.className.match("my_shrink"))return;
		}
		$(this).addClass("my_shrink")
		var h_o=this.height
		var w_o=this.width
		if(h_o<=maxH){return}	
		var h=(h_o>maxH) ? maxH : h_o ;
		var w=Math.round((h/h_o)*w_o);
		this.setAttribute("w_new",w);	 this.setAttribute("h_new",h)		
		this.setAttribute("w_o",w_o);	 this.setAttribute("h_o",h_o)	
		this.setAttribute("title",w_o+"x"+h_o)						
		$(this).css({'height':h+'px','width':w+'px'})
		$(this).css({'border-style':'dashed','border-width':'1px'});
	});
	
	function click_img_big(){  
		$(this).addClass("not_this");	
		var w_new=this.getAttribute("w_new");
		var h_new=this.getAttribute("h_new");
		var w=this.naturalWidth
		var h=this.naturalHeight
		var x=parseInt($(this).css('height').match(/(\d+)px/)[1]);
		if(x==h){
			$(this).css({'height': h_new + 'px','width': w_new +'px'})
		}else{
			$(this).css({'height': h + 'px','width': w + 'px'})
		}
 }
 $(".my_shrink:not('.not_this')").off('click.namespace').on("click.namespace",click_img_big) 
}


const alert_txt = function(text,time,x,y,bg){
  var time,text; var y, x;  
  var el=document.createElement('div'); el.id="alert_txt"; el.className = "alert_elem"; 
  var el_in=document.createElement('div'); el_in.id="alert_text_in"; el_in.className = "alert_elem"; 
  el.style.position="fixed";  
  if(x<0){el.style.right=Math.abs(x) +"px"; }else{el.style.left=x +"px"; }
  if(y<0){el.style.bottom=Math.abs(y) +"px"; }else{el.style.top=y +"px";  }
  el.style.maxHeight="640px" ;el.style.maxWidth="350px";
  el_in.style.maxHeight="340px" ;el_in.style.maxWidth="250px";
  el.style.zIndex="99999999999999";
  el.style.border="2px outset black"; el.style.borderRadius="20px";
  var bg_dark="linear-gradient(0deg, #1f2835 0%,#2e3b50 25%,#3f4f6a 50%,#2e3b50 75%,#1f2835 100%)"; //dark
  var bg_red="linear-gradient(0deg, #700000 0%,#AA0000 25%,#CC0000 50%,#AA0000 75%,#700000 100%)";  //red
  var bg_green="linear-gradient(0deg, #005100 0%,#007700 25%,#00A400 50%,#007700 75%,#005100 100%)";  //green
  var bckgr=(typeof bg=="string") ? bg : ((bg ==1 ) ? bg_red : bg_dark) 
  if (typeof bg=="number"){if (bg==3)bckgr=bg_green}
	if (typeof bg=="undefined")bckgr=bg_red
  el.style.background=bckgr;
  el.style.fontSize="11px";el.style.color="#ECECEC";el.style.lineHeight="1em";
  el.style.fontWeight="700"; el.style.fontFamily="Segoe UI"; //"Tahoma";//"Segoe UI";
  el_in.innerHTML=text;
  el.style.textAlign="center";
  el.style.padding="2px 8px 3px 8px";
  el_in.style.display="table-cell";  el.style.verticalAlign="middle";  el.style.display="table";
  el.appendChild(el_in);
  document.body.appendChild(el);

  setTimeout(function(){ 
    var alert_element = document.getElementById("alert_txt");
    if(alert_element)alert_element.parentNode.removeChild(alert_element); 
  }, time);
}


const del_elem_alt_click=function(){
	window.addEventListener('mouseover',function(event){
		event.target.addEventListener('click',function(event){
			if (event.altKey) {    // shiftKey  
			event.preventDefault(); event.stopPropagation();
			event.target.parentNode.removeChild(event.srcElement);return;  
			}    
		})  
	}) 
}


var video_to_link=function(){
	$("video").each(function(){
		var src=$(this).find("source").attr("src");
		 var $div= $('<div/>', {class: ""}).css({'outline':'6px solid #00AF37','background':'#FEFFB6', 'color':'#DD0000'}).html("video link <br>")
		$('<a/>', {href: src,target: "_blank"}).html(src).appendTo($div);	
		$div.insertAfter($(this));	
	}); 
}

var YT_to_link = function(){ 
	$('iframe[src*="youtube.com"],iframe[src*="youtube-nocookie.com"]').each(function(){ 
		var url=decodeURIComponent(this.src); 
		url=url.split("?")[0]
		url=url.replace('embed/','watch?v=');
		var id=url.match(/v=([^&?]+)/)
		if(!id)return false;
		url="https://www.youtube.com/watch?v="+id[1];
		var url_2=url.replace(/https?:\/\/www\./g,'')
		$('<a/>', {href: url,target: "_blank",class:"a_iframe"}).css({'color':'#CC3D3D','display':'block'}).html("• "+url_2).insertAfter($(this));
		$(this).remove()
	});

	$('[src*="lazy-youtube"],[data-src*="lazy-youtube"]').each(function(){ 
		var url=decodeURIComponent(this.getAttribute("data-src"));
		url=url.split("?")[0]
		url=url.replace('embed/','watch?v=');
		var id=url.match(/v=([^&?]+)/)
		if(!id)return false;
		url="https://www.youtube.com/watch?v="+id[1];
		var url_2=url.replace(/https?:\/\/www\./g,'')
		$('<a/>', {href: url,target: "_blank",class:"a_iframe"}).css({'color':'#CC3D3D','display':'block'}).html("• "+url_2).insertAfter($(this));//●
	});

	$('.youtube-player').each(function(){ //Sep13 2023
		var id=this.getAttribute("data-id")
		var url="https://www.youtube.com/watch?v="+id;
		var url_2=url.replace(/https?:\/\/www\./g,'')
		$('<a/>', {href: url,target: "_blank",class:"a_iframe"}).css({'color':'#CC3D3D','display':'block'}).html("• "+url_2).insertAfter($(this));//●
	});

}

var wikimapia_iframe_to_link = function(){
$('iframe[src*="wikimapia.org"]').each(function(){ 
	var url=decodeURIComponent(this.src); 
	$('<a/>', {href: url,target: "_blank",class:"a_iframe"}).css({'color':'#CC3D3D','display':'block'}).html("• "+url).insertAfter($(this));//●
	$(this).remove()
});
}

var tiktok_to_link = function(){
	$('blockquote.tiktok-embed').each(function(){
	var url=this.getAttribute("cite") 
	if(!url)return
	$('<a/>', {href: url,target: "_blank",class:"a_iframe"}).css({'color':'#CC3D3D','display':'block'}).html("• "+url).insertBefore($(this));
	})
}
