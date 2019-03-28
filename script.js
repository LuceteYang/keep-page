function init(){
	  chrome.tabs.executeScript({
    code: 'document.title'
  }, function (title) {
  	chrome.tabs.executeScript({
    	code: 'document.URL'
  	}, function (url) {
  		chrome.storage.sync.get(function (data) {
			var sites= data.sites ||[];
			for (var i = 0; i < sites.length; i++) {			
				if(sites[i].title.toString()==title.toString()){
					return showSites();
				}
			}
			sites.push({title:title,url:url});
		    chrome.storage.sync.set({
				sites: sites
			});
  			showSites();			
		});
  	});
  });
}
init();

function removeSite(){
	var index = parseInt(this.getAttribute("index"));
	chrome.storage.sync.get(function (data) {
		var sites= data.sites ||[];
		sites.splice(index, 1) 	
	    chrome.storage.sync.set({
			sites: sites
		});
		showSites();			
	});
}


function showSites(){
chrome.storage.sync.get(function (data) {
	var sites= data.sites || [];
	// var sites= {"naver":"https://naver.com","daum":"https://daum.net"};
	var addhtml = "";
	for (var i = 0; i < sites.length; i++) {
		addhtml+='<li><a target="_blank" rel="noopener noreferrer" href="'+sites[i].url+'">'+sites[i].title+'</a><span class="del" index='+i+' >  [x]</span</li>'
	}

	document.getElementById('renderList').innerHTML = addhtml;
	var classname = document.getElementsByClassName("del");
	for (var i = 0; i < classname.length; i++) {
	    classname[i].addEventListener('click', removeSite, false);
	}
});
}

