const puppeteer = require("puppeteer");
const fs = require('fs');
require('dotenv').config();

const extracteventData = async (url,browser) => {
    try{
        const eventData = {}
        const page = await browser.newPage()
        await page.goto(url)       
          
        eventData['name'] = await page.$eval('.event-title', name => name.innerText)
       
        await  new Promise(r => setTimeout(r, 4000));
        eventData['name'] = await page.$eval('.event-title', name => name.innerText)       
        // eventData['price'] = await page.$eval('.Stack_root__1ksk7 > p:nth-of-type(3)', priceElement => priceElement.innerText);
        eventData['image'] = await page.$eval('img', img => img.src)
        eventData['info'] = await page.$eval(".event-details__section", info => info.innerText.slice(0,200) + '...')
        eventData['description'] = await page.$eval('.event-details__main-inner', description=>description.innerText.slice(0,200) + '...')
        eventData['links'] = await page.$$eval('.Stack_root__1ksk7:first-child', links => links.href)
        // (a => a.href))
        
        eventData['name'] = eventData['name'].replace(/\n/g, ' ');
        // eventData['price'] = eventData['price'].replace(/\n/g, ' ' );
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
        const scrapedData = []
        console.log("Opening the browser......");
        const browser = await puppeteer.launch(
            {   args: [
                "--disable-setuid-sandbox",
                "--no-sandbox",
                "--single-process",
                "--no-zygote",
            ],
                executablePath:
                process.env.NODE_ENV === "production"
                ? process.env.PUPPETEER_EXECUTABLE_PATH
                : puppeteer.executablePath()  
        })
      
        const page = await browser.newPage();
        await page.goto(url);
        console.log(`Navigating to ${url}...`);
        const tmpurls = await page.$$eval('.Stack_root__1ksk7 a', res => res.map(a=>a.href))
        const urls = await tmpurls.filter((link,index) =>{ return tmpurls.indexOf(link) === index})
        console.log("url capuradas",urls)
        const urls2 = urls.slice(0, 5);

        // Me quedo con los 20 primeros productos, porque sino es muy largo
  

        console.log(`${urls2.length} links encontrados`);
        
        for(eventLink in urls2){
            const product = await extracteventData(urls2[eventLink],browser)
            scrapedData.push(product)
        }
        console.log(scrapedData, "Lo que devuelve mi función scraper", scrapedData.length) 
        await browser.close()


        fs.writeFile('scrapedData.json', JSON.stringify(scrapedData, null, 2), (err) => {
            if (err) throw err;
            console.log('Datos guardados en scrapedData.json');
        });
      
        return scrapedData;
    } catch (err) {
        console.log("Error:", err);
    }
}
exports.scrap = scrap;
/********** DESCOMENTAR PARA PROBAR *********/
// scrap("https://www.eventbrite.es/d/spain--madrid/development/").then(data =>console.log(data))