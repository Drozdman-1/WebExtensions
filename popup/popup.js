
document.addEventListener('DOMContentLoaded', load_button_names );

function load_button_names(){
	browser.storage.local.get().then(data => {
		document.querySelector("#archive_1").innerHTML= data["archive_files"]["name_1"] || "archive_1";
		document.querySelector("#archive_2").innerHTML= data["archive_files"]["name_2"] || "archive_2";
		document.querySelector("#archive_3").innerHTML= data["archive_files"]["name_3"] || "archive_3";
	},onError)	
} 


document.querySelector("#settings").addEventListener('click',function(){
	browser.runtime.openOptionsPage();
	window.close()
});

document.querySelector("#help").addEventListener('click',() => { browser.tabs.create({url: 'help.html'}).then(() => { window.close()}) ;})

document.querySelector("#scratchpad").addEventListener('click',scratchpadOpen)

document.querySelector("#save_text_html").addEventListener('click', Save_text_)

function Save_text_(){
	browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
		const sending = browser.tabs.sendMessage(tabs[0].id, {command: "get_host"})
		sending.then(Save_text_data, onError);
	})
}

function Save_text_data(message){
	browser.storage.local.get("hosts").then((obj) =>{
		let host = message.hostname
		let host0 = "<all>";		
		if(typeof obj["hosts"][host] !== "undefined" && obj["hosts"][host]["selector"] !== ""){
			var selector = obj["hosts"][host]["selector"];
			var del = obj["hosts"][host]["del"];
		}else{
			var selector = obj["hosts"][host0]["selector"];
			var del = obj["hosts"][host0]["del"];
		}
		
    browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
			browser.tabs.sendMessage(tabs[0].id, {
				command: "save_html_data",
				selector: selector,
				del: del
			})
		})
		
	},onError).then(() => { window.close();});
}


document.querySelector("#JS_script").addEventListener('click', JS_User_script)
document.querySelector("#X-button").addEventListener('click', X_button)
document.querySelector("#sidebarOpen").addEventListener('click', sidebarOpen)

if(document.querySelector("#archive_1")){
	document.querySelector("#archive_1").addEventListener('click', ArchiveTextInit)
}

if(document.querySelector("#archive_2")){
	document.querySelector("#archive_2").addEventListener('click', ArchiveTextInit)
}

if(document.querySelector("#archive_3")){
	document.querySelector("#archive_3").addEventListener('click', ArchiveTextInit)
}

 
[].forEach.call(document.querySelectorAll('#archive_1, #archive_2, #archive_3'), function(elem){
	elem.addEventListener('contextmenu',archive_add)//mousedown
}); 


if(document.querySelector("#CSS_style")){
	document.querySelector("#CSS_style").addEventListener('click', CSS_style_)
}

if(document.querySelector("#blue_button")){
	document.querySelector("#blue_button").addEventListener('click', ArchiveTextInit)
}



function JS_User_script(){
	browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
		const sending = browser.tabs.sendMessage(tabs[0].id, {command: "get_host"})
		sending.then(JS_User_exec, onError);
	})	
}

function JS_User_exec(message){
	browser.storage.local.get("hosts").then((obj) =>{
		let host = message.hostname
		let host0 = "<all>";
		console.log('*** JS_User_exec',message) 
		if(typeof obj["hosts"][host] !== "undefined" && typeof obj["hosts"][host]["JS"] !== "undefined" && obj["hosts"][host]["JS"] !==""){
			var js = obj["hosts"][host]["JS"];
		}else{
			var js = obj["hosts"][host0]["JS"];
		}
		
		browser.runtime.sendMessage({command: "run_JS", script: js})
		
		/* 
    browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
			browser.tabs.sendMessage(tabs[0].id, {
				command: "script_eval",
				script: js
				})
		})
		 */
	},onError)	
}



function CSS_style_(){
	browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
		const sending = browser.tabs.sendMessage(tabs[0].id, {command: "get_host"})
		sending.then(CSS_apply, onError);
	})	
}

function CSS_apply(message){
	browser.storage.local.get("hosts").then((obj) =>{
		return obj;
	}).then(obj => {
		browser.storage.session.get().then(data_sess => {
			if(typeof data_sess.init === "undefined"){
				data_sess = {
					init: true
				};
				browser.storage.session.set(data_sess);
			}
			let host = message.hostname
			let href = message.href
			let host0 = "<all>";
			if(typeof obj["hosts"][host] !== "undefined" && typeof obj["hosts"][host]["CSS"] !== "undefined" && obj["hosts"][host]["CSS"] !==""){
				var css_ = obj["hosts"][host]["CSS"];
			}else{
				var css_ = obj["hosts"][host0]["CSS"];
			}

			if(!data_sess[href] || data_sess[href]==false){
				browser.tabs.insertCSS({code: css_})
				data_sess[href] = true			
			}else{
				browser.tabs.removeCSS({code: css_})
				data_sess[href] = false
			}
			
			browser.storage.session.set(data_sess);

		}, onError);
	})
}


function X_button(){
	browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
		browser.tabs.sendMessage(tabs[0].id, {command: "x_button"})
		window.close()
	})
}

function sidebarOpen(){
	browser.sidebarAction.toggle();	
} 

function ArchiveTextInit(e){
	let which=this.id  ;//archive_1
	let tags = tags_selected()
	var type,type_2;
		
	if(e.shiftKey){// no links		
		browser.storage.local.get().then(data => {
			let links=data["archive_opt"]["links"]
			let obj = data["archive_opt"];			
			browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
				browser.tabs.sendMessage(tabs[0].id, {command: "archive_text_init", which: which, tags: tags, type: "", type_2: obj, links: "none"})
			}).then(() => {	window.close();});
		})
	
	}else if(e.altKey){	
		open_archive_file(which)
		
	}else if(e.ctrlKey){	
		browser.storage.local.get().then(data => {
			let links=data["archive_opt"]["links"]
			let obj = data["archive_opt"];			
			browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
				browser.tabs.sendMessage(tabs[0].id, {command: "archive_text_init", which: which, tags: tags, type: "add_sep", type_2: obj, links: links})
			}).then(() => {	window.close();});
		})
		
	}else{	
		browser.storage.local.get().then(data => {
			let links=data["archive_opt"]["links"];
			let obj = data["archive_opt"];			
			browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
				browser.tabs.sendMessage(tabs[0].id, {command: "archive_text_init", which: which, tags: tags, type: "", type_2: obj , links: links})
			}).then(() => {	window.close();});
		})		
	}
	
} 

function archive_add(e){
	e.preventDefault()
	let which=this.id;
	var type,type_2;
	
	if(e.altKey){ //open file
		open_archive_file(which)

	}else if(e.ctrlKey){		
		browser.storage.local.get().then(data => {
			let links=data["archive_opt"]["links"];
			let obj = data["archive_opt"];			
			browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
				browser.tabs.sendMessage(tabs[0].id, {command: "archive_text_init", which: which, tags: "", type: "add_sep", type_2: obj , links: links})
			}).then(() => {	window.close();});
		})
		
	}else if(e.shiftKey){ //no links			 
		browser.storage.local.get().then(data => {
			let obj = data["archive_opt"];			
			browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
				browser.tabs.sendMessage(tabs[0].id, {command: "archive_text_init", which: which, tags: "", type: "add", type_2: obj , links: "none"})
			}).then(() => {	window.close();});
		})
		
	}else{	
		browser.storage.local.get().then(data => {
			let links=data["archive_opt"]["links"];
			let obj = data["archive_opt"];			
			browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
				browser.tabs.sendMessage(tabs[0].id, {command: "archive_text_init", which: which, tags: "", type: "add", type_2: obj , links: links})
			}).then(() => {	window.close();}); 
		})
	}
} 


function tags_selected(){
	let options = Array.from(document.querySelectorAll('select.tags option'));
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
} 


const open_archive_file = function(which){ 
	browser.storage.local.get().then(data => {
		var filepath
		switch (which){
		case "archive_1":
			filepath = data["archive_files"]["file_1"];
			break;
		case "archive_2":
			filepath = data["archive_files"]["file_2"];
			break;
		case "archive_3":
			filepath = data["archive_files"]["file_3"];
			break;
		}
		browser.runtime.sendMessage({command: "open_file_init", filepath: filepath})
	})
}


document.querySelector("#ping_test").addEventListener('click', pingTest0)
document.addEventListener('DOMContentLoaded', pingTest);

function pingTest0(){
	let con=document.querySelector("#ping_test")
	con.classList.remove("circleRed");
	con.classList.remove("circleGreen")	;
	setTimeout(() => pingTest(), 500);
}

function pingTest(){
	browser.runtime.sendNativeMessage("Drozd_addon", {path: "", text: "", ping: "ping"})
  .then((response) => {
		console.log("pop response from Py", response);
		let con=document.querySelector("#ping_test")
		con.classList.remove("circleRed")
		con.classList.add("circleGreen")
		con.setAttribute("title","Connected to external program. Archiving text enabled")
  },(error) => {
		let con=document.querySelector("#ping_test")
		con.classList.add("circleRed")
		con.classList.remove("circleGreen")
		con.setAttribute("title","Connection to external program failed. ")	
		console.log("pop response from Py", error);		
  });
} 

document.querySelector("#reset_scroll").addEventListener('click', scroll_top_select)
document.querySelector("#reset_tags").addEventListener('click', reset_tags)

function scroll_top_select(){
	let s1 = document.querySelector("#tags1 option");
	let s2 = document.querySelector("#tags2 option");
	let s3 = document.querySelector("#tags3 option");
	s1.scrollIntoView();
	s2.scrollIntoView();
	s3.scrollIntoView();
} 

function reset_tags(){
	let options = Array.from(document.querySelectorAll('select.tags option'));
	options.forEach(function(el){
		el.selected=false
	})
} 

function onError(error){
  console.error(`Error: ${error}`);
}


function scratchpadOpen(){
  let popupURL = browser.extension.getURL("scratchpad/Scratchpad.html");

  let creating = browser.windows.create({
    url: popupURL,
    type: "popup",
		titlePreface: "Scratchpad. JS, CSS",
    height: 700,
    width: 630,
		left: 725,
		top: 200
  });
  creating.then(onCreated, onError);
} 

function onCreated(windowInfo) {
  //console.log(`Created window: ${windowInfo.id}`);
}


function a1(txt){
  browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, {
      command: "my_alert",
      text: txt
    })
  })
}

