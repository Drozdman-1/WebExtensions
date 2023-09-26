
var bckg="linear-gradient(0deg, #0B0813, #3F4F6A, #2E3B50, #3F4F6A, #0B0813)";
var bckg_press="linear-gradient(0deg, #2E3B50, #1B283C, #2E3B50)";
var bckg2="linear-gradient(0deg, #0f1623 0%,#324254 18%,#0f1623 35%,#2a3749 52%,#0f1623 66%,#324254 81%,#0f1623 100%)";
var bckg_but= "linear-gradient(0deg,  #5b0213 0%,#76031a 28%,#a70021 55%,#76031a 75%,#5b0213 100%)" //red
var bckg_butBig= "linear-gradient(0deg,  #5b0213 0%,#76031a 28%,#a70021 55%,#76031a 75%,#5b0213 100%)"
var bckg_red= "linear-gradient(0deg,  #5b0213 0%,#76031a 28%,#a70021 55%,#76031a 75%,#5b0213 100%)"
var bckg_green="linear-gradient(0deg,  #003110 0%,#004817 25%,#057228 55%,#004817 75%,#003110 100%)"//067729
var bckg_blue="linear-gradient(0deg,  #001929 0%,#003152 25%,#145683 55%,#003152 75%,#001929 100%)";//001929
var bckg_blue2="linear-gradient(0deg,  #041B4A 0%,#102A5E 25%,#223E76 55%,#102A5E 75%,#041B4A 100%)"
var bckg_viol="linear-gradient(0deg,  #38003A 0%,#5A0B5C 25%,#7D0981 55%,#5A0B5C 75%,#38003A 100%)"
bckg_but = bckg_red;

var bckg_but2="linear-gradient(0deg, #0f0e11 0%,#5d6168 50%,#0f0e11 100%)"// small menu buttons
var bg3= bckg_but

var w=103;

var X_Button= {
	Bbutton: document.createElement('div'),
	init: function(main_but,obj,obj_1,obj_2,obj_m){	
			if(document.querySelector("#add_button_big"))return
			var button_ =this.Bbutton
			button_.id="add_button_big";button_.className="my_div_JS";
			button_.style.position="fixed"; 
			button_.style.top="50px";

			let x=window.innerWidth - 60;
			x=x + "px"
			button_.style.left= x
			button_.style.zIndex="9999999999999";
			button_.style.background= bckg_butBig
			button_.style.padding= "2px 4px 2px 2px";
			button_.style.borderRadius="4px";
			button_.style.width="26px";button_.style.height="16px";
			button_.style.margin="2px";button_.style.padding="4px";
			button_.style.fontSize="17px";button_.style.color="#E7E7E7";
			button_.style.cursor="pointer";
			button_.style.border='2px outset #000';
			button_.style.boxSizing="content-box";
			button_.style.lineHeight="1em"
			button_.title=main_but.tip;
			button_.innerHTML="&nbsp▼";//
			button_.onmousedown = function(e){e.preventDefault();} 
 			
 			button_.onclick = function(event){ 
				button_.style.background=bckg_press
				setTimeout(function(){button_.style.background=bckg_but}, 200);
				if(typeof main_but.func==="function")func()
				if(typeof main_but.func==="string")eval(main_but.func)
			}

			obj=obj || [];
			obj_1=obj_1 || [];
			obj_2=obj_2 || [];
			obj_m=obj_m || [];

			if(obj.length>0 || obj_1.length>0 || obj_2.length>0)this.Menu_Button(button_,obj,obj_1,obj_2,obj_m)

			if(window.parent==window)document.body.appendChild(button_)	;		
			
			
		this.add_CSS("#add_button_menu{visibility:hidden;} #add_button_big #add_button_menu{visibility:hidden; opacity:0;  transition:visibility 0s ease-out 0.3s,opacity 0.3s ease-out;transition-delay:0.2s;}#add_button_big:hover #add_button_menu,#add_button_menu:hover{visibility:visible;opacity:1;transition-delay:0.2s;}#add_button_big{user-select: none,-moz-user-select: none;}")

		this.add_CSS("#add_button_menu_2_1{visibility:hidden;opacity:0}#add_button_menu_2_2{visibility:hidden;opacity:0} #add_button_menu_2_3{visibility:hidden;;opacity:0}#SubMenu2:hover ~ #add_button_menu_2_2, #add_button_menu_2_2:hover{visibility:visible;opacity:1;transition-delay:0.2s;}#SubMenu3:hover ~ #add_button_menu_2_3, #add_button_menu_2_3:hover{visibility:visible;opacity:1;transition-delay:0.2s;}#SubMenu1:hover ~ #add_button_menu_2_1, #add_button_menu_2_1:hover{visibility:visible;opacity:1;transition-delay:0.2s;}")
			
		this.move_() //drag
	},

	move_: function(){
		let self=this
		let B_button=this.Bbutton
		B_button.addEventListener('dblclick',function(){
		},false)
		
		B_button.addEventListener("contextmenu", (e) => {
			if(e.button===2 && e.target.id==="add_button_big"){
				e.preventDefault()
				self.dragOn=false
				setTimeout(function(){self.dragOn=true }, 400);
			}
		});
		
		window.addEventListener("mouseup", (e) => {
			if(e.button===0){
				if(self.dragOn===true){
					if(e.pageX<0 || e.pageY<0)return
					if(e.pageX > (window.innerWidth-40))return
					if(e.pageY > (window.innerHeight-150))return
						B_button.style.left= e.pageX +"px";
						B_button.style.top= e.pageY +"px";
				}				
				self.dragOn=false
			}
		});
	},

	Menu_Button: function(elem,obj,obj_1,obj_2,obj_m){
 			var button_menu =document.createElement('div');	
			button_menu.id="add_button_menu";button_menu.className="my_div_JS";
			button_menu.style.position="relative";
			button_menu.style.top="3px";button_menu.style.right=w - 20 + "px"; 
			button_menu.style.zIndex="112300000"; 
			button_menu.style.background= bckg 
			button_menu.style.padding= "6px 8px 6px 0px" ;
			button_menu.style.borderRadius="8px";button_menu.style.border="2px solid #9C9C9C";
			button_menu.style.color= "#F1F1F1"; button_menu.style.fontWeight="700";
			button_menu.style.textShadow="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";

			button_menu.style.fontFamily="Verdana" ;button_menu.style.fontSize="10px";
			button_menu.style.boxSizing="content-box";
			button_menu.style.width=w + "px";
			button_menu.style.margin="2px";button_menu.style.padding="6px 4px 6px 2px";
			button_menu.style.cursor="pointer";
			button_menu.style.whiteSpace="nowrap"
				
			var third="▼"
			if(typeof obj_m === "undefined" || obj_m.length===0){
				third=""
			}
			
			this.Menu_items_sub(button_menu,"Vid",null,"Pic",null,third)		
			this.Menu_2(button_menu,obj_1,1)  // 17 Oct, 2015 
			this.Menu_2(button_menu,obj_2,2)	
			this.Menu_2(button_menu,obj_m,3)	

			if(obj.length>0){
				for(var i=0;i<obj.length;i++){
				if(obj[i].tit=="separator"){
							this.separator_item(button_menu)
						}else{
							this.Menu_items(button_menu,obj[i].tit,obj[i].func,obj[i].tip,obj[i].bg)
						}
				}
			}
			elem.appendChild(button_menu); 
	},
	
	Menu_items: function (elem,text,func,tip,bg){	         
		var menu_item =document.createElement('div');
		menu_item.className="menu_item_2 my_div_JS";
		menu_item.style.color= "#E7E7E7"; menu_item.style.fontWeight="700";
		menu_item.style.fontSize="10px"; menu_item.style.cursor="pointer";menu_item.style.textAlign="center"
		menu_item.style.border="1px solid #9C9C9C"; menu_item.style.borderRadius="4px";
		var bg_back = bckg_but
		if(bg ==="green"){
			menu_item.style.background=bckg_green
			bg_back = bckg_green
		}else	if(bg ==="blue"){			
			menu_item.style.background=bckg_blue
			bg_back = bckg_blue
		}else	if(bg ==="blue2"){			
			menu_item.style.background=bckg_blue2
			bg_back = bckg_blue2			
		}else	if(bg ==="viol"){			
			menu_item.style.background=bckg_viol
			bg_back = bckg_viol			
		}else{
			bg=bckg_but
			menu_item.style.background= bckg_but //bckg_item
		}
		menu_item.innerHTML=text.substr(0,14);
		menu_item.style.margin="3px 2px 5px 3px"; //menu_item.style.maxWidth="60px";
		menu_item.style.padding="1px 1px 4px 1px"; 
		menu_item.style.boxSizing="content-box";
		menu_item.title=tip;
		menu_item.onmousedown = function(e){e.preventDefault();} //prevent deselect
		menu_item.onclick = function(event){ 
				event.stopPropagation();
				menu_item.style.background=bckg_press
				setTimeout(function(){menu_item.style.background=bg_back}, 200);
				if(typeof func==="function")func()
				if(typeof func==="string")eval(func)
			}
		elem.appendChild(menu_item)
	},	
	
	first_submenu:null,
	
	Menu_items_sub: function (elem,text1,func1,text2,func2,text3,func3){
		var menu_item =document.createElement('div');
		menu_item.className="menu_item first_submenu";
		menu_item.style.color= "#E7E7E7"; 		
		menu_item.style.fontWeight="700";
		//menu_item.style.fontFamily="Segoe UI";// Tahoma
		menu_item.style.fontFamily="Verdana";
		menu_item.style.fontSize="10px"; menu_item.style.cursor="pointer";
		menu_item.style.textAlign="center";
		menu_item.style.boxSizing="content-box";
		
		this.first_submenu=menu_item
		if(text3=="")var only2="only2";
		
		if(text1=="Vid")menu_item=this.add_menu_sub_item(menu_item,"Vid", null, only2)
		
		if(text2=="Pic")menu_item=this.add_menu_sub_item(menu_item,"Pic", null, only2)
		if(text3=="▼"){
			menu_item=this.add_menu_sub_item(menu_item,"&nbsp;▼&nbsp;", null)
		}else if(text3){
			menu_item=this.add_menu_sub_item(menu_item,text3,func3)
		}
		
		elem.appendChild(menu_item)
	},		
		
	add_menu_sub_item: function(elem,text,func,only2){
		var menu_sub_item =document.createElement('span');
		menu_sub_item.className="menu_sub_item my_div_JS";	
		menu_sub_item.id=text;
		if(text==="Pic"){
			menu_sub_item.id="SubMenu2"
		}else if(text==="Vid"){
			menu_sub_item.id="SubMenu1"
		}else{
			menu_sub_item.id="SubMenu3"
		}
		menu_sub_item.style.display="inline-block";
		var bg_back = bckg_but2

		menu_sub_item.style.background= bckg_but2 //bckg_item;
		
		menu_sub_item.style.border="1px solid #8E8E8E"; menu_sub_item.style.borderRadius="3px";		
		menu_sub_item.style.margin="1px 1px";
		menu_sub_item.style.padding="0px 6px 1px"; 
		menu_sub_item.style.fontWeight="700";
		menu_sub_item.style.fontFamily="Verdana";menu_sub_item.style.fontSize="10px";
		menu_sub_item.style.boxSizing="content-box";	
		menu_sub_item.style.minWidth="12px";
		if(typeof only2!=="undefined" && only2!==""){
			menu_sub_item.style.width="31px";
		}
		menu_sub_item.title="";
		menu_sub_item.innerHTML=text.substr(0,14);
		menu_sub_item.onmousedown = function(e){e.preventDefault();} //prevent deselect
		menu_sub_item.onclick = function(event){ 
					event.stopPropagation(); 
					if(text!="nic"){
						menu_sub_item.style.background=bckg_press
						setTimeout(function(){menu_sub_item.style.background=bg_back}, 200)
					};						
					if(typeof func==="function")func(); 
					if(typeof func==="string")eval(func)
				}
		elem.appendChild(menu_sub_item)
		return elem
	},		
	
	Menu_2: function(elem,obj,j){
	 		var button_menu =document.createElement('div');
			button_menu.id="add_button_menu_2_"+j;button_menu.className="add_button_menu_2 my_div_JS";
			button_menu.style.position="absolute";//relative absolute
			button_menu.style.top="25px";button_menu.style.right="4px";
			button_menu.style.zIndex="112300000"; 
			button_menu.style.background=bckg2 
			button_menu.style.padding= "6px 8px 6px 0px" ;
			button_menu.style.borderRadius="8px";button_menu.style.border="2px solid #9C9C9C";
			button_menu.style.color= "#F1F1F1"; 
			button_menu.style.fontWeight="700";
			button_menu.style.fontSize="10px";  button_menu.style.textShadow="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
			button_menu.style.fontFamily="Verdana"
			button_menu.style.minWidth="120px";
			button_menu.style.boxSizing="content-box";
			button_menu.style.margin="2px";button_menu.style.padding="8px 8px 8px 7px";
			button_menu.style.cursor="pointer";		

			if(obj.length>0){
				for(var i=0;i<obj.length;i++){
					if(obj[i].tit=="separator"){
						this.separator_item(button_menu)
					}else
					this.Menu_2_items(button_menu,obj[i].tit,obj[i].func,obj[i].tip,obj[i].bg)
				}
			}   

			if(j===3){
				this.Menu_2_items(button_menu,"Exit",() => {document.body.removeChild(X_Button.Bbutton)},"Exit")
			}
			this.first_submenu.appendChild(button_menu); 					
	},
	
	Menu_2_items: function(elem,text,func,tip,bg){
		var menu_item =document.createElement('div');
		menu_item.className="menu_2_item my_div_JS";
		menu_item.style.color= "#E7E7E7"; menu_item.style.fontWeight="700";
		menu_item.style.fontSize="10px"; menu_item.style.cursor="pointer";menu_item.style.textAlign="center"
		menu_item.style.border="1px solid #9C9C9C"; menu_item.style.borderRadius="4px";
	
		var bg_back = bckg_but
		if(bg ==="green"){
			menu_item.style.background=bckg_green
			bg_back = bckg_green
		}else	if(bg ==="blue"){			
			menu_item.style.background=bckg_blue
			bg_back = bckg_blue
		}else	if(bg ==="blue2"){			
			menu_item.style.background=bckg_blue2
			bg_back = bckg_blue2	
		}else	if(bg ==="viol"){			
			menu_item.style.background=bckg_viol
			bg_back = bckg_viol		
		}else{
			bg=bckg_but
			menu_item.style.background= bckg_but //bckg_item
		}

		menu_item.innerHTML=text.substr(0,50);
		menu_item.style.whiteSpace="nowrap"		
		menu_item.style.margin="3px 2px 5px 3px";
		menu_item.style.padding="0px 16px 3px 16px"; 
		menu_item.title=tip;
		menu_item.style.boxSizing="content-box";
		menu_item.onmousedown = function(e){e.preventDefault();} //prevent deselect
		menu_item.onclick = function(event){
					event.stopPropagation();
					menu_item.style.background=bckg_press
					setTimeout(function(){menu_item.style.background=bg_back}, 200);					
					if(typeof func==="function")func()
					if(typeof func==="string")eval(func)
				}
		elem.appendChild(menu_item)	
	},
	//
	separator_item: function(elem){
		var sep =document.createElement('div');
		sep.style.border="1px solid #9C9C9C"; sep.style.borderRadius="4px";
		sep.style.background="#203556" 
		sep.style.margin="7px 3px 7px 3px"; 
		sep.style.height="3px";
		elem.appendChild(sep)
	},

 	add_CSS: function(text){ //for firefox
				var style = document.createElement("style");
				style.appendChild(document.createTextNode(text));
				document.getElementsByTagName('head')[0].appendChild(style)
	}
}

window.X_Button=X_Button
window.X_Button=X_Button

