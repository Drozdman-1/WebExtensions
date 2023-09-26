	
	
document.addEventListener('DOMContentLoaded', tags_populate);

function tags_populate(){
	var s1 = document.getElementById("tags1");
	var s2 = document.getElementById("tags2");
	var s3 = document.getElementById("tags3");
	
	browser.storage.local.get().then(data => {
		var tags_1 = data["tags"]["tags1"]
		var tags_2 = data["tags"]["tags2"]
		var tags_3 = data["tags"]["tags3"]
	
		let len = Math.max(tags_1.length,tags_2.length,tags_3.length)
		if(len>8){
			var len2=8;
		}else{
			var len2=len
		}
		s1.size=len2
		s2.size=len2
		s3.size=len2
		tags_populate(s1,tags_1,len)
		tags_populate(s2,tags_2,len)
		tags_populate(s3,tags_3,len)
		
		function tags_populate(s,tags,len){
			for(let i=0; i<len; i++){
				val = tags[i]
				if(typeof val !== "undefined"){
					s[i] = new Option(val, val, false, false); 	
				}else{
					s[i] = new Option("", "", false, false); 
				}			
			}
		}
	
	}).then(() => {	
		let options = Array.from(document.querySelectorAll('select.tags option')); 
		options.forEach(function(el){ // multi-selection
			el.addEventListener("mousedown", 
				function(e){
					e.preventDefault();
					if (this.value !== "---"){//separator
						this.selected = !this.selected;
					}
					return false;
				}, false);
		});
	})
}

