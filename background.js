

let data = {
    "event":"onStop/onStart",
    "values":{
        "productTitle": "title",
        "price":"price"
        // "link": "url"
    }
}


chrome.runtime.onMessage.addListener(data => {
    const{event, prefs} = data
    switch(data.event){
        
        case 'onStart':
            console.log("OnStart in background")
            
            fetch("http://localhost:3000/sentMessage", {
                mode :'no-cors',
                method:'post', 
                headers: {
                    'Content-Type': 'application/json'
               },
                body: JSON.stringify({
                    text: prefs
                  })
            })
            .then(response => response.text())
            .then(body => {
            console.log('Data sent successfully:' + body);
            })
            .catch(error => {
            console.error('Error sending data:', error);
  });
            console.log(prefs)
            break
            
        case 'onStop':
            // chrome.storage.local.get('title', function(result){
            // var keywords = result.title;
            
            
            
            
            
            console.log("OnStop in background")
            
            break;
            
            
        
        
    }
})
// const { default: scrapeDetailsFromPage } = exports.scrapeDetailsFromPage

// console.log(scrapeDetailsFromPage())