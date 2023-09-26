
document.querySelector("#open_files_ext").addEventListener('click',function(){
	browser.runtime.sendMessage({command: "open_app_files_ext"})
});