
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
				try{
					//alert_txt(video.playbackRate + "x",1500,-100,30,1)
				}catch(err){ }
    }
  }	
  for(var j=0;j<window.frames.length;j++){ 
    var videos = window.frames[j].document.querySelectorAll("video")
    if (videos && videos.length) {
      for (var j=0; j<videos.length; j++) {
        var video = videos[j];
        video.playbackRate =rate;
				try{
					//alert_txt(video.playbackRate + "x",1500,-100,10,1)
				}catch(err){ }
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


//========================================

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
  el.style.padding="3px 8px 4px 8px";
  el_in.style.display="table-cell";  el.style.verticalAlign="middle";  el.style.display="table";
  el.appendChild(el_in);
  document.body.appendChild(el);

  setTimeout(function(){ 
    var alert_element = document.getElementById("alert_txt");
    if(alert_element)alert_element.parentNode.removeChild(alert_element); 
  }, time);
}

//========================================

//	Add_video_speed_button(-4,300,"",[function(){var rate=get_speed();alert(rate)},""],["del", "del"],[video_speed.bind(null,1.0), "speed 1x"],[video_speed.bind(null,1.2), "speed 1.2"],[video_speed.bind(null,1.5), "speed 1.5x"],[video_speed.bind(null,2.0), "speed 2.0x"], [set_quality.bind(null,"360p"), "quality 360p"])		

//	Add_video_speed_button(-4,300,"",[function(){var rate=get_speed();alert_txt(rate,3000,40,400,2)},""],["del", "del"],[video_speed.bind(null,1.0), "speed 1x"],[video_speed.bind(null,1.2), "speed 1.2"],[video_speed.bind(null,1.5), "speed 1.5x"],[video_speed.bind(null,2.0), "speed 2.0x"], [set_quality.bind(null,"360p"), "quality 360p"])		

var Add_video_speed_button = function(x, y, bg, f1a, f1b, f1, f2, f3, f4, f5){
	if(document.querySelector("#vid_Buttons"))return
	var func1a = f1a[0], title1a = f1a[1];
	var func1b = f1b[0], title1b = f1b[1];
	var func1 = f1[0], title1 = f1[1];
	var func2 = f2[0], title2 = f2[1];
	var func3 = f3[0], title3 = f3[1];
	var func4 = f4[0], title4 = f4[1];
	var func5 = f5[0], title5 = f5[1];

	var show_speed=func1a

	var button_ =document.createElement('span');
	button_.id="vid_Buttons";
	button_.style.position="fixed";button_.style.top="140px";button_.style.left="30px";
	button_.style.zIndex="112300000";
	button_.style.background= "linear-gradient(0deg, #0B0813, #3F4F6A, #2E3B50, #3F4F6A, #0B0813)"
	button_.style.padding= "2px 4px 2px 2px";//8E0404
	button_.style.borderRadius="4px";
	button_.style.width="20px"; 
	button_.style.margin="2px"; button_.style.padding="4px";
	button_.style.fontSize="14px";  button_.style.color="#E7E7E7";
	button_.style.cursor="pointer"; button_.style.boxSizing="content-box";
	button_.style.lineHeight="1em"; button_.style.border='2px outset #000';
	button_.style.fontFamily="Tahoma";  button_.style.fontWeight='700';
	button_.style.top=y+"px";button_.style.left=x+"px";
	if(bg){ button_.style.background= bg}		


	var el_1a=document.createElement('div'); 
	el_1a.innerHTML="❑" 
	el_1a.style.padding= "0px 1px 4px 4px";el_1a.style.fontSize= "14px";el_1a.style.fontFamily= "Tahoma";
	var el_1b=el_1a.cloneNode(true); 
	el_1b.innerHTML="✖";
	el_1b.style.margin="2px 0px -8px";
	el_1b.style.fontSize= "12px";el_1b.style.padding= "0px 1px 4px 5px"		
	button_.appendChild(el_1b);
		
	if(func1a!==null && title1a!==""){
		button_.appendChild(el_1a);
	}	
	
	var el_1=document.createElement('div'); el_1.innerHTML="&#10102" //"❶"; 
	el_1.style.fontSize= "14px";el_1.style.fontFamily= "Tahoma";
	el_1.style.padding= "2px 0px 2px 0px";
	el_1.style.margin= "0px 0px 4px 1px";
	
	var el_2=el_1.cloneNode(true); el_2.innerHTML="&#10103"//"❷";					
	var el_3=el_1.cloneNode(true); el_3.innerHTML="&#10104"//"❸"; 					
	var el_4=el_1.cloneNode(true); el_4.innerHTML="&#10105" //"❹"; 	
	var el_5=el_1.cloneNode(true); el_5.innerHTML="&#10106" //"❺"; 


	el_4.style.margin= "0px 0px -1px 1px";
	el_5.style.margin= "-2px 0px 3px 1px";	

	//var show_speed=function(){var rate=get_speed();alert(rate) } 
	el_1.oncontextmenu=function(e){ e.preventDefault(); show_speed();}
	el_2.oncontextmenu=function(e){ e.preventDefault(); show_speed();}
	el_3.oncontextmenu=function(e){ e.preventDefault(); show_speed();}
	el_4.oncontextmenu=function(e){ e.preventDefault(); show_speed();}
	el_5.oncontextmenu=function(e){ e.preventDefault(); show_speed();}
	
	var hr_1 =document.createElement('span'); hr_1.style.color="#E7E7E7";hr_1.style.fontSize="6px";
	hr_1.style.margin= "-14px 2px -14px 2px "; hr_1.style.padding="0px 0px 0px 0px "

	hr_1.innerHTML="———"//&nbsp;
	button_.appendChild(hr_1);
	
	var hr_2=hr_1.cloneNode(true);
	if(typeof func1!="undefined"){
		el_1.title=el_1.title=title1
		el_1.addEventListener('click',function(event){func1()},false)
		if(func1!=null)
		button_.appendChild(el_1);
	}								
	
	if(typeof func2!="undefined"){
		el_2.addEventListener('click',function(event){func2()},false);  
		el_2.title=title2
		if(func2!=null)
		button_.appendChild(el_2);
	}		
	
	if(typeof func3!="undefined"){
		el_3.addEventListener('click',function(event){func3()},false);
		el_3.title=title3
		if(func3!=null)
		button_.appendChild(el_3);
	}		

	if(typeof func4!="undefined"){
		el_4.addEventListener('click',function(event){func4()},false);
		el_4.title=title4
		if(func4!=null)
		button_.appendChild(el_4)
	}
	
	if(typeof func5!="undefined"){
		button_.appendChild(hr_2);
	
		el_5.addEventListener('click',function(event){func5()},false);
		el_5.title=title5
		if(func5!=null)
		button_.appendChild(el_5)
	}																		

	if(func1a!==null && title1a !=="" && typeof func1a!="undefined"){
		el_1a.addEventListener('click',function(event){func1a()},false);
		el_1a.title=title1a
	}		
							
	if(typeof func1b!="undefined"){
		if (func1b=="del"){
			el_1b.addEventListener('click',function(event){button_.remove()},false);
			el_1b.title="Exit"
		}else{
			el_1b.addEventListener('click',function(event){func1b()},false);
			el_1b.title=title1b
		}
	}		

	if(window.parent==window)
		document.body.appendChild(button_)	;		
}

//-----

var get_speed = function(){
	var rate;
  var videos = document.querySelectorAll("video");
  if(videos && videos.length){
    for (var i=0; i<videos.length; i++) {
      var video = videos[i];
      rate=video.playbackRate;
    }
  }	
  for(var j=0;j<window.frames.length;j++){ 
    var videos = window.frames[j].document.querySelectorAll("video")
    if (videos && videos.length) {
      for (var j=0; j<videos.length; j++) {
        var video = videos[j];
        rate=video.playbackRate;
      }
		}
  }
	return rate
}



function set_quality(quality){
	if(typeof quality==="undefined"){
		quality="360p";
	}	
  setTimeout(function(){   
		$(".ytp-menuitem-label").filter(function(){return this.innerHTML=="Quality"}).click()
    setTimeout(function(){  
		 $(".ytp-menuitem-label").filter(function(){return this.textContent==quality}).click()
      setTimeout(function(){  $(".ytp-settings-button").click() ;}, 100); //back
    }, 100);
  }, 100); 
}



//========================================

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


//========================================

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
