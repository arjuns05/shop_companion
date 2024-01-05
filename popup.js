


let scrapeItem = document.getElementById("scraper")
let stopButton = document.getElementById("stop")

stopButton.addEventListener("click", ()=> {

    
    chrome.runtime.sendMessage({event: 'onStop'})
})

scrapeItem.addEventListener("click", async ()=> {
    // alert('hello')
    //current tab



    chrome.scripting.executeScript({
        target:{tabId:tab.id},
        func: scrapeDetailsFromPage
    })



}
)

//scraper function
var title; 
var price;
var url;
 async function scrapeDetailsFromPage(){

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
    // let queryOptions = { active: true, currentWindow: true };
    // let [tab] = await chrome.tabs.query(queryOptions);
    // console.log([tab])
    // console.log(url)
    price = final_price
    const prefs = {
        productTitle: title,
        price:price
        // link: url
    }
    // let queryOptions = { active: true, currentWindow: true };
    // let [tab] = await chrome.tabs.query(queryOptions);
    // console.log(tab[0])
    chrome.storage.local.set({"title": title}).then(()=>{
        console.log("title is set")
    })
    chrome.storage.local.set({"price": price}).then(()=>{
        console.log("price is set")
    })
    

    chrome.runtime.sendMessage({event: 'onStart', prefs})
    
   


    // let description = document.getElementsByClassName("a-unordered-list a-vertical a-spacing-mini").innerHTML;
    // alert(description)

    // let final_alert = productTitle + price + description
    // alert(final_alert)

}






