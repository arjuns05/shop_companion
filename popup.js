


let scrapeItem = document.getElementById("scraper")
let stopButton = document.getElementById("stop")
scrapeItem.addEventListener("click",  async ()=> {
    // alert('hello')
    //current tab
    // console.log("clicked")
    // alert("clicked")
    // chrome.runtime.sendMessage({event: 'onStart'})
    let[tab] = await chrome.tabs.query({active:true, currentWindow:true})
    
    chrome.scripting.executeScript({
        target:{tabId:tab.id},
        func: scrapeDetailsFromPage
    })



}
)

//scraper function
var title; 
var price;



 function scrapeDetailsFromPage(){
   
    
    let productTitle = document.getElementById("productTitle").innerHTML;
    console.log(productTitle)
    title = productTitle
 
   
    let price_temp = document.getElementsByClassName("a-price-whole")[0].innerHTML;
    var final_index = price_temp.indexOf("<");
    let price_whole = price_temp.substring(0,final_index)

    let decimal = "."
    let price_cents = document.getElementsByClassName("a-price-fraction")[0].innerHTML;
    let final_price = price_whole + decimal + price_cents
    console.log(final_price)
    
    url = window.location.toString()
    console.log(url)
    price = final_price
    const prefs = {
        productTitle: title,
        price:price, 
        link: url



    }
   
    chrome.storage.local.set({"title": title}).then(()=>{
        console.log("title is set")
    })
    chrome.storage.local.set({"price": price}).then(()=>{
        console.log("price is set")
    })
    chrome.storage.local.set({"link": url}).then(()=>{
        console.log("url retrieved")
    })
    

    chrome.runtime.sendMessage({event: 'onStart', prefs})
    
   


    // let description = document.getElementsByClassName("a-unordered-list a-vertical a-spacing-mini").innerHTML;
    // alert(description)

    // let final_alert = productTitle + price + description
    // alert(final_alert)

}







stopButton.addEventListener("click", ()=> {

    
    chrome.runtime.sendMessage({event: 'onStop'})
})

