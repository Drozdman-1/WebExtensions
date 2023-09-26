var pageAction_on = true

browser.storage.local.get().then(data => {
	if(!data.init){// Initialize
		browser.runtime.openOptionsPage();
		browser.tabs.create({url: 'popup/help.html'});
	}else{	
		pageAction_on = data["pageAction"]
		
		if(data["pageAction"]){
			browser.tabs.query({}).then((tabs) => {
				for(let tab of tabs){
					browser.pageAction.show(tab.id);
				}
			})
		}else{
			browser.tabs.query({}).then((tabs) => {
				for(let tab of tabs){
					browser.pageAction.hide(tab.id);
				}
			});
		};

		if(data["popup"]==3){
			browser.browserAction.setPopup({ popup: "/popup/pop_page_3.html" });
		}else if(data["popup"]==2){
			browser.browserAction.setPopup({ popup: "/popup/pop_page_2.html" });
		}else{
			browser.browserAction.setPopup({ popup: "/popup/pop_page.html" });
		}
	}
}, onError);


//================== archive text, external

let port = browser.runtime.connectNative("Drozd_addon");

port.onMessage.addListener((response) => {
	if (typeof response==="object" && response.status=="saved"){
		browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
			browser.tabs.sendMessage(tabs[0].id, {command: "archive_saved"})
		})
	}else if (typeof response==="object" && response.status=="error"){
		browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
			browser.tabs.sendMessage(tabs[0].id, {command: "archive_error", error: response.error})
		})
	}
});


//==================  save text as html

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.command === "save_html") {
		saveTextToFile(message.text, message.title)
		sendResponse({ response: "saved" });
		
  }else if (message.command === "prev_tab"){
		prevTab()
		
  }else if (message.command === "next_tab"){
		nextTab()

  }else if(message.command === "send_settings"){		
		browser.storage.local.get().then(data => {
			sendResponse({ response: "settings_data", data: data });
		}, onError)	
		return true

  }else if(message.command === "toggle_pageAction"){
		browser.storage.local.get().then(data => {
			pageAction_on = data["pageAction"]
			if(data["pageAction"]){
				browser.tabs.query({}).then((tabs) => {
					for(let tab of tabs){
						browser.pageAction.show(tab.id);
					}
				})
			}else{
				browser.tabs.query({}).then((tabs) => {
					for(let tab of tabs){
						browser.pageAction.hide(tab.id);
					}
				});
			};
		}, onError);

  }else if(message.command === "apply_CSS"){
		console.log('bg, apply_CSS',message, sender.tab);
		let href = sender.tab.url;
		let css_ = message.style
		let host = message.hostname
		
		browser.storage.session.get().then(data_sess => {
			if(typeof data_sess.init === "undefined"){
				data_sess = {
					init: true
				};
				browser.storage.session.set(data_sess);
			}
			if(!data_sess[href] || data_sess[href]==false){
				browser.tabs.insertCSS(sender.tab.id, {code: css_})
				data_sess[href] = true			
			}
			browser.storage.session.set(data_sess);
		}, onError);
		
  }else if(message.command === "archive_text_send"){
		ArchiveText(message)
		
  }else if(message.command === "open_file_init"){
		var obj={open_file: "open_file", path: message.filepath}
		port.postMessage(obj);
		
  }else if(message.command === "ping_external"){
		port.postMessage({path: "", text: "", ping: "ping"})

  }else if(message.command === "open_app_files_ext"){		
		open_app_files_ext()
 
  }
});



function ArchiveText(message){
	let text=message.text
	let which=message.which
	var filepath;
	browser.storage.local.get().then(data => {
		let arch_path_1 = data.archive_files.file_1;
		let arch_path_2 = data.archive_files.file_2;
		let arch_path_3 = data.archive_files.file_3;
		if(which=="archive_1"){
			filepath = arch_path_1
		}else if(which=="archive_2"){
			filepath = arch_path_2
		}else if(which=="archive_3"){
			filepath = arch_path_3
		}
		
		var obj={"path": filepath, text: text} 
		port.postMessage(obj);		
	}, onError);
} 


//======================================

const BOM = new Uint8Array([0xEF,0xBB,0xBF]);// UTF-8 BOM

function saveTextToFile(fileContents,filename){
	console.log("bg saveTextToFile:",filename);
	if(typeof filename==="undefined"){
		var filename="test.htm";		
	}
	if(typeof fileContents==="undefined"){
		a1("Error. No data to save")
		return
	}
	
	var blob = new Blob([BOM, fileContents], {
		encoding: "UTF-8",
		type: "text/plain;charset=UTF-8"
	});
	var url = URL.createObjectURL(blob);	
  var data = {
    filename: filename,
    url: url,
    saveAs: true
  };
	browser.downloads.download(data,onError)
}


function onError(error){ 
 console.error(`Error: ${error}`);
}

			
function nextTab(){	
	browser.tabs.query({currentWindow: true}).then((tabs) => {
		for (let tab of tabs){
			if (tab.active){
				var index=tab.index
			}
		}
		index = (index < tabs.length-1) ? index + 1 : 0
		for (let tab of tabs) {
			if (tab.index === index) {
				browser.tabs.update(tab.id, {
						active: true
				});
			}
		}
	})
}

function prevTab(){	
	browser.tabs.query({currentWindow: true}).then((tabs) => {		
		for (let tab of tabs){
			if (tab.active){
				var index=tab.index
			}
		}
		index = (index == 0 ) ? tabs.length-1 : index - 1
		for (let tab of tabs) {
			if (tab.index === index) {
				browser.tabs.update(tab.id, {
						active: true
				});
			}
		}
	})
}

//=====================================


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
				command: "save_text_data",
				selector: selector,
				del: del
				})
		})
	},onError)	
}


//=================   PageAction

const APPLICABLE_PROTOCOLS = ["http:", "https:"];

function save_from_address_bar(){// pageAction save
	browser.tabs.query({currentWindow: true,active: true}).then(Save_text_).catch(onError);
}

function protocolIsApplicable(url) {
  const protocol = (new URL(url)).protocol;
  return APPLICABLE_PROTOCOLS.includes(protocol);
}

function initializePageAction(tab){
  if(protocolIsApplicable(tab.url)){
    browser.pageAction.setIcon({tabId: tab.id, path: "icons/save.png"});
    browser.pageAction.setTitle({tabId: tab.id, title: "Save selection as html"});
    browser.pageAction.show(tab.id);
  }
}

let gettingAllTabs = browser.tabs.query({});
	gettingAllTabs.then((tabs) => {
		for(let tab of tabs){
			initializePageAction(tab);
		}
});

browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
	if(pageAction_on)
		initializePageAction(tab);
});

browser.pageAction.onClicked.addListener(save_from_address_bar);



//===================


function a1(txt){
  browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, {
      command: "my_alert",
      text: txt
    })
  })
}

//-- Tw --

function set_data(name,id, text){
	let store_obj={}
	let id2="";
	let id3="";
	browser.storage.local.get().then((data) => {
		if(typeof data["twitter"]=="undefined"){
			console.log('data["twitter"] undefined');
			data["twitter"]={}
		}else{
			if(typeof data["twitter"][name]=="undefined"){
				data["twitter"][name]={};
			}
			id3=data["twitter"][name]["id2"];
			id2=data["twitter"][name]["id"];
		}
		data["twitter"][name] = {id:id, id2:id2, id3:id3 ,text: text};
		browser.storage.local.set(data);
		console.log("bg.js set_data",name, data["twitter"][name])			
	})
}



function get_data(name){
	let store=browser.storage.local.get("twitter")
	console.log("bg.js get_data",name, store)		
	return browser.storage.local.get(store[name]);
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.command === "get_last"){
		let name= message.name;			
		browser.storage.local.get("twitter").then((data) => {
			let id= data["twitter"][name].id;
			let id2= data["twitter"][name].id2;
			let id3= data["twitter"][name].id3;		
			browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
				browser.tabs.sendMessage(tabs[0].id, {
					command: "give_last",
					name: name,
					id: id,
					id2: id2,
					id3: id3
				})
			})
		// sendResponse({command: "give_last",name: name,id: id,id2: id2});	
		 			 
		}).catch(onError);
		
  }else if(message.command === "get_last_by_text"){
		let name= message.name;			
		browser.storage.local.get("twitter").then((data) => {
			let id= data["twitter"][name].id;
			let id2= data["twitter"][name].id2;
			let id3= data["twitter"][name].id3;
			let text= data["twitter"][name].text;	
			browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
				browser.tabs.sendMessage(tabs[0].id, {
					command: "give_last_by_text",
					name: name,
					text: text,
					id: id,
					id2: id2,
					id3: id3
				})
			})
		// sendResponse({command: "give_last",name: name,id: id,id2: id2});	
		 			 
		}).catch(onError);		
	
  }else if(message.command === "set_last"){
		let name= message.name;
		let id= message.id;
		let text = message.text;
		set_data(name,id,text)
		let txt_back=`saved last twit name: ${name}, id: ${id}`
		sendResponse({ confirm_bgr: txt_back });
  }
	
});

 
function open_as_page(filepath){
	var fullURL = browser.runtime.getURL(filepath);
	browser.tabs.create({url: fullURL});
}
 
function open_app_files_ext(){
	var reg= "ext/Drozd_addon_NativeMessagingHosts.reg.txt"
	var Drozd_manifest= "ext/Drozd_addon_manifest.json"
	var Drozd_Py= "ext/Drozd_addonPython.py.txt"
	var Drozd_bat= "ext/Drozd_addon.bat.txt"
	open_as_page(Drozd_Py)
	open_as_page(Drozd_manifest)
	open_as_page(reg) 
  open_as_page(Drozd_bat) 
} 
