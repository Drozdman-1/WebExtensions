
var Add_buttons = {
	//tags_end:true,
	tags_end:false,
	bckg_but: "linear-gradient(0deg,  #5b0213 0%,#76031a 28%,#a70021 55%,#76031a 75%,#5b0213 100%)",
	bckg_red: "linear-gradient(0deg,  #5b0213 0%,#76031a 28%,#a70021 55%,#76031a 75%,#5b0213 100%)",
	bckg_green: "linear-gradient(0deg,  #003110 0%,#004817 25%,#036C24 55%,#004817 75%,#003110 100%)",
	bckg_green2: "linear-gradient(0deg,  #003110 0%,#004817 25%,#057228 55%,#004817 75%,#003110 100%)",
	bckg_blue: "linear-gradient(0deg,  #001929 0%,#003152 25%,#0A4F7C 55%,#003152 75%,#001929 100%)",
	bckg_blue2: "linear-gradient(0deg,  #041B4A 0%,#102A5E 25%,#223E76 55%,#102A5E 75%,#041B4A 100%)",
	bckg_blue3: "linear-gradient(0deg,  #001929 0%,#003152 25%,#145683 55%,#003152 75%,#001929 100%)",
	bckg_black: "linear-gradient(0deg,  #001D30 0%,#292B2C 25%,#394750 55%,#292B2C 75%,#001D30 100%)"	,
	bckg2: "linear-gradient(0deg, #0f1623 0%,#324254 18%,#0f1623 35%,#2a3749 52%,#0f1623 66%,#324254 81%,#0f1623 100%)",
	bckg_viol: "linear-gradient(0deg,  #38003A 0%,#5A0B5C 25%,#7D0981 55%,#5A0B5C 75%,#38003A 100%)",
	bckg_press: "linear-gradient(0deg, #1B283C, #001D30, #1B283C)",

	Bbutton: document.createElement('div'),
	
	init: function(x, y, bg, obj1, obj2, obj3, tags_){
		if(document.querySelector("#Add_buttons_1"))return
		//var func1a = f1a[0], title1a = f1a[1];
		//var func1b = f1b[0], title1b = f1b[1];
		var func1 = obj1[0]["func"], title1 = obj1[0]["tit"];
		var func2 = obj2[0]["func"], title2 = obj2[0]["tit"];
		var func3 = obj3[0]["func"], title3 = obj3[0]["tit"];
		Add_buttons.tag1 = obj1[0]["tag"]; Add_buttons.tag2 = obj2[0]["tag"]; Add_buttons.tag3 = obj3[0]["tag"]
		Add_buttons.tag1 = "•" + Add_buttons.tag1 + "•";
		Add_buttons.tag2 = "•" + Add_buttons.tag2 + "•";
		Add_buttons.tag3 = "•" + Add_buttons.tag3 + "•";
		
		//console.log('*** Add_buttons.tag ',Add_buttons.tag1,Add_buttons.tag2,Add_buttons.tag3) 
		var func1_add = obj1[1]["func"]; var func1_add_url = obj1[2]["func"];
		var func2_add = obj2[1]["func"]; var func2_add_url = obj1[2]["func"];
		var func3_add = obj3[1]["func"]; var func3_add_url = obj1[2]["func"];
		
		var text1="&#10102" //"❶"; 
		var text2="&#10103"//"❷";					
		var text3="&#10104"//"❸"; 
		var text4="&#10065" //"❑" 		
		//var text4="&#10105" //"❹"; 	
		//var text5="&#10106" //"❺"; 
		var button_ =document.createElement('div');
		this.Bbutton = button_;
		button_.id="Add_buttons_1";
		button_.style.position="fixed";button_.style.top="140px";button_.style.left="30px";
		button_.style.zIndex="99999999";
		button_.style.background= "linear-gradient(90deg, #691616 10%, #AF2525 40%,  #6D0000 80%, #691616 100%)"//red
		button_.style.padding= "2px 4px 3px 2px";
		button_.style.padding= "4px 4px 7px 4px";
		button_.style.borderRadius="4px";
		button_.style.width="20px"; 
		button_.style.margin="2px"; 
		button_.style.fontSize="14px";  button_.style.color="#E7E7E7";
		button_.style.cursor="pointer"; button_.style.boxSizing="content-box";
		button_.style.lineHeight="1em"; button_.style.border='2px outset #000';
		button_.style.fontFamily="Tahoma";  button_.style.fontWeight='700';
		button_.style.top=y+"px";button_.style.left=x+"px";
		
		button_.onmousedown = function(e){e.preventDefault();} //prevent deselect
		
		if(bg){ 
			if(bg==="red"){
				bg = "linear-gradient(90deg, #691616 10%, #AF2525 40%,  #6D0000 80%, #691616 100%)"//red
			}else if(bg==="green"){
				bg = "linear-gradient(90deg,  #003110 0%,#004817 25%,#057228 55%,#004817 75%,#003110 100%)"
			}else if(bg==="blue"){
				bg = "linear-gradient(90deg,  #001929 0%,#003152 25%,#145683 55%,#003152 75%,#001929 100%)"
			}else if(bg==="viol"){
				bg ="linear-gradient(90deg,  #38003A 0%,#5A0B5C 25%,#7D0981 55%,#5A0B5C 75%,#38003A 100%)"
			}else if(bg==="black"){
				bg = "linear-gradient(90deg,  #121313 0%,#292B2C 25%,#4E5355 55%,#292B2C 75%,#121313 100%)"
			}
			button_.style.background= bg
		}		
/* 
		var el_1a=document.createElement('div'); 
		el_1a.innerHTML="❑" 
		el_1a.style.padding= "0px 1px 4px 4px";el_1a.style.fontSize= "14px";el_1a.style.fontFamily= "Tahoma";
		
		if(func1a!==null && title1a!==""){
			button_.appendChild(el_1a);
		}	 */
		
		var el_1=document.createElement('div'); el_1.innerHTML=text1; //"&#10102" //"❶"; 
		el_1.style.fontSize= "14px";el_1.style.fontFamily= "Tahoma";
		el_1.style.padding= "2px 0px 2px 0px";
		el_1.style.margin= "4px 0px 2px 1px";
		
		var el_2=el_1.cloneNode(true); el_2.innerHTML=text2; //"&#10103"//"❷";					
		var el_3=el_1.cloneNode(true); el_3.innerHTML=text3; //"&#10104"//"❸";
		var el_4=el_1.cloneNode(true); el_4.innerHTML=text4; //"&#10105" //"❹"; 
		el_4.style.fontSize="20px"
		el_4.style.margin= "2px 0px 0px 1px";
/* 		
		var el_4=el_1.cloneNode(true); el_4.innerHTML=text4; //"&#10105" //"❹"; 	
		var el_5=el_1.cloneNode(true); el_5.innerHTML=text5; //"&#10106" //"❺"; 
		el_4.style.margin= "0px 0px -1px 1px";
		el_5.style.margin= "-2px 0px 3px 1px";	
		 */
		el_1.oncontextmenu=function(e){ e.preventDefault(); if(e.target.id.includes("button"))func1_add();}
		el_2.oncontextmenu=function(e){ e.preventDefault(); if(e.target.id.includes("button"))func2_add();}
		el_3.oncontextmenu=function(e){ e.preventDefault(); if(e.target.id.includes("button"))func3_add();}
		//el_4.oncontextmenu=function(e){ e.preventDefault();}
		//el_5.oncontextmenu=function(e){ e.preventDefault();}
		
		var hr_1 =document.createElement('span'); hr_1.style.color="#E7E7E7";hr_1.style.fontSize="6px";
		hr_1.style.margin= "-14px 2px -14px 2px "; hr_1.style.padding="0px 0px 0px 0px "

		hr_1.innerHTML="———"//&nbsp;
		
		/* 
		var el_1b=el_1a.cloneNode(true); 
		el_1b.innerHTML="✖";
		el_1b.style.margin="2px 0px -8px";
		el_1b.style.fontSize= "12px";el_1b.style.padding= "0px 1px 4px 5px"		
		button_.appendChild(el_1b);
			
		if(typeof func1b!="undefined"){
			if (func1b=="del"){
				el_1b.addEventListener('click',function(event){button_.remove()},false);
				el_1b.title="Exit"
			}else{
				el_1b.addEventListener('click',function(event){func1b()},false);
				el_1b.title=title1b
			}
		}
		button_.appendChild(hr_1);
 */
		
				
		el_1.id = "button1";
		el_2.id = "button2";
		el_3.id = "button3";
		el_4.id = "button4";
		
		this.Menu_2(el_1,obj1,1)
		this.Menu_2(el_2,obj2,2)
		this.Menu_2(el_3,obj3,3)
		
		this.tags_div(el_4, obj1, obj2, obj3, tags_);	
		
		var hr_2=hr_1.cloneNode(true);
		if(typeof func1!="undefined"){
			el_1.title=el_1.title=title1
			el_1.addEventListener('click',function(e){
				if(e.ctrlKey){
					func1_add_url()
				}else if(e.shiftKey){
					func1(Add_buttons.tag1)
				}else if(e.altKey){
					func1_add()
				}else{
					func1()
				}		
			},false)
			//if(func1!=null)
			//button_.appendChild(el_1);
		}			

		
		var hr_3=hr_1.cloneNode(true);
		//button_.appendChild(hr_3);		
		
		if(typeof func2!="undefined"){
			el_2.addEventListener('click',function(e){
				if(e.ctrlKey){
					func2_add_url()
				}else if(e.shiftKey){
					func2(Add_buttons.tag2)
				}else if(e.altKey){
					func2_add()
				}else{
					func2()
				}	
			},false);  
			el_2.title=title2
			//if(func2!=null)
			//button_.appendChild(el_2);
		}		
			
			
		var hr_4=hr_1.cloneNode(true);
		//button_.appendChild(hr_4);	
		
		if(typeof func3!="undefined"){
			el_3.addEventListener('click',function(e){
				if(e.ctrlKey){
					func3_add_url()
				}else if(e.shiftKey){
					func3(Add_buttons.tag3)
				}else if(e.altKey){
					func3_add()
				}else{
					func3()
				}		
			},false);
			el_3.title=title3
			
			//if(func3!=null)
			//button_.appendChild(el_3);
		}		

		var hr_5=hr_1.cloneNode(true);
		//button_.appendChild(hr_5);	
		
		if(typeof tags_!=="undefined"){
			el_4.title="tags"
			//button_.appendChild(el_4);
		}	
	
		el_4.oncontextmenu=function(e){ 
			e.preventDefault(); 
			if(e.target.tagName==="DIV"){
				Add_buttons.scroll_top_select();
				Add_buttons.reset_tags();
			}
		}		
		
		el_4.onclick=function(e){
			//alert(e.target.tagName)
			if(e.target.tagName==="DIV"){
				Add_buttons.scroll_top_select();
				Add_buttons.reset_tags();
			}
		};	
		
		//"#E4CA81" 
		//el_4.style.color="#DDB239"
		
		if(Add_buttons.tags_end===true){
			button_.appendChild(el_1); 
			button_.appendChild(hr_3);
			button_.appendChild(el_2);
			button_.appendChild(hr_4);
			button_.appendChild(el_3);
			button_.appendChild(hr_5);
			button_.appendChild(el_4);			
		}else{			
			button_.appendChild(el_4);
			button_.appendChild(hr_5);
			
			button_.appendChild(el_1); 
			button_.appendChild(hr_3);
			button_.appendChild(el_2);
			button_.appendChild(hr_4);
			button_.appendChild(el_3);
		}
			
		
		if(window.parent==window)
			document.body.appendChild(button_);	

		Add_buttons.multi_selection()
		
		this.add_CSS(`#Add_buttons_1 #button1 #Add_buttons_menu_1{visibility:hidden; opacity:0;  transition:visibility 0s ease-out 0.3s,opacity 0.3s ease-out;transition-delay:0.2s;}
		#Add_buttons_1 #button1:hover #Add_buttons_menu_1,#Add_buttons_menu_1:hover{visibility:visible;opacity:1;transition-delay:0.1s;}`)

		this.add_CSS(`#Add_buttons_1 #button2 #Add_buttons_menu_2{visibility:hidden; opacity:0;  transition:visibility 0s ease-out 0.3s,opacity 0.3s ease-out;transition-delay:0.2s;}
		#Add_buttons_1 #button2:hover #Add_buttons_menu_2,#Add_buttons_menu_2:hover{visibility:visible;opacity:1;transition-delay:0.1s;}`)

		this.add_CSS(`#Add_buttons_1 #button3 #Add_buttons_menu_3{visibility:hidden; opacity:0;  transition:visibility 0s ease-out 0.3s,opacity 0.3s ease-out;transition-delay:0.2s;}
		#Add_buttons_1 #button3:hover #Add_buttons_menu_3,#Add_buttons_menu_3:hover{visibility:visible;opacity:1;transition-delay:0.1s;}`)

		this.add_CSS(`#Add_buttons_1 #button4 #tags_div{visibility:hidden; opacity:0;  transition:visibility 0s ease-out 0.3s,opacity 0.3s ease-out;transition-delay:0.2s;}
		#Add_buttons_1 #button4:hover #tags_div,#tags_div:hover{visibility:visible;opacity:1;transition-delay:0.2s;}`)

		this.add_CSS(	`#tags_div{padding:14px !important}select.tags{width:81px;	margin:0px 1px;}
		select{background-color:#272D37;}
		select option{color:#F0F0F0;	font-size: 12px; }
		option:checked {background: #900000;color:#F0ED91;}
		select:nth-of-type(2){margin:0px 6px !important;}
		.tags_div_butt:nth-of-type(2){margin:6px 6px !important;}
		option[value="✔"] {  font-size: 0.70em; }
		`)
		
	},
	
	Menu_2: function(elem,obj,j){
		var button_menu =document.createElement('div');
		button_menu.id="Add_buttons_menu_"+j;button_menu.className="Add_buttons_menu";
		button_menu.style.position="absolute";//relative absolute
		var top,left;
		left = "26px";
		if(j===1){
			top = "-50px" ; //top = "0px" ; 
			if(Add_buttons.tags_end===false)top = "-17px"
		}else if(j===2){
			top = "-10px" ; //top = "30px" ; 
			if(Add_buttons.tags_end===false)top = "23px"
		}else{
			top = "30px" ; //top = "70px" ; 
			if(Add_buttons.tags_end===false)top = "63px"
		}
		
		button_menu.style.top = top;
		button_menu.style.left = left; 
		
		//button_menu.style.top="20px";		button_menu.style.left="20px"; 
		
		button_menu.style.zIndex="999999999"; 
		button_menu.style.background=this.bckg2
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
				}else{
					var funcMenu = (typeof obj[i]["funcMenu"]==="undefined") ? "" : obj[i]["funcMenu"]
					let tag_ = "tag" + j;
					let tag = Add_buttons[tag_]
					this.Menu_2_items(button_menu,obj[i].tit,obj[i].func,obj[i].tip,obj[i].bg, funcMenu, tag)
				}
			}
		}
	
		if(j===3){
			this.Menu_2_items(button_menu, "Exit", () => {Add_buttons.Bbutton.remove()},"", "viol")
		}			
		elem.appendChild(button_menu); 				
	},

	Menu_2_items: function(elem,text,func,tip,bg,funcMenu,tag){
		var menu_item =document.createElement('div');
		menu_item.className="menu_2_item my_div_JS";
		menu_item.style.color= "#E7E7E7"; menu_item.style.fontWeight="700";
		menu_item.style.fontSize="10px"; menu_item.style.cursor="pointer";menu_item.style.textAlign="center"
		menu_item.style.border="1px solid #9C9C9C"; menu_item.style.borderRadius="4px";
		
		var bg_back = this.bckg_but
		if(bg ==="green"){
			menu_item.style.background=this.bckg_green
			bg_back = this.bckg_green
		}else	if(bg ==="blue"){			
			menu_item.style.background=this.bckg_blue
			bg_back = this.bckg_blue
		}else	if(bg ==="blue2"){			
			menu_item.style.background=this.bckg_blue2
			bg_back = this.bckg_blue2	
		}else	if(bg ==="blue3"){			
			menu_item.style.background=this.bckg_blue3
			bg_back = this.bckg_blue3				
		}else	if(bg ==="viol"){			
			menu_item.style.background=this.bckg_viol
			bg_back = this.bckg_viol	
		}else	if(bg ==="black"){			
			menu_item.style.background=this.bckg_black
			bg_back = this.bckg_black				
		}else{
			bg=this.bckg_but
			menu_item.style.background= this.bckg_but
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
				menu_item.style.background=this.bckg_press
				setTimeout(function(){menu_item.style.background=bg_back}, 200);					
				if(typeof func==="function")func()
				if(typeof func==="string")eval(func)
			}

		if(funcMenu){
			menu_item.oncontextmenu=function(e){ e.preventDefault();e.stopPropagation();console.log(funcMenu); funcMenu(tag);}
		}

		elem.appendChild(menu_item)	
	},

	separator_item: function(elem){
		var sep =document.createElement('div');
		sep.style.border="1px solid #9C9C9C"; sep.style.borderRadius="4px";
		sep.style.background="#203556"
		sep.style.margin="7px 3px 7px 3px"; 
		sep.style.height="3px";
		elem.appendChild(sep)
	},

	add_CSS: function(text){
		var style = document.createElement("style");
		style.appendChild(document.createTextNode(text));
		document.getElementsByTagName('head')[0].appendChild(style)
	},

	tags_div: function(elem, obj1, obj2, obj3, tags_){
		func1 = obj1[0]["func"], title1 = obj1[0]["tit"];
		func2 = obj2[0]["func"], title2 = obj2[0]["tit"];
		func3 = obj3[0]["func"], title3 = obj3[0]["tit"];
		
		if(typeof tags_!=="object")return
		
		tags_1 = tags_["tags1"]; tags_2 = tags_["tags2"];tags_3 = tags_["tags3"];
		max_rows = tags_["max_rows"]
		var tag_div =document.createElement('div');
		tag_div.id="tags_div"; tag_div.className="tags_div";
		tag_div.style.position="absolute";
		var top,left;
		if(Add_buttons.tags_end===true){
			top = "30px"; left = "26px";
		}else{
			top = "-80px"; left = "26px";
		}
		tag_div.style.padding="14px"
		tag_div.style.display="inline-block"

		tag_div.style.width = "260px"
		tag_div.style.top = top;
		tag_div.style.left = left; 
	
		tag_div.style.top = top;
		tag_div.style.left = left; 		
		tag_div.style.zIndex="999999999"; 
		tag_div.style.background="linear-gradient(0deg, #150F25,  #3F4F6A 50%,  #150F25)";
		tag_div.style.padding= "6px 8px 6px 0px" ;
		tag_div.style.borderRadius="8px";tag_div.style.border="2px solid #9C9C9C";
		tag_div.style.color= "#F1F1F1"; 
		tag_div.style.fontWeight="700";
		tag_div.style.fontSize="10px";  tag_div.style.textShadow="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
		tag_div.style.fontFamily="Verdana"
		tag_div.style.minWidth="120px";
		tag_div.style.boxSizing="content-box";
		tag_div.style.margin="2px";tag_div.style.padding="8px 8px 8px 7px";
		tag_div.style.cursor="pointer";

		var sel_ = document.createElement('select');
		sel_.name="tags"; sel_.id ="tags1" ; sel_.className ="tags";sel_.size=8
		sel_.setAttribute("multiple",true)
		tag_div.appendChild(sel_);		
		
		var sel_2=sel_.cloneNode(true);
		sel_2.name="tags2"; sel_.id ="tags2" ; sel_.className ="tags";
		var sel_3=sel_.cloneNode(true);
		sel_.name="tags3"; sel_.id ="tags3" ; sel_.className ="tags";

		tag_div.appendChild(sel_2); 	
		tag_div.appendChild(sel_3); 
		
		var butt1 = document.createElement('button');
		tag_div.className="tags_div_butt";
		butt1.style.background="linear-gradient(0deg,  #001929 0%,#003152 25%,#145683 55%,#003152 75%,#001929 100%"
		butt1.innerHTML=title1
		butt1.style.width= "80px";
		butt1.style.color= "#E7E7E7"; butt1.style.font="700 11px/1.0em Tahoma"; 
		butt1.style.margin= "10px 2px 0px 2px"; butt1.style.padding="6px";
		butt1.style.cursor= "pointer";

		var butt2=butt1.cloneNode(true);
		butt2.innerHTML=title2
		butt2.id="className2"
		butt2.style.margin= "2px 6px 0px 6px"
		var butt3=butt1.cloneNode(true);
		butt3.innerHTML=title3
		
		butt1.onclick=function(e){
			var tags=Add_buttons.tags_selected()
			func1(tags)
			Add_buttons.scroll_top_select();
			Add_buttons.reset_tags();
		};
		
		butt2.onclick=function(e){
			var tags=Add_buttons.tags_selected()
			func2(tags);
			Add_buttons.scroll_top_select();
			Add_buttons.reset_tags();
		};
		
		butt3.onclick=function(e){
			var tags=Add_buttons.tags_selected()
			func3(tags);
			Add_buttons.scroll_top_select();
			Add_buttons.reset_tags();
		};
						
		tag_div.appendChild(butt1);
		tag_div.appendChild(butt2);
		tag_div.appendChild(butt3);
		
		//var max_rows = 8;
		let len = Math.max(tags_1.length,tags_2.length,tags_3.length)
		if(len>max_rows){
			var len2=max_rows;
		}else{
			var len2=len
		}
		sel_.size=len2
		sel_2.size=len2
		sel_3.size=len2
		
		this.tags_populate(sel_,tags_1,len)
		this.tags_populate(sel_2,tags_2,len)
		this.tags_populate(sel_3,tags_3,len)
		
		elem.appendChild(tag_div); 		
	},
	
	tags_populate: function(s,tags,len){
		//console.log('*** tags_populate',len, tags) 
		for(let i=0; i<len; i++){
			val = tags[i]
			if(typeof val !== "undefined"){
				s[i] = new Option(val, val, false, false); 	
			}else{
				s[i] = new Option("", "", false, false); 
			}			
		}
		//console.log('*** s1.size',len, s1.size,s1.size,s3.size) 
	},

	tags_selected: function(){
		let options = Array.from(document.querySelectorAll('#tags_div select.tags option'));
		if(!options)return ""
		var tags=""
		options.forEach(function(el){
			if(el.selected){
				if (el.value !== "---"){//separator
					if(el.value !== "✔" && !el.value.includes("!!")){
						tags= tags + " " + "•" + el.value + "•"
					}else{
						tags= el.value + " " + tags
					}
				}
			}
		})
		tags= tags + " ";
		return tags
	},
	
	multi_selection: function(){
		let options = Array.from(document.querySelectorAll('#tags_div select.tags option')); 
		options.forEach(function(el){ // multi-selection
			el.addEventListener("mousedown", 
				function(e){
					e.preventDefault();
					if (this.value !== "" && this.value !== "---"){//separator
						this.selected = !this.selected;
					}
					return false;
				}, false);
		});
	},
	
	scroll_top_select: function(){
		let s1 = document.querySelector("#tags_div #tags1 option");
		let s2 = document.querySelector("#tags_div #tags2 option");
		let s3 = document.querySelector("#tags_div #tags3 option");
		s1.scrollIntoView();
		s2.scrollIntoView();
		s3.scrollIntoView();
	}, 

	reset_tags: function(){
		let options = Array.from(document.querySelectorAll('#tags_div select.tags option'));
		options.forEach(function(el){
			el.selected=false
		})
	},
	
}

//===============================


function open_archive_fileB(i){
	browser.runtime.sendMessage({command: "JS_archive_open", which: i})
}

function save_archiveB(i, tag){
	browser.runtime.sendMessage({command: "JS_archive_text", which: i , tags: tag})
}


function add_archiveB(i){
	browser.runtime.sendMessage({command: "JS_archive_add", which: i})
}

function add_archive_with_urlB(i){
	browser.runtime.sendMessage({command: "JS_archive_add_url", which: i})
}

 

function exclude_hosts(host, array){
	var exl=false
	array.forEach(function(el,i){
		if(host.includes(el))
			exl=true
	})
	return exl
} 


//======================================

var arch_obj_1=[
	{
		"bg": "",
		"tit": "news", 
		"tip": "Save text to archive 1", 
		"func": save_archiveB.bind(null,1),
		"funcMenu": save_archiveB.bind(null,1),
		"tag": ""
	},
	{
		"bg": "blue",
		"tit": "Add to", 
		"tip": "Add to previous text block", 
		"func": add_archiveB.bind(null,1)
	},
	{
		"bg": "blue",
		"tit": "Add to (url)", 
		"tip": "Add to previous text block with url",
		"func": add_archive_with_urlB.bind(null,1)
	},
	{"tit": "separator"},
	{
		"bg": "black",
		"tit": "Open file 1", 
		"tip": "Open file 1", 
		"func": open_archive_fileB.bind(null,1)
	}
]


var arch_obj_2=[
	{
		"bg": "",
		"tit": "sport", 
		"tip": "Save text to archive 2", 
		"func": save_archiveB.bind(null,2),
		"funcMenu": save_archiveB.bind(null,2),
		"tag": ""
	},
	{
		"bg": "blue",
		"tit": "Add to", 
		"tip": "Add to previous text block", 
		"func": add_archiveB.bind(null,2)
	},
	{
		"bg": "blue",
		"tit": "Add to (url)", 
		"tip": "Add to previous text block with url",
		"func": add_archive_with_urlB.bind(null,2)
	},
	{"tit": "separator"},
	{
		"bg": "black",
		"tit": "Open file 2", 
		"tip": "Open file 2", 
		"func": open_archive_fileB.bind(null,2)
	}	
]


var arch_obj_3=[
	{
		"bg": "",
		"tit": "Posts", 
		"tip": "Save text to archive 3", 
		"func": save_archiveB.bind(null,3),
		"funcMenu": save_archiveB.bind(null,3),
		"tag": ""
	},
	{
		"bg": "blue",
		"tit": "Add to", 
		"tip": "Add to previous text block", 
		"func": add_archiveB.bind(null,3)
	},
	{
		"bg": "blue",
		"tit": "Add to (url)", 
		"tip": "Add to previous text block with url",
		"func": add_archive_with_urlB.bind(null,3)
	},
	{"tit": "separator"},
	{
		"bg": "black",
		"tit": "Open file 3", 
		"tip": "Open file 3", 
		"func": open_archive_fileB.bind(null,3)
	},
	{"tit": "separator"},
]

function get_tags_obj(){
	var data = window.Dr_settings
	var tags_1 = data["tags"]["tags1"]
	var tags_2 = data["tags"]["tags2"]
	var tags_3 = data["tags"]["tags3"]
	var max_rows = 8;
	if(typeof data["tags"]["max_rows"]!=="undefined"){
		max_rows = data["tags"]["max_rows"]
	}
	var tags_obj={"tags1": tags_1, "tags2": tags_2, "tags3": tags_3, "max_rows": max_rows}
	return tags_obj
} 
//======================================

const start_archive_JS_buttons = function(x, y, bg, exlusion, tag1, tag2, tag3){
	obj1=arch_obj_1; obj2=arch_obj_2; obj3=arch_obj_3;
	if(typeof tag1==="undefined") tag1="";
	if(typeof tag2==="undefined") tag2="";
	if(typeof tag3==="undefined") tag3="";

	obj1[0]["tag"] = tag1;
	obj2[0]["tag"] = tag2;
	obj3[0]["tag"] = tag3;
	
	try{
		obj1[0]["tit"] = window.Dr_arch["name_1"]
		obj2[0]["tit"] = window.Dr_arch["name_2"]
		obj3[0]["tit"] = window.Dr_arch["name_3"]
  
	}catch(err){ }
	
	tags_obj = get_tags_obj()
	
	if(typeof bg==="undefined")bg="red" 
	if(typeof exlusion==="undefined"){
		Add_buttons.init(x, y, bg, obj1, obj2, obj3, tags_obj)
	}else{
		if(!exclude_hosts(window.location.hostname, exlusion))
			Add_buttons.init(x, y, bg, obj1, obj2, obj3, tags_obj)	
	}
} 

//var exlusion = ["google","yahoo"] 

/* 
window.addEventListener('DOMContentLoaded',function(){
	//start_archive_JS_buttons(-2, 400, "red")
	//start_archive_JS_buttons(-2, 470, "red", ["google","yahoo"], "tag1", "tag2", "tag3");
}) 
 */