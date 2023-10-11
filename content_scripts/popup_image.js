(function(){
// popup_image (for Twitter)
// image in popup on TabKey + mouse over
// double-click in top-left corner (160px x 160px) - popup on  mouse over (without TabKey) 
// key "a", "g" open image
// Esc to close; or move cursor more than 300px
// double click or "d" = full size; "f" -
// drag to move popup


var ShowImageInPopup =function(noTabKey){
	if(typeof noTabKey!=="undefined" && noTabKey!==""){
		my_popup.withoutTabKey=true;
		window.addEventListener('mouseover',my_popup.mouse_over_2,false)
	}else{
		my_popup.init_2(); // popup on TabKey 
		my_popup.on_key_popup_image()
		my_popup.drag_popup()
	}
	
	window.addEventListener('wheel',function(){ my_popup.hide()} ,false) 
		
	window.addEventListener('dblclick',function(event){
		//=============== without TabKey
		if(event.clientX<160 && event.clientY<160){
			if(my_popup.withoutTabKey===false){
				my_popup.withoutTabKey=true;
				window.addEventListener('mouseover',my_popup.mouse_over_2,false)
				alert_txt_2("popup ON",1000,20,40)
			}else{
				my_popup.withoutTabKey=false
				window.removeEventListener('mouseover',my_popup.mouse_over_2 ,false) 
				alert_txt_2("popup OFF",1000,20,40)
			}
		}
	})
}


var my_popup={
	maxH : window.innerHeight-15, 
	maxW : window.innerWidth -40, 
	x : 100,
	y : 10,
	kont:document.createElement('div'),
	img_in:null,
	caption:document.createElement('span'),
	url:null,
	url_temp:null,
	img_h: null,
	img_w: null,	
	withoutTabKey: false,

  init_2 : function(){
		my_popup.elem();
		
		window.addEventListener('keydown',function(event){	
			if(event.keyCode==9 || event.key=="Tab"){
				event.preventDefault(); event.stopImmediatePropagation();
				window.addEventListener('mouseover',my_popup.mouse_over_tab ,false) 
			}			
		})
		
		window.addEventListener('keyup',function(event){		
			if(event.keyCode==9 || event.key=="Tab"){
				event.preventDefault(); event.stopImmediatePropagation();
				window.removeEventListener('mouseover',my_popup.mouse_over_tab ,false) 
			}
		})

	},

  //=============== on TabKey
		
	mouse_over_tab: function(event){
		event.preventDefault();
		var elem=event.target
		var tag = elem.tagName.toLowerCase(); 
		var which;var url;
				
		if(window.location.hostname.match("localhost")){
			if(tag =="img"){
					url=elem.src 
				 my_popup.image(url);
			 }	
					
		}else if(window.location.hostname.match("twitter.com")){
			if(tag =="img"){
				url=elem.src 
				url=url.replace("_normal","_400x400")
				url=url.replace("_mini","")
				url=url.replace(/format=jpg&name=small/,"format=jpg&name=medium")
				url=url.replace(/format=png&name=\d+x\d+/,"format=png&name=medium")
				url=url.replace(/format=jpg&name=\d+x\d+/,"format=png&name=medium")
				my_popup.image(url);
				which="img"
				
			}else	 if(elem.className.indexOf("css-1dbjc4n")>-1 && elem.className.indexOf("r-1">-1)){
				try{
					url=elem.parentNode.parentNode.querySelector("img")
					url=url.getAttribute("src")
					url=url.replace("_normal","_400x400")
					url=url.replace("_mini","")		
					my_popup.image(url);
					which="1"
				}catch(err){ }
				
			}else	if(elem.tag=="a"){
				try{
					url=elem.parentNode.querySelector("img")
					url=url.getAttribute("src")
					url= url.replace("_normal","_400x400")
					url=url.replace("_mini","")		
					console.log("***twitter my_popup.image(url): "+url);
					my_popup.image(url);
					which="a"
				}catch(err){ }
				
			}else	if(elem.className=="css-1dbjc4n r-1niwhzg r-vvn4in r-u6sd8q r-4gszlv r-1p0dtai r-1pi2tsx r-1d2f490 r-u8s1d r-zchlnj r-ipm5af r-13qz1uu r-1wyyakw"){
				try{
					url=elem.src 
					url=url.replace("_mini","")		
					my_popup.image(url);
					which="2"		
				}catch(err){ }
			
			}else	 if(elem.className=="css-1dbjc4n r-sdzlij r-1wyvozj r-1udh08x r-u8s1d r-1v2oles r-desppf"){	
				try{
					url=elem.parentNode.querySelector("img")
					url=url.getAttribute("src")
					url=url.replace("_normal","_400x400")
					url=url.replace("_mini","")		
					which="3"
					my_popup.image(url);
				}catch(err){ }

			}else if(elem.className=="css-1dbjc4n r-12181gd r-1pi2tsx r-1ny4l3l r-o7ynqc r-6416eg r-13qz1uu"){
				try{
					url=elem.parentNode.parentNode.querySelector("img")
					url=url.getAttribute("src")	
					url=url.replace("_normal","_400x400")		
					url=url.replace("_mini","")				
					my_popup.image(url);
					which="4"
				}catch(err){ }
			}
			
		}else if(window.location.hostname.match("youtube.com")){
			
			if(elem.tagName==="IMG"){
				if(elem.parentNode.tagName==="YT-IMAGE"){
					//console.log('***youtube "YT-IMAGE"', elem.tagName, elem.src) 
					try{
						url = elem.src
						url=url.split("?")[0]
						my_popup.image(url);
					}catch(err){ }
				}else{
					/* 
					try{
						url = elem.src 
						url=url.split("?")[0]
						//my_popup.image(url);
					}catch(err){ }
					 */
				}
			}
			
		}
	},

	
  //=============== without TabKey  
	
	mouse_over_2 : function (event){
		event.preventDefault();
		var elem=event.target
		var tag = elem.tagName.toLowerCase(); 	
		if(window.location.hostname.match("localhost")){
			if (tag =="img"){
				var url=elem.src 
				my_popup.image(url);
			 } 

		}else if(window.location.hostname.match("twitter.com")){
			if(tag =="img"){
				if(elem.classList.contains('css-9pa8cd')){
					var url=elem.src 
					url=url.replace("_normal","_400x400")
					url=url.replace("_mini","")
					console.log("src: " + url  );
					url=url.replace(/format=jpg&name=small/,"format=jpg&name=medium")
					url=url.replace(/format=png&name=\d+x\d+/,"format=png&name=medium")
					url=url.replace(/format=jpg&name=\d+x\d+/,"format=png&name=medium")
					my_popup.image(url);
				}else{
				}
			}else{				
			}
			
		}else if(window.location.hostname.match("youtube.com")){
			
			if(elem.tagName==="IMG"){
				if(elem.parentNode.tagName==="YT-IMAGE"){
					//console.log('***youtube "YT-IMAGE"', elem.tagName, elem.src) 
					try{
						url = elem.src
						url=url.split("?")[0]
						my_popup.image(url);
					}catch(err){ }
				}else{
					/* 
					try{
						url = elem.src 
						url=url.split("?")[0]
						//my_popup.image(url);
					}catch(err){ }
					 */
				}
			}
		}
	},

	image: function(url,capt){
		if(url === my_popup.url_temp){
			return
		};
		my_popup.url_temp=url;
		setTimeout(function(){my_popup.url_temp=null }, 1000);
		my_popup.url=url;
		my_popup.kont.style.transform="rotate(0deg)";  
		
		var image;var x,y;var W,H;var h=0,w=0,r; 
		var img = new Image();
		capt=(typeof capt!="undefined") ? capt : ""
		img.src = url;
		
		img.onload = function(event){
			h = img.height;
			w = img.width;
			my_popup.img_w = w;
			my_popup.img_h = h;

			capt= w +" x " + h + " " + capt;
			h = (h>=my_popup.maxH) ? my_popup.maxH : h ;
			w=Math.round((h/img.height)*w);
			x=parseInt((window.innerWidth/2)-(w/2));    y=parseInt((window.innerHeight)/2-(h/2));
			my_popup.kont.style.top= y +"px";    my_popup.kont.style.left=x +"px";  
			my_popup.kont.style.height=h +"px"; ;my_popup.kont.style.width=w +"px";;
					
			my_popup.elem_img_create()
			my_popup.img_in.src=img.src ;
			my_popup.caption.innerHTML=capt;
			if(capt=="▣")my_popup.caption.style.textShadow= "-1px 0 #EEEEEE, 0 1px #EEEEEE, 1px 0 #EEEEEE, 0 -1px #EEEEEE";
				my_popup.kont.style.visibility="visible"; my_popup.kont.style.opacity="1";
				my_popup.img_in.style.visibility="visible"; my_popup.img_in.style.opacity="1";
				my_popup.M_Radius(200);
				if(event.shiftKey){
					window.removeEventListener('mousemove',my_popup.hide,false);
					document.addEventListener('keyup',function(){
						window.addEventListener('mousemove',my_popup.hide,false)
					},false)
				}
			my_popup.kont.style.border="1px solid #555"
		}
	},	
	
	elem: function(){
    this.kont.id="my_pop_div_2"; this.kont.className = "my_pop_div_2"; 
    this.kont.style.position="fixed"; 
    this.kont.style.zIndex="999999999";
    this.kont.style.maxHeight=this.maxH; this.kont.style.maxWidth=this.maxW; 
    this.kont.style.borderRadius="6px"; this.kont.style.padding="3px";
		this.kont.style.top= this.y +"px"; this.kont.style.left=this.x +"px";  

		document.body.appendChild(this.kont);

    my_popup.elem_img_create()
    
    this.caption.id="my_pop_cap";
    this.caption.innerHTML=""; 
    this.caption.style.background="transparent";
    this.caption.style.padding="0 6px 2px 6px";
    this.caption.style.color="#FFF";
    this.caption.style.position="absolute";
    this.caption.style.fontSize="13px";this.caption.style.fontWeight="400";
    this.caption.style.top="4px";this.caption.style.left="0px";this.caption.style.borderRadius="3px"; 
    this.kont.appendChild(this.caption)
    
    my_popup.caption.addEventListener('mouseover',function (){	my_popup.caption.classList.add("cap_see")},false)
    my_popup.caption.addEventListener('mouseout',function (){ my_popup.caption.classList.remove("cap_see")	},false)
    
		my_popup.kont.addEventListener('dblclick',my_popup.size_switch)
		
    this.add_CSS('#my_pop_div_2{visibility:hidden; opacity:0; transition:visibility 0s ease-out 0.3s,opacity 0.3s ease-out;z-index:999999999;font-size:13px;font-weight:400;} #my_pop_img_2{max-width:100%;max-height:100%; transition:visibility 0s ease-out 0.3s,opacity 0.3s ease-out;z-index:999999999;}#my_pop_div_2:hover{ transition-delay:0.2s}#my_pop_cap{position:absolute;top:4px;left:4px;border-radius:3px;background-color:rgba(255,255,255,0.5);padding:0 6px 2px 0;z-index:9999999999;line-height:1.2em;font-size:13px;font-family: "Segoe UI"}.cap_see{color:#000 !important ;background-color:#FFF !important}');	
	},                        
	
	elem_img_create: function(){
		if(my_popup.img_in)my_popup.kont.removeChild(my_popup.img_in) 
		my_popup.img_in=document.createElement('img');
		my_popup.img_in.id="my_pop_img_2" ;my_popup.img_in.className="my_pop_img_2"
		my_popup.img_in.style.visibility="hidden"; my_popup.img_in.style.opacity="0";
		my_popup.kont.appendChild(my_popup.img_in)		
	},

 	add_CSS: function(text){ //for firefox
    var style = document.createElement("style");
    style.appendChild(document.createTextNode(text));
    document.getElementsByTagName('head')[0].appendChild(style)
	},
	
	size_switch: function(){
		if(my_popup.size_switch==1){ 
			my_popup.size_fit()
		}else{
			my_popup.full_size()
		}
	},	
	
	hide:	function (){ 
		setTimeout(function(){
			my_popup.kont.style.visibility="hidden"; my_popup.kont.style.opacity="0";
			my_popup.img_in.style.visibility="hidden"; my_popup.img_in.style.opacity="0";	
			my_popup.kont.style.border="none"
			my_popup.img_in.src="";
			my_popup.url_temp=null;
			my_popup.size_switch=0;
		}, 300)
		my_popup.kont.removeEventListener('mouseout',my_popup.hide,false)
		document.querySelector("#my_pop_div_2").style.transform="scaleX(1)" 
		var elem_img= document.querySelector("#my_pop_img_2")			
		elem_img.style.maxHeight="100%" ;elem_img.style.maxWidth="100%";
	},

	M_Radius: function (radius){
		window.addEventListener('mousemove',MouseMove0,false)  
			var radius;
			var x0,y0,x2,y2;
		function MouseMove0(e){
			x0=e.clientX;
			y0=e.clientY;
			this.removeEventListener('mousemove',arguments.callee,false); 
			window.addEventListener('mousemove',MouseMove2,false)   					   
		}
			 
		function MouseMove2(e){
			x2=e.clientX;
			y2=e.clientY;
			var d=Math.sqrt(Math.pow(x2-x0,2)+Math.pow(y2-y0,2))
			if(e.shiftKey){this.removeEventListener('mousemove',arguments.callee,false);
			document.addEventListener('keyup',function(){
				window.addEventListener('mousemove',MouseMove0,false)
			},false); 							
			};

			if(my_popup.drag){window.removeEventListener('mousemove',MouseMove2,false);	};	 				
			
			if(d>radius){
				this.removeEventListener('mousemove',arguments.callee,false); 
				my_popup.hide()				
			}
			} 
	},

	on_key_popup_image: function(){
		window.addEventListener('keydown',function(event){
			if(event.target.tagName==="INPUT" || event.target.tagName==="TEXTAREA" || event.target.tagName==="SELECT")return
			if(my_popup.url==null){return}
			if(event.key == "g" || event.key == "a"){
				window.open(my_popup.url, '_blank');									
			}
			
			//-------------- Rotate_elem
			var elem= document.querySelector("#my_pop_div_2") 
			if (event.key === "w"){
				elem.style.transform="rotate(90deg)";   
			}else if (event.key === "q"){
				elem.style.transform="rotate(270deg)";  
			}else if(event.key == "e") {
				 elem.style.transform="scaleY(-1)";
			}else if(event.key == "r"){
			 elem.style.transform="scaleX(-1)"; 
			}else if(event.key == "s"){
				elem.style.transform="scaleX(1)"; 
			}else if(event.key == "d"){
				my_popup.full_size()
			}else if(event.key == "f"){
				elem.style.transform="rotate(0deg)";  
				my_popup.size_fit()
			}
/* 			 
			if(event.key=="ArrowUp"){ 
				elem.style.top= elem.offsetTop+30 +"px"; 
			}			    
			if(event.key=="ArrowDown"){ 
				elem.style.top= elem.offsetTop-30 +"px"; 
			}	
			if(event.key=="ArrowLeft"){// alert(event.key)
				elem.style.left= elem.offsetLeft+30 +"px";
			}	
			if(event.key=="ArrowRight"){ 
				elem.style.left= elem.offsetLeft-30 +"px";
			}	
			 */
			if(event.key=="Escape"){ 
				my_popup.hide()      
			}	
		})	
	},
	
	//--------------  drag_popup
	
	org_pos: "",
	drag: "",
	drag_popup: function(e){
		var pop_div= document.querySelector("#my_pop_div_2")
		pop_div.addEventListener('mousedown',function(e){
			var target = e.target ? e.target : e.srcElement;
			if(target.id!="my_pop_div_2" && target.parentNode.id!="my_pop_div_2") {return};

			x0 = e.clientX;
			y0 = e.clientY;
			pop_div.org_pos=pop_div.style.position; 			
			pop_div.style.cursor='move'
			coordX = parseInt(pop_div.style.left);
			coordY = parseInt(pop_div.style.top); 
			my_popup.drag = true;
			window.addEventListener('mousemove', dragDiv) ;
			window.addEventListener('mouseup', mouseup_) ;
			e.preventDefault()
		}) 	
		
		function dragDiv(e){
			if(!my_popup.drag){return};
			if(!e){var e= window.event};
			pop_div.style.left=coordX+e.clientX-x0+'px';
			pop_div.style.top=coordY+e.clientY-y0+'px';									
			return false;
		}
		
		function mouseup_(event){
			//if(pop_div.drag)
				my_popup.M_Radius(300);
			my_popup.drag=false;	   
			document.querySelector("#my_pop_div_2").style.cursor='default'
			window.removeEventListener('mousemove', dragDiv ,false) 
			window.removeEventListener('mouseup', mouseup_ ,false) 
		}
	},

	size_fit: function(){
    var elem= document.querySelector("#my_pop_div_2") 
    var elem_img= document.querySelector("#my_pop_img_2")		
		h=my_popup.img_h;w=my_popup.img_w;
		h=(h>=my_popup.maxH) ? my_popup.maxH : h ;
		w=Math.round((h/my_popup.img_h)*w);
		x=parseInt((window.innerWidth/2)-(w/2));    y=parseInt((window.innerHeight)/2-(h/2));
		elem.style.top= y +"px";    elem.style.left=x +"px";  
    elem.style.maxWidth=w+"px";	elem.style.maxHeight=h +"px";		
		elem_img.style.maxWidth=w +"px";elem_img.style.maxHeight=h+"px" ;
		elem.style.width=w+"px";	elem.style.height=h +"px";		
		elem_img.style.width=w +"px";elem_img.style.height=h+"px" ;
		my_popup.size_switch=0
	},	
	
	
	full_size: function(){
		var elem= document.querySelector("#my_pop_div_2") 
		var elem_img= document.querySelector("#my_pop_img_2")		
		var	x=parseInt((window.innerWidth/2)-(my_popup.img_w/2));   var y=parseInt((window.innerHeight)/2-(my_popup.img_h/2));
		elem.style.top= y +"px";    elem.style.left= x +"px"
		elem.style.width= my_popup.img_w +"px";elem.style.height= my_popup.img_h+"px" ;
		elem_img.style.width= my_popup.img_w +"px";elem_img.style.height= my_popup.img_h+"px" ;
		elem.style.maxWidth= my_popup.img_w+"px";	elem.style.maxHeight= my_popup.img_h +"px";		
		elem_img.style.maxWidth= my_popup.img_w +"px";elem_img.style.maxHeight= my_popup.img_h+"px" ;
		my_popup.size_switch=1	
	}	

}


alert_txt_2=function(text,time,x,y,bg){
  var time,text; var y, x;  
  var el=document.createElement('div'); el.id="alert_txt_2"; el.className = "alert_elem my_div_JS"; 
  var el_in=document.createElement('div'); el_in.id="alert_text_in"; el_in.className = "alert_elem my_div_JS"; 
  el.style.position="fixed";  
  el.style.top= y +"px"; el.style.left=x +"px";   
  el.style.maxHeight="640px" ;el.style.maxWidth="350px";
  el_in.style.maxHeight="340px" ;el_in.style.maxWidth="250px";
  el.style.zIndex="999999999";
  el.style.border="2px outset black"; el.style.borderRadius="20px";
	
  var bg_dark="linear-gradient(0deg, #1f2835 0%,#2e3b50 25%,#3f4f6a 50%,#2e3b50 75%,#1f2835 100%)"; //dark
  var bg_red="linear-gradient(0deg, #700000 0%,#AA0000 25%,#CC0000 50%,#AA0000 75%,#700000 100%)";  //red
  var bg_green="linear-gradient(0deg, #005100 0%,#007700 25%,#00A400 50%,#007700 75%,#005100 100%)";  //green
  var bckgr=(typeof bg=="string") ? bg : ((bg ==1 ) ? bg_red : bg_dark) 
  if(typeof bg=="number"){if (bg==3)bckgr=bg_green}
	if(typeof bg=="undefined")bckgr=bg_red
	
	el.style.background=bckgr; 
	
	el.style.fontWeight="700"; el.style.fontFamily="Segoe UI"  ; //"Tahoma";//"Segoe UI";
	el.style.fontSize="11px";el.style.color="#ECECEC";
	el_in.style.fontSize="11px" ;el_in.style.color="#ECECEC";
	el_in.style.margin="0px" ;el.style.lineHeight="1em";	
  el.style.textAlign="center";
  el.style.padding="2px 8px 3px 8px";	
  // -----------vertical align center
  el_in.style.display="table-cell";  el.style.verticalAlign="middle";  el.style.display="table";		
  el_in.innerHTML=text;
  el.appendChild(el_in);
  window.document.body.appendChild(el);
	if(time<=0){return};
  setTimeout(function(){ 
  var alert_element = window.document.getElementById("alert_txt_2");
  if(alert_element)alert_element.parentNode.removeChild(alert_element); 
  }, time);
}	


//ShowImageInPopup()

window.my_popup=my_popup
window.ShowImageInPopup=ShowImageInPopup

}());

