let url = "https://www.wikipedia.org";
const request = require("request");
const cheerio = require("cheerio");
const p = require("puppeteer");
const { copy } = require("request/lib/helpers");
const { get } = require("request");

let browserOpenPromise = p.launch({
    headless:false,
    args:["--start-maximised"],
    defaultViewport:null,
});

let page;
browserOpenPromise.then(function(browser) {
    let oPromise =  browser.newPage();
    return oPromise;
})
.then(function(newTab) {
    page  = newTab;
    let wOPromise = page.goto(url);
    return wOPromise;
})
.then(function() {
    let lWPromise = page.waitForSelector("a[id='js-link-box-en']");
    return lWPromise;
})
.then(function(){
    let lCPromise = page.click("a[id='js-link-box-en']");
    return lCPromise;
})
.then(function() {
    let pWPromise = page.waitForSelector("a[title='Wikipedia:Contents/Portals']");
    return pWPromise;
})
.then(function() {
    let pCPromise = page.click("a[title='Wikipedia:Contents/Portals']");
    return pCPromise;
})
.then(function() {
    let alphaWPromise = page.waitForSelector("a[title='Wikipedia:Contents/A–Z index']");
    return alphaWPromise;
})
.then(function() {
    let alpha = page.click("a[title='Wikipedia:Contents/A–Z index']");
    return alpha;
})
.then(function() {
    let yLetter = page.waitForSelector("a[title='Special:AllPages/Y']");
    return yLetter;
})
.then(function() {
    let y = page.click("a[title='Special:AllPages/Y']");
    return y;
})
.then(function() {
    let yWait = page.waitForSelector("a[title='Y']");
    return yWait;
})
.then(function() {
    let Y = page.click("a[title='Y']");
    return Y;
})
.then(function() {
    let pageURL = page.url();
    return pageURL;
})
.then(function(pUrl) {
    url = pUrl;
    request(url, cb);
    function cb(error, response, html) {
        if (error) {
            console.log(error.message);
        } else {
            getDetails(html, url);
        }
    }
    
    function getDetails(html, url) {

        let str = cheerio.load(html);
        let element = str(".mw-parser-output p");
        
        console.log("\n\n\n                 Name                    \n\n\n")
        for(let i = 2; i <= 4; i++){
            console.log(str(element[i]).text());
            
        }
        console.log("\n\n\n                 History                  \n\n\n")
        for(let i = 5; i <= 13; i++){
            console.log(str(element[i]).text());
            
        }
        console.log("\n\n\n                Pronounciation                    \n\n\n")
        for(let i = 15; i <= 47; i++){
            console.log(str(element[i]).text());
    
        }
    }
}).catch(function(error) {
    console.log(error.message);
})

