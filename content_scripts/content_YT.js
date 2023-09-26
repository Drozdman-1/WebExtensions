
var get_Youtube_info = function(){
	var title=document.querySelector("#title h1").textContent;
	//var Count=document.querySelector("#info-container").textContent;
	var Count=document.querySelector("#info-container .yt-formatted-string").textContent;
	var author=document.querySelector("#owner #text-container").textContent;
	var likes=document.querySelector('#segmented-like-button span[role="text"]');
	var dislikes=document.querySelector('#segmented-dislike-button span[role="text"]')
	likes = (likes) ? "↑ " + likes.textContent : "";
	dislikes = (dislikes) ? " ↓ " + dislikes.textContent : "";
	var date=""
	try{
		var obj=get_date_Youtube()
		date=obj["date"]
		var viewCount=obj["views"]
		if(obj["views"])Count=comma_digit(viewCount) + " views"
	}catch(err){ }

	var out= title.trim() + "\n" + author.trim() + " | " + date + " | " + Count.trim() + " | " + likes.trim() + "  " + dislikes.trim();
	return out
}
	
var get_date_Youtube = function(){
	var doc= document.documentElement.innerHTML
	var doc3=doc.match(/(var ytInitialPlayerResponse = \{.*?)<\/script>/)
	if(doc3)doc3=doc3[1]
	eval(doc3)
	var date=ytInitialPlayerResponse.microformat.playerMicroformatRenderer.publishDate;
	var viewCount=ytInitialPlayerResponse.videoDetails.viewCount
	return {date: date, views: viewCount}
}
	
	
var get_Youtube_info_JSON = function(){
	var doc= document.documentElement.innerHTML
	var doc3=doc.match(/(var ytInitialPlayerResponse = \{.*?)<\/script>/)
	if(doc3)doc3=doc3[1]
	eval(doc3)
	//console.log(doc3)
	var videoData=ytInitialPlayerResponse.videoDetails;	
	var title=videoData.title	;
	var date=ytInitialPlayerResponse.microformat.playerMicroformatRenderer.publishDate;
	date=date_format(date)
	var author=ytInitialPlayerResponse.videoDetails.author
	var viewCount=ytInitialPlayerResponse.videoDetails.viewCount
	viewCount=comma_digit(viewCount)
	var videoId=ytInitialPlayerResponse.videoDetails.videoId
	var description=ytInitialPlayerResponse.videoDetails.shortDescription	
	var channelId=ytInitialPlayerResponse.channelId
	//var Rating=ytInitialPlayerResponse.videoDetails.averageRating	
	//var keywords=ytInitialPlayerResponse.videoDetails.keywords
	
	var likes="",dislikes=""
		try{
			if(cont.videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].toggleButtonRenderer.defaultText){			
				var likes=cont.videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].toggleButtonRenderer.defaultText.accessibility.accessibilityData.label //toggledText
				likes= "↑ " + likes
			}
		}catch(err){	 }
		
	var title_= title + " | " + author + " | " + date + " | " + viewCount +" views" + " | " + likes;
	return title_
}


function date_format(date){
	var d=date.match(/(\d{4})-(\d{2})-(\d{2})/)	
	var months=["0","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
	var m=d[2]
	m=m.replace(/0(\d)/,"$1")
	return months[parseInt(m)] +  " " + d[3] + ", " +d[1]
}


function comma_digit(num) {
	num=num.toString().split('').reverse().join('').replace(/(.{3})/g,'$1,').replace(/,$/,'').split('').reverse().join('')
  return num	
}

