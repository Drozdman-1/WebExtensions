
window.addEventListener('DOMContentLoaded',function(){
	window.addEventListener('click',function(e){
		if(e.target.id !== "pops" && e.target.parentNode.id !== "pops" && e.target.id !== "popView"){
			let pops_div=document.querySelector("#pops_div")
			pops_div.style.visibility="hidden";
		}
	})
}) 

document.querySelector("#popView").addEventListener('click', openPopupsChange)

function openPopupsChange(){
	add_pops_change()
	let pops_=document.querySelector("#pops_div")
	pops_.style.visibility="visible";
	pops_.style.height="auto"
	var rect = this.getBoundingClientRect();
	var x = rect.left;
	var y = rect.top;
	pops_.style.position="absolute"		
	var rect2 = pops_.getBoundingClientRect();
	var h=rect2.height
	var w=rect2.width
	x=x-w;
	y=0;
	pops_.style.left=x + "px"
	pops_.style.top= y + "px"
}

function add_pops_change(){
	if(document.querySelector("#pops"))return
	var select= document.createElement('select')
	select.name="pops"; 
	select.id="pops"; 
	select.size="3"
	var option1= document.createElement('option')
	var option2=option1.cloneNode(true)
	var option3=option1.cloneNode(true)
	option1.onclick=click_Popups_listbox
	option2.onclick=click_Popups_listbox
	option3.onclick=click_Popups_listbox
	option1.value="popup1"; option1.textContent = "Popup 1"
	option2.value="popup2"; option2.textContent = "Popup 2"
	option3.value="popup3"; option3.textContent = "Popup 3"

	select.appendChild(option1)
	select.appendChild(option2)
	select.appendChild(option3)

	document.querySelector("#pops_div").appendChild(select)	
}

function click_Popups_listbox(){
	let val=this.value
	var num=1;
	if (val=="popup1"){
		browser.browserAction.setPopup({ popup: "/popup/pop_page.html" });
		num=1
	}else if (val=="popup2"){
		browser.browserAction.setPopup({ popup: "/popup/pop_page_2.html" });
		num=2
	}else if (val=="popup3"){
		browser.browserAction.setPopup({ popup: "/popup/pop_page_3.html" });
		num=3		
	}
	
	let pops_div=document.querySelector("#pops_div")
	pops_div.style.visibility="hidden";
	pops_div.style.height="0px";	
	
	browser.storage.local.get().then(data => {
		data["popup"]=num
		browser.storage.local.set(data).then(() => {window.close()});
	}, onError)
	
} 

