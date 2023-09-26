

document.addEventListener('DOMContentLoaded', update_options);
	
document.querySelector("#hostnames").addEventListener('click', click_listbox)
document.querySelector("#add_Host").addEventListener('click',	add_Host)
document.querySelector("#del_Host").addEventListener('click',	del_Host)

Array.prototype.forEach.call(document.querySelectorAll('.sel_'), function(elem){
	elem.addEventListener('click',sel_)
});


Array.prototype.forEach.call(document.querySelectorAll('#sel_s, #JS_s, #css_s, #other_optS, #X_but_optS, #arch_optS'), function(elem){
	elem.addEventListener('click',save_set)
}); 

Array.prototype.forEach.call(document.querySelectorAll('#sel_l, #JS_l, #css_l, #other_optL, #X_but_optL, #arch_optL'), function(elem){
	elem.addEventListener('click',load_set)
}); 

 
document.querySelector("#clear").addEventListener('click',() => {
	let c=confirm("Delete all Settings?");
	if(c===true){
		browser.storage.local.clear()	
	}
})
 
Array.prototype.forEach.call(document.querySelectorAll('#show_log_console, #show_log, #Sett_options'), function(elem){
	elem.addEventListener('click',log_host_storage)
}); 
 


document.querySelector("#export_settings").addEventListener('click',	export_settings)
document.querySelector("#import_settings").addEventListener('click',	import_settings)


function update_options(){
	var s = document.getElementById("hostnames");
	browser.storage.local.get().then(data => {
		if(!data.init){// Initialize
			data = {
				init: true,
				pageAction: false,
				nextTabF: false,
				nextTab1: false,
				hosts: {}
			};
			data=data_0
			let obj_X_Button = JSON.parse(str_obj_X_Button);
			data["X-Button"] = obj_X_Button;
			browser.storage.local.set(data);
			console.log("first, set defaults ") ;
			
			var options = [host0, host1, host2, host3, host4];
			options.forEach((host, i) => {
				if(i===0){
					s[i] = new Option(host, host, false, true);
				}else{
					s[i] = new Option(host, host, false, false); 
				}
			});

		}else{
			var options = Object.keys(data["hosts"])
			options.forEach((host, i) => {
				if(i===0){
					s[i] = new Option(host, host, false, true);
				}else{
					s[i] = new Option(host, host, false, false); 
				}
			})			
		}
		
		document.querySelector("#selectors_edit").value=data["hosts"][host0]["selector"];
		document.querySelector("#del_elem").value=data["hosts"][host0]["del"]; 
		document.querySelector("#JS_edit").value=data["hosts"][host0]["JS"]; 
		document.querySelector("#style1").value=data["hosts"][host0]["CSS"];
		
		document.querySelector("#archive_file_1").value = data["archive_files"]["file_1"];
		document.querySelector("#archive_file_2").value = data["archive_files"]["file_2"];
		document.querySelector("#archive_file_3").value = data["archive_files"]["file_3"];
		document.querySelector("#archive_name_1").value = data["archive_files"]["name_1"];
		document.querySelector("#archive_name_2").value = data["archive_files"]["name_2"];
		document.querySelector("#archive_name_3").value = data["archive_files"]["name_3"];
		document.querySelector("#tags_1").value = data["tags"]["tags1"].toString();
		document.querySelector("#tags_2").value = data["tags"]["tags2"].toString();
		document.querySelector("#tags_3").value = data["tags"]["tags3"].toString();
		
		document.querySelector("#Twitter_spec").checked = data["archive_opt"]["Twitter_spec"];
		document.querySelector("#Twitter_sel_text").checked = data["archive_opt"]["Twitter_sel_text"];
		
		var arch_links = document.getElementsByName('text_links');
		var links=data["archive_opt"]["links"];
		for(var i = 0; i < arch_links.length; i++){
				if(links === arch_links[i].value){
						arch_links[i].checked = true;;
				}
		}		

		document.querySelector("#pageAction").checked = data["pageAction"];
		document.querySelector("#nextTabF").checked = data["nextTabF"];
		document.querySelector("#nextTab1").checked = data["nextTab1"];
		document.querySelector("#loadJS").checked = data["loadJS"];
		document.querySelector("#loadCSS").checked = data["loadCSS"];
		document.querySelector("#loadX").checked = data["loadX"];
		document.querySelector("#en_X_dblclick").checked = data["en_X_dblclick"];
		document.querySelector("#Twitter_last").checked = data["Twitter_last"];		
		document.querySelector("#Twitter_last_but").checked = data["Twitter_last_but"];				
		
	}, onError);
}


function click_listbox(){
	let host=this.value
	document.getElementById('host_show').textContent=host;
	load_hostname_options(host)
} 


function load_hostname_options(host){
	browser.storage.local.get("hosts").then((obj) =>{
		document.querySelector("#selectors_edit").value = obj["hosts"][host]["selector"]|| "";
		document.querySelector("#del_elem").value = obj["hosts"][host]["del"] || "";
		document.querySelector("#JS_edit").value =  obj["hosts"][host]["JS"] || "";
		document.querySelector("#style1").value = obj["hosts"][host]["CSS"] || "";
		
		document.querySelector("#new_host").value = host
	},onError)	
}


function add_Host(){
	var inp= document.querySelector("#new_host")
	var listbox=document.querySelector("#hostnames")
	var options = listbox.options;
	var val=inp.value
	val=val.trim()
	if(val!=="")
		listbox[options.length]=new Option(val, val, false, true)
}	

function del_Host(){
	var listbox=document.querySelector("#hostnames")
	var options = listbox.options;
	let host = options[listbox.selectedIndex].value
	browser.storage.local.get().then((data) =>{		
		delete data["hosts"][host];
		var c=confirm("Remove this host and all its settings?\n\n'" + host + "'");
		if(c==true){
			options[listbox.selectedIndex] = null
			for(el in data["hosts"]){
				if(el===""){
					//console.log("!!!" + el + " : " , data["hosts"][el]);
					delete data["hosts"][el]; //clean
				}				
			}
			browser.storage.local.set(data);
		}
	},onError)	
}	



function sel_(){
	let sel_text;
	if(this.id=="sel_1"){
		sel_text=selectors_1
	}else if(this.id=="sel_2"){
		sel_text=selectors_2
	}else if(this.id=="sel_3"){
		sel_text=selectors_3		
	}
	document.querySelector("#selectors_edit").value=sel_text.trim()
}

		
function save_set(){
	let host=document.querySelector("#hostnames").value;
	if(this.id=="sel_s"){		
		let selectors="", del="";
		selectors = document.querySelector("#selectors_edit").value;
		del = document.querySelector("#del_elem").value;

		let getStorage = browser.storage.local.get();
		getStorage.then(data => {
			if (!data.init){
				data = {
					init: true,
					pageAction: false,
					nextTabF: false,
					nextTab1: false,
					hosts: {}
				};
			}
			if(typeof data["hosts"][host]=="undefined"){
				data["hosts"][host]={};
				console.log(`*** data[${host}] is undefined `)
			}
			
			for(el in data["hosts"]){
				if(el===""){
					delete data["hosts"][el]; //clean
				}				
			}
			
			data["hosts"][host]={"selector": selectors,"del":del};
			browser.storage.local.set(data);
		});

	}else if(this.id=="JS_s"){
		let js = document.querySelector("#JS_edit").value;

		browser.storage.local.get().then(data => {
			if(typeof data["hosts"][host]=="undefined"){
				data["hosts"][host]={};
			}
			data["hosts"][host]["JS"]=js;

			browser.storage.local.set(data);
		});
		
	}else if(this.id=="css_s"){
		let css = document.querySelector("#style1").value;
		browser.storage.local.get().then(data => {
			if(typeof data["hosts"][host]=="undefined"){
				data["hosts"][host]={};
			}
			data["hosts"][host]["CSS"]=css;
			browser.storage.local.set(data);
		});
		
	}else if(this.id=="other_optS"){
		let adrBar_button = document.querySelector("#pageAction").checked;
		let nextTabF = document.querySelector("#nextTabF").checked;
		let nextTab1 = document.querySelector("#nextTab1").checked;
		let loadJS = document.querySelector("#loadJS").checked;
		let loadCSS = document.querySelector("#loadCSS").checked;
		let loadX = document.querySelector("#loadX").checked;
		let en_X_dblclick = document.querySelector("#en_X_dblclick").checked;
		let Twitter_last = document.querySelector("#Twitter_last").checked;		
		let Twitter_last_but = document.querySelector("#Twitter_last_but").checked;				

		let getStorage = browser.storage.local.get();
		getStorage.then(data => {
			if (!data.init){
				data = {
					init: true,
					pageAction: false,
					nextTabF: false,
					nextTab1: false,
					hosts: {}
				};
			}

			data["pageAction"] = adrBar_button;
			data["nextTabF"] = nextTabF;
			data["nextTab1"] = nextTab1;
			data["loadJS"] = loadJS;
			data["loadCSS"] = loadCSS;
			data["loadX"] = loadX;
			data["en_X_dblclick"] = en_X_dblclick;
			data["Twitter_last"] = Twitter_last;
			data["Twitter_last_but"] = Twitter_last_but;
			browser.storage.local.set(data);
			
			browser.runtime.sendMessage({command: "toggle_pageAction"});

		});

	}else if(this.id=="X_but_optS"){
		var button_menus = document.getElementsByName('x_button_menus');
		var menu;
		for(var i = 0; i < button_menus.length; i++){
				if(button_menus[i].checked){
						menu = button_menus[i].value;
				}
		}

		browser.storage.local.get().then(data => {
			if (!data.init){
			}else{
				let text = document.querySelector("#X-Button_edit").value
				if(!text){
					alert("No text.")
					return
				}
				try{
			
					if(menu==="dblClick_"){
						data["X-Button"][menu] = text
					}else{
						let obj = JSON.parse(text)
						data["X-Button"][menu] = obj;
					}
					browser.storage.local.set(data);
				}catch(err){alert("Error" +"\n" + err) }

			}
		},onError);
		
		
	}else if(this.id=="arch_optS"){	
		browser.storage.local.get().then(data => {
			if(typeof data["archive_files"]=="undefined"){
				data["archive_files"]={};
			}
			data["archive_files"]["file_1"] = document.querySelector("#archive_file_1").value;
			data["archive_files"]["file_2"] = document.querySelector("#archive_file_2").value;
			data["archive_files"]["file_3"] = document.querySelector("#archive_file_3").value;
			
			data["archive_files"]["name_1"] = document.querySelector("#archive_name_1").value;
			data["archive_files"]["name_2"] = document.querySelector("#archive_name_2").value;
			data["archive_files"]["name_3"] = document.querySelector("#archive_name_3").value;
			
			data["archive_opt"]["Twitter_spec"] = document.querySelector("#Twitter_spec").checked;
			data["archive_opt"]["Twitter_sel_text"] = document.querySelector("#Twitter_sel_text").checked;
			var arch_links = document.getElementsByName('text_links');
			var links;
			for(var i = 0; i < arch_links.length; i++){
					if(arch_links[i].checked){
							links = arch_links[i].value;
					}
			}
			data["archive_opt"]["links"] = links;
			
			var str=document.querySelector("#tags_1").value;
			str=str.replace(/,\s+/g,",").replace(/\s+,/g,",")
			var arr=str.split(",")			
			data["tags"]["tags1"] = arr;
			str=document.querySelector("#tags_2").value;
			str=str.replace(/,\s+/g,",").replace(/\s+,/g,",")
			arr=str.split(",")	
			data["tags"]["tags2"] = arr;
			str=document.querySelector("#tags_3").value;
			str=str.replace(/,\s+/g,",").replace(/\s+,/g,",")
			arr=str.split(",")	
			data["tags"]["tags3"] = arr;		
			
			browser.storage.local.set(data);
		});
	}
}



function load_set(){
	let host=document.querySelector("#hostnames").value;
	if(this.id=="sel_l"){ 
		let getStorage = browser.storage.local.get();
		getStorage.then(data => {
			if (!data.init){
				set_Defaults_init()
			}else{
				document.querySelector("#selectors_edit").value=data["hosts"][host]["selector"]
				document.querySelector("#del_elem").value=data["hosts"][host]["del"]
			}
		},onError);
		
	}else if(this.id=="JS_l"){
		browser.storage.local.get().then(data => {
			if (!data.init){
				set_Defaults_init()
			}else{
				document.querySelector("#JS_edit").value=data["hosts"][host]["JS"]
			}
		},onError);
		
	}else if(this.id=="css_l"){
		browser.storage.local.get().then(data => {
			if (!data.init){
				set_Defaults_init()
			}else{
				document.querySelector("#style1").value=data["hosts"][host]["CSS"]
			}
		},onError);
	 
	}else if(this.id=="other_optL"){
		console.log(this.id);
		browser.storage.local.get().then(data => {
			if (!data.init){
				set_Defaults_init()
			}else{
				document.querySelector("#pageAction").checked = data["pageAction"];
				document.querySelector("#nextTabF").checked = data["nextTabF"];
				document.querySelector("#nextTab1").checked = data["nextTab1"];
				document.querySelector("#loadJS").checked = data["loadJS"];
				document.querySelector("#loadCSS").checked = data["loadCSS"];
				document.querySelector("#loadX").checked = data["loadX"];
				document.querySelector("#en_X_dblclick").checked = data["en_X_dblclick"];
				document.querySelector("#Twitter_last").checked = data["Twitter_last"];	
				document.querySelector("#Twitter_last_but").checked = data["Twitter_last_but"];	
			}
		},onError);

	}else if(this.id=="X_but_optL"){
		var button_menus = document.getElementsByName('x_button_menus');
		var menu;
		for(var i = 0; i < button_menus.length; i++){
			if(button_menus[i].checked){
				menu = button_menus[i].value;
			}
		}
		browser.storage.local.get().then(data => {
			if (!data.init){
			}else{
				let obj = data["X-Button"][menu]
				if(menu==="dblClick_"){
					document.querySelector("#X-Button_edit").value = data["X-Button"][menu]
				}else{
					document.querySelector("#X-Button_edit").value = JSON.stringify(obj, null, 2)
				}
			}
		},onError);
		
	}else if(this.id=="arch_optL"){	
	
		browser.storage.local.get().then(data => {
			if(data.init){
				document.querySelector("#archive_file_1").value = data["archive_files"]["file_1"];
				document.querySelector("#archive_file_2").value = data["archive_files"]["file_2"];
				document.querySelector("#archive_file_3").value = data["archive_files"]["file_3"];

				document.querySelector("#archive_name_1").value = data["archive_files"]["name_1"];
				document.querySelector("#archive_name_2").value = data["archive_files"]["name_2"];
				document.querySelector("#archive_name_3").value = data["archive_files"]["name_3"];
				document.querySelector("#tags_1").value = data["tags"]["tags1"].toString();
				document.querySelector("#tags_2").value = data["tags"]["tags2"].toString();
				document.querySelector("#tags_3").value = data["tags"]["tags3"].toString();
		
				document.querySelector("#Twitter_spec").checked = data["archive_opt"]["Twitter_spec"];
				document.querySelector("#Twitter_sel_text").checked = data["archive_opt"]["Twitter_sel_text"];
				
				var arch_links = document.getElementsByName('text_links');
				var links=data["archive_opt"]["links"];
				for(var i = 0; i < arch_links.length; i++){
						if(links === arch_links[i].value){
								arch_links[i].checked = true;
						}
				}			
			}
		},onError);
	}
}

document.addEventListener("mouseup", (e) => {
	if(e.target.id=="show_log" || e.target.id=="Sett_options"){
		switch (e.button){
			case 0://"Left button"
				break;
			case 1: //"Middle button"
				break;
			case 2://"Right button"
				e.preventDefault()
				log_host_storage_host()
				break;
		}
	}
});

function log_host_storage_host1(){
	let host=document.querySelector("#hostnames").value;
	browser.storage.local.get().then((data) =>{
		console.log(host + " : " , data["hosts"][host]);
	},onError)
}

function log_host_storage_host(){
	//let host=document.querySelector("#hostnames").value;
	browser.storage.local.get().then((data) =>{
			//console.log(host + " : " , data["hosts"][host]);
			var dat1 = Object.keys(data["hosts"])
			console.log( Object.keys(data["hosts"]));
			for(el in data["hosts"]){
				console.log("'" + el + "'");
				console.log(data["hosts"][el]);
			}

	},onError)
}

function log_host_storage(){
	console.log("log hosts storage");
	let host=document.querySelector("#hostnames").value;
	browser.storage.local.get().then((data) =>{
		console.log("log hosts storage, init" , data.init);
		for(el in data){
			if (el!=="hosts")
				console.log(el + " : " , data[el]);
		}		
		for(el in data["hosts"]){
			console.log(el + " : " , data["hosts"][el]);
		}	
	},onError)
}


function export_settings(error){
	browser.storage.local.get().then(data => {
		const blob = new Blob([JSON.stringify(data, null, 2)], {
			type: "application/json",
		});
		let filename = "Drozd_save_html_options.json";
		var url = URL.createObjectURL(blob);	
		var data = {
			filename: filename,
			url: url,
			saveAs: true
		};
		browser.downloads.download(data,onError)
	})	
}

document.querySelector("#import_settings").addEventListener('change', import_settings);

function import_settings(error){
  var file = document.getElementById("fileItem").files[0];
	console.error('file.type',file.type);
  const reader = new FileReader();

  reader.addEventListener("load", () => {
		let data;
		try{
			data = JSON.parse(reader.result);
		}catch(err){
			console.log("Error: " + err); 
			alert("Error")
		}
		console.error('parse data.result', data.init, data.hosts);
		if(data.init){
			let c=confirm("Import settings from file and delete the current ones?");
			if(c===true){
				browser.storage.local.set(data);
			}
		}else{
			alert("Error")
		}
		
	},false);

  if(file){
    reader.readAsText(file);
  }
}


function onError(error){
  console.error(`Error:`, error);
}

