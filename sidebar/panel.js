
let myWindowId;
const contentBox = document.querySelector("#content");

window.addEventListener("mouseover", () => {
  contentBox.setAttribute("contenteditable", true);
});

window.addEventListener("mouseout", () => {
  contentBox.setAttribute("contenteditable", false);
  browser.tabs.query({windowId: myWindowId, active: true}).then((tabs) => {
    let contentToStore = {};
		let str=contentBox.innerText
    contentToStore["sidebar_note"] = str;
    browser.storage.local.set(contentToStore);
  });
});


function updateContent() {
  browser.tabs.query({windowId: myWindowId, active: true})
    .then((tabs) => {
      return browser.storage.local.get("sidebar_note");
    }).then((storedInfo) => {
			let str=storedInfo[Object.keys(storedInfo)[0]];
			contentBox.innerText = str 
    });
}



//browser.tabs.onActivated.addListener(updateContent);
browser.tabs.onUpdated.addListener(updateContent);

browser.windows.getCurrent({populate: true}).then((windowInfo) => {
  myWindowId = windowInfo.id;
  updateContent();
});
