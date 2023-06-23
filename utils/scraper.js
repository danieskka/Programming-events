const puppeteer = require("puppeteer");
const fs = require('fs');

const extracteventData = async (url,browser) => {
    try{
        const eventData = {}
        const page = await browser.newPage()
        await page.goto(url)
    //     await page.waitForSelector('label.ChoiceListItem_choice__hikcw', { visible: true });
    //     await page.click('label.ChoiceListItem_choice__hikcw');
        

    //    eventData['Free'] = await page.$$eval('.ChoiceListItem_label__hikcw', (elementos) => {
    //         const data = [];
          
    //         elementos.forEach((elemento) => {
    //           const titulo = elemento.querySelector('.event-title').innerText;
    //           const descripcion = elemento.querySelector('.event-details__main-inner').innerText;
          
    //           data.push({ titulo, descripcion });
    //         });
          
    //         return data;
    //       });
          
    //       console.log(resultados);
         
          
        eventData['name'] = await page.$eval('.event-title', name => name.innerText)
        // await page.waitForSelector('.ticket-card-compact-size__price-container');


        // await page.waitForSelector('div.ticket-card-compact-size__price-container div.ticket-card-compact-size__price span.eds-text-bm eds-text-weight--heavy');
        // eventData['price'] = await page.$eval('.ticket-card-compact-size__price> span', priceElement => priceElement.innerText);

        

        // eventData['price'] = await page.$eval('.ticket-card-compact-size__price', price => {
        //   if (price.childNodes.length > 0) {
        //     const firstChild = price.childNodes[0];
        //     if (firstChild.childNodes.length > 0) {
        //       const secondChild = firstChild.childNodes[0];
        //       if (secondChild.childNodes.length > 0) {
        //         const grandChild = firstChild.childNodes[0];
        //         return grandChild.innerHTML;
        //       }
        //     }
        //   }
        //   return null;
        // });

        eventData['image'] = await page.$eval('img', img => img.src)
        eventData['info'] = await page.$eval(".event-details__section", info => info.innerText)
        eventData['description'] = await page.$eval('.event-details__main-inner', description=>description.innerText.slice(0,200) + '...')

       
        
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
        const browser = await puppeteer.launch({headless:false})
        
        const page = await browser.newPage();
        await page.goto(url);
        console.log(`Navigating to ${url}...`);
        const tmpurls = await page.$$eval('.Stack_root__1ksk7 a', res => res.map(a=>a.href))
        const urls = await tmpurls.filter((link,index) =>{ return tmpurls.indexOf(link) === index})
        console.log("url capuradas",urls)

        const urls2 = urls.slice(0, 15);

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
//  scrap("https://www.eventbrite.es/d/spain--madrid/development/").then(data =>console.log(data))