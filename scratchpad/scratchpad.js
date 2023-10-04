

document.addEventListener('DOMContentLoaded', update_options);
	

Array.prototype.forEach.call(document.querySelectorAll('#JS_s, #css_s'), function(elem){
	elem.addEventListener('click',save_set)
}); 

Array.prototype.forEach.call(document.querySelectorAll('#JS_l, #css_l'), function(elem){
	elem.addEventListener('click',load_set)
}); 


document.querySelector("#Run_JS").addEventListener('click', () => {
	let js = document.querySelector("#JS_edit").value;
	let del_prev = `[].forEach.call(document.querySelectorAll('.alert_elem'), function(elem){ elem.remove();});`
	js = del_prev + "\n" +js
	browser.runtime.sendMessage({command: "Scr_run_JS", script: js})
})
document.querySelector("#Apply_CSS").addEventListener('click', () => {
	let css = document.querySelector("#style1").value
	browser.runtime.sendMessage({command: "Scr_apply_CSS", style: css})
})

document.querySelector("#Remove_CSS").addEventListener('click', () => {
	browser.runtime.sendMessage({command: "Scr_remove_CSS", style: ""})
})


function update_options(){
	browser.storage.local.get().then(data => {	
		if(!data["JS"]){
			data["JS"] = `// document.querySelector("").addEventListener("click",function(){});//innerHTML;textContent;\n//$('').css({'':''}); $('').remove(); $('').css({'':''});alert_txt("txt",5000,300,100,2);\nalert();\n\n`
		}			
		if(!data["CSS"]){
			data["CSS"] = `body{border:3px solid #A00000}`
		}
		document.querySelector("#JS_edit").value=data["JS"]; 
		document.querySelector("#style1").value=data["CSS"];

	}, onError);
}



		
function save_set(){
	
	if(this.id=="JS_s"){
		let js = document.querySelector("#JS_edit").value;
		browser.storage.local.get().then(data => {
			data["JS"]=js;
			browser.storage.local.set(data);
		});
		
	}else if(this.id=="css_s"){
		let css = document.querySelector("#style1").value;
		browser.storage.local.get().then(data => {
			data["CSS"]=css;
			browser.storage.local.set(data);
		});	
	}
}

function set_Defaults_init(){}

function load_set(){
	if(this.id=="JS_l"){
		browser.storage.local.get().then(data => {
			if (!data.init){
				set_Defaults_init()
			}else{
				document.querySelector("#JS_edit").value=data["JS"]
			}
		},onError);
		
	}else if(this.id=="css_l"){
		browser.storage.local.get().then(data => {
			if (!data.init){
				set_Defaults_init()
			}else{
				document.querySelector("#style1").value=data["CSS"]
			}
		},onError);	
	}
}


function onError(error){
  console.error(`Error:`, error);
}


function getMessage(message, sender, sendResponse){
	console.log('scratchpad ', message) 
	if(message.response === "BGexecuteScript"){
		console.log('scratchpad ', message.data) 
	}else if(message.response === "BGexecuteScript_error"){
		console.log('scratchpad ', message.data) 		
	}
}

browser.runtime.onMessage.addListener(getMessage);

