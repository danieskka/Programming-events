const puppeteer = require("puppeteer");
const fs = require('fs');

const extracteventData = async (url,browser) => {
    try{
        const eventData = {}
        const page = await browser.newPage()
        await page.goto(url)
        eventData['name'] = await page.$eval('.inside-page-hero h1', name=>name.innerText)
        eventData['img'] = await page.$eval('img', img=>img.src)
        eventData['info'] = await page.$eval(".event-post-item-row", info=>info.innerText.slice(0,200) + '...')
        eventData['description'] = await page.$eval('.entry-content', description=>description.innerText.slice(0,200) + '...')

        eventData['name'] = eventData['name'].replace(/\n/g, ' ');
        eventData['price'] = eventData['price'] ? eventData['price'].replace(/\n/g, '' ) : null;
        eventData['info'] = eventData['info'].replace(/\n/g, ' ');
        eventData['description'] = eventData['description'].replace(/\n/g, ' ');
        return eventData 
    }
    catch(err){
       return {error:err}
    }
    
}

const scrap = async (url) => {
    try {
        const scrapedData2 = []
        console.log("Opening the browser......");
        const browser = await puppeteer.launch({headless:true})
        const page = await browser.newPage();
        await page.goto(url);
        console.log(`Navigating to ${url}...`);
        const tmpurls = await page.$$eval('.event-title a', res => res.map(a=>a.href))
       
        const urls = await tmpurls.filter((link,index) =>{ return tmpurls.indexOf(link) === index})
        console.log("url capuradas",urls)
       
        const urls2 = urls.slice(0, 5);
        console.log(`${urls2.length} links encontrados`);
        for(eventLink in urls2){
            const product = await extracteventData(urls2[eventLink],browser)
            scrapedData2.push(product)
        }
        
        console.log(scrapedData2, "Lo que devuelve mi función scraper", scrapedData2.length) 
        await browser.close()
        fs.writeFile('scrapedData2.json', JSON.stringify(scrapedData2, null, 2), (err) => {
            if (err) throw err;
            console.log('Datos guardados en scrapedData.json');
        });
       
        return scrapedData2;
    } catch (err) {
        console.log("Error:", err);
    }
}
exports.scrap = scrap;

scrap("https://infosec-conferences.com/country/spain/").then(data =>console.log(data))