const puppeteer = require('puppeteer')
const fs = require('fs');
// const url = 'https://www.eventbrite.es/d/spain/development/'
let data;


const extractData = async (url) => {
    try{
        const browser = await puppeteer.launch({headless:true})
        const page = await browser.newPage()
        await page.goto(url)

        await  new Promise(r => setTimeout(r, 4000)); //page.waitForTimeout(4000);
        const eventData = await page.evaluate((url) => {
        const eventContainer = Array.from(document.querySelectorAll('.Container_root__16e3w'));
        data = eventContainer.map((elem)  => ({
            title: elem.querySelector('.Typography_root__lp5bn').innerText,
            date: elem.querySelector('.Stack_root__1ksk7 > p').innerText,
            location: elem.querySelector('.Stack_root__1ksk7 > p:nth-of-type(2)').innerText,
            price: elem.querySelector('.Stack_root__1ksk7 > p:nth-of-type(3)').innerText,
            image: elem.querySelector('img').getAttribute('src'),
            link: elem.querySelector('.event-card-link ').getAttribute('href')
            // info: info[index]
        }))
        return data
        }, url)
        


        console.log(eventData)

        await browser.close();
        }
    catch(err){
        return {error:err}
    }

    fs.writeFile('data.json', JSON.stringify(eventData), (err) => {
        if (err) throw err;
        console.log('Datos guardados');
    });


}

extractData();

// const scrap = async(url) => {
//     try {
//         const browser = await puppeteer.launch({headless:true})
//         const page = await browser.newPage();
//         await page.goto(url);
//         const scrapedData = []

       
//         let tmpurls = await page.$$eval('.Stack_root__1ksk7 a', res => res.map(a=>a.href))
//         const urls = await tmpurls.filter((link,index) =>{ return tmpurls.indexOf(link) === index})
//         console.log("url capuradas",urls)
//         const urls2 = urls.slice(0, 15);
//         console.log(`${urls2.length} links encontrados`);
        
//         const eventData = {}
//         eventData['description'] = await page.$eval('.event-details__main-inner', res => res.map( elem =>elem.innerText).push(scrapedData))
        
//         eventData['description'] = await page.$eval('.event-details__main-inner', description=>description.innerText.slice(0,200) + '...')
//         return eventData
//         const gg = await page.evaluate((url) => {
//             const eventInfo = Array.from(document.querySelector('.event-details__main'))
//             let info = eventInfo.map(elem => ({
//             description: elem.querySelector('p.summary').innerText
//         }))
//         return info
//         }, url)
        
       
            
//         await browser.close()    
//         // return scrapedData;
//     }
//     catch (err) {
//         console.log("Error:", err);
        
//     }
// }


// exports.scrap = scrap;
exports.scrap = extractData;
// scrap("https://www.eventbrite.es/d/spain/development/")
extractData("https://www.eventbrite.es/d/spain/development/")