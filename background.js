var pageAction_on = true
var Scr_lastStyleCSS=""

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
		
		Add_contextMenus(data)
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

  }else if(message.command === "run_JS"){
		let js = message.script;
		console.log('*** bg run_JS', js) 
		browser.tabs.query({active: true}).then((tabs) => {
			browser.tabs.executeScript(tabs[0].id, {code: js }).then((result) => {
			}, (error) => {
				//let err=`alert("User JS. ${error}")`
				let err =`alert_txt("User JS. ${error}",5000,40,50,1)`
				//browser.tabs.executeScript(tabs[0].id, {code: err })
				console.log('*** bg run_JS error', err) 
			})
		})

 
  }else if(message.command === "Scr_run_JS"){
		let js = message.script;
		//console.log('*** bg Scr_run_JS', js) 
		browser.tabs.query({active: true}).then((tabs) => {
			browser.tabs.executeScript(tabs[0].id, {code: js }).then((result) => {
				browser.tabs.sendMessage(tabs[0].id, {command: "txt_alert", args: ["Scratchpad",5000,100,100,3]})
				//sendResponse({ response: "BGexecuteScript", data: js });
			}, (error) => {
				//let err=`alert("${error}")`
				let err =`alert_txt("CSS. ${error}",5000,40,50,1)`
				browser.tabs.executeScript(tabs[0].id, {code: err })
				/* 
				let errTxt=`"${error}"`
				browser.tabs.query({active: true}).then((tabs) => {
					 browser.tabs.sendMessage(tabs[0].id, {command: "txt_alert", args: [errTxt,15000,100,140,1]})
				})
				 */
			})
		})
		
  }else if(message.command === "Scr_remove_CSS"){
		console.log('bg, remove_CSS',message);		
		browser.tabs.query({active: true}).then((tabs) => {
			browser.tabs.removeCSS(tabs[0].id, {code: Scr_lastStyleCSS})
		})
		
  }else if(message.command === "Scr_apply_CSS"){
		console.log('bg, apply_CSS',message);		
		let css_ = message.style
		browser.tabs.query({active: true}).then((tabs) => {
			browser.tabs.insertCSS(tabs[0].id, {code: css_})
			Scr_lastStyleCSS = css_
		})
		
  }else if(message.command === "open_search"){		
		//console.log('*** bg open_search', message) 
		let	txt=message.text.trim(); 
		txt=encodeURIComponent(txt);
		let url = "https://www.google.com/search?q=" + txt
		browser.tabs.create({url:url});	
		
  }else if(message.command === "archive_text_send"){
		ArchiveText(message)
		
  }else if(message.command === "open_file_init"){
		var obj={open_file: "open_file", path: message.filepath}
		port.postMessage(obj);
		
  }else if(message.command === "ping_external"){
		port.postMessage({path: "", text: "", ping: "ping"})

  }else if(message.command === "open_app_files_ext"){		
		open_app_files_ext()
		
  }else if(message.command === "context_menu_make"){		
		//console.log('*** context_menu_make') 
		browser.storage.local.get().then(data => {
			Add_contextMenus(data)
		}, onError);
 
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





function open_archive_file(i){
	let file = "file_" + i
	browser.storage.local.get().then(data => {
		let filepath= data["archive_files"][file];
		var obj={open_file: "open_file", path: filepath}
		port.postMessage(obj);			
	})
	
}

function open_url_in_browser(browser_path, url){
	var obj={open_url: "open_url", path: url, browser_path: browser_path}
	port.postMessage(obj);	
}

function save_archive(i){
	let which = "archive_" + i
	browser.storage.local.get().then(data => {
		let links=data["archive_opt"]["links"];
		let obj = data["archive_opt"];			
		browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
			browser.tabs.sendMessage(tabs[0].id, {command: "archive_text_init", which: which, tags: "", type: "", type_2: obj , links: links})
		}).then(() => {	window.close();});
	})	
}


function add_archive_(i){//adds new selected text without 3 separating empty lines 
	let which = "archive_" + i
	browser.storage.local.get().then(data => {
		let links=data["archive_opt"]["links"];
		let obj = data["archive_opt"];			
		browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
			browser.tabs.sendMessage(tabs[0].id, {command: "archive_text_init", which: which, tags: "", type: "add", type_2: obj , links: links})
		}).then(() => {	window.close();}); 
	})
}

function add_archive_with_url(i){//adds new selected text with url and title to the previous block (to the last saved text) without 3 separating empty lines 
	let which = "archive_" + i
	browser.storage.local.get().then(data => {
		let links=data["archive_opt"]["links"]
		let obj = data["archive_opt"];			
		browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
			browser.tabs.sendMessage(tabs[0].id, {command: "archive_text_init", which: which, tags: "", type: "add_sep", type_2: obj, links: links})
		}).then(() => {	window.close();});
	})
}


function open_search_tab(txt, url){
	console.log('*** open_search_tab',txt,url) 
	txt=txt.trim(); 
	txt=encodeURIComponent(txt);
	url = url + txt
	browser.tabs.create({url:url});	
}



const MENU_OPEN_PAGE="open_url_in_browser"
const MENU_OPEN_PAGE_n="Open with chosen browser";
const MENU_OPEN_LINK="open_link_url_in_default"
const MENU_OPEN_LINK_n="Open link url with chosen browser";
const MENU_DEL="delete_element"
const MENU_DEL_n="Delete element"

const MENU_OPEN_FILE_1="open_archive_file_1"
var MENU_OPEN_FILE_1_n="Open archive file 1";
const MENU_OPEN_FILE_2="open_archive_file_2"
var MENU_OPEN_FILE_2_n="Open archive file 2";
const MENU_OPEN_FILE_3="open_archive_file_3"
var MENU_OPEN_FILE_3_n="Open archive file 3";


const SEL_MENU_ITEM_1="save_archive_1"
var SEL_MENU_ITEM_1_n="Save selection in archive 1"
const SEL_MENU_ITEM_2="save_archive_2"
var SEL_MENU_ITEM_2_n="Save selection in archive 2"
const SEL_MENU_ITEM_3="save_archive_3"
var SEL_MENU_ITEM_3_n="Save selection in archive 3"

const SEL_MENU_add_1 = "save_archive_1_add"
const SEL_MENU_add_1_n = " - Add to previous block"
const SEL_MENU_add_1b = "save_archive_1_add_sep"
const SEL_MENU_add_1b_n = " - Add to previous block with url"

const SEL_MENU_add_2 = "save_archive_2_add"
const SEL_MENU_add_3 = "save_archive_3_add"



function Add_contextMenus(data){
	let obj = data["contextMenu"]
	let browser_path =obj["open_in_browser"]["filepath"]
	if(!obj["add_menu"])
		return

	SEL_MENU_ITEM_1_n ="Save in " + data["archive_files"]["name_1"];
	SEL_MENU_ITEM_2_n ="Save in " + data["archive_files"]["name_2"];
	SEL_MENU_ITEM_3_n ="Save in " + data["archive_files"]["name_3"];
	MENU_OPEN_FILE_1_n="Open " + data["archive_files"]["name_1"] + " file"; 
	MENU_OPEN_FILE_2_n="Open " + data["archive_files"]["name_2"] + " file"; 
	MENU_OPEN_FILE_3_n="Open " + data["archive_files"]["name_3"] + " file";

	browser.contextMenus.create({
		id: "MENU_SEARCH_Google_link",
		title: "Google search",
		documentUrlPatterns: ["*://*/*"],
		contexts: ['link'],
		icons: {
			"16": "icons/google.png",
			"32": "icons/google.png"
		},
		onclick(info, tab) {
			console.log('*** link',info) 
			console.log('*** link',info.linkUrl) 
			browser.tabs.executeScript(tab.id, {
				frameId: info.frameId,
				code: `var txt=browser.menus.getTargetElement(${info.targetElementId}).textContent; browser.runtime.sendMessage({command: "open_search", text: txt});`,
			});
		},
	});		

	data["contextMenu"]["search"].forEach((el,i) => {
		let icon;
		if(el["url"].toLowerCase().includes("google")){
			icon = "icons/google.png"
		}else if(el["url"].toLowerCase().includes("yahoo")){
			icon = "icons/yahoo.png"				
		}else if(el["url"].toLowerCase().includes("bing")){
			icon = "icons/bing.png"	
		}else{
			icon = "icons/search.png"	
		}
		
		let url= el["url"]
		if(el["on"]){
			let id= "MENU_SEARCH_" + i 
			browser.contextMenus.create({
				id: id,
				title: el["title"],
				documentUrlPatterns: ["*://*/*"],
				contexts: ['selection'],
				icons: {
					"16": icon,
					"32": icon
				},
				onclick(info, tab) {
					let txt = info.selectionText
					open_search_tab(txt, url)
				},
			});
		}
	});

	browser.menus.create(
		{
			id: "separator-3",
			type: "separator",
			contexts: ['selection'],
		}
	);
	
	browser.contextMenus.create({
		id: "MENU_TRANSLATE",
		title: "Google translate",
		documentUrlPatterns: ["*://*/*"],
		contexts: ['selection'],
		icons: {
			"16": "icons/trans.png",
			"32": "icons/trans.png"
		},
		onclick(info, tab) {
			let txt = info.selectionText
			let url = "http://translate.google.com/#auto/en/"
			open_search_tab(txt, url)
		},
	});

	browser.menus.create(
		{
			id: "separator-4",
			type: "separator",
			contexts: ['selection'],
		}
	);
	
	if(obj["open_in_browser"]["on"]){
		browser.contextMenus.create({
			id: MENU_OPEN_PAGE,
			title: MENU_OPEN_PAGE_n,
			contexts: ['page'],
			icons: {
				"16": "icons/opera.png",
				"32": "icons/opera.png"
			},			
			onclick(info, tab) {
				open_url_in_browser(browser_path, info.pageUrl)
			}
		});		
		
		browser.contextMenus.create({
			id: MENU_OPEN_LINK,
			title: MENU_OPEN_LINK_n,
			contexts: ['link'],
			icons: {
				"16": "icons/opera.png",
				"32": "icons/opera.png"
			},
			onclick(info, tab) {
				open_url_in_browser(browser_path, info.linkUrl)
			}
		});
	}
	
	browser.contextMenus.create({
		id: MENU_DEL,
		title: "Delete element",
		documentUrlPatterns: ["*://*/*"],
		contexts: ['page', 'link', 'image', 'video', 'audio', 'frame', 'editable'],
		icons: {
			"16": "icons/del32.png",
			"32": "icons/del32.png"
		},
		onclick(info, tab) {
			browser.tabs.executeScript(tab.id, {
				frameId: info.frameId,
				code: `browser.menus.getTargetElement(${info.targetElementId}).remove();`,
				runAt: "document_end"
			});
		},
	});
	
	browser.menus.create(
		{
			id: "separator-5",
			type: "separator",
			contexts: ['page', 'link', 'image', 'video', 'audio', 'frame', 'editable'],
		}
	);
	
	
	
	if(obj["save_archives"]){
		
		browser.contextMenus.create({
			id: SEL_MENU_ITEM_1,
			title: SEL_MENU_ITEM_1_n,
			contexts: ['selection'],
			icons: {
				"16": "icons/save.png",
				"32": "icons/save.png"
			},
			onclick(info, tab) {
				save_archive(1)
			}					
		});
		
		if(obj["add"]){
			browser.contextMenus.create({
				id: SEL_MENU_add_1,
				title: SEL_MENU_add_1_n,
				contexts: ['selection'],
				onclick(info, tab) {
					add_archive_(1)
				}			
			});		
			
			browser.contextMenus.create({
				id: "SEL_MENU_add_1b",
				title: SEL_MENU_add_1b_n,
				contexts: ['selection'],
				onclick(info, tab) {
					add_archive_with_url(1);
				}			
			});
		}	
		
		browser.menus.create(
			{
				id: "separator-7",
				type: "separator",
				contexts: ['selection'],
			}
		);
		
		browser.contextMenus.create({
			id: SEL_MENU_ITEM_2,
			title: SEL_MENU_ITEM_2_n,
			contexts: ['selection'],
			icons: {
				"16": "icons/save.png",
				"32": "icons/save.png"
			},
			onclick(info, tab) {
				save_archive(2)
			}					
		});
		

		if(obj["add"]){
			
			browser.contextMenus.create({
				id: SEL_MENU_add_2,
				title: SEL_MENU_add_1_n,
				contexts: ['selection'],
				onclick(info, tab) {
					add_archive_(2)
				}			
			});		
			
			browser.contextMenus.create({
				id: "SEL_MENU_add_2b",
				title: SEL_MENU_add_1b_n,
				contexts: ['selection'],
				onclick(info, tab) {
					add_archive_with_url(2);
				}			
			});
		}	
		
		browser.menus.create(
			{
				id: "separator-9",
				type: "separator",
				contexts: ['selection'],
			}
		);

		browser.contextMenus.create({
			id: SEL_MENU_ITEM_3,
			title: SEL_MENU_ITEM_3_n,
			contexts: ['selection'],
			icons: {
				"16": "icons/save.png",
				"32": "icons/save.png"
			},
			onclick(info, tab) {
				save_archive(3)
			}					
		});

		if(obj["add"]){
			browser.contextMenus.create({
				id: "SEL_MENU_add_3",
				title: SEL_MENU_add_1_n,
				contexts: ['selection'],
				onclick(info, tab) {
					add_archive_(3)
				}			
			});		
			
			browser.contextMenus.create({
				id: "SEL_MENU_add_3b",
				title: SEL_MENU_add_1b_n,
				contexts: ['selection'],
				onclick(info, tab) {
					add_archive_with_url(3);
				}			
			});
		}	
		
		browser.menus.create(
			{
				id: "separator-11",
				type: "separator",
				contexts: ['selection'],
			}
		);	
	}	


	if(obj["open_files"]){
		
		browser.contextMenus.create({
			id: MENU_OPEN_FILE_1,
			title: MENU_OPEN_FILE_1_n,
			contexts: ['selection'],
			icons: {
				"16": "icons/text32.png",
				"32": "icons/text32.png"
			},		
			onclick(info, tab) {
				open_archive_file(1)
			},
		});	
		
		browser.contextMenus.create({
			id: MENU_OPEN_FILE_2,
			title: MENU_OPEN_FILE_2_n,
			contexts: ['selection'],
			icons: {
				"16": "icons/text32.png",
				"32": "icons/text32.png"
			},		
			onclick(info, tab) {
				open_archive_file(2)
			},
		});	

		browser.contextMenus.create({
			id: MENU_OPEN_FILE_3,
			title: MENU_OPEN_FILE_3_n,
			contexts: ['selection'],
			icons: {
				"16": "icons/text32.png",
				"32": "icons/text32.png"
			},		
			onclick(info, tab) {
				open_archive_file(3)
			},
		});	
	}

	
	//======== browser_action =======
	
	browser.contextMenus.create({
    title: 'Settings',
    contexts: ['browser_action'],
		icons: {
			"16": "icons/settingsW2.svg",
			"32": "icons/settingsW2.svg"
		},
    onclick: () => {
      browser.runtime.openOptionsPage();
    },	
  });
	
	browser.contextMenus.create({
		id: "MENU_OPEN_FILE_1",
		title: MENU_OPEN_FILE_1_n,
		contexts: ['browser_action'],
		icons: {
			"16": "icons/text32.png",
			"32": "icons/text32.png"
		},		
		onclick(info, tab) {
			open_archive_file(1)
		},
	});	
	
	browser.contextMenus.create({
		id: "MENU_OPEN_FILE_2",
		title: MENU_OPEN_FILE_2_n,
		contexts: ['browser_action'],
		icons: {
			"16": "icons/text32.png",
			"32": "icons/text32.png"
		},		
		onclick(info, tab) {
			open_archive_file(2)
		},
	});	

	browser.contextMenus.create({
		id: "MENU_OPEN_FILE_3",
		title: MENU_OPEN_FILE_3_n,
		contexts: ['browser_action'],
		icons: {
			"16": "icons/text32.png",
			"32": "icons/text32.png"
		},		
		onclick(info, tab) {
			open_archive_file(3)
		},
	});		
}

/* 
browser.contextMenus.onClicked.addListener(function(info) {
  if(info.menuItemId === MENU_OPEN_PAGE){	
		var obj={open_url: "open_url", path: info.pageUrl, browser_path: browser_path}
		port.postMessage(obj);
  }else if(info.menuItemId === MENU_OPEN_LINK){
		var obj={open_url: "open_url", path: info.linkUrl, browser_path: browser_path}
		port.postMessage(obj);
  }
});
 */

//================= 












